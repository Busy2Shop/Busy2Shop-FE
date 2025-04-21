import api from '../api';
import { io, Socket } from 'socket.io-client';

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    type: 'text' | 'image' | 'file';
    fileUrl?: string;
    createdAt: string;
    read: boolean;
}

export interface Chat {
    id: string;
    orderId: string;
    customerId: string;
    agentId: string;
    messages: Message[];
    lastMessage?: Message;
    createdAt: string;
    updatedAt: string;
}

export interface ChatMessage {
    id: string;
    orderId: string;
    senderId: string;
    senderType: 'agent' | 'customer' | 'admin';
    message: string;
    imageUrl?: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ChatStatus {
    isActive: boolean;
}

export interface ChatActivationData {
    orderId: string;
    activatedBy: {
        id: string;
        type: 'agent' | 'customer' | 'admin';
        name: string;
    };
}

export interface ChatError {
    code: string;
    message: string;
    details?: any;
}

interface SocketEventTypes {
    'connection': { status: 'connected' | 'disconnected' | 'connecting' | 'error'; reason?: string };
    'previous-messages': ChatMessage[];
    'new-message': ChatMessage;
    'user-typing': { orderId: string; isTyping: boolean; user: { id: string; name: string } };
    'user-joined': { id: string; name: string };
    'user-left': { id: string; name: string };
    'chat-activated': ChatActivationData;
    'error': ChatError;
}

class ChatService {
    private socket: Socket | null = null;
    private static instance: ChatService;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectTimeout = 1000; // 1 second
    private eventListeners: Map<string, Set<Function>> = new Map();

    private constructor() { }

    static getInstance(): ChatService {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService();
        }
        return ChatService.instance;
    }

    private setupSocketListeners() {
        if (!this.socket) return;

        // Connection events
        this.socket.on('connect', () => {
            this.reconnectAttempts = 0;
            this.emit('connection', { status: 'connected' });
        });

        this.socket.on('disconnect', (reason: string) => {
            this.emit('connection', { status: 'disconnected', reason });
            this.handleReconnect();
        });

        this.socket.on('connect_error', (error: Error) => {
            this.emit('error', { code: 'CONNECTION_ERROR', message: error.message });
        });

        // Chat events
        this.socket.on('previous-messages', (messages: ChatMessage[]) => {
            this.emit('previous-messages', messages);
        });

        this.socket.on('new-message', (message: ChatMessage) => {
            this.emit('new-message', message);
        });

        this.socket.on('user-typing', (data: { orderId: string; isTyping: boolean; user: { id: string; name: string } }) => {
            this.emit('user-typing', data);
        });

        this.socket.on('user-joined', (user: { id: string; name: string }) => {
            this.emit('user-joined', user);
        });

        this.socket.on('user-left', (user: { id: string; name: string }) => {
            this.emit('user-left', user);
        });

        this.socket.on('chat-activated', (data: ChatActivationData) => {
            this.emit('chat-activated', data);
        });

        this.socket.on('error', (error: Error) => {
            this.emit('error', { code: 'CHAT_ERROR', message: error.message });
        });
    }

    private handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
                if (this.socket) {
                    this.socket.connect();
                }
            }, this.reconnectTimeout * this.reconnectAttempts);
        } else {
            this.emit('error', {
                code: 'MAX_RECONNECT_ATTEMPTS',
                message: 'Maximum reconnection attempts reached'
            });
        }
    }

    initializeSocket(token: string, isAdmin: boolean = false) {
        if (this.socket) {
            this.socket.disconnect();
        }

        this.socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090', {
            auth: {
                token: `Bearer ${token}`,
                'x-iadmin-access': isAdmin ? 'true' : 'false'
            },
            transports: ['websocket'],
            reconnection: false, // We'll handle reconnection manually
            timeout: 10000,
            autoConnect: true
        });

        this.setupSocketListeners();
        return this.socket;
    }

    // Event emitter/listener pattern
    on(event: string, callback: Function) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event)?.add(callback);
    }

    off(event: string, callback: Function) {
        this.eventListeners.get(event)?.delete(callback);
    }

    private emit(event: string, data: any) {
        this.eventListeners.get(event)?.forEach(callback => callback(data));
    }

    // REST API endpoints with enhanced error handling
    async getOrderMessages(orderId: string): Promise<{ data: ChatMessage[]; error?: ChatError }> {
        try {
            const response = await api.get(`/chat/orders/${orderId}/messages`);
            return { data: response.data };
        } catch (error: any) {
            return {
                data: [],
                error: {
                    code: 'FETCH_MESSAGES_ERROR',
                    message: error.response?.data?.message || 'Failed to fetch messages',
                    details: error.response?.data
                }
            };
        }
    }

    async activateChat(orderId: string): Promise<{ data: ChatActivationData; error?: ChatError }> {
        try {
            const response = await api.post(`/chat/orders/${orderId}/activate`);
            return { data: response.data };
        } catch (error: any) {
            return {
                data: null as any,
                error: {
                    code: 'ACTIVATE_CHAT_ERROR',
                    message: error.response?.data?.message || 'Failed to activate chat',
                    details: error.response?.data
                }
            };
        }
    }

    async isChatActive(orderId: string): Promise<{ data: { isActive: boolean; data?: ChatActivationData }; error?: ChatError }> {
        try {
            const response = await api.get(`/chat/orders/${orderId}/active`);
            return { data: response.data };
        } catch (error: any) {
            return {
                data: { isActive: false },
                error: {
                    code: 'CHECK_CHAT_STATUS_ERROR',
                    message: error.response?.data?.message || 'Failed to check chat status',
                    details: error.response?.data
                }
            };
        }
    }

    async uploadChatImage(file: File): Promise<{ data: { url: string }; error?: ChatError }> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/chat/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return { data: response.data };
        } catch (error: any) {
            return {
                data: { url: '' },
                error: {
                    code: 'UPLOAD_IMAGE_ERROR',
                    message: error.response?.data?.message || 'Failed to upload image',
                    details: error.response?.data
                }
            };
        }
    }

    // Socket.IO event handlers with error handling
    joinOrderChat(orderId: string) {
        try {
            this.socket?.emit('join-order-chat', orderId);
        } catch (error) {
            this.emit('error', {
                code: 'JOIN_CHAT_ERROR',
                message: 'Failed to join chat room'
            });
        }
    }

    leaveOrderChat(orderId: string) {
        try {
            this.socket?.emit('leave-order-chat', orderId);
        } catch (error) {
            this.emit('error', {
                code: 'LEAVE_CHAT_ERROR',
                message: 'Failed to leave chat room'
            });
        }
    }

    sendMessage(orderId: string, message: string, imageUrl?: string) {
        try {
            this.socket?.emit('send-message', { orderId, message, imageUrl });
        } catch (error) {
            this.emit('error', {
                code: 'SEND_MESSAGE_ERROR',
                message: 'Failed to send message'
            });
        }
    }

    setTyping(orderId: string, isTyping: boolean) {
        try {
            this.socket?.emit('typing', { orderId, isTyping });
        } catch (error) {
            this.emit('error', {
                code: 'TYPING_INDICATOR_ERROR',
                message: 'Failed to update typing status'
            });
        }
    }

    markMessagesAsRead(orderId: string) {
        try {
            this.socket?.emit('mark-messages-read', orderId);
        } catch (error) {
            this.emit('error', {
                code: 'MARK_READ_ERROR',
                message: 'Failed to mark messages as read'
            });
        }
    }

    // Cleanup
    removeAllListeners() {
        this.eventListeners.clear();
        this.socket?.removeAllListeners();
    }

    disconnect() {
        this.removeAllListeners();
        this.socket?.disconnect();
        this.socket = null;
    }
}

export default ChatService.getInstance(); 