import api from '../api';

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
}

export interface Order {
    id: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    deliveryAddress: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
}

const orderService = {
    createOrder: async (data: {
        items: OrderItem[];
        deliveryAddress: string;
        paymentMethod: string;
    }) => {
        const response = await api.post('/orders', data);
        return response.data;
    },

    getOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    getOrder: async (id: string) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    updateOrderStatus: async (id: string, status: Order['status']) => {
        const response = await api.patch(`/orders/${id}/status`, { status });
        return response.data;
    },

    cancelOrder: async (id: string) => {
        const response = await api.post(`/orders/${id}/cancel`);
        return response.data;
    },

    getOrderHistory: async () => {
        const response = await api.get('/orders/history');
        return response.data;
    },

    trackOrder: async (id: string) => {
        const response = await api.get(`/orders/${id}/track`);
        return response.data;
    },
};

export default orderService; 