// Archivo de prueba para la API de restaurantes online
async function testAPI() {
  console.log('🧪 Probando API de restaurantes online...\n');

  try {
    // 1. Probar GET - Obtener restaurantes
    console.log('1️⃣ Probando GET /api/restaurants-online...');
    const getResponse = await fetch('http://localhost:3000/api/restaurants-online');
    const getData = await getResponse.json();
    console.log('✅ GET exitoso:', getData.length, 'restaurantes encontrados\n');

    // 2. Probar POST - Agregar restaurante
    console.log('2️⃣ Probando POST /api/restaurants-online...');
    const newRestaurant = {
      name: "Test Restaurant API",
      category: "Test Category",
      location: "Test City",
      rating: 4.5,
      price: "$$",
      description: "Restaurante de prueba para verificar la API",
      phone: "+1234567890",
      website: "https://test-restaurant.com",
      hours: "Mon-Fri: 9AM-10PM",
      distance: "2.5",
      tags: ["test", "api", "verification"]
    };

    const postResponse = await fetch('http://localhost:3000/api/restaurants-online', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRestaurant)
    });

    const postData = await postResponse.json();
    console.log('📋 Respuesta completa del POST:');
    console.log(JSON.stringify(postData, null, 2));
    console.log('\n');

    if (postData.success && postData.data && postData.data.id) {
      console.log('✅ POST exitoso:', postData.message);
      console.log('ID del nuevo restaurante:', postData.data.id, '\n');

      // 3. Probar PUT - Actualizar restaurante
      console.log('3️⃣ Probando PUT /api/restaurants-online...');
      const updateData = {
        id: postData.data.id,
        verified: true,
        rating: 4.8
      };

      const putResponse = await fetch('http://localhost:3000/api/restaurants-online', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const putData = await putResponse.json();
      console.log('📋 Respuesta completa del PUT:');
      console.log(JSON.stringify(putData, null, 2));
      console.log('\n');

      if (putData.success) {
        console.log('✅ PUT exitoso:', putData.message, '\n');

        // 4. Verificar que el restaurante se agregó
        console.log('4️⃣ Verificando que el restaurante se agregó...');
        const verifyResponse = await fetch('http://localhost:3000/api/restaurants-online');
        const verifyData = await verifyResponse.json();
        const addedRestaurant = verifyData.find(r => r.id === postData.data.id);
        
        if (addedRestaurant) {
          console.log('✅ Restaurante encontrado en la lista actualizada');
          console.log('Nombre:', addedRestaurant.name);
          console.log('Verificado:', addedRestaurant.verified);
          console.log('Rating:', addedRestaurant.rating);
        } else {
          console.log('❌ Restaurante no encontrado en la lista');
        }
      } else {
        console.log('❌ Error en PUT:', putData.error || putData.message);
      }
    } else {
      console.log('❌ Error en POST:', postData.error || postData.message);
    }

    console.log('\n🎉 Pruebas completadas!');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
  }
}

// Ejecutar las pruebas
testAPI(); 