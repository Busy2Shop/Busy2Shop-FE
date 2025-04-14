import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '@/lib/api-client';

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    status: {
        userType: 'agent' | 'customer';
        emailVerified: boolean;
        activated: boolean;
    };
}

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        userType: 'agent' | 'customer';
    }) => Promise<void>;
    logout: () => void;
    verifyEmail: (token: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updatePassword: (token: string, password: string) => Promise<void>;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await apiClient.post('/auth/login', { email, password });
                    const { user, token, refreshToken } = response.data;
                    set({
                        user,
                        token,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', refreshToken);
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Login failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            register: async (data: {
                email: string;
                password: string;
                firstName: string;
                lastName: string;
                userType: 'agent' | 'customer';
            }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await apiClient.post('/auth/signup', {
                        ...data,
                        location: {
                            country: 'Nigeria',
                            city: '',
                            address: '',
                        },
                    });

                    set({
                        user: response.data.data.user,
                        token: response.data.data.token,
                        refreshToken: response.data.data.refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.response?.data?.message || 'Registration failed',
                    });
                    throw error;
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    isAuthenticated: false,
                });
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            },

            verifyEmail: async (token: string) => {
                set({ isLoading: true, error: null });
                try {
                    await apiClient.post('/auth/verify-email', { token });
                    set({ isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Email verification failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            resetPassword: async (email: string) => {
                set({ isLoading: true, error: null });
                try {
                    await apiClient.post('/auth/reset-password', { email });
                    set({ isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Password reset failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            updatePassword: async (token: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    await apiClient.post('/auth/update-password', { token, password });
                    set({ isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Password update failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore; 