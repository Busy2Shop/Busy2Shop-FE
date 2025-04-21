import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import productService, { Product } from '@/lib/services/product.service';

interface ProductState {
    products: Product[];
    currentProduct: Product | null;
    marketProducts: Product[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    getProduct: (productId: string) => Promise<void>;
    getMarketProducts: (marketId: string) => Promise<void>;
    createProduct: (productData: Partial<Product>, files: File[]) => Promise<void>;
    updateProduct: (productId: string, productData: Partial<Product>, files?: File[]) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    toggleProductAvailability: (productId: string) => Promise<void>;
    bulkCreateProducts: (products: Partial<Product>[]) => Promise<void>;
    clearError: () => void;
}

export const useProductStore = create<ProductState>()(
    persist(
        (set) => ({
            products: [],
            currentProduct: null,
            marketProducts: [],
            isLoading: false,
            error: null,

            fetchProducts: async () => {
                try {
                    set({ isLoading: true, error: null });
                    const products = await productService.getAllProducts();
                    set({ products, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch products',
                        isLoading: false,
                    });
                }
            },

            getProduct: async (productId: string) => {
                try {
                    set({ isLoading: true, error: null });
                    const product = await productService.getProduct(productId);
                    set({ currentProduct: product, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch product',
                        isLoading: false,
                    });
                }
            },

            getMarketProducts: async (marketId: string) => {
                try {
                    set({ isLoading: true, error: null });
                    const products = await productService.getMarketProducts(marketId);
                    set({ marketProducts: products, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch market products',
                        isLoading: false,
                    });
                }
            },

            createProduct: async (productData: Partial<Product>, files: File[]) => {
                try {
                    set({ isLoading: true, error: null });
                    const newProduct = await productService.createProduct(productData, files);
                    set((state) => ({
                        products: [...state.products, newProduct],
                        currentProduct: newProduct,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to create product',
                        isLoading: false,
                    });
                }
            },

            updateProduct: async (productId: string, productData: Partial<Product>, files?: File[]) => {
                try {
                    set({ isLoading: true, error: null });
                    const updatedProduct = await productService.updateProduct(productId, productData, files);
                    set((state) => ({
                        products: state.products.map((product) =>
                            product.id === productId ? updatedProduct : product
                        ),
                        currentProduct: state.currentProduct?.id === productId ? updatedProduct : state.currentProduct,
                        marketProducts: state.marketProducts.map((product) =>
                            product.id === productId ? updatedProduct : product
                        ),
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to update product',
                        isLoading: false,
                    });
                }
            },

            deleteProduct: async (productId: string) => {
                try {
                    set({ isLoading: true, error: null });
                    await productService.deleteProduct(productId);
                    set((state) => ({
                        products: state.products.filter((product) => product.id !== productId),
                        currentProduct: state.currentProduct?.id === productId ? null : state.currentProduct,
                        marketProducts: state.marketProducts.filter((product) => product.id !== productId),
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to delete product',
                        isLoading: false,
                    });
                }
            },

            toggleProductAvailability: async (productId: string) => {
                try {
                    set({ isLoading: true, error: null });
                    const updatedProduct = await productService.toggleProductAvailability(productId);
                    set((state) => ({
                        products: state.products.map((product) =>
                            product.id === productId ? updatedProduct : product
                        ),
                        currentProduct: state.currentProduct?.id === productId ? updatedProduct : state.currentProduct,
                        marketProducts: state.marketProducts.map((product) =>
                            product.id === productId ? updatedProduct : product
                        ),
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to toggle product availability',
                        isLoading: false,
                    });
                }
            },

            bulkCreateProducts: async (products: Partial<Product>[]) => {
                try {
                    set({ isLoading: true, error: null });
                    const newProducts = await productService.bulkCreateProducts(products);
                    set((state) => ({
                        products: [...state.products, ...newProducts],
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to bulk create products',
                        isLoading: false,
                    });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'product-storage',
        }
    )
); 