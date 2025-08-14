// Prueba simple de PUT
async function testPUT() {
  console.log('🧪 Probando PUT...\n');

  try {
    // Obtener un restaurante para editar
    const getResponse = await fetch('http://localhost:3000/api/restaurants-online');
    const restaurants = await getResponse.json();
    
    if (restaurants.length === 0) {
      console.log('❌ No hay restaurantes');
      return;
    }

    const restaurant = restaurants[0];
    console.log('Editando restaurante:', restaurant.name);

    // Actualizar el restaurante
    const updatedRestaurant = {
      ...restaurant,
      verified: !restaurant.verified,
      rating: 4.9
    };

    console.log('Enviando PUT...');
    const putResponse = await fetch('http://localhost:3000/api/restaurants-online', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRestaurant),
    });

    const result = await putResponse.json();
    console.log('Resultado:', result);

  } catch (error) {
    console.error('Error:', error);
  }
}

testPUT(); 