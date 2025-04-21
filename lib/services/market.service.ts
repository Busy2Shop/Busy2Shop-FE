import api from '../api';

export interface Market {
    id: string;
    name: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
    phoneNumber: string;
    marketType: string;
    description?: string;
    images: string[];
    operatingHours: {
        [key: string]: {
            open: string;
            close: string;
        };
    };
    ownerId: string;
    isPinned: boolean;
    categories: string[];
}

export interface MarketQueryParams {
    page?: number;
    size?: number;
    q?: string;
    categoryId?: string;
    marketType?: string;
    isPinned?: boolean;
    lat?: number;
    lng?: number;
    distance?: number;
}

const marketService = {
    createMarket: async (data: FormData) => {
        const response = await api.post('/market', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getMarkets: async (params?: MarketQueryParams) => {
        const response = await api.get('/market', { params });
        return response.data;
    },

    getMarket: async (id: string) => {
        const response = await api.get(`/market/${id}`);
        return response.data;
    },

    updateMarket: async (id: string, data: FormData) => {
        const response = await api.patch(`/market/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteMarket: async (id: string) => {
        const response = await api.delete(`/market/${id}`);
        return response.data;
    },

    toggleMarketPin: async (id: string) => {
        const response = await api.patch(`/market/${id}/toggle-pin`);
        return response.data;
    },

    addToCategory: async (marketId: string, categoryId: string) => {
        const response = await api.post('/market/add-to-category', { marketId, categoryId });
        return response.data;
    },

    removeFromCategory: async (marketId: string, categoryId: string) => {
        const response = await api.delete(`/market/${marketId}/category/${categoryId}`);
        return response.data;
    },
};

export default marketService; 