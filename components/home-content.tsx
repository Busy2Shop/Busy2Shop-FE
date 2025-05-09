"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Food items for Shop by Ingredients section
const foodItems = [
    { name: "Jollof Rice", image: "/images/dish-1.png" },
    { name: "Porridge", image: "/images/dish-2.png" },
    { name: "Egusi Soup", image: "/images/dish-3.png" },
    { name: "Okro Soup", image: "/images/dish-4.png" },
    { name: "Rice & Stew", image: "/images/dish-5.png" },
    { name: "Okro Soup", image: "/images/dish-1.png" },
    { name: "Porridge", image: "/images/dish-2.png" },
    { name: "Rice & Stew", image: "/images/dish-3.png" },
]

// Markets for Markets section
const markets = [
    { name: "Supermarkets", image: "/images/supermarket.png" },
    { name: "Local Markets", image: "/images/localmarket.png" },
    { name: "Computer Village", image: "/images/computer-village.png" },
    { name: "Water/ Drinks (sangotedo)", image: "/images/water-drinks.png" },
    { name: "Alaba International Market", image: "/images/alaba-market.png" },
    { name: "Original Vietnam Hair ...", image: "/images/hair-market.png" },
]

export default function HomeContent() {
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <div className="max-w-[900px] px-4">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                    <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src="/images/Avatar.png" alt="Lucy" />
                        <AvatarFallback>LW</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-medium">Hi, Lucy</h2>
                        <p className="text-gray-600">Welcome back to waka2shop</p>
                    </div>
                </div>
                <Link href={"/shopping-list"} className={cn(buttonVariants({ variant: "default" }), "flex items-center bg-[#00A67E] hover:bg-[#008F6B] text-white")}>
                    <Plus className="h-5 w-5 mr-2" />
                    Create Shopping List
                </Link>
            </div>

            {/* Shop by Ingredients Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Shop by Ingredients</h2>
                <p className="text-gray-600 mb-4">Select a dish to view all required ingredients</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {foodItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="rounded-full overflow-hidden mb-2 border">
                                <Image
                                    src={item.image || "/images/dish-1.png"}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-xs text-center">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Promotion Banner */}
            <div className="mb-8">
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <Image
                        src="/images/banner.png"
                        alt="Special Offer Banner"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <button
                                key={index}
                                className={`h-2 w-2 rounded-full ${activeSlide === index ? "bg-[#00A67E]" : "bg-white"}`}
                                onClick={() => setActiveSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Markets List */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Markets to Buy from</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {markets.map((market, index) => (
                        <Link href="/markets" key={index} className="border rounded-lg overflow-hidden">
                            <div className="h-[150px] relative">
                                <Image src={market.image || "/placeholder.svg"} alt={market.name} fill className="object-cover" />
                            </div>
                            <div className="p-3 text-center">
                                <h3 className="font-medium">{market.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Referral Banner */}
            <div className="rounded-lg overflow-hidden mb-8">
                <div className="relative bg-gradient-to-r from-[#32B768] via-[#A16207] to-[#EA580C] p-6 flex items-center">
                    <div className="flex-1 text-white">
                        <h2 className="text-2xl font-bold mb-2">Refer & Earn!</h2>
                        <p className="mb-4">
                            Invite your friends & family and you will both get instant cash rewards upon purchase.
                        </p>
                        <Button className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-none">Share Now</Button>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <div className="relative h-[160px] w-[300px]">
                            <Image 
                                src="/images/refer-and-earn.png" 
                                alt="Two girls celebrating referral rewards" 
                                fill 
                                className="object-contain object-right"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

