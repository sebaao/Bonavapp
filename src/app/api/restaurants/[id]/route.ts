import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const restaurantId = params.id;

    // Leer el archivo JSON actual
    const jsonPath = path.join(process.cwd(), 'data', 'restaurants.json');
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const restaurants = JSON.parse(jsonData);

    // Encontrar el restaurante por ID
    const restaurantIndex = restaurants.findIndex((r: any) => r.id === restaurantId);
    
    if (restaurantIndex === -1) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    // Actualizar el restaurante
    const updatedRestaurant = {
      ...restaurants[restaurantIndex],
      ...body,
      id: restaurantId, // Asegurar que el ID no cambie
      createdAt: restaurants[restaurantIndex].createdAt || new Date().toISOString() // Mantener fecha de creación
    };

    restaurants[restaurantIndex] = updatedRestaurant;

    // Escribir el archivo actualizado
    await fs.writeFile(jsonPath, JSON.stringify(restaurants, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Restaurant updated successfully',
      restaurant: updatedRestaurant
    });

  } catch (error) {
    console.error('Error updating restaurant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const restaurantId = params.id;

    // Leer el archivo JSON
    const jsonPath = path.join(process.cwd(), 'data', 'restaurants.json');
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const restaurants = JSON.parse(jsonData);

    // Encontrar el restaurante por ID
    const restaurant = restaurants.find((r: any) => r.id === restaurantId);
    
    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(restaurant);

  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 