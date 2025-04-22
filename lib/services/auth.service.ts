import api from '../api';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'customer' | 'agent';
    dob?: string;
    gender?: string;
    location?: {
        country?: string;
        city?: string;
        address?: string;
    };
    phone?: {
        countryCode?: string;
        number?: string;
    };
}

export interface ResetPasswordData {
    token: string;
    password: string;
}

const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    googleLogin: async () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    },

    register: async (data: RegisterData) => {
        const response = await api.post(`/auth/${data.role}/signup`, data);
        return response.data;
    },

    verifyEmail: async (token: string) => {
        const response = await api.post('/auth/verifyemail', { token });
        return response.data;
    },

    resendVerificationEmail: async () => {
        const response = await api.get('/auth/resendverifyemail');
        return response.data;
    },

    forgotPassword: async (email: string) => {
        const response = await api.post('/auth/forgotpassword', { email });
        return response.data;
    },

    resetPassword: async (data: ResetPasswordData) => {
        const response = await api.post('/auth/resetpassword', data);
        return response.data;
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        const response = await api.post('/auth/changepassword', {
            currentPassword,
            newPassword,
        });
        return response.data;
    },

    getLoggedUserData: async () => {
        const response = await api.get('/auth/loggeduser');
        return response.data;
    },

    updateProfile: async (data: FormData) => {
        const response = await api.patch('/auth/update-profile', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    logout: async () => {
        const response = await api.get('/auth/logout');
        return response.data;
    },
};

export default authService; 