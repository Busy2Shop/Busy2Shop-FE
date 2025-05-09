"use client"

import { useState } from "react"
import { Plus, ChevronLeft, List, ChefHat } from "lucide-react"
import Navbar from "@/components/navbar"

interface ShoppingItem {
    id: number
    name: string
    quantity: number
    note?: string
    showNoteInput?: boolean
    price?: number
    checked?: boolean
}

// Dummy previous lists for demonstration
const previousLists = [
    {
        id: 1,
        title: "Weekly Groceries",
        date: "April 15, 2025",
        items: [
            { name: "Apples", quantity: 5, unit: "pieces" },
            { name: "Milk", quantity: 1, unit: "L" },
            { name: "Yam", quantity: 3, unit: "" },
            { name: "Tomatoes", quantity: 1, unit: "" },
            { name: "Sardine", quantity: 6, unit: "" },
            { name: "Turkey", quantity: 2, unit: "" },
            { name: "Burger", quantity: 8, unit: "" },
        ],
        image: "/images/supermarket.png",
    },
    {
        id: 2,
        title: "Sunday Flexing",
        date: "April 05, 2025",
        items: [
            { name: "Chicken", quantity: 2, unit: "kg" },
            { name: "Rice", quantity: 1, unit: "bag" },
            { name: "Drinks", quantity: 10, unit: "bottles" },
        ],
        image: "/images/onboarding-1.png",
    },
    {
        id: 3,
        title: "Office Supplies",
        date: "March 19, 2025",
        items: [
            { name: "Paper", quantity: 5, unit: "reams" },
            { name: "Pens", quantity: 10, unit: "" },
            { name: "Stapler", quantity: 1, unit: "" },
        ],
        image: "/images/onboarding-2.png",
    },
    {
        id: 4,
        title: "Party Supplies",
        date: "March 04, 2025",
        items: [
            { name: "Balloons", quantity: 15, unit: "" },
            { name: "Cups", quantity: 20, unit: "" },
            { name: "Plates", quantity: 20, unit: "" },
        ],
        image: "/images/onboarding-3.png",
    },
]

export default function ShoppingListPage() {
    const [listName, setListName] = useState("")
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [items, setItems] = useState<ShoppingItem[]>([])
    const [newItem, setNewItem] = useState("")
    const [selectedPreviousList, setSelectedPreviousList] = useState<number | null>(null)

    // Handlers for item logic
    const addItem = () => {
        if (newItem.trim()) {
            setItems([
                ...items,
                {
                    id: Date.now(),
                    name: newItem.trim(),
                    quantity: 1,
                    showNoteInput: false,
                    price: Math.floor(Math.random() * 2000) + 500, // Random price for demo
                    checked: false,
                },
            ])
            setNewItem("")
        }
    }
    const updateQuantity = (id: number, quantity: number) => {
        setItems(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)))
    }
    const toggleNoteInput = (id: number) => {
        setItems(items.map((item) => (item.id === id ? { ...item, showNoteInput: !item.showNoteInput } : item)))
    }
    const updateNote = (id: number, note: string) => {
        setItems(items.map((item) => (item.id === id ? { ...item, note } : item)))
    }
    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id))
    }
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)

    // UI
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-[1200px] mx-auto w-full p-4 md:p-8">
                <div className="flex items-center gap-2 mb-8">
                    <ChevronLeft onClick={() => window.history.back()} className="h-6 w-6 cursor-pointer" />
                    <h1 className="text-2xl font-bold">Shopping List</h1>
                </div>
                {selectedOption === "scratch" ? (
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <input
                                    type="text"
                                    placeholder="Weekly Groceries"
                                    value={listName}
                                    onChange={e => setListName(e.target.value)}
                                    className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#00A67E] mb-4"
                                />
                            </div>
                            <p className="text-[#00A67E] mb-4">You're shopping from (Balogun Market)</p>
                            <p className="mb-4">({items.length}) Items added to order</p>
                            <div className="flex items-center gap-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="+ Add new item..."
                                    value={newItem}
                                    onChange={e => setNewItem(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && addItem()}
                                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#00A67E]"
                                />
                                <button
                                    className="bg-[#00A67E] text-white px-4 py-2 rounded-md font-medium"
                                    onClick={addItem}
                                >
                                    Add
                                </button>
                            </div>
                            {items.map((item) => (
                                <div key={item.id} className="mb-3 border rounded-md p-3 bg-white">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{item.name}</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="h-8 w-8 rounded-md border border-[#00A67E] text-[#00A67E] flex items-center justify-center"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button
                                                className="h-8 w-8 rounded-md border border-[#00A67E] text-[#00A67E] flex items-center justify-center"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className={`h-8 w-8 ${item.showNoteInput ? "text-[#00A67E]" : "text-gray-400"}`}
                                                onClick={() => toggleNoteInput(item.id)}
                                            >
                                                📝
                                            </button>
                                            <button
                                                className="h-8 w-8 text-red-500"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                    {item.showNoteInput && (
                                        <div className="mt-3 border rounded p-2 bg-gray-50">
                                            <input
                                                type="text"
                                                placeholder="Quantity & Units (e.g. 2kg, 3 pieces)"
                                                className="w-full mb-2 border border-gray-200 rounded px-2 py-1 text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Price Limit (optional) e.g. ₦5,000"
                                                className="w-full mb-2 border border-gray-200 rounded px-2 py-1 text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Note"
                                                value={item.note || ""}
                                                onChange={e => updateNote(item.id, e.target.value)}
                                                className="w-full border border-gray-200 rounded px-2 py-1 text-sm"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="flex gap-4 mt-6">
                                <button className="flex-1 bg-[#00A67E] text-white py-3 rounded-md font-semibold">Send to Market Agent</button>
                                <button className="flex-1 border border-gray-300 py-3 rounded-md font-semibold">Save as draft</button>
                            </div>
                        </div>
                        {/* Order Summary */}
                        <div className="w-full max-w-xs bg-white rounded-xl shadow p-6">
                            <h2 className="text-lg font-bold mb-4 text-center">Your Order</h2>
                            <div className="mb-2 text-sm text-gray-500 text-center">{listName || "Weekly Groceries"}</div>
                            <div className="space-y-3 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div>
                                            {item.name} {item.quantity > 1 && `(${item.quantity})`}
                                        </div>
                                        <button
                                            className="h-6 w-6 text-red-500"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center font-bold mb-4">
                                <span>Total</span>
                                <span>NGN {totalPrice.toLocaleString()}</span>
                            </div>
                            <button className="w-full bg-[#00A67E] text-white py-3 rounded-md font-semibold">Proceed to Checkout</button>
                        </div>
                    </div>
                ) : selectedOption === "import" ? (
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Panel: Previous Lists */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-8">
                                <ChevronLeft onClick={() => setSelectedOption(null)} className="h-6 w-6 cursor-pointer" />
                                <h1 className="text-2xl font-bold">Previous List</h1>
                            </div>
                            <div className="space-y-4">
                                {previousLists.map((list) => (
                                    <div
                                        key={list.id}
                                        className={`flex items-center justify-between border rounded-lg p-4 transition-all cursor-pointer ${selectedPreviousList === list.id ? "border-[#00A67E] bg-white shadow" : "border-gray-200 bg-white"}`}
                                        onClick={() => setSelectedPreviousList(list.id)}
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <img src={list.image} alt={list.title} className="w-12 h-12 rounded-full object-cover" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-lg">{list.title}</div>
                                                <div className="text-sm text-gray-500">{list.items.length} Items</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-sm text-gray-400 mb-2">{list.date}</div>
                                            <div className="flex gap-2">
                                                <button className="border border-[#00A67E] text-[#00A67E] rounded px-3 py-1 text-sm font-medium">Edit List</button>
                                                <button className="bg-[#00A67E] text-white rounded px-3 py-1 text-sm font-medium">Reorder List</button>
                                                <button className="ml-2 text-red-500 hover:text-red-700"><span role="img" aria-label="delete">🗑️</span></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Right Panel: List Details or Empty State */}
                        <div className="w-full max-w-md bg-white rounded-xl shadow p-8 flex flex-col min-h-[400px]">
                            {selectedPreviousList ? (
                                (() => {
                                    const list = previousLists.find(l => l.id === selectedPreviousList);
                                    if (!list) return null;
                                    return (
                                        <>
                                            <div className="mb-2 w-full flex justify-center">
                                                <span className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-sm font-medium">{list.title}</span>
                                            </div>
                                            <div className="w-full space-y-3 mb-6">
                                                {list.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center border-b pb-2">
                                                        <span>{item.name}{item.quantity ? ` (${item.quantity}${item.unit ? ` ${item.unit}` : ""})` : ""}</span>
                                                        <button className="h-6 w-6 text-red-500"><span role="img" aria-label="delete">🗑️</span></button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center font-bold mb-4 w-full">
                                                <span>Total</span>
                                                <span>NGN 7,300</span>
                                            </div>
                                            <button className="w-full bg-[#00A67E] text-white py-3 rounded-md font-semibold">Proceed to Checkout</button>
                                        </>
                                    );
                                })()
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full w-full">
                                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-4 text-gray-300"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                    <p className="text-gray-500 text-center">Select from shopping list</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Selection UI
                    <div>
                        <div className="mb-6">
                            <p className="font-medium mb-2">Step 1: Create a Shopping List</p>
                            <input
                                type="text"
                                placeholder="Name of Shopping List"
                                value={listName}
                                onChange={e => setListName(e.target.value)}
                                className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#00A67E]"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mt-8">
                            {/* Start from Scratch */}
                            <div
                                className={`flex-1 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all border-2 ${selectedOption === "scratch" ? "bg-[#00A67E] border-[#00A67E] text-white" : "bg-white border-gray-200 text-gray-700 hover:border-[#00A67E]"}`}
                                onClick={() => setSelectedOption("scratch")}
                            >
                                <Plus className="h-8 w-8 mb-3" />
                                <div className="font-semibold text-lg mb-1">Start from Scratch</div>
                                <div className="text-sm opacity-80">Select market • Add items</div>
                            </div>
                            {/* Import Previous List */}
                            <div
                                className={`flex-1 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all border-2 ${selectedOption === "import" ? "bg-[#00A67E] border-[#00A67E] text-white" : "bg-white border-gray-200 text-gray-700 hover:border-[#00A67E]"}`}
                                onClick={() => setSelectedOption("import")}
                            >
                                <List className="h-8 w-8 mb-3" />
                                <div className="font-semibold text-lg mb-1">Import Previous List</div>
                                <div className="text-sm opacity-80">Edit as needed</div>
                            </div>
                            {/* Shop by Ingredient */}
                            <div
                                className={`flex-1 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all border-2 ${selectedOption === "ingredient" ? "bg-[#00A67E] border-[#00A67E] text-white" : "bg-white border-gray-200 text-gray-700 hover:border-[#00A67E]"}`}
                                onClick={() => setSelectedOption("ingredient")}
                            >
                                <ChefHat className="h-8 w-8 mb-3" />
                                <div className="font-semibold text-lg mb-1">Shop by Ingredient</div>
                                <div className="text-sm opacity-80">See all that is needed</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

