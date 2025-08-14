// Prueba de acceso al repositorio específico
async function testRepoAccess() {
  const GITHUB_TOKEN = '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';
  
  console.log('🔍 Probando acceso al repositorio...\n');

  try {
    // 1. Probar acceso al usuario
    console.log('1️⃣ Probando acceso al usuario...');
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (userResponse.ok) {
      const userData = await userResponse.json();
      console.log('✅ Usuario:', userData.login);
    } else {
      console.log('❌ Error al acceder al usuario:', userResponse.status);
    }

    // 2. Probar acceso al repositorio
    console.log('\n2️⃣ Probando acceso al repositorio...');
    const repoResponse = await fetch('https://api.github.com/repos/sebaao/Bonavapp', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (repoResponse.ok) {
      const repoData = await repoResponse.json();
      console.log('✅ Repositorio:', repoData.full_name);
      console.log('   Privado:', repoData.private);
      console.log('   Permisos:', repoData.permissions);
    } else {
      console.log('❌ Error al acceder al repositorio:', repoResponse.status);
      const errorData = await repoResponse.json();
      console.log('   Error:', errorData.message);
    }

    // 3. Probar acceso al contenido del archivo
    console.log('\n3️⃣ Probando acceso al archivo...');
    const fileResponse = await fetch('https://api.github.com/repos/sebaao/Bonavapp/contents/data/restaurants.json', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (fileResponse.ok) {
      const fileData = await fileResponse.json();
      console.log('✅ Archivo encontrado');
      console.log('   SHA:', fileData.sha);
      console.log('   Tamaño:', fileData.size);
    } else {
      console.log('❌ Error al acceder al archivo:', fileResponse.status);
      const errorData = await fileResponse.json();
      console.log('   Error:', errorData.message);
    }

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
  }
}

testRepoAccess(); 