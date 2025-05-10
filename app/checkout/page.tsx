"use client"

import { useState } from "react"
import { ChevronLeft, MapPin, Clock, ChevronDown, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CheckoutItem {
    id: string | number
    name: string
    quantity: number
    price: number
    note?: string
}

export default function CheckoutPage() {
    const [items, setItems] = useState<CheckoutItem[]>([
        { id: "1", name: "Apples (5 pieces)", quantity: 1, price: 3000 },
        { id: "2", name: "Milk (1L)", quantity: 1, price: 2500 },
        { id: "3", name: "Bread (1 loaf)", quantity: 1, price: 1800 },
    ])

    const updateQuantity = (id: string | number, newQuantity: number) => {
        setItems(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)))
    }

    const removeItem = (id: string | number) => {
        setItems(items.filter((item) => item.id !== id))
    }

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 max-w-[1440px] ml-8">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white p-4 border-b">
                <div className="flex items-center">
                    <Link href="/shopping-list" className="flex items-center text-gray-800">
                        <ChevronLeft className="h-5 w-5 mr-2" />
                        <span className="font-medium text-xl">Order Confirmation</span>
                    </Link>
                </div>
            </div>

            <div className="flex-1 p-4 pb-24">
                <div className="space-y-8">
                    {/* Delivery Address */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-medium">Delivery Address</h3>
                            <Button variant="link" className="text-[#00A67E] p-0 h-auto">
                                Change
                            </Button>
                        </div>
                        <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Home 925 S Chugach St #APT 10, Alaska 9964</span>
                        </div>
                    </div>

                    {/* Selected Market & Delivery */}
                    <div>
                        <h3 className="text-xl font-medium mb-2">Selected Market & Delivery</h3>
                        <div className="flex items-center">
                            <div className="flex items-center mr-4">
                                <div className="h-6 w-6 bg-gray-200 rounded-md flex items-center justify-center mr-2">
                                    <MapPin className="h-4 w-4 text-gray-600" />
                                </div>
                                <span className="text-gray-700">PennyMart</span>
                            </div>
                            <div className="flex items-center">
                                <div className="h-6 w-6 bg-gray-200 rounded-md flex items-center justify-center mr-2">
                                    <Clock className="h-4 w-4 text-gray-600" />
                                </div>
                                <span className="text-gray-700">Estimated delivery: 30-45 minutes</span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <h3 className="text-xl font-medium mb-2">Additional Notes</h3>
                        <p className="text-gray-700">
                            Hi! Good day,
                            <br />
                            pls make sure the milk is not expired and if you can find them at that store, you check Globus
                            Supermarket.
                            <br />
                            Thanks.
                        </p>
                    </div>

                    {/* Shopping List Summary */}
                    <div>
                        <h3 className="text-xl font-medium mb-4">Shopping List Summary</h3>

                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b pb-4">
                                    <div className="flex-1">
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700 mr-2">NGN {item.price.toLocaleString()}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 rounded-md border-[#00A67E] text-[#00A67E]"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-6 text-center">{item.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 rounded-md border-[#00A67E] text-[#00A67E]"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center font-bold mt-6 text-lg">
                            <span>Total</span>
                            <span>NGN {totalPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Add Additional Items */}
                    <div>
                        <h3 className="text-xl font-medium mb-2">Add Additional Items</h3>
                        <div className="border rounded-md flex items-center bg-white">
                            <Button variant="outline" className="w-full justify-between border-none">
                                <span className="text-gray-500">Choose market</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-t mb-10">
                <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B] py-6 text-lg">Continue to Payment</Button>
            </div>
        </div>
    )
}

