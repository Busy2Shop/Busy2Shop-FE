import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-email',
    '/markets',
    '/shop-by-ingredient',
];

// List of protected routes that require authentication
const protectedRoutes = [
    '/checkout',
    '/orders',
    '/profile',
    '/wallet',
    '/cart',
    '/address',
    '/messages',
    '/shopping-list',
];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Check if the route is public
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    // If the route is public, allow access
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // If there's no token and the route is protected, redirect to login
    if (!token && isProtectedRoute) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If there's a token and the user is trying to access auth pages, redirect to dashboard
    if (token && pathname.startsWith('/auth/')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}; 