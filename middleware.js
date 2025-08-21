import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const publicRoutes = ['/login', '/signup', '/'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Admin routes
  const adminRoutes = ['/admin'];
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  // Protected routes (user dashboard, etc.)
  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  const token = request.cookies.get('token')?.value;

  // If trying to access protected route without token
  if ((isProtectedRoute || isAdminRoute) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If has token, verify it
  if (token) {
    const decoded = verifyToken(token);
    
    if (!decoded) {
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    // Check admin access
    if (isAdminRoute && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If logged in and trying to access login/signup, redirect to dashboard
    if (isPublicRoute && pathname !== '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};