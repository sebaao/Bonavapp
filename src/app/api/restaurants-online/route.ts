import { NextRequest, NextResponse } from 'next/server';

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
    const body = await request.json();
    
    // Para actualizar el JSON en GitHub, necesitarías usar la GitHub API
    // Esto requeriría autenticación con un token de acceso personal
    // Por ahora, solo retornamos los datos recibidos
    
    return NextResponse.json({ 
      success: true, 
      message: 'Datos recibidos. Para actualizar el JSON en GitHub, se requiere autenticación.',
      data: body 
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
    const body = await request.json();
    
    // Para actualizar el JSON en GitHub, necesitarías usar la GitHub API
    // Esto requeriría autenticación con un token de acceso personal
    // Por ahora, solo retornamos los datos recibidos
    
    return NextResponse.json({ 
      success: true, 
      message: 'Datos recibidos. Para actualizar el JSON en GitHub, se requiere autenticación.',
      data: body 
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
} 