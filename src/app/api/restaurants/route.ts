import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validación básica
    if (!body.name || !body.category || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, location' },
        { status: 400 }
      );
    }

    // Leer el archivo JSON actual
    const jsonPath = path.join(process.cwd(), 'data', 'restaurants.json');
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const restaurants = JSON.parse(jsonData);

    // Generar nuevo ID (el siguiente número después del más alto)
    const maxId = Math.max(...restaurants.map((r: any) => parseInt(r.id)));
    const newId = (maxId + 1).toString();

    // Crear el nuevo restaurante
    const newRestaurant = {
      id: newId,
      name: body.name,
      category: body.category,
      description: body.description || '',
      location: body.location,
      hours: body.hours || '',
      isOpen: body.isOpen || false,
      priceLevel: body.priceLevel || 1,
      rating: body.rating || 0,
      tags: body.tags || [],
      image: body.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      distance: body.distance || 0,
      website: body.website || '',
      phone: body.phone || '',
      menu: body.menu || [],
      reviews: [],
      verified: false,
      createdAt: new Date().toISOString()
    };

    // Agregar el nuevo restaurante al array
    restaurants.push(newRestaurant);

    // Escribir el archivo actualizado
    await fs.writeFile(jsonPath, JSON.stringify(restaurants, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Restaurant added successfully',
      restaurant: newRestaurant
    });

  } catch (error) {
    console.error('Error adding restaurant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'data', 'restaurants.json');
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const restaurants = JSON.parse(jsonData);
    
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Error reading restaurants:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 