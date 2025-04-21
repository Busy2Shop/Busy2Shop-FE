// import React, { useEffect, useRef, useState } from 'react';
// import { useChatStore } from '@/store/chatStore';
// import { useAuthStore } from '@/store/authStore';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Loader2, Image as ImageIcon, Send } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';

// interface ChatWindowProps {
//     orderId: string;
//     onClose: () => void;
// }

// export const ChatWindow: React.FC<ChatWindowProps> = ({ orderId, onClose }) => {
//     const {
//         messages,
//         isLoading,
//         error,
//         joinChat,
//         leaveChat,
//         sendMessage,
//         setTyping,
//         typingUsers,
//         activateChat,
//         checkChatStatus,
//         uploadImage,
//         chatActivationData,
//         currentOrderId
//     } = useChatStore();
//     const { user } = useAuthStore();
//     const [message, setMessage] = useState('');
//     const [isTyping, setIsTyping] = useState(false);
//     const [isUploading, setIsUploading] = useState(false);
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//         // Initialize socket if not already initialized
//         if (user?.token) {
//             useChatStore.getState().initializeSocket(user.token);
//         }

//         // Check chat status and join if active
//         checkChatStatus(orderId).then(() => {
//             const isActive = chatActivationData.has(orderId);
//             if (isActive) {
//                 joinChat(orderId);
//             }
//         });

//         return () => {
//             leaveChat(orderId);
//         };
//     }, [orderId, user?.token]);

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     const handleSendMessage = async () => {
//         if (!message.trim()) return;

//         sendMessage(orderId, message);
//         setMessage('');
//         setIsTyping(false);
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     const handleTyping = () => {
//         if (!isTyping) {
//             setIsTyping(true);
//             setTyping(orderId, true);
//         }
//     };

//     const handleStopTyping = () => {
//         setIsTyping(false);
//         setTyping(orderId, false);
//     };

//     const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         try {
//             setIsUploading(true);
//             const imageUrl = await uploadImage(file);
//             sendMessage(orderId, '', imageUrl);
//         } catch (error) {
//             console.error('Failed to upload image:', error);
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     const handleActivateChat = async () => {
//         await activateChat(orderId);
//         joinChat(orderId);
//     };

//     const isChatActive = chatActivationData.has(orderId);

//     return (
//         <div className="flex flex-col h-full bg-background border rounded-lg">
//             <div className="p-4 border-b flex justify-between items-center">
//                 <h3 className="text-lg font-semibold">Order Chat</h3>
//                 <Button variant="ghost" size="sm" onClick={onClose}>
//                     Close
//                 </Button>
//             </div>

//             {!isChatActive ? (
//                 <div className="flex-1 flex flex-col items-center justify-center p-4">
//                     <p className="text-center mb-4">Chat is not active for this order yet.</p>
//                     <Button onClick={handleActivateChat} disabled={isLoading}>
//                         {isLoading ? (
//                             <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Activating...
//                             </>
//                         ) : (
//                             'Activate Chat'
//                         )}
//                     </Button>
//                 </div>
//             ) : (
//                 <>
//                     <ScrollArea className="flex-1 p-4">
//                         {messages
//                             .filter((msg) => msg.orderId === orderId)
//                             .map((msg) => (
//                                 <div
//                                     key={msg.id}
//                                     className={`flex mb-4 ${
//                                         msg.senderId === user?.id ? 'justify-end' : 'justify-start'
//                                     }`}
//                                 >
//                                     <div
//                                         className={`flex items-start max-w-[70%] ${
//                                             msg.senderId === user?.id ? 'flex-row-reverse' : 'flex-row'
//                                         }`}
//                                     >
//                                         <Avatar className="h-8 w-8">
//                                             <AvatarImage src={msg.senderId === user?.id ? user?.displayImage : undefined} />
//                                             <AvatarFallback>
//                                                 {msg.senderId === user?.id
//                                                     ? user?.firstName?.[0] + user?.lastName?.[0]
//                                                     : msg.senderType[0].toUpperCase()}
//                                             </AvatarFallback>
//                                         </Avatar>
//                                         <div
//                                             className={`ml-2 mr-2 p-3 rounded-lg ${
//                                                 msg.senderId === user?.id
//                                                     ? 'bg-primary text-primary-foreground'
//                                                     : 'bg-muted'
//                                             }`}
//                                         >
//                                             {msg.imageUrl && (
//                                                 <img
//                                                     src={msg.imageUrl}
//                                                     alt="Chat image"
//                                                     className="max-w-full h-auto rounded mb-2"
//                                                 />
//                                             )}
//                                             <p className="text-sm">{msg.message}</p>
//                                             <p className="text-xs mt-1 opacity-70">
//                                                 {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         <div ref={messagesEndRef} />
//                     </ScrollArea>

//                     <div className="p-4 border-t">
//                         {typingUsers.size > 0 && (
//                             <div className="text-xs text-muted-foreground mb-2">
//                                 {Array.from(typingUsers.values())
//                                     .map((user) => user.name)
//                                     .join(', ')}{' '}
//                                 is typing...
//                             </div>
//                         )}
//                         <div className="flex items-center gap-2">
//                             <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 onClick={() => fileInputRef.current?.click()}
//                                 disabled={isUploading}
//                             >
//                                 {isUploading ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                 ) : (
//                                     <ImageIcon className="h-4 w-4" />
//                                 )}
//                             </Button>
//                             <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 className="hidden"
//                                 accept="image/*"
//                                 onChange={handleImageUpload}
//                             />
//                             <Input
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 onKeyPress={handleKeyPress}
//                                 onFocus={handleTyping}
//                                 onBlur={handleStopTyping}
//                                 placeholder="Type a message..."
//                                 className="flex-1"
//                             />
//                             <Button
//                                 onClick={handleSendMessage}
//                                 disabled={!message.trim() || isLoading}
//                                 size="icon"
//                             >
//                                 <Send className="h-4 w-4" />
//                             </Button>
//                         </div>
//                     </div>
//                 </>
//             )}

//             {error && (
//                 <div className="p-4 bg-destructive/10 text-destructive text-sm">
//                     {error}
//                 </div>
//             )}
//         </div>
//     );
// }; 