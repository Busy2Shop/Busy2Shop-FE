import { create } from 'zustand';
import categoryService, { Category, CategoryQueryParams } from '@/lib/services/category.service';

interface CategoryState {
    categories: Category[];
    currentCategory: Category | null;
    isLoading: boolean;
    error: string | null;
    fetchCategories: (params?: CategoryQueryParams) => Promise<void>;
    fetchCategory: (id: string) => Promise<void>;
    createCategory: (data: FormData) => Promise<void>;
    updateCategory: (id: string, data: FormData) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    toggleCategoryPin: (id: string) => Promise<void>;
    getMarketsByCategory: (id: string, params?: { page?: number; size?: number }) => Promise<void>;
    clearError: () => void;
}

export const useCategoryStore = create<CategoryState>()((set, get) => ({
    categories: [],
    currentCategory: null,
    isLoading: false,
    error: null,

    fetchCategories: async (params?: CategoryQueryParams) => {
        try {
            set({ isLoading: true, error: null });
            const response = await categoryService.getCategories(params);
            set({ categories: response.data, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch categories',
                isLoading: false,
            });
        }
    },

    fetchCategory: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await categoryService.getCategory(id);
            set({ currentCategory: response.data, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch category',
                isLoading: false,
            });
        }
    },

    createCategory: async (data: FormData) => {
        try {
            set({ isLoading: true, error: null });
            const response = await categoryService.createCategory(data);
            set((state) => ({
                categories: [...state.categories, response.data],
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to create category',
                isLoading: false,
            });
        }
    },

    updateCategory: async (id: string, data: FormData) => {
        try {
            set({ isLoading: true, error: null });
            const response = await categoryService.updateCategory(id, data);
            set((state) => ({
                categories: state.categories.map((category) =>
                    category.id === id ? response.data : category
                ),
                currentCategory: state.currentCategory?.id === id ? response.data : state.currentCategory,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to update category',
                isLoading: false,
            });
        }
    },

    deleteCategory: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            await categoryService.deleteCategory(id);
            set((state) => ({
                categories: state.categories.filter((category) => category.id !== id),
                currentCategory: state.currentCategory?.id === id ? null : state.currentCategory,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to delete category',
                isLoading: false,
            });
        }
    },

    toggleCategoryPin: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await categoryService.toggleCategoryPin(id);
            set((state) => ({
                categories: state.categories.map((category) =>
                    category.id === id ? response.data : category
                ),
                currentCategory: state.currentCategory?.id === id ? response.data : state.currentCategory,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to toggle category pin',
                isLoading: false,
            });
        }
    },

    getMarketsByCategory: async (id: string, params?: { page?: number; size?: number }) => {
        try {
            set({ isLoading: true, error: null });
            const response = await categoryService.getMarketsByCategory(id, params);
            set((state) => ({
                currentCategory: state.currentCategory
                    ? { ...state.currentCategory, markets: response.data }
                    : null,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch markets by category',
                isLoading: false,
            });
        }
    },

    clearError: () => set({ error: null }),
})); 