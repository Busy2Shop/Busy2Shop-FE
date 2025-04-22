import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import orderService, { Order, OrderItem } from '@/lib/services/order.service';

interface OrderState {
    orders: Order[];
    currentOrder: Order | null;
    orderHistory: Order[];
    isLoading: boolean;
    error: string | null;
    fetchOrders: () => Promise<void>;
    fetchOrder: (id: string) => Promise<void>;
    createOrder: (data: {
        items: OrderItem[];
        deliveryAddress: string;
        paymentMethod: string;
    }) => Promise<void>;
    updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
    cancelOrder: (id: string) => Promise<void>;
    fetchOrderHistory: () => Promise<void>;
    trackOrder: (id: string) => Promise<any>;
    clearError: () => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [],
            currentOrder: null,
            orderHistory: [],
            isLoading: false,
            error: null,

            fetchOrders: async () => {
                try {
                    set({ isLoading: true, error: null });
                    const orders = await orderService.getOrders();
                    set({ orders, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch orders',
                        isLoading: false,
                    });
                }
            },

            fetchOrder: async (id: string) => {
                try {
                    set({ isLoading: true, error: null });
                    const order = await orderService.getOrder(id);
                    set({ currentOrder: order, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch order',
                        isLoading: false,
                    });
                }
            },

            createOrder: async (data: {
                items: OrderItem[];
                deliveryAddress: string;
                paymentMethod: string;
            }) => {
                try {
                    set({ isLoading: true, error: null });
                    const newOrder = await orderService.createOrder(data);
                    set((state) => ({
                        orders: [...state.orders, newOrder],
                        currentOrder: newOrder,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to create order',
                        isLoading: false,
                    });
                }
            },

            updateOrderStatus: async (id: string, status: Order['status']) => {
                try {
                    set({ isLoading: true, error: null });
                    const updatedOrder = await orderService.updateOrderStatus(id, status);
                    set((state) => ({
                        orders: state.orders.map((order) =>
                            order.id === id ? updatedOrder : order
                        ),
                        currentOrder: state.currentOrder?.id === id ? updatedOrder : state.currentOrder,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to update order status',
                        isLoading: false,
                    });
                }
            },

            cancelOrder: async (id: string) => {
                try {
                    set({ isLoading: true, error: null });
                    await orderService.cancelOrder(id);
                    set((state) => ({
                        orders: state.orders.map((order) =>
                            order.id === id ? { ...order, status: 'cancelled' } : order
                        ),
                        currentOrder:
                            state.currentOrder?.id === id
                                ? { ...state.currentOrder, status: 'cancelled' }
                                : state.currentOrder,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to cancel order',
                        isLoading: false,
                    });
                }
            },

            fetchOrderHistory: async () => {
                try {
                    set({ isLoading: true, error: null });
                    const history = await orderService.getOrderHistory();
                    set({ orderHistory: history, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch order history',
                        isLoading: false,
                    });
                }
            },

            trackOrder: async (id: string) => {
                try {
                    set({ isLoading: true, error: null });
                    const trackingInfo = await orderService.trackOrder(id);
                    set({ isLoading: false });
                    return trackingInfo;
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to track order',
                        isLoading: false,
                    });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'order-storage',
        }
    )
); 