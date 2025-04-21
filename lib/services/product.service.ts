import api from '../api';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    marketId: string;
    category: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductItem {
    productId: string;
    quantity: number;
}

const productService = {
    getAllProducts: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    getProduct: async (productId: string) => {
        const response = await api.get(`/products/${productId}`);
        return response.data;
    },

    getMarketProducts: async (marketId: string) => {
        const response = await api.get(`/products/market/${marketId}`);
        return response.data;
    },

    createProduct: async (productData: Partial<Product>, files: File[]) => {
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        files.forEach((file) => {
            formData.append('files', file);
        });

        const response = await api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateProduct: async (productId: string, productData: Partial<Product>, files?: File[]) => {
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        if (files) {
            files.forEach((file) => {
                formData.append('files', file);
            });
        }

        const response = await api.put(`/products/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteProduct: async (productId: string) => {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    },

    toggleProductAvailability: async (productId: string) => {
        const response = await api.patch(`/products/${productId}/toggle`);
        return response.data;
    },

    bulkCreateProducts: async (products: Partial<Product>[]) => {
        const response = await api.post('/products/bulk', { products });
        return response.data;
    }
};

export default productService; 