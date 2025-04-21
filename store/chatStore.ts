import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import chatService, { ChatMessage, ChatActivationData, ChatError } from '@/lib/services/chat.service';

interface ChatState {
    messages: Map<string, ChatMessage[]>; // orderId -> messages
    activeChats: Set<string>;
    typingUsers: Map<string, { id: string; name: string }>;
    chatActivationData: Map<string, ChatActivationData>;
    isLoading: boolean;
    errors: Map<string, ChatError>;
    currentOrderId: string | null;
    connectionStatus: 'connected' | 'disconnected' | 'connecting' | 'error';
    socket: any | null;

    // Actions
    initializeSocket: (token: string, isAdmin?: boolean) => void;
    joinChat: (orderId: string) => void;
    leaveChat: (orderId: string) => void;
    sendMessage: (orderId: string, message: string, imageUrl?: string) => void;
    setTyping: (orderId: string, isTyping: boolean) => void;
    markMessagesAsRead: (orderId: string) => void;
    activateChat: (orderId: string) => Promise<void>;
    checkChatStatus: (orderId: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string>;
    clearError: (orderId?: string) => void;
    setCurrentOrderId: (orderId: string | null) => void;
    getMessages: (orderId: string) => ChatMessage[];
    getError: (orderId?: string) => ChatError | null;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            messages: new Map(),
            activeChats: new Set(),
            typingUsers: new Map(),
            chatActivationData: new Map(),
            isLoading: false,
            errors: new Map(),
            currentOrderId: null,
            connectionStatus: 'disconnected',
            socket: null,

            initializeSocket: (token: string, isAdmin: boolean = false) => {
                const socket = chatService.initializeSocket(token, isAdmin);
                set({ socket, connectionStatus: 'connecting' });

                // Set up event listeners
                chatService.on('connection', ({ status, reason }: { status: 'connected' | 'disconnected' | 'connecting' | 'error'; reason?: string }) => {
                    set({ connectionStatus: status });
                    if (status === 'disconnected') {
                        set((state) => {
                            const newErrors = new Map(state.errors);
                            newErrors.set('connection', {
                                code: 'CONNECTION_ERROR',
                                message: `Disconnected: ${reason || 'Unknown reason'}`
                            });
                            return { errors: newErrors };
                        });
                    }
                });

                chatService.on('previous-messages', (messages: ChatMessage[]) => {
                    set((state) => {
                        const newMessages = new Map(state.messages);
                        const orderId = messages[0]?.orderId;
                        if (orderId) {
                            newMessages.set(orderId, messages);
                        }
                        return { messages: newMessages };
                    });
                });

                chatService.on('new-message', (message: ChatMessage) => {
                    set((state) => {
                        const newMessages = new Map(state.messages);
                        const orderMessages = newMessages.get(message.orderId) || [];
                        newMessages.set(message.orderId, [...orderMessages, message]);
                        return { messages: newMessages };
                    });
                });

                chatService.on('user-typing', (data: { orderId: string; isTyping: boolean; user: { id: string; name: string } }) => {
                    set((state) => {
                        const newTypingUsers = new Map(state.typingUsers);
                        if (data.isTyping) {
                            newTypingUsers.set(data.user.id, data.user);
                        } else {
                            newTypingUsers.delete(data.user.id);
                        }
                        return { typingUsers: newTypingUsers };
                    });
                });

                chatService.on('user-joined', (user: { id: string; name: string }) => {
                    set((state) => {
                        const newActiveChats = new Set(state.activeChats);
                        newActiveChats.add(user.id);
                        return { activeChats: newActiveChats };
                    });
                });

                chatService.on('user-left', (user: { id: string; name: string }) => {
                    set((state) => {
                        const newActiveChats = new Set(state.activeChats);
                        newActiveChats.delete(user.id);
                        return { activeChats: newActiveChats };
                    });
                });

                chatService.on('chat-activated', (data: ChatActivationData) => {
                    set((state) => {
                        const newChatActivationData = new Map(state.chatActivationData);
                        newChatActivationData.set(data.orderId, data);
                        return { chatActivationData: newChatActivationData };
                    });
                });

                chatService.on('error', (error: ChatError) => {
                    set((state) => {
                        const newErrors = new Map(state.errors);
                        newErrors.set(error.code, error);
                        return { errors: newErrors };
                    });
                });
            },

            joinChat: (orderId: string) => {
                chatService.joinOrderChat(orderId);
                set({ currentOrderId: orderId });
            },

            leaveChat: (orderId: string) => {
                chatService.leaveOrderChat(orderId);
                if (get().currentOrderId === orderId) {
                    set({ currentOrderId: null });
                }
            },

            sendMessage: (orderId: string, message: string, imageUrl?: string) => {
                chatService.sendMessage(orderId, message, imageUrl);
            },

            setTyping: (orderId: string, isTyping: boolean) => {
                chatService.setTyping(orderId, isTyping);
            },

            markMessagesAsRead: (orderId: string) => {
                chatService.markMessagesAsRead(orderId);
                set((state) => {
                    const newMessages = new Map(state.messages);
                    const orderMessages = newMessages.get(orderId) || [];
                    newMessages.set(
                        orderId,
                        orderMessages.map((msg: ChatMessage) => ({ ...msg, isRead: true }))
                    );
                    return { messages: newMessages };
                });
            },

            activateChat: async (orderId: string) => {
                try {
                    set({ isLoading: true });
                    const { data, error } = await chatService.activateChat(orderId);
                    if (error) {
                        set((state) => {
                            const newErrors = new Map(state.errors);
                            newErrors.set(orderId, error);
                            return { errors: newErrors, isLoading: false };
                        });
                    } else {
                        set((state) => {
                            const newChatActivationData = new Map(state.chatActivationData);
                            newChatActivationData.set(orderId, data);
                            return {
                                chatActivationData: newChatActivationData,
                                isLoading: false
                            };
                        });
                    }
                } catch (error: any) {
                    set((state) => {
                        const newErrors = new Map(state.errors);
                        newErrors.set(orderId, {
                            code: 'ACTIVATE_CHAT_ERROR',
                            message: error.message || 'Failed to activate chat'
                        });
                        return { errors: newErrors, isLoading: false };
                    });
                }
            },

            checkChatStatus: async (orderId: string) => {
                try {
                    set({ isLoading: true });
                    const { data, error } = await chatService.isChatActive(orderId);
                    if (error) {
                        set((state) => {
                            const newErrors = new Map(state.errors);
                            newErrors.set(orderId, error);
                            return { errors: newErrors, isLoading: false };
                        });
                    } else if (data.isActive && data.data) {
                        set((state) => {
                            const newChatActivationData = new Map(state.chatActivationData);
                            newChatActivationData.set(orderId, data.data as ChatActivationData);
                            return {
                                chatActivationData: newChatActivationData,
                                isLoading: false
                            };
                        });
                    }
                } catch (error: any) {
                    set((state) => {
                        const newErrors = new Map(state.errors);
                        newErrors.set(orderId, {
                            code: 'CHECK_CHAT_STATUS_ERROR',
                            message: error.message || 'Failed to check chat status'
                        });
                        return { errors: newErrors, isLoading: false };
                    });
                }
            },

            uploadImage: async (file: File) => {
                try {
                    set({ isLoading: true });
                    const { data, error } = await chatService.uploadChatImage(file);
                    if (error) {
                        set((state) => {
                            const newErrors = new Map(state.errors);
                            newErrors.set('upload', error);
                            return { errors: newErrors, isLoading: false };
                        });
                        throw error;
                    }
                    set({ isLoading: false });
                    return data.url;
                } catch (error: any) {
                    set((state) => {
                        const newErrors = new Map(state.errors);
                        newErrors.set('upload', {
                            code: 'UPLOAD_IMAGE_ERROR',
                            message: error.message || 'Failed to upload image'
                        });
                        return { errors: newErrors, isLoading: false };
                    });
                    throw error;
                }
            },

            clearError: (orderId?: string) => {
                set((state) => {
                    const newErrors = new Map(state.errors);
                    if (orderId) {
                        newErrors.delete(orderId);
                    } else {
                        newErrors.clear();
                    }
                    return { errors: newErrors };
                });
            },

            setCurrentOrderId: (orderId: string | null) => set({ currentOrderId: orderId }),

            getMessages: (orderId: string) => {
                return get().messages.get(orderId) || [];
            },

            getError: (orderId?: string) => {
                const errors = get().errors;
                if (orderId) {
                    return errors.get(orderId) || null;
                }
                return errors.get('connection') || null;
            }
        }),
        {
            name: 'chat-storage',
            partialize: (state) => ({
                messages: Array.from(state.messages.entries()),
                chatActivationData: Array.from(state.chatActivationData.entries())
            })
        }
    )
); 