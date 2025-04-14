import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import useAuthStore from '@/store/auth.store';

export function useLogin() {
    const login = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            return login(credentials.email, credentials.password);
        },
    });
}

export function useRegister() {
    const register = useAuthStore((state) => state.register);

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
    const verifyEmail = useAuthStore((state) => state.verifyEmail);

    return useMutation({
        mutationFn: async (token: string) => {
            return verifyEmail(token);
        },
    });
}

export function useResetPassword() {
    const resetPassword = useAuthStore((state) => state.resetPassword);

    return useMutation({
        mutationFn: async (email: string) => {
            return resetPassword(email);
        },
    });
}

export function useUpdatePassword() {
    const updatePassword = useAuthStore((state) => state.updatePassword);

    return useMutation({
        mutationFn: async (data: { token: string; password: string }) => {
            return updatePassword(data.token, data.password);
        },
    });
}

export function useUser() {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
    const logout = useAuthStore((state) => state.logout);

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