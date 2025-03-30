"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Twitter, Facebook, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Food items for Shop by Ingredients section
const foodItems = [
    { name: "Jollof Rice", image: "/placeholder.svg?height=100&width=100" },
    { name: "Porridge", image: "/placeholder.svg?height=100&width=100" },
    { name: "Egusi Soup", image: "/placeholder.svg?height=100&width=100" },
    { name: "Okro Soup", image: "/placeholder.svg?height=100&width=100" },
    { name: "Rice & Stew", image: "/placeholder.svg?height=100&width=100" },
    { name: "Okro Soup", image: "/placeholder.svg?height=100&width=100" },
    { name: "Porridge", image: "/placeholder.svg?height=100&width=100" },
    { name: "Rice & Stew", image: "/placeholder.svg?height=100&width=100" },
]

// Markets for Markets section
const markets = [
    { name: "Supermarkets", image: "/placeholder.svg?height=200&width=300" },
    { name: "Local Markets", image: "/placeholder.svg?height=200&width=300" },
    { name: "Computer Village", image: "/placeholder.svg?height=200&width=300" },
    { name: "Water/ Drinks (sangotedo)", image: "/placeholder.svg?height=200&width=300" },
    { name: "Alaba International Market", image: "/placeholder.svg?height=200&width=300" },
    { name: "Original Vietnam Hair ...", image: "/placeholder.svg?height=200&width=300" },
]

export default function HomeContent() {
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <div className="max-w-[1200px] mx-auto">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                    <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Lucy" />
                        <AvatarFallback>LW</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-medium">Hi, Lucy</h2>
                        <p className="text-gray-600">Welcome back to waka2shop</p>
                    </div>
                </div>
                <Button className="bg-[#00A67E] hover:bg-[#008F6B] text-white">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Shopping List
                </Button>
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
                                    src={item.image || "/placeholder.svg"}
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
            <div className="relative mb-8 rounded-lg overflow-hidden">
                <div className="relative h-[200px] bg-gradient-to-r from-black to-[#FFB800] flex items-center">
                    <div className="absolute inset-0 flex">
                        <div className="w-3/5 p-8 flex flex-col justify-center">
                            <div className="text-white">
                                <div className="text-8xl font-bold">
                                    70<span className="text-4xl align-top">%</span>
                                </div>
                                <div className="text-3xl font-bold">OFF</div>
                                <div className="text-sm mt-2">SPECIAL OFFER</div>
                            </div>
                        </div>
                        <div className="w-2/5 flex items-center justify-center">
                            <div className="bg-[#FFB800] rounded-full h-32 w-32 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-xl font-bold">SHOP</div>
                                    <div className="text-lg">ONLINE</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <button
                                key={index}
                                className={`h-2 w-2 rounded-full ${activeSlide === index ? "bg-[#00A67E]" : "bg-white"}`}
                                onClick={() => setActiveSlide(index)}
                            />
                        ))}
                    </div>

                    <div className="absolute bottom-4 right-4 flex space-x-2">
                        <button className="bg-white rounded-full p-1">
                            <Twitter className="h-4 w-4" />
                        </button>
                        <button className="bg-white rounded-full p-1">
                            <Facebook className="h-4 w-4" />
                        </button>
                        <button className="bg-white rounded-full p-1">
                            <Instagram className="h-4 w-4" />
                        </button>
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
                <div className="bg-gradient-to-r from-[#00A67E] to-[#FFB800] p-6 flex flex-col md:flex-row">
                    <div className="md:w-2/3 text-white mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold mb-3">Refer & Earn!</h2>
                        <p className="mb-4">
                            Invite your friends & family and you will both get instant cash rewards upon purchase.
                        </p>
                        <Button className="bg-[#FF0000] hover:bg-[#D90000] text-white border-none">Share Now</Button>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                        <div className="relative h-[120px] w-[200px]">
                            <Image src="/placeholder.svg?height=120&width=200" alt="Referral" fill className="object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

