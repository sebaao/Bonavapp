import { NextRequest, NextResponse } from 'next/server';

// Configuración de GitHub
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'sebaao';
const GITHUB_REPO = 'Bonavapp';
const GITHUB_PATH = 'data/restaurants.json';

// Función para obtener el contenido actual del archivo
async function getCurrentFile() {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`,
    {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error al obtener el archivo: ${response.status}`);
  }

  return await response.json();
}

// Función para actualizar el archivo en GitHub
async function updateFile(content: string, sha: string, message: string) {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        content: Buffer.from(content).toString('base64'),
        sha: sha,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error al actualizar el archivo: ${response.status} - ${error.message}`);
  }

  return await response.json();
}

export async function GET() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/sebaao/Bonavapp/main/data/restaurants.json');

    if (!response.ok) {
      throw new Error(`Error al obtener el JSON: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token no configurado. Configura la variable de entorno GITHUB_TOKEN.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    // Obtener el archivo actual
    const currentFile = await getCurrentFile();
    
    // Decodificar el contenido actual
    const currentContent = Buffer.from(currentFile.content, 'base64').toString('utf-8');
    const currentData = JSON.parse(currentContent);
    
    // Agregar el nuevo restaurante
    const newRestaurant = {
      ...body,
      id: Date.now().toString(), // Generar ID único
      verified: false,
      createdAt: new Date().toISOString(),
    };
    
    currentData.push(newRestaurant);
    
    // Actualizar el archivo
    const updatedContent = JSON.stringify(currentData, null, 2);
    await updateFile(
      updatedContent,
      currentFile.sha,
      `Agregar nuevo restaurante: ${newRestaurant.name}`
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Restaurante agregado exitosamente',
      data: newRestaurant 
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token no configurado. Configura la variable de entorno GITHUB_TOKEN.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;
    
    // Obtener el archivo actual
    const currentFile = await getCurrentFile();
    
    // Decodificar el contenido actual
    const currentContent = Buffer.from(currentFile.content, 'base64').toString('utf-8');
    const currentData = JSON.parse(currentContent);
    
    // Encontrar y actualizar el restaurante
    const restaurantIndex = currentData.findIndex((r: any) => r.id === id);
    
    if (restaurantIndex === -1) {
      return NextResponse.json(
        { error: 'Restaurante no encontrado' },
        { status: 404 }
      );
    }
    
    // Actualizar el restaurante
    currentData[restaurantIndex] = {
      ...currentData[restaurantIndex],
      ...updateData,
      id: id, // Mantener el ID original
    };
    
    // Actualizar el archivo
    const updatedContent = JSON.stringify(currentData, null, 2);
    await updateFile(
      updatedContent,
      currentFile.sha,
      `Actualizar restaurante: ${currentData[restaurantIndex].name}`
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Restaurante actualizado exitosamente',
      data: currentData[restaurantIndex] 
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token no configurado. Configura la variable de entorno GITHUB_TOKEN.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID del restaurante requerido' },
        { status: 400 }
      );
    }
    
    // Obtener el archivo actual
    const currentFile = await getCurrentFile();
    
    // Decodificar el contenido actual
    const currentContent = Buffer.from(currentFile.content, 'base64').toString('utf-8');
    const currentData = JSON.parse(currentContent);
    
    // Encontrar y eliminar el restaurante
    const restaurantIndex = currentData.findIndex((r: any) => r.id === id);
    
    if (restaurantIndex === -1) {
      return NextResponse.json(
        { error: 'Restaurante no encontrado' },
        { status: 404 }
      );
    }
    
    const deletedRestaurant = currentData[restaurantIndex];
    currentData.splice(restaurantIndex, 1);
    
    // Actualizar el archivo
    const updatedContent = JSON.stringify(currentData, null, 2);
    await updateFile(
      updatedContent,
      currentFile.sha,
      `Eliminar restaurante: ${deletedRestaurant.name}`
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Restaurante eliminado exitosamente',
      data: deletedRestaurant 
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
} 