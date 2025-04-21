import api from '../api';

export interface Review {
    id: string;
    userId: string;
    productId?: string;
    marketId?: string;
    rating: number;
    comment: string;
    images?: string[];
    createdAt: string;
    updatedAt: string;
}

const reviewService = {
    getAllReviews: async () => {
        const response = await api.get('/reviews');
        return response.data;
    },

    getMarketReviews: async (marketId: string) => {
        const response = await api.get(`/reviews/market/${marketId}`);
        return response.data;
    },

    getProductReviews: async (productId: string) => {
        const response = await api.get(`/reviews/product/${productId}`);
        return response.data;
    },

    getReview: async (reviewId: string) => {
        const response = await api.get(`/reviews/${reviewId}`);
        return response.data;
    },

    createReview: async (reviewData: Partial<Review>, files?: File[]) => {
        const formData = new FormData();
        Object.entries(reviewData).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        if (files) {
            files.forEach((file) => {
                formData.append('files', file);
            });
        }

        const response = await api.post('/reviews', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getUserReviews: async () => {
        const response = await api.get('/reviews/user');
        return response.data;
    },

    getReviewableItems: async () => {
        const response = await api.get('/reviews/reviewable/items');
        return response.data;
    },

    updateReview: async (reviewId: string, reviewData: Partial<Review>, files?: File[]) => {
        const formData = new FormData();
        Object.entries(reviewData).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        if (files) {
            files.forEach((file) => {
                formData.append('files', file);
            });
        }

        const response = await api.put(`/reviews/${reviewId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteReview: async (reviewId: string) => {
        const response = await api.delete(`/reviews/${reviewId}`);
        return response.data;
    }
};

export default reviewService; 