import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import shoppingListService, { ShoppingList, ShoppingListItem, ShoppingListQueryParams } from '@/lib/services/shoppingList.service';

interface ShoppingListState {
    lists: ShoppingList[];
    agentLists: ShoppingList[];
    currentList: ShoppingList | null;
    isLoading: boolean;
    error: string | null;
    fetchLists: (params?: ShoppingListQueryParams) => Promise<void>;
    fetchAgentLists: (params?: ShoppingListQueryParams) => Promise<void>;
    fetchList: (id: string) => Promise<void>;
    createList: (data: { name: string; notes?: string; marketId?: string; items?: ShoppingListItem[] }) => Promise<void>;
    updateList: (id: string, data: { name?: string; notes?: string; marketId?: string }) => Promise<void>;
    deleteList: (id: string) => Promise<void>;
    addItem: (listId: string, item: Omit<ShoppingListItem, 'id' | 'shoppingListId'>) => Promise<void>;
    updateItem: (listId: string, itemId: string, item: Partial<ShoppingListItem>) => Promise<void>;
    deleteItem: (listId: string, itemId: string) => Promise<void>;
    submitList: (id: string) => Promise<void>;
    updateStatus: (id: string, status: string) => Promise<void>;
    assignAgent: (id: string, agentId: string) => Promise<void>;
    acceptList: (id: string) => Promise<void>;
    updateActualPrices: (id: string, items: { id: string; actualPrice: number }[]) => Promise<void>;
    clearError: () => void;
}

export const useShoppingListStore = create<ShoppingListState>()(
    persist(
        (set, get) => ({
            lists: [],
            agentLists: [],
            currentList: null,
            isLoading: false,
            error: null,

            fetchLists: async (params?: ShoppingListQueryParams) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.getLists(params);
                    set({ lists: response.data, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch lists',
                        isLoading: false,
                    });
                }
            },

            fetchAgentLists: async (params?: ShoppingListQueryParams) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.getAgentLists(params);
                    set({ agentLists: response.data, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch agent lists',
                        isLoading: false,
                    });
                }
            },

            fetchList: async (id: string) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.getList(id);
                    set({ currentList: response.data, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch list',
                        isLoading: false,
                    });
                }
            },

            createList: async (data) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.createList(data);
                    set((state) => ({
                        lists: [...state.lists, response.data],
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to create list',
                        isLoading: false,
                    });
                }
            },

            updateList: async (id, data) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.updateList(id, data);
                    set((state) => ({
                        lists: state.lists.map((list) =>
                            list.id === id ? response.data : list
                        ),
                        currentList: state.currentList?.id === id ? response.data : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to update list',
                        isLoading: false,
                    });
                }
            },

            deleteList: async (id) => {
                try {
                    set({ isLoading: true, error: null });
                    await shoppingListService.deleteList(id);
                    set((state) => ({
                        lists: state.lists.filter((list) => list.id !== id),
                        currentList: state.currentList?.id === id ? null : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to delete list',
                        isLoading: false,
                    });
                }
            },

            addItem: async (listId, item) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.addItem(listId, item);
                    set((state) => ({
                        lists: state.lists.map((list) =>
                            list.id === listId ? response.data : list
                        ),
                        currentList: state.currentList?.id === listId ? response.data : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to add item',
                        isLoading: false,
                    });
                }
            },

            updateItem: async (listId, itemId, item) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.updateItem(listId, itemId, item);
                    set((state) => ({
                        lists: state.lists.map((list) =>
                            list.id === listId ? response.data : list
                        ),
                        currentList: state.currentList?.id === listId ? response.data : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to update item',
                        isLoading: false,
                    });
                }
            },

            deleteItem: async (listId, itemId) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.deleteItem(listId, itemId);
                    set((state) => ({
                        lists: state.lists.map((list) =>
                            list.id === listId ? response.data : list
                        ),
                        currentList: state.currentList?.id === listId ? response.data : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to delete item',
                        isLoading: false,
                    });
                }
            },

            submitList: async (id) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.submitList(id);
                    set((state) => ({
                        lists: state.lists.map((list) =>
                            list.id === id ? response.data : list
                        ),
                        currentList: state.currentList?.id === id ? response.data : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to submit list',
                        isLoading: false,
                    });
                }
            },

            updateStatus: async (id, status) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.updateStatus(id, status);
                    set((state) => ({
                        lists: state.lists.map((list) =>
                            list.id === id ? response.data : list
                        ),
                        currentList: state.currentList?.id === id ? response.data : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to update status',
                        isLoading: false,
                    });
                }
            },

            assignAgent: async (id, agentId) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.assignAgent(id, agentId);
                    set((state) => ({
                        lists: state.lists.map((list) =>
                            list.id === id ? response.data : list
                        ),
                        currentList: state.currentList?.id === id ? response.data : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to assign agent',
                        isLoading: false,
                    });
                }
            },

            acceptList: async (id) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.acceptList(id);
                    set((state) => ({
                        lists: state.lists.map((list) =>
                            list.id === id ? response.data : list
                        ),
                        currentList: state.currentList?.id === id ? response.data : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to accept list',
                        isLoading: false,
                    });
                }
            },

            updateActualPrices: async (id, items) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await shoppingListService.updateActualPrices(id, items);
                    set((state) => ({
                        lists: state.lists.map((list) =>
                            list.id === id ? response.data : list
                        ),
                        currentList: state.currentList?.id === id ? response.data : state.currentList,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to update prices',
                        isLoading: false,
                    });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'shopping-list-storage',
        }
    )
); 