import api from '../api';

export interface ShoppingListItem {
    id: string;
    name: string;
    quantity: number;
    unit?: string;
    notes?: string;
    estimatedPrice?: number;
    productId?: string;
    actualPrice?: number;
    status: 'pending' | 'found' | 'not_found';
}

export interface ShoppingList {
    id: string;
    name: string;
    notes?: string;
    marketId?: string;
    customerId: string;
    agentId?: string;
    items: ShoppingListItem[];
    status: 'draft' | 'submitted' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

export interface ShoppingListQueryParams {
    page?: number;
    size?: number;
    status?: string;
    marketId?: string;
}

const shoppingListService = {
    createList: async (data: { name: string; notes?: string; marketId?: string; items?: ShoppingListItem[] }) => {
        const response = await api.post('/shopping-list', data);
        return response.data;
    },

    getLists: async (params?: ShoppingListQueryParams) => {
        const response = await api.get('/shopping-list', { params });
        return response.data;
    },

    getAgentLists: async (params?: ShoppingListQueryParams) => {
        const response = await api.get('/shopping-list/agent', { params });
        return response.data;
    },

    getList: async (id: string) => {
        const response = await api.get(`/shopping-list/${id}`);
        return response.data;
    },

    updateList: async (id: string, data: { name?: string; notes?: string; marketId?: string }) => {
        const response = await api.patch(`/shopping-list/${id}`, data);
        return response.data;
    },

    deleteList: async (id: string) => {
        const response = await api.delete(`/shopping-list/${id}`);
        return response.data;
    },

    addItem: async (listId: string, item: Omit<ShoppingListItem, 'id' | 'shoppingListId'>) => {
        const response = await api.post(`/shopping-list/${listId}/items`, item);
        return response.data;
    },

    updateItem: async (listId: string, itemId: string, item: Partial<ShoppingListItem>) => {
        const response = await api.patch(`/shopping-list/${listId}/items/${itemId}`, item);
        return response.data;
    },

    deleteItem: async (listId: string, itemId: string) => {
        const response = await api.delete(`/shopping-list/${listId}/items/${itemId}`);
        return response.data;
    },

    submitList: async (id: string) => {
        const response = await api.post(`/shopping-list/${id}/submit`);
        return response.data;
    },

    updateStatus: async (id: string, status: string) => {
        const response = await api.patch(`/shopping-list/${id}/status`, { status });
        return response.data;
    },

    assignAgent: async (id: string, agentId: string) => {
        const response = await api.post(`/shopping-list/${id}/assign`, { agentId });
        return response.data;
    },

    acceptList: async (id: string) => {
        const response = await api.post(`/shopping-list/${id}/accept`);
        return response.data;
    },

    updateActualPrices: async (id: string, items: { id: string; actualPrice: number }[]) => {
        const response = await api.patch(`/shopping-list/${id}/prices`, { items });
        return response.data;
    },
};

export default shoppingListService; 