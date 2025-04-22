"use client"

import { Search, ShoppingCart, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 bg-white border-b">
            <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/" className="mr-4 md:mr-8">
                        <h1 className="text-2xl font-bold">
                            <span className="text-[#00A67E]">Busy</span>
                            <span className="text-[#FF6B00]">2</span>
                            <span className="text-[#00A67E]">shop</span>
                        </h1>
                    </Link>
                    <div className="hidden md:flex relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300"
                            placeholder="Search markets or items"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">
                    <Link href="/cart" className="relative p-2">
                        <ShoppingCart className="h-6 w-6 text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            2
                        </span>
                    </Link>

                    <button className="relative p-2">
                        <Bell className="h-6 w-6 text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            1
                        </span>
                    </button>

                    <Link href="/auth/login">
                        <Button className="hidden md:flex bg-[#00A67E] hover:bg-[#008F6B] text-white">Login</Button>
                    </Link>

                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>LW</AvatarFallback>
                    </Avatar>

                    <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div className="space-y-1.5">
                            <span
                                className={`block h-0.5 w-6 bg-gray-600 transition ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                            ></span>
                            <span className={`block h-0.5 w-6 bg-gray-600 transition ${isMenuOpen ? "opacity-0" : ""}`}></span>
                            <span
                                className={`block h-0.5 w-6 bg-gray-600 transition ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                            ></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile search */}
            <div className="md:hidden px-4 pb-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300"
                        placeholder="Search markets or items"
                    />
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t p-4">
                    <Link href="/auth/login" className="block w-full">
                        <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B] text-white mb-2">Login</Button>
                    </Link>
                    <nav className="space-y-2">
                        <Link href="/" className="flex items-center p-2 bg-[#00A67E] text-white rounded-md">
                            <span className="mr-3">🏠</span>
                            Home
                        </Link>
                        <Link href="/orders" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                            <span className="mr-3">📦</span>
                            Orders
                        </Link>
                        <Link href="/messages" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                            <span className="mr-3">💬</span>
                            Messages
                        </Link>
                        <Link href="/profile" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                            <span className="mr-3">👤</span>
                            Profile
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}

