import { NextRequest, NextResponse } from 'next/server';

// Configuración de rutas protegidas
export const config = {
  matcher: ['/dashboard/:path*'],
};

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  // Solo proteger rutas que empiecen con /dashboard
  if (!currentPath.startsWith('/dashboard')) return NextResponse.next();

  // Obtener tokens desde cookies
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;
  // console.log('Tokens:', { accessToken, refreshToken });
  // console.log(req.cookies)
  // console.log(req.credentials)
  // Si no hay tokens, redirigir al login
  if (!accessToken || !refreshToken) {
    console.log('❌ Tokens ausentes');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Validar access_token con tu backend
  const validateRes = await fetch('http://localhost:3001/auth/validate', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // Si access_token inválido, intentar refresh
  if (validateRes.status === 401) {
    console.log('⚠️ Access token inválido, intentando refresh');

    const refreshRes = await fetch('http://localhost:3001/auth/refresh', {
      method: 'GET',
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if (refreshRes.status === 401) {
      console.log('❌ Refresh token inválido, redirigiendo al login');
      return NextResponse.redirect(new URL('/', req.url));
    }

    const { access_token: newAccessToken } = await refreshRes.json();

    // Setear nuevo access_token en cookies del navegador
    const response = NextResponse.next();
    response.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 15, // 15 minutos
    });

    return response;
  }

  return NextResponse.next();
}
// 