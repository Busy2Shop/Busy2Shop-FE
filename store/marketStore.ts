import { create } from 'zustand';
import marketService, { Market, MarketQueryParams } from '@/lib/services/market.service';

interface MarketState {
    markets: Market[];
    currentMarket: Market | null;
    isLoading: boolean;
    error: string | null;
    fetchMarkets: (params?: MarketQueryParams) => Promise<void>;
    fetchMarket: (id: string) => Promise<void>;
    createMarket: (data: FormData) => Promise<void>;
    updateMarket: (id: string, data: FormData) => Promise<void>;
    deleteMarket: (id: string) => Promise<void>;
    toggleMarketPin: (id: string) => Promise<void>;
    addToCategory: (marketId: string, categoryId: string) => Promise<void>;
    removeFromCategory: (marketId: string, categoryId: string) => Promise<void>;
    clearError: () => void;
}

export const useMarketStore = create<MarketState>()((set, get) => ({
    markets: [],
    currentMarket: null,
    isLoading: false,
    error: null,

    fetchMarkets: async (params?: MarketQueryParams) => {
        try {
            set({ isLoading: true, error: null });
            const response = await marketService.getMarkets(params);
            set({ markets: response.data, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch markets',
                isLoading: false,
            });
        }
    },

    fetchMarket: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await marketService.getMarket(id);
            set({ currentMarket: response.data, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch market',
                isLoading: false,
            });
        }
    },

    createMarket: async (data: FormData) => {
        try {
            set({ isLoading: true, error: null });
            const response = await marketService.createMarket(data);
            set((state) => ({
                markets: [...state.markets, response.data],
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to create market',
                isLoading: false,
            });
        }
    },

    updateMarket: async (id: string, data: FormData) => {
        try {
            set({ isLoading: true, error: null });
            const response = await marketService.updateMarket(id, data);
            set((state) => ({
                markets: state.markets.map((market) =>
                    market.id === id ? response.data : market
                ),
                currentMarket: state.currentMarket?.id === id ? response.data : state.currentMarket,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to update market',
                isLoading: false,
            });
        }
    },

    deleteMarket: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            await marketService.deleteMarket(id);
            set((state) => ({
                markets: state.markets.filter((market) => market.id !== id),
                currentMarket: state.currentMarket?.id === id ? null : state.currentMarket,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to delete market',
                isLoading: false,
            });
        }
    },

    toggleMarketPin: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await marketService.toggleMarketPin(id);
            set((state) => ({
                markets: state.markets.map((market) =>
                    market.id === id ? response.data : market
                ),
                currentMarket: state.currentMarket?.id === id ? response.data : state.currentMarket,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to toggle market pin',
                isLoading: false,
            });
        }
    },

    addToCategory: async (marketId: string, categoryId: string) => {
        try {
            set({ isLoading: true, error: null });
            await marketService.addToCategory(marketId, categoryId);
            set((state) => ({
                markets: state.markets.map((market) =>
                    market.id === marketId
                        ? { ...market, categories: [...market.categories, categoryId] }
                        : market
                ),
                currentMarket:
                    state.currentMarket?.id === marketId
                        ? {
                            ...state.currentMarket,
                            categories: [...state.currentMarket.categories, categoryId],
                        }
                        : state.currentMarket,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to add market to category',
                isLoading: false,
            });
        }
    },

    removeFromCategory: async (marketId: string, categoryId: string) => {
        try {
            set({ isLoading: true, error: null });
            await marketService.removeFromCategory(marketId, categoryId);
            set((state) => ({
                markets: state.markets.map((market) =>
                    market.id === marketId
                        ? {
                            ...market,
                            categories: market.categories.filter((id) => id !== categoryId),
                        }
                        : market
                ),
                currentMarket:
                    state.currentMarket?.id === marketId
                        ? {
                            ...state.currentMarket,
                            categories: state.currentMarket.categories.filter(
                                (id) => id !== categoryId
                            ),
                        }
                        : state.currentMarket,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to remove market from category',
                isLoading: false,
            });
        }
    },

    clearError: () => set({ error: null }),
})); 