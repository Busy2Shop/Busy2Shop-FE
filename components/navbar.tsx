"use client";

import { Search, ShoppingCart, HelpCircle, User2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

// Simulate user state (replace with real auth logic)
const user = {
    isLoggedIn: true,
    name: "Emmanuel",
    avatar: "/images/Avatar.png",
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

    // Simulated search suggestions (replace with real API call)
    const searchSuggestions = [
        "Fresh Vegetables",
        "Organic Fruits",
        "Local Markets",
        "Supermarkets",
        "Electronics",
        "Fashion",
    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="max-w-[1440px] mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/images/logo-for-white-bg.png" alt="Logo" width={36} height={36} className="rounded-full" />
                            <span className="text-[#00A67E] text-2xl font-bold tracking-tight">
                                Busy
                                <span className="text-[#FF6B00]">2</span>
                                <span className="text-[#00A67E]">Shop</span>
                            </span>
                        </Link>
                        <Button 
                            variant="outline" 
                            className="hidden md:flex items-center gap-2 border-[#00A67E] text-[#00A67E] hover:bg-[#00A67E] hover:text-white transition-colors"
                        >
                            <Store className="h-4 w-4" />
                            Become an Agent
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8 relative">
                        <form className="relative">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <div className="relative flex items-center bg-white border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#00A67E] focus-within:border-[#00A67E]">
                                <Search className="absolute left-4 text-gray-400 h-5 w-5" />
                                <Input
                                    id="search"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSearchSuggestions(true);
                                    }}
                                    onFocus={() => setShowSearchSuggestions(true)}
                                    className="pl-12 pr-4 py-3 w-full border-0 focus:ring-0 text-base"
                                    placeholder="Search products, brands and categories"
                                />
                                <Button
                                    type="submit"
                                    className="h-full bg-[#FF6B00] hover:bg-[#ff8c42] text-white px-6 text-base font-semibold transition-colors duration-200 rounded-none"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                        
                        {/* Search Suggestions */}
                        {showSearchSuggestions && searchQuery && (
                            <div 
                                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border py-2 z-50"
                                onMouseLeave={() => setShowSearchSuggestions(false)}
                            >
                                {searchSuggestions
                                    .filter(suggestion => 
                                        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((suggestion, index) => (
                                        <button
                                            key={index}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                            onClick={() => {
                                                setSearchQuery(suggestion);
                                                setShowSearchSuggestions(false);
                                            }}
                                        >
                                            <Search className="h-4 w-4 text-gray-400" />
                                            <span>{suggestion}</span>
                                        </button>
                                    ))
                                }
                            </div>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        {/* Help/Support */}
                        <Link href="/help" className="flex flex-col items-center group">
                            <HelpCircle className="h-6 w-6 text-gray-600 group-hover:text-[#00A67E] transition" />
                            <span className="text-xs text-gray-700 mt-1">Help</span>
                        </Link>
                        {/* Cart */}
                        <Link href="/cart" className="flex flex-col items-center relative group">
                            <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-[#00A67E] transition" />
                            <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                5
                            </span>
                            <span className="text-xs text-gray-700 mt-1">Cart</span>
                        </Link>
                        {/* Profile/Login */}
                        {user.isLoggedIn ? (
                            <div className="relative">
                                <button
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition group"
                                    onClick={() => setProfileOpen((v) => !v)}
                                    aria-haspopup="menu"
                                    aria-expanded={profileOpen}
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-gray-800 group-hover:text-[#00A67E] transition">Hi, {user.name}</span>
                                    <svg
                                        className={`w-4 h-4 ml-1 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {/* Dropdown */}
                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border py-2 z-50 animate-fade-in-up transition-all">
                                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition">
                                            <User2 className="h-5 w-5 text-gray-500" />
                                            <span>My Account</span>
                                        </Link>
                                        <Link href="/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition">
                                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <rect x="3" y="7" width="18" height="13" rx="2" />
                                                <path d="M16 3v4M8 3v4" />
                                            </svg>
                                            <span>Orders</span>
                                        </Link>
                                        <Link href="/messages" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition">
                                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                            </svg>
                                            <span>Inbox</span>
                                        </Link>
                                        <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition">
                                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" />
                                            </svg>
                                            <span>Wishlist</span>
                                        </Link>
                                        <Link href="/vouchers" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition">
                                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <rect x="3" y="7" width="18" height="13" rx="2" />
                                                <path d="M8 3v4M16 3v4" />
                                            </svg>
                                            <span>Voucher</span>
                                        </Link>
                                        <button className="w-full text-left px-4 py-3 text-[#FF6B00] font-semibold hover:bg-gray-50 transition">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth/login" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                                <User2 className="h-6 w-6 text-gray-600" />
                                <span className="font-medium text-gray-800">Profile</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
