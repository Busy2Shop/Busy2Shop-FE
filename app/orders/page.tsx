"use client"

import { useState } from "react"
import { ChevronLeft, Package, HelpCircle, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { useRouter } from "next/navigation"

interface Order {
    id: string
    orderNumber: string
    date: string
    status: "processing" | "shopping" | "delivering" | "delivered" | "cancelled"
    items: string
    price: number
    canTrack: boolean
}

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("ongoing")
    const [trackingOrder, setTrackingOrder] = useState<string | null>(null)
    const router = useRouter()

    const orders: Order[] = [
        {
            id: "1",
            orderNumber: "ORD-12345",
            date: "March 16, 2025",
            status: "processing",
            items: "Jollof rice",
            price: 9500,
            canTrack: false,
        },
        {
            id: "2",
            orderNumber: "ORD-12345",
            date: "March 16, 2025",
            status: "shopping",
            items: "Fresh Fruit Selection",
            price: 2500,
            canTrack: true,
        },
        {
            id: "3",
            orderNumber: "ORD-12345",
            date: "March 16, 2025",
            status: "shopping",
            items: "Fresh Fruit Selection",
            price: 2500,
            canTrack: true,
        },
        {
            id: "4",
            orderNumber: "ORD-12345",
            date: "March 16, 2025",
            status: "shopping",
            items: "Fresh Fruit Selection",
            price: 2500,
            canTrack: true,
        },
        {
            id: "5",
            orderNumber: "ORD-12346",
            date: "March 15, 2025",
            status: "delivered",
            items: "Egusi Soup Ingredients",
            price: 7800,
            canTrack: false,
        },
        {
            id: "6",
            orderNumber: "ORD-12347",
            date: "March 14, 2025",
            status: "cancelled",
            items: "Snacks and Drinks",
            price: 5200,
            canTrack: false,
        },
    ]

    const ongoingOrders = orders.filter((order) => ["processing", "shopping", "delivering"].includes(order.status))

    const deliveredOrders = orders.filter((order) => order.status === "delivered")

    const cancelledOrders = orders.filter((order) => order.status === "cancelled")

    const getStatusBadge = (status: Order["status"]) => {
        switch (status) {
            case "processing":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Processing
                    </span>
                )
            case "shopping":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Shopping in progress
                    </span>
                )
            case "delivering":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Delivery in progress
                    </span>
                )
            case "delivered":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Delivered
                    </span>
                )
            case "cancelled":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Cancelled
                    </span>
                )
        }
    }

    if (trackingOrder) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
                    <Sidebar />
                    <main className="ml-8 flex-1 mx-w-md">
                        <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center mb-6">
                                        <Button variant="ghost" size="icon" className="mr-2" onClick={() => setTrackingOrder(null)}>
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                        <h1 className="text-2xl font-bold">Your Order</h1>
                                        <Button variant="ghost" size="icon" className="ml-auto">
                                            <HelpCircle className="h-5 w-5 text-gray-400" />
                                        </Button>
                                    </div>

                                    {/* Map */}
                                    <div className="rounded-lg overflow-hidden border h-[500px] relative">
                                        <Image src="/images/Map.png" alt="Map" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-white/10"></div>

                                        {/* Map elements would go here in a real implementation */}
                                        <div className="absolute bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M12 22v-5"></path>
                                                <path d="M9 8l3-6 3 6"></path>
                                                <path d="M18 12l-6 3-6-3"></path>
                                                <path d="M12 17l-6-3 6-3 6 3-6 3z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Status */}
                                <div className="lg:w-[350px] border rounded-md p-4">
                                    <h2 className="text-xl font-bold mb-6">Order Status</h2>

                                    <div className="relative mb-6">
                                        {/* Vertical line */}
                                        <div className="absolute left-[15px] top-[24px] bottom-0 w-[2px] bg-gray-200"></div>

                                        {/* Status steps */}
                                        <div className="space-y-8">
                                            <div className="flex">
                                                <div className="relative">
                                                    <div className="h-8 w-8 rounded-full bg-[#00A67E] flex items-center justify-center z-10 relative">
                                                        <div className="h-2 w-2 rounded-full bg-white"></div>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-medium">Packing</h3>
                                                    <p className="text-sm text-gray-500">Ajah Market K12 Surulere, Bypass Lagos</p>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <div className="relative">
                                                    <div className="h-8 w-8 rounded-full bg-[#00A67E] flex items-center justify-center z-10 relative">
                                                        <div className="h-2 w-2 rounded-full bg-white"></div>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-medium">Picked</h3>
                                                    <p className="text-sm text-gray-500">111 Obafemi Awolowo Way</p>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <div className="relative">
                                                    <div className="h-8 w-8 rounded-full bg-[#00A67E] flex items-center justify-center z-10 relative">
                                                        <div className="h-2 w-2 rounded-full bg-white"></div>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-medium">In Transit</h3>
                                                    <p className="text-sm text-gray-500">69 Lagos Island, Lagos</p>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <div className="relative">
                                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center z-10 relative">
                                                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-medium text-gray-400">Delivered</h3>
                                                    <p className="text-sm text-gray-400">16 Afolabi Aina Street, Ikeja, Lagos</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                        <div className="flex items-center">
                                            <Avatar className="h-12 w-12 mr-3">
                                                <AvatarImage src="/images/Avatar.png" alt="Jacob Jones" />
                                                <AvatarFallback>JJ</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">Jacob Jones</h3>
                                                <p className="text-sm text-gray-500">Delivery Guy</p>
                                            </div>
                                            <div className="ml-auto flex gap-2">
                                                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                                                    <MessageSquare className="h-5 w-5" />
                                                </Button>
                                                <Button className="rounded-full h-10 w-10 bg-[#00A67E] hover:bg-[#008F6B]">
                                                    <Phone className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
                <Sidebar />
                <main className="ml-8 flex-1 mx-w-md">
                    <h1 className="text-3xl font-bold mb-6">My Orders</h1>
                    {ongoingOrders.length === 0 && activeTab === "ongoing" && !trackingOrder ? (
                        <div className="flex flex-col items-center justify-center py-16 h-[80vh]">
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
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="8" y1="10" x2="16" y2="10"></line>
                                    <line x1="8" y1="14" x2="16" y2="14"></line>
                                    <line x1="8" y1="18" x2="12" y2="18"></line>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium mb-2">No Ongoing Orders!</h3>
                            <p className="text-gray-500 text-center mb-8">You don't have any ongoing orders at this time.</p>
                            <Link href="/shopping-list">
                                <Button className="bg-[#00A67E] hover:bg-[#008F6B]">Proceed to Checkout</Button>
                            </Link>
                        </div>
                    ) : (
                        <Tabs defaultValue="ongoing" value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="ongoing" className="relative">
                                    Ongoing
                                    {ongoingOrders.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-[#00A67E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {ongoingOrders.length}
                                        </span>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger value="delivered" className="relative">
                                    Delivered
                                    {deliveredOrders.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {deliveredOrders.length}
                                        </span>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger value="cancelled" className="relative">
                                    Cancelled
                                    {cancelledOrders.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cancelledOrders.length}
                                        </span>
                                    )}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="ongoing" className="space-y-4">
                                {ongoingOrders.map((order) => (
                                    <div key={order.id} className="border rounded-md overflow-hidden">
                                        <div className="p-4 border-b">
                                            <div className="flex space-x-4 items-center mb-2">
                                                <div className="font-semibold">{order.orderNumber}</div>
                                                <div>{getStatusBadge(order.status)}</div>
                                            </div>
                                            <div className="text-sm text-gray-500">Ordered on {order.date}</div>
                                        </div>

                                        <div className="p-4 border-b">
                                            <div className="font-medium">{order.items}</div>
                                            <div className="text-gray-700">N{order.price.toLocaleString()}</div>
                                        </div>

                                        <div className="p-4 flex justify-between items-center">
                                            {order.status === "processing" ? (
                                                <Button className="bg-[#00A67E] hover:bg-[#008F6B]" onClick={() => router.push("/checkout")}>Checkout</Button>
                                            ) : order.canTrack ? (
                                                <Button
                                                    variant="ghost"
                                                    className="flex items-center"
                                                    onClick={() => setTrackingOrder(order.id)}
                                                >
                                                    <Package className="h-4 w-4 mr-2" />
                                                    Track Order
                                                </Button>
                                            ) : (
                                                <div></div>
                                            )}
                                            <Button variant="outline">View details</Button>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="delivered" className="space-y-4">
                                {deliveredOrders.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16">
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
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="8" y1="10" x2="16" y2="10"></line>
                                                <line x1="8" y1="14" x2="16" y2="14"></line>
                                                <line x1="8" y1="18" x2="12" y2="18"></line>
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium mb-2">No Delivered Orders!</h3>
                                        <p className="text-gray-500 text-center mb-8">You don't have any delivered orders at this time.</p>
                                    </div>
                                ) : (
                                    deliveredOrders.map((order) => (
                                        <div key={order.id} className="border rounded-md overflow-hidden">
                                            <div className="p-4 border-b">
                                                <div className="flex justify-between items-center">
                                                    <div className="font-semibold">{order.orderNumber}</div>
                                                    <div>{getStatusBadge(order.status)}</div>
                                                </div>
                                                <div className="text-sm text-gray-500">Ordered on {order.date}</div>
                                            </div>

                                            <div className="p-4 border-b">
                                                <div className="font-medium">{order.items}</div>
                                                <div className="text-gray-700">N{order.price.toLocaleString()}</div>
                                            </div>

                                            <div className="p-4 flex justify-between items-center">
                                                <Button variant="outline">Reorder</Button>
                                                <Button variant="ghost">View details</Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </TabsContent>

                            <TabsContent value="cancelled" className="space-y-4">
                                {cancelledOrders.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16">
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
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="8" y1="10" x2="16" y2="10"></line>
                                                <line x1="8" y1="14" x2="16" y2="14"></line>
                                                <line x1="8" y1="18" x2="12" y2="18"></line>
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium mb-2">No Cancelled Orders!</h3>
                                        <p className="text-gray-500 text-center mb-8">You don't have any cancelled orders at this time.</p>
                                    </div>
                                ) : (
                                    cancelledOrders.map((order) => (
                                        <div key={order.id} className="border rounded-md overflow-hidden">
                                            <div className="p-4 border-b">
                                                <div className="flex justify-between items-center">
                                                    <div className="font-semibold">{order.orderNumber}</div>
                                                    <div>{getStatusBadge(order.status)}</div>
                                                </div>
                                                <div className="text-sm text-gray-500">Ordered on {order.date}</div>
                                            </div>

                                            <div className="p-4 border-b">
                                                <div className="font-medium">{order.items}</div>
                                                <div className="text-gray-700">N{order.price.toLocaleString()}</div>
                                            </div>

                                            <div className="p-4 flex justify-between items-center">
                                                <Button variant="outline">Reorder</Button>
                                                <Button variant="ghost">View details</Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </TabsContent>
                        </Tabs>
                    )}
                </main>
            </div>
        </div>
    )
}

