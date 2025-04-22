import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import type { AuthState } from '@/store/authStore';
import type { LoginCredentials, ResetPasswordData } from '@/lib/services/auth.service';

export function useLogin() {
    const login = useAuthStore((state: AuthState) => state.login);

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            return login({ email: credentials.email, password: credentials.password });
        },
    });
}

export function useRegister() {
    const register = useAuthStore((state: AuthState) => state.register);

    return useMutation({
        mutationFn: async (data: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            userType: 'agent' | 'customer';
        }) => {
            return register(data);
        },
    });
}

export function useVerifyEmail() {
    const verifyEmail = useAuthStore((state: AuthState) => state.verifyEmail);

    return useMutation({
        mutationFn: async (token: string) => {
            return verifyEmail(token);
        },
    });
}

export function useResetPassword() {
    const resetPassword = useAuthStore((state: AuthState) => state.resetPassword);

    return useMutation({
        mutationFn: async (data: ResetPasswordData) => {
            return resetPassword(data);
        },
    });
}

export function useUser() {
    const user = useAuthStore((state: AuthState) => state.user);
    const isAuthenticated = useAuthStore((state: AuthState) => state.isAuthenticated);

    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (!isAuthenticated) return null;
            const response = await apiClient.get('/auth/me');
            return response.data;
        },
        initialData: user,
        enabled: isAuthenticated,
    });
}

export function useLogout() {
    const logout = useAuthStore((state: AuthState) => state.logout);

    return useMutation({
        mutationFn: async () => {
            try {
                await apiClient.post('/auth/logout');
            } finally {
                logout();
            }
        },
    });
} 