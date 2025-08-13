import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Restaurant {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  hours: string;
  isOpen: boolean;
  priceLevel: number;
  rating: number;
  tags: string[];
  image: string;
  distance: number;
  website: string;
  phone: string;
  menu: Array<{
    title: string;
    items: Array<{
      name: string;
      description: string;
      price: string;
    }>;
  }>;
  reviews: string[];
  verified: boolean;
  createdAt: string;
}

interface UpdateBody {
  name?: string;
  category?: string;
  description?: string;
  location?: string;
  hours?: string;
  isOpen?: boolean;
  priceLevel?: number;
  rating?: number;
  tags?: string[];
  image?: string;
  distance?: number;
  website?: string;
  phone?: string;
  menu?: Array<{
    title: string;
    items: Array<{
      name: string;
      description: string;
      price: string;
    }>;
  }>;
  verified?: boolean;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateBody = await request.json();
    const { id } = params;

    // Leer el archivo JSON actual
    const jsonPath = path.join(process.cwd(), 'data', 'restaurants.json');
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const restaurants: Restaurant[] = JSON.parse(jsonData);

    // Encontrar el restaurante por ID
    const restaurantIndex = restaurants.findIndex(r => r.id === id);
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
      id: restaurants[restaurantIndex].id, // Mantener el ID original
      createdAt: restaurants[restaurantIndex].createdAt // Mantener la fecha de creación
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
    const { id } = params;

    // Leer el archivo JSON actual
    const jsonPath = path.join(process.cwd(), 'data', 'restaurants.json');
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const restaurants: Restaurant[] = JSON.parse(jsonData);

    // Encontrar el restaurante por ID
    const restaurant = restaurants.find(r => r.id === id);
    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(restaurant);

  } catch (error) {
    console.error('Error reading restaurant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 