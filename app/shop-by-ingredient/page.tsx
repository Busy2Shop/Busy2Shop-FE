"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, Circle, ArrowLeft, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Ingredient {
    id: string
    name: string
    quantity: number
    unit: string
    note?: string
    description?: string
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
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { id: "rice", name: "Rice", quantity: 0, unit: "(2 cups)", description: "(2 cups)" },
        { id: "tomatoes", name: "Tomatoes", quantity: 0, unit: "(5 medium)", description: "(5 medium)" },
        { id: "pepper", name: "Pepper", quantity: 0, unit: "(as desired)", description: "(as desired)" },
        { id: "onions", name: "Onions", quantity: 0, unit: "(2 large)", description: "(2 large)" },
        { id: "oil", name: "Oil", quantity: 0, unit: "(1/2 cup)", description: "(1/2 cup)" },
        { id: "spices", name: "Spices", quantity: 0, unit: "(to taste)", description: "(to taste)" },
    ])
    const isMobile = useMediaQuery("(max-width: 1024px)")

    const dishes: Dish[] = [
        {
            id: "jollof-rice",
            name: "Jollof Rice",
            image: "/images/dish-1.png",
            description: "A flavorful West African rice dish cooked in a rich tomato sauce",
            ingredients: [],
        },
        {
            id: "porridge",
            name: "Porridge",
            image: "/images/dish-2.png",
            ingredients: [],
        },
        {
            id: "egusi-soup",
            name: "Egusi Soup",
            image: "/images/dish-3.png",
            ingredients: [],
        },
        {
            id: "okro-soup",
            name: "Okro Soup",
            image: "/images/dish-4.png",
            ingredients: [],
        },
        {
            id: "rice-stew",
            name: "Rice & Stew",
            image: "/images/dish-5.png",
            ingredients: [],
        },
        {
            id: "egusi-soup-2",
            name: "Egusi Soup",
            image: "/images/dish-3.png",
            ingredients: [],
        },
    ]

    const updateQuantity = (ingredientId: string, newQuantity: number) => {
        setIngredients(
            ingredients.map((ingredient) =>
                ingredient.id === ingredientId ? { ...ingredient, quantity: Math.max(0, newQuantity) } : ingredient,
            ),
        )
    }

    const addIngredient = () => {
        if (newIngredient.trim()) {
            setIngredients([
                ...ingredients,
                {
                    id: `custom-${Date.now()}`,
                    name: newIngredient.trim(),
                    quantity: 0,
                    unit: "",
                },
            ])
            setNewIngredient("")
        }
    }

    const removeIngredient = (ingredientId: string) => {
        setIngredients(ingredients.filter((ingredient) => ingredient.id !== ingredientId))
    }

    const selectedDishData = dishes.find((dish) => dish.id === selectedDish) || dishes[0]
    const cartCount = ingredients.filter((i) => i.quantity > 0).length

    // Mobile view
    if (isMobile) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white p-4 border-b">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center text-gray-800">
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            <span className="font-medium">Shop by Ingredients</span>
                        </Link>
                    </div>
                    <p className="text-[#00A67E] text-sm mt-1">You're shopping from (Ajah Market)</p>
                </div>

                <div className="p-4">
                    <p className="mb-4">Select a dish to view all required ingredients</p>

                    {/* Dish Selection */}
                    <div className="flex overflow-x-auto space-x-4 pb-4 mb-6">
                        {dishes.map((dish) => (
                            <div
                                key={dish.id}
                                className={`flex flex-col items-center cursor-pointer min-w-[80px] ${selectedDish === dish.id ? "opacity-100" : "opacity-70"
                                    }`}
                                onClick={() => setSelectedDish(dish.id)}
                            >
                                <div className="rounded-full overflow-hidden mb-2 border h-[80px] w-[80px]">
                                    <Image
                                        src={dish.image || "/placeholder.svg"}
                                        alt={dish.name}
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                    />
                                </div>
                                <span className="text-center text-sm">{dish.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Jollof Rice Title */}
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">Jollof Rice</h2>
                        <p className="text-gray-600 text-sm">A flavorful West African rice dish cooked in a rich tomato sauce</p>
                    </div>

                    {/* Ingredients List */}
                    <div className="space-y-3 mb-24">
                        {ingredients.map((ingredient) => (
                            <div key={ingredient.id} className="bg-white border rounded-md p-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <Circle className="h-2 w-2 mr-2 fill-current text-gray-600" />
                                        <div>
                                            <span className="font-medium">{ingredient.name}</span>
                                            {ingredient.description && (
                                                <span className="text-gray-500 text-sm ml-1">{ingredient.description}</span>
                                            )}
                                        </div>
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
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-red-500"
                                            onClick={() => removeIngredient(ingredient.id)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Item Input */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                    <div className="flex items-center">
                        <div className="flex-1 border rounded-l-md">
                            <Input
                                placeholder="Add new item..."
                                className="border-none shadow-none focus-visible:ring-0"
                                value={newIngredient}
                                onChange={(e) => setNewIngredient(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addIngredient()}
                            />
                        </div>
                        <Button className="rounded-l-none bg-gray-800 hover:bg-gray-700" onClick={addIngredient}>
                            Add
                        </Button>
                    </div>
                </div>

                {/* Add All to Cart Button */}
                <div className="fixed bottom-20 left-0 right-0 px-4">
                    <Button
                        className="w-full bg-[#00A67E] hover:bg-[#008F6B] py-3"
                        onClick={() => console.log("Add all ingredients to cart")}
                    >
                        Add All Ingredients to Cart
                    </Button>
                </div>

                {/* Floating Cart Button */}
                {cartCount > 0 && (
                    <div className="fixed bottom-32 right-4">
                        <Link href="/checkout">
                            <Button className="h-14 w-14 rounded-full bg-[#00A67E] hover:bg-[#008F6B] shadow-lg relative">
                                <ShoppingCart className="h-6 w-6 text-white" />
                                <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            </Button>
                        </Link>
                        <div className="text-center text-xs mt-1 text-gray-600">My Cart</div>
                    </div>
                )}
            </div>
        )
    }

    // Desktop view (original layout)
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
                            {ingredients.map((ingredient) => (
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
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-red-500"
                                            onClick={() => removeIngredient(ingredient.id)}
                                        >
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

