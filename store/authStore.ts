import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';
import { setToken, setRefreshToken, removeToken } from '@/lib/auth';
import authService, {
    LoginCredentials,
    RegisterData,
    ResetPasswordData
} from '@/lib/services/auth.service';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'customer';
    isEmailVerified: boolean;
    profileImage?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    verificationStatus: {
        isVerifying: boolean;
        isResending: boolean;
        error: string | null;
    };
    passwordReset: {
        isRequesting: boolean;
        isResetting: boolean;
        error: string | null;
    };
    profileUpdate: {
        isUpdating: boolean;
        error: string | null;
    };

    // Auth actions
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: Omit<RegisterData, 'role'>) => Promise<void>;
    logout: () => Promise<void>;

    // Email verification
    verifyEmail: (token: string) => Promise<void>;
    resendVerificationEmail: () => Promise<void>;

    // Password management
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (data: ResetPasswordData) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;

    // Profile management
    updateProfile: (data: FormData) => Promise<void>;
    refreshUserData: () => Promise<void>;

    // Error handling
    clearError: () => void;
    clearVerificationError: () => void;
    clearPasswordResetError: () => void;
    clearProfileUpdateError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            verificationStatus: {
                isVerifying: false,
                isResending: false,
                error: null,
            },
            passwordReset: {
                isRequesting: false,
                isResetting: false,
                error: null,
            },
            profileUpdate: {
                isUpdating: false,
                error: null,
            },

            login: async (credentials: LoginCredentials) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await authService.login(credentials);
                    const { user, accessToken, refreshToken } = response;

                    if (user.role !== 'customer') {
                        throw new Error('Invalid account type');
                    }

                    setToken(accessToken);
                    setRefreshToken(refreshToken);
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Login failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            register: async (data: Omit<RegisterData, 'role'>) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await authService.register({
                        ...data,
                        role: 'customer',
                    });
                    const { user, accessToken, refreshToken } = response;
                    setToken(accessToken);
                    setRefreshToken(refreshToken);
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Registration failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                try {
                    set({ isLoading: true, error: null });
                    await authService.logout();
                    removeToken();
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Logout failed',
                        isLoading: false,
                    });
                    // Still remove tokens and user data on error
                    removeToken();
                    set({ user: null, isAuthenticated: false });
                    throw error;
                }
            },

            verifyEmail: async (token: string) => {
                try {
                    set((state) => ({
                        verificationStatus: {
                            ...state.verificationStatus,
                            isVerifying: true,
                            error: null,
                        },
                    }));
                    await authService.verifyEmail(token);
                    set((state) => ({
                        user: state.user ? { ...state.user, isEmailVerified: true } : null,
                        verificationStatus: {
                            ...state.verificationStatus,
                            isVerifying: false,
                        },
                    }));
                } catch (error: any) {
                    set((state) => ({
                        verificationStatus: {
                            ...state.verificationStatus,
                            isVerifying: false,
                            error: error.response?.data?.message || 'Email verification failed',
                        },
                    }));
                    throw error;
                }
            },

            resendVerificationEmail: async () => {
                try {
                    set((state) => ({
                        verificationStatus: {
                            ...state.verificationStatus,
                            isResending: true,
                            error: null,
                        },
                    }));
                    await authService.resendVerificationEmail();
                    set((state) => ({
                        verificationStatus: {
                            ...state.verificationStatus,
                            isResending: false,
                        },
                    }));
                } catch (error: any) {
                    set((state) => ({
                        verificationStatus: {
                            ...state.verificationStatus,
                            isResending: false,
                            error: error.response?.data?.message || 'Failed to resend verification email',
                        },
                    }));
                    throw error;
                }
            },

            forgotPassword: async (email: string) => {
                try {
                    set((state) => ({
                        passwordReset: {
                            ...state.passwordReset,
                            isRequesting: true,
                            error: null,
                        },
                    }));
                    await authService.forgotPassword(email);
                    set((state) => ({
                        passwordReset: {
                            ...state.passwordReset,
                            isRequesting: false,
                        },
                    }));
                } catch (error: any) {
                    set((state) => ({
                        passwordReset: {
                            ...state.passwordReset,
                            isRequesting: false,
                            error: error.response?.data?.message || 'Failed to request password reset',
                        },
                    }));
                    throw error;
                }
            },

            resetPassword: async (data: ResetPasswordData) => {
                try {
                    set((state) => ({
                        passwordReset: {
                            ...state.passwordReset,
                            isResetting: true,
                            error: null,
                        },
                    }));
                    await authService.resetPassword(data);
                    set((state) => ({
                        passwordReset: {
                            ...state.passwordReset,
                            isResetting: false,
                        },
                    }));
                } catch (error: any) {
                    set((state) => ({
                        passwordReset: {
                            ...state.passwordReset,
                            isResetting: false,
                            error: error.response?.data?.message || 'Failed to reset password',
                        },
                    }));
                    throw error;
                }
            },

            changePassword: async (currentPassword: string, newPassword: string) => {
                try {
                    set({ isLoading: true, error: null });
                    await authService.changePassword(currentPassword, newPassword);
                    set({ isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to change password',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            updateProfile: async (data: FormData) => {
                try {
                    set((state) => ({
                        profileUpdate: {
                            ...state.profileUpdate,
                            isUpdating: true,
                            error: null,
                        },
                    }));
                    const updatedUser = await authService.updateProfile(data);
                    set((state) => ({
                        user: updatedUser,
                        profileUpdate: {
                            ...state.profileUpdate,
                            isUpdating: false,
                        },
                    }));
                } catch (error: any) {
                    set((state) => ({
                        profileUpdate: {
                            ...state.profileUpdate,
                            isUpdating: false,
                            error: error.response?.data?.message || 'Failed to update profile',
                        },
                    }));
                    throw error;
                }
            },

            refreshUserData: async () => {
                try {
                    set({ isLoading: true, error: null });
                    const userData = await authService.getLoggedUserData();
                    set({ user: userData, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to refresh user data',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            clearError: () => set({ error: null }),
            clearVerificationError: () =>
                set((state) => ({
                    verificationStatus: {
                        ...state.verificationStatus,
                        error: null,
                    },
                })),
            clearPasswordResetError: () =>
                set((state) => ({
                    passwordReset: {
                        ...state.passwordReset,
                        error: null,
                    },
                })),
            clearProfileUpdateError: () =>
                set((state) => ({
                    profileUpdate: {
                        ...state.profileUpdate,
                        error: null,
                    },
                })),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
); 