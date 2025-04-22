import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const cookieOptions = {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : 'localhost'
};

const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

const setCookie = (name: string, value: string, options: { [key: string]: any } = {}): void => {
    if (typeof document === 'undefined') return;

    let cookie = `${name}=${value}`;

    if (options.path) cookie += `; path=${options.path}`;
    if (options.maxAge) cookie += `; max-age=${options.maxAge}`;
    if (options.domain) cookie += `; domain=${options.domain}`;
    if (options.secure) cookie += '; secure';
    if (options.sameSite) cookie += `; samesite=${options.sameSite}`;

    document.cookie = cookie;
};

const deleteCookie = (name: string, options: { [key: string]: any } = {}): void => {
    if (typeof document === 'undefined') return;
    setCookie(name, '', { ...options, maxAge: -1 });
};

export const getToken = (): string | undefined => {
    try {
        return Cookies.get(TOKEN_KEY);
    } catch (error) {
        console.error('Error getting token:', error);
        return undefined;
    }
};

export const setToken = (token: string) => {
    try {
        Cookies.set(TOKEN_KEY, token, cookieOptions);
        console.log('Token set in cookies:', token);
    } catch (error) {
        console.error('Error setting token:', error);
    }
};

export const getRefreshToken = (): string | undefined => {
    try {
        return Cookies.get(REFRESH_TOKEN_KEY);
    } catch (error) {
        console.error('Error getting refresh token:', error);
        return undefined;
    }
};

export const setRefreshToken = (token: string) => {
    try {
        Cookies.set(REFRESH_TOKEN_KEY, token, {
            ...cookieOptions,
            expires: 30 // 30 days for refresh token
        });
    } catch (error) {
        console.error('Error setting refresh token:', error);
    }
};

export const removeToken = () => {
    try {
        Cookies.remove(TOKEN_KEY, cookieOptions);
    } catch (error) {
        console.error('Error removing token:', error);
    }
};

export const removeRefreshToken = () => {
    try {
        Cookies.remove(REFRESH_TOKEN_KEY, cookieOptions);
    } catch (error) {
        console.error('Error removing refresh token:', error);
    }
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
}; 