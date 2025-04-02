"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, Circle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

interface Ingredient {
    id: string
    name: string
    quantity: number
    unit: string
    note?: string
}

interface Dish {
    id: string
    name: string
    image: string
    description?: string
    ingredients: Ingredient[]
}

export default function ShopByIngredientPage() {
    const [selectedDish, setSelectedDish] = useState("jollof-rice")
    const [newIngredient, setNewIngredient] = useState("")

    const dishes: Dish[] = [
        {
            id: "jollof-rice",
            name: "Jollof Rice",
            image: "/placeholder.svg?height=100&width=100",
            description: "A flavorful West African rice dish cooked in a rich tomato sauce",
            ingredients: [
                { id: "rice", name: "Rice", quantity: 0, unit: "(2 cups)" },
                { id: "tomatoes", name: "Tomatoes", quantity: 0, unit: "(5 medium)" },
                { id: "pepper", name: "Pepper", quantity: 0, unit: "(as desired)" },
                { id: "onions", name: "Onions", quantity: 0, unit: "(2 large)" },
                { id: "oil", name: "Oil", quantity: 0, unit: "(1/2 cup)" },
                { id: "spices", name: "Spices", quantity: 0, unit: "(to taste)" },
            ],
        },
        {
            id: "porridge",
            name: "Porridge",
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [],
        },
        {
            id: "egusi-soup",
            name: "Egusi Soup",
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [],
        },
        {
            id: "okro-soup",
            name: "Okro Soup",
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [],
        },
        {
            id: "rice-stew",
            name: "Rice & Stew",
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [],
        },
        {
            id: "egusi-soup-2",
            name: "Egusi Soup",
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [],
        },
    ]

    const updateQuantity = (ingredientId: string, newQuantity: number) => {
        // In a real app, you would update the state
        console.log(`Update quantity for ingredient ${ingredientId} to ${newQuantity}`)
    }

    const addIngredient = () => {
        if (newIngredient.trim()) {
            // In a real app, you would update the state
            console.log(`Add new ingredient: ${newIngredient}`)
            setNewIngredient("")
        }
    }

    const selectedDishData = dishes.find((dish) => dish.id === selectedDish) || dishes[0]

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-1">Shop by Ingredient</h1>
                        <p className="text-[#00A67E] mb-6">Your're shopping from (Ajah Market)</p>

                        <p className="mb-4">Select a dish to view all required ingredients</p>

                        {/* Dish Selection */}
                        <div className="flex overflow-x-auto space-x-4 pb-4 mb-6">
                            {dishes.map((dish) => (
                                <div
                                    key={dish.id}
                                    className={`flex flex-col items-center cursor-pointer min-w-[100px] ${selectedDish === dish.id ? "opacity-100" : "opacity-70"
                                        }`}
                                    onClick={() => setSelectedDish(dish.id)}
                                >
                                    <div className="rounded-full overflow-hidden mb-2 border h-[100px] w-[100px]">
                                        <Image
                                            src={dish.image || "/placeholder.svg"}
                                            alt={dish.name}
                                            width={100}
                                            height={100}
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-center">{dish.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Selected Dish Details */}
                        <div className="mb-6 flex">
                            <div className="rounded-full overflow-hidden mr-4 border h-[120px] w-[120px] flex-shrink-0">
                                <Image
                                    src={selectedDishData.image || "/placeholder.svg"}
                                    alt={selectedDishData.name}
                                    width={120}
                                    height={120}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <div className="flex items-center mb-2">
                                    <h2 className="text-2xl font-bold mr-2">Nigerian Jollof Rice</h2>
                                    <div className="h-5 w-7 relative">
                                        <div className="absolute inset-0 bg-green-600 w-1/3 h-full"></div>
                                        <div className="absolute inset-0 left-1/3 bg-white w-1/3 h-full"></div>
                                        <div className="absolute inset-0 left-2/3 bg-green-600 w-1/3 h-full"></div>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">A Taste of Tradition</p>
                                <p className="text-gray-700 mb-3">
                                    Nigerian Jollof Rice is more than just a meal—it's a cultural icon and a beloved dish at parties,
                                    family gatherings, and celebrations. Made with long-grain parboiled rice, a rich tomato and pepper
                                    sauce, and a blend of spices, it offers a smoky, flavorful taste that sets it apart.
                                </p>
                                <p className="text-gray-700 mb-3">
                                    What makes Nigerian Jollof unique? The secret lies in the perfect balance of seasoning, slow-cooked
                                    tomatoes, and the signature party rice smokiness achieved by cooking over an open flame. Often served
                                    with fried plantains, grilled chicken, beef, or fish, it's a meal that brings people together.
                                </p>
                                <p className="text-gray-700">
                                    Ready to make your own? Add all the ingredients to your cart and let your agent shop for you!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Ingredients */}
                    <div className="lg:w-[350px] border rounded-md p-4">
                        <h2 className="text-xl font-bold mb-2 text-center">Jollof Rice</h2>
                        <p className="text-gray-600 text-sm text-center mb-4">
                            A flavorful West African rice dish cooked in a rich tomato sauce
                        </p>

                        <h3 className="font-semibold mb-3">Ingredients</h3>

                        <div className="space-y-2 mb-6">
                            {selectedDishData.ingredients.map((ingredient) => (
                                <div key={ingredient.id} className="flex items-center justify-between bg-gray-100 rounded-md p-2">
                                    <div className="flex items-center">
                                        <Circle className="h-2 w-2 mr-2 fill-current text-gray-600" />
                                        <span>
                                            {ingredient.name} <span className="text-gray-500 text-sm">{ingredient.unit}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7 rounded-md border-[#00A67E] text-[#00A67E]"
                                            onClick={() => updateQuantity(ingredient.id, ingredient.quantity - 1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-6 text-center">{ingredient.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7 rounded-md border-[#00A67E] text-[#00A67E]"
                                            onClick={() => updateQuantity(ingredient.id, ingredient.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex mb-4">
                            <div className="flex-1 relative">
                                <Input
                                    placeholder="Add new item..."
                                    className="pr-16"
                                    value={newIngredient}
                                    onChange={(e) => setNewIngredient(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addIngredient()}
                                />
                                <Button
                                    className="absolute right-0 top-0 bottom-0 rounded-l-none bg-gray-800 hover:bg-gray-700"
                                    onClick={addIngredient}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>

                        <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]">Proceed to Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

