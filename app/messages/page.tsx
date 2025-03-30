"use client"

import { useState } from "react"
import { Search, Image, Mic, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"

interface ChatMessage {
    id: string
    content: string
    sender: "user" | "agent"
    timestamp: string
    isVoice?: boolean
    voiceDuration?: string
}

interface Chat {
    id: string
    name: string
    market: string
    lastMessage: string
    timestamp: string
    unread: number
    avatar: string
    messages: ChatMessage[]
}

export default function MessagesPage() {
    const [activeChat, setActiveChat] = useState<string | null>(null)
    const [newMessage, setNewMessage] = useState("")

    const chats: Chat[] = [
        {
            id: "1",
            name: "Sarah Johnson",
            market: "Alaba Market",
            lastMessage: "Hello! How can I help you today?",
            timestamp: "12:04PM",
            unread: 1,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: [
                {
                    id: "1",
                    content: "Hello! I'm Sarah, your personal shopping assistant. How can I help you today?",
                    sender: "agent",
                    timestamp: "12:02 PM",
                },
                {
                    id: "2",
                    content: "Hi Sarah, I'm looking for a mixing the fanta with sprite.",
                    sender: "user",
                    timestamp: "12:05 AM",
                },
                { id: "3", content: "Noted ma, I will do just that.", sender: "agent", timestamp: "12:10 AM" },
                { id: "4", content: "Is there any other thing you need ma?", sender: "agent", timestamp: "12:30 AM" },
                { id: "5", content: "That will be all. Thanks", sender: "user", timestamp: "12:50 AM" },
                { id: "6", content: "", sender: "user", timestamp: "01:00 AM", isVoice: true, voiceDuration: "0:14" },
            ],
        },
        {
            id: "2",
            name: "Sarah Johnson",
            market: "Ajah Market",
            lastMessage: "I'll check if they have that in stock.",
            timestamp: "11:23AM",
            unread: 1,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: [],
        },
        {
            id: "3",
            name: "Sarah Johnson",
            market: "Balogun Market",
            lastMessage: "Your order has been confirmed.",
            timestamp: "9:46AM",
            unread: 1,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: [],
        },
        {
            id: "4",
            name: "Sarah Johnson",
            market: "Iyana-Ipaja Market",
            lastMessage: "I'll be there in 20 minutes.",
            timestamp: "9:16AM",
            unread: 1,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: [],
        },
        {
            id: "5",
            name: "Sarah Johnson",
            market: "Mushin Market",
            lastMessage: "Do you need anything else?",
            timestamp: "Yesterday",
            unread: 4,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: [],
        },
        {
            id: "6",
            name: "Sarah Johnson",
            market: "New Road Market (Lekki Axis)",
            lastMessage: "Your order is on the way.",
            timestamp: "Yesterday",
            unread: 0,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: [],
        },
        {
            id: "7",
            name: "Sarah Johnson",
            market: "Oyinbo Market",
            lastMessage: "I found the items you requested.",
            timestamp: "24/2/25",
            unread: 0,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: [],
        },
        {
            id: "8",
            name: "Sarah Johnson",
            market: "Shomolu Market",
            lastMessage: "Your delivery is scheduled for tomorrow.",
            timestamp: "22/2/25",
            unread: 0,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: [],
        },
        {
            id: "9",
            name: "Sarah Johnson",
            market: "Trade Fair",
            lastMessage: "I'll send you the receipt shortly.",
            timestamp: "21/1/25",
            unread: 0,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: [],
        },
    ]

    const sendMessage = () => {
        if (newMessage.trim() && activeChat) {
            // In a real app, you would update the messages in the database
            // For this demo, we're just logging the message
            console.log(`Sending message to ${activeChat}: ${newMessage}`)
            setNewMessage("")
        }
    }

    const activeMessages = activeChat ? chats.find((chat) => chat.id === activeChat)?.messages || [] : []

    const activeChatData = activeChat ? chats.find((chat) => chat.id === activeChat) : null

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
                <Sidebar />
                <main className="flex-1 flex flex-col md:flex-row">
                    {/* Chats List */}
                    <div className="w-full md:w-[400px] border-r">
                        <div className="p-4 border-b">
                            <h1 className="text-2xl font-bold mb-4">Messages</h1>
                            <div className="border rounded-md p-4">
                                <h2 className="font-semibold mb-3">Chats</h2>
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input placeholder="Search" className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300" />
                                </div>

                                <div className="space-y-0 divide-y">
                                    {chats.map((chat) => (
                                        <div
                                            key={chat.id}
                                            className={`py-3 cursor-pointer hover:bg-gray-50 ${activeChat === chat.id ? "bg-gray-50" : ""}`}
                                            onClick={() => setActiveChat(chat.id)}
                                        >
                                            <div className="flex items-center">
                                                <Avatar className="h-10 w-10 mr-3">
                                                    <AvatarImage src={chat.avatar} alt={chat.name} />
                                                    <AvatarFallback>
                                                        {chat.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-medium truncate">{chat.name}</h3>
                                                        <span className="text-xs text-gray-500">{chat.timestamp}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 truncate">{chat.market}</p>
                                                </div>
                                                {chat.unread > 0 && (
                                                    <div className="ml-2 bg-[#00A67E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                        {chat.unread}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col">
                        {activeChat ? (
                            <>
                                {/* Chat Header */}
                                <div className="bg-[#00A67E] text-white p-4 flex items-center">
                                    <Avatar className="h-10 w-10 mr-3 border-2 border-white">
                                        <AvatarImage src={activeChatData?.avatar} alt={activeChatData?.name} />
                                        <AvatarFallback>
                                            {activeChatData?.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">{activeChatData?.name}</h3>
                                        <p className="text-sm text-white/80">Shopping Agent</p>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 p-4 overflow-y-auto">
                                    <div className="space-y-4">
                                        {activeMessages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user" ? "bg-[#00A67E] text-white" : "bg-gray-200 text-gray-800"
                                                        }`}
                                                >
                                                    {message.isVoice ? (
                                                        <div className="flex items-center gap-2">
                                                            <button className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                                                <div className="h-0 w-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                                                            </button>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-1">
                                                                    {Array.from({ length: 10 }).map((_, i) => (
                                                                        <div
                                                                            key={i}
                                                                            className="bg-white/60 h-1 rounded-full"
                                                                            style={{
                                                                                width: `${Math.random() * 3 + 1}px`,
                                                                                height: `${Math.random() * 10 + 5}px`,
                                                                            }}
                                                                        ></div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <span className="text-xs text-white/80">{message.voiceDuration}</span>
                                                        </div>
                                                    ) : (
                                                        message.content
                                                    )}
                                                    <div
                                                        className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}
                                                    >
                                                        {message.timestamp}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div className="border-t p-3 flex items-center">
                                    <button className="p-2 text-gray-500">
                                        <Image className="h-5 w-5" />
                                    </button>
                                    <button className="p-2 text-gray-500">
                                        <Mic className="h-5 w-5" />
                                    </button>
                                    <div className="flex-1 mx-2">
                                        <Input
                                            placeholder="Type you message here..."
                                            className="w-full border-gray-300"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        />
                                    </div>
                                    <button
                                        className={`p-2 rounded-full ${newMessage.trim() ? "text-[#00A67E]" : "text-gray-300"}`}
                                        onClick={sendMessage}
                                        disabled={!newMessage.trim()}
                                    >
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-4">
                                <div className="w-16 h-16 mb-4 text-gray-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium mb-2">No Messages Yet!</h3>
                                <p className="text-gray-500 text-center">We'll alert you when something cool happens.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

