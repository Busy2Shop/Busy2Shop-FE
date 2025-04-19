"use client"

import { useState } from "react"
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface CartItem {
    id: string
    name: string
    quantity: number
    price: number
}

interface CartGroup {
    id: string
    name: string
    items: CartItem[]
}

export default function CartPage() {
    const [selectedGroup, setSelectedGroup] = useState("1")
    const [itemToRemove, setItemToRemove] = useState<{ groupId: string; itemId: string } | null>(null)

    const cartGroups: CartGroup[] = [
        {
            id: "1",
            name: "Fresh Grocceries",
            items: [
                { id: "1-1", name: "Apples (5 pieces)", quantity: 1, price: 3000 },
                { id: "1-2", name: "Milk (1L)", quantity: 1, price: 2500 },
                { id: "1-3", name: "Bread (1 loaf)", quantity: 1, price: 1800 },
            ],
        },
        {
            id: "2",
            name: "Fresh Grocceries",
            items: [
                { id: "2-1", name: "Apples (5 pieces)", quantity: 1, price: 3000 },
                { id: "2-2", name: "Milk (1L)", quantity: 1, price: 2500 },
                { id: "2-3", name: "Bread (1 loaf)", quantity: 1, price: 1800 },
            ],
        },
        {
            id: "3",
            name: "Fresh Grocceries",
            items: [
                { id: "3-1", name: "Apples (5 pieces)", quantity: 1, price: 3000 },
                { id: "3-2", name: "Milk (1L)", quantity: 1, price: 2500 },
                { id: "3-3", name: "Bread (1 loaf)", quantity: 1, price: 1800 },
            ],
        },
    ]

    // Additional items for the order summary
    const additionalItems = [
        { id: "4-1", name: "Yam (3)", quantity: 1, price: 0 },
        { id: "4-2", name: "Tomatoes", quantity: 1, price: 0 },
        { id: "4-3", name: "Sardine (6)", quantity: 1, price: 0 },
        { id: "4-4", name: "Turkey (2)", quantity: 1, price: 0 },
        { id: "4-5", name: "Burger (8)", quantity: 1, price: 0 },
    ]

    const updateQuantity = (groupId: string, itemId: string, newQuantity: number) => {
        // In a real app, you would update the state
        console.log(`Update quantity for item ${itemId} in group ${groupId} to ${newQuantity}`)
    }

    const removeItem = (groupId: string, itemId: string) => {
        setItemToRemove({ groupId, itemId })
    }

    const confirmRemoveItem = () => {
        if (itemToRemove) {
            // In a real app, you would update the state
            console.log(`Remove item ${itemToRemove.itemId} from group ${itemToRemove.groupId}`)
            setItemToRemove(null)
        }
    }

    const calculateGroupTotal = (group: CartGroup) => {
        return group.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const subtotal = calculateGroupTotal(cartGroups.find((g) => g.id === selectedGroup) || cartGroups[0])
    const deliveryFee = 500
    const total = subtotal + deliveryFee

    // Calculate the grand total for the right sidebar (all items)
    const grandTotal =
        cartGroups.reduce((sum, group) => sum + calculateGroupTotal(group), 0) +
        additionalItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-6">
                            <ChevronLeft onClick={() => window.history.back()} className="h-8 w-8 cursor-pointer" />
                            <h1 className="text-3xl font-bold">Your Cart</h1>
                        </div>

                        {/* Cart Groups */}
                        {cartGroups.map((group) => (
                            <div key={group.id} className="mb-4 border rounded-md overflow-hidden">
                                <div className="p-4 border-b">
                                    <div className="flex items-center">
                                        <div className="mr-3">
                                            <div
                                                className={`h-5 w-5 rounded-full border ${selectedGroup === group.id ? "border-[#00A67E]" : "border-gray-300"
                                                    } flex items-center justify-center cursor-pointer`}
                                                onClick={() => setSelectedGroup(group.id)}
                                            >
                                                {selectedGroup === group.id && <div className="h-3 w-3 rounded-full bg-[#00A67E]"></div>}
                                            </div>
                                        </div>
                                        <h2 className="font-semibold">{group.name}</h2>
                                    </div>
                                </div>

                                <div className="divide-y">
                                    {group.items.map((item) => (
                                        <div key={item.id} className="p-4 flex justify-between items-center">
                                            <span className="font-medium">{item.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-right min-w-[100px]">NGN {item.price.toLocaleString()}</span>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-md border-[#00A67E] text-[#00A67E]"
                                                        onClick={() => updateQuantity(group.id, item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-md border-[#00A67E] text-[#00A67E]"
                                                        onClick={() => updateQuantity(group.id, item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-500"
                                                        onClick={() => removeItem(group.id, item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">NGN {calculateGroupTotal(group).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}

                        {/* Order Summary */}
                        <div className="border rounded-md overflow-hidden mb-6">
                            <div className="p-4 border-b bg-gray-50">
                                <h2 className="font-semibold">Order Summary</h2>
                            </div>

                            <div className="p-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span>N{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Delivery Fee</span>
                                    <span>N{deliveryFee}</span>
                                </div>
                            </div>

                            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">NGN {total.toLocaleString()}</span>
                            </div>
                        </div>

                        <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B] py-6 text-lg">Proceed to Checkout</Button>
                    </div>

                    {/* Right Sidebar - Order Summary */}
                    <div className="lg:w-[350px] border rounded-md p-4 h-fit">
                        <h2 className="text-xl font-bold mb-4 text-center">Your Order</h2>

                        <div className="space-y-3 mb-6">
                            {[...cartGroups.flatMap((g) => g.items), ...additionalItems].map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <span>{item.name}</span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center font-bold mb-4">
                            <span>Total</span>
                            <span>NGN {grandTotal.toLocaleString()}</span>
                        </div>

                        <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]">Proceed to Checkout</Button>
                    </div>
                </div>

                {/* Confirmation Dialog */}
                <Dialog open={!!itemToRemove} onOpenChange={() => setItemToRemove(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Remove Item</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to remove this item from your cart?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setItemToRemove(null)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={confirmRemoveItem}>
                                Remove
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

