import api from '../api';

export interface Category {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    images: string[];
    isPinned: boolean;
    markets: string[];
}

export interface CategoryQueryParams {
    page?: number;
    size?: number;
    q?: string;
    isPinned?: boolean;
}

const categoryService = {
    createCategory: async (data: FormData) => {
        const response = await api.post('/category', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getCategories: async (params?: CategoryQueryParams) => {
        const response = await api.get('/category', { params });
        return response.data;
    },

    getCategory: async (id: string) => {
        const response = await api.get(`/category/${id}`);
        return response.data;
    },

    updateCategory: async (id: string, data: FormData) => {
        const response = await api.patch(`/category/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteCategory: async (id: string) => {
        const response = await api.delete(`/category/${id}`);
        return response.data;
    },

    toggleCategoryPin: async (id: string) => {
        const response = await api.patch(`/category/${id}/toggle-pin`);
        return response.data;
    },

    getMarketsByCategory: async (id: string, params?: { page?: number; size?: number }) => {
        const response = await api.get(`/category/${id}/markets`, { params });
        return response.data;
    },
};

export default categoryService; 