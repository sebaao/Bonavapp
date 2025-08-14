import { NextResponse } from 'next/server';

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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';
  
  if (!GITHUB_TOKEN) {
    return NextResponse.json({
      status: 'error',
      message: 'GitHub token no configurado',
      configurado: false
    });
  }

  try {
    // Probar la conexión con GitHub API
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return NextResponse.json({
        status: 'success',
        message: 'Token configurado correctamente',
        configurado: true,
        usuario: userData.login,
        permisos: 'Token válido'
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Token inválido o sin permisos',
        configurado: false,
        error: response.status
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Error al conectar con GitHub',
      configurado: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
} 