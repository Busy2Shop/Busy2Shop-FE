import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from './lib/auth';

// Add paths that don't require authentication
const publicPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/markets',
    '/shop-by-ingredient',
    '/',
];

// List of protected routes that require authentication
const protectedRoutes = [
    '/checkout',
    '/orders',
    '/cart/checkout',
    '/cart/place-order',
    '/orders/create',
    '/orders/update',
    '/orders/cancel',
    '/orders/chat',
    '/wallet',
    '/profile',
    '/address',
    '/messages',
];

// List of routes that should redirect authenticated users
const redirectIfAuthenticated = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = getToken();

    // Check if the path requires authentication
    const requiresAuth = protectedRoutes.some((path) => pathname.startsWith(path));

    // Check if the path should redirect authenticated users
    const shouldRedirectIfAuth = redirectIfAuthenticated.some((path) => pathname.startsWith(path));

    // Redirect authenticated users away from auth pages
    if (shouldRedirectIfAuth && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Protect routes that require authentication
    if (requiresAuth && !token) {
        // Store the intended URL to redirect back after login
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(redirectUrl);
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
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
}; 