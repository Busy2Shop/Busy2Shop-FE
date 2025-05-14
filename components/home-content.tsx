"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "./home-content.module.css";

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
];

// Markets for Markets section
const markets = [
    { name: "Supermarkets", image: "/images/supermarket.png" },
    { name: "Local Markets", image: "/images/localmarket.png" },
    { name: "Computer Village", image: "/images/computer-village.png" },
    { name: "Water/ Drinks (sangotedo)", image: "/images/water-drinks.png" },
    { name: "Alaba International Market", image: "/images/alaba-market.png" },
    { name: "Original Vietnam Hair ...", image: "/images/hair-market.png" },
];

// Example sidebar categories and main categories
const sidebarCategories = [
    "Featured",
    "Home & Kitchen",
    "Women's Clothing",
    "Women's Curve Clothing",
    "Women's Shoes",
    "Women's Lingerie & Lounge...",
    "Men's Clothing",
    "Men's Shoes",
    "Men's Big & Tall",
    "Men's Underwear & Sleep...",
    "Sports & Outdoors",
    "Jewelry & Accessories",
    "Beauty & Health",
    "Toys & Games",
    "Automotive",
    "Kids' Fashion",
    "Kids' Shoes",
    "Baby & Maternity",
];

// Fix sidebarCategoryItems typing
type SidebarCategoryItem = { name: string; image: string; hot?: boolean };
const sidebarCategoryItems: { [key: string]: SidebarCategoryItem[] } = {
    "Home & Kitchen": [
        { name: "Cookware", image: "/images/cat1.png" },
        { name: "Bakeware", image: "/images/cat2.png" },
        { name: "Kitchen Tools", image: "/images/cat3.png" },
        { name: "Tableware", image: "/images/cat4.png" },
    ],
    "Women's Clothing": [
        { name: "Blouses & Shirts", image: "/images/cat2.png", hot: true },
        { name: "Pants", image: "/images/cat3.png" },
        { name: "Dresses", image: "/images/cat4.png", hot: true },
        { name: "Beauty Tools", image: "/images/cat5.png" },
    ],
    // ... add more mappings as needed ...
};

const mainCategories = [
    { name: "Personalized Products", image: "/images/cat1.png" },
    { name: "Office & School Supplies", image: "/images/cat2.png" },
    { name: "Papers, Labels & Indexes", image: "/images/cat3.png" },
    { name: "Writing Supplies & Correction", image: "/images/cat4.png" },
    { name: "Greeting Cards & Postcards", image: "/images/cat5.png" },
    { name: "Storage & Organization", image: "/images/cat6.png" },
    { name: "Office Electronics", image: "/images/cat7.png" },
    { name: "Gift Wrap & Crafts", image: "/images/cat8.png" },
    { name: "Tape, Adhesives & Fasteners", image: "/images/cat9.png" },
    { name: "Office Lighting", image: "/images/cat10.png" },
    { name: "Desk Accessories", image: "/images/cat11.png" },
    { name: "Carrying Cases", image: "/images/cat12.png" },
    { name: "Office Furniture & Parts", image: "/images/cat13.png" },
    { name: "Packing & Shipping", image: "/images/cat14.png" },
    { name: "Stationery Stickers", image: "/images/cat15.png" },
];

const promoBanners = [
    { image: "/images/banner.png", alt: "Special Offer Banner 1" },
    { image: "/images/banner.png", alt: "Special Offer Banner 2" },
    { image: "/images/banner.png", alt: "Special Offer Banner 3" },
];

export default function HomeContent() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [showCategories, setShowCategories] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [selectedSidebar, setSelectedSidebar] = useState("Featured");

    // Cube Slider state
    const [currentCubeIndex, setCurrentCubeIndex] = useState(0);
    const [cubeDirection, setCubeDirection] = useState("left");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const cubeTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Accessibility: close on ESC
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setShowCategories(false);
        }
        if (showCategories) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [showCategories]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setShowCategories(false);
            }
        }
        if (showCategories) {
            document.addEventListener("mousedown", handleClick);
        } else {
            document.removeEventListener("mousedown", handleClick);
        }
        return () => document.removeEventListener("mousedown", handleClick);
    }, [showCategories]);

    // Auto-slide effect for main banner
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % promoBanners.length);
        }, 8000); // Slower transition for better readability
        return () => clearInterval(interval);
    }, []);

    // Function to rotate cube to next slide with a specific direction
    const rotateToNextSlide = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Randomly select a direction for the cube rotation
        const directions = ["left", "right", "up", "down"];
        const newDirection = directions[Math.floor(Math.random() * directions.length)];
        setCubeDirection(newDirection);

        // After transition ends, update the index and reset
        setTimeout(() => {
            setCurrentCubeIndex((prev) => (prev + 1) % promoBanners.length);
            setIsTransitioning(false);
        }, 1500); // Match the transition duration
    };

    // Auto rotation for cube slider
    useEffect(() => {
        // Start the interval for cube rotation - 5 seconds between rotations
        cubeTimerRef.current = setInterval(rotateToNextSlide, 5000);

        return () => {
            if (cubeTimerRef.current) {
                clearInterval(cubeTimerRef.current);
            }
        };
    }, []);

    // Calculate rotation values based on direction
    const getRotationStyle = () => {
        if (!isTransitioning) return { transform: "rotateX(0deg) rotateY(0deg)" };

        switch (cubeDirection) {
            case "left":
                return { transform: "rotateY(90deg)" };
            case "right":
                return { transform: "rotateY(-90deg)" };
            case "up":
                return { transform: "rotateX(-90deg)" };
            case "down":
                return { transform: "rotateX(90deg)" };
            default:
                return { transform: "rotateY(0deg) rotateX(0deg)" };
        }
    };

    return (
        <div className="w-full p-12 pt-0">
            <div className="flex gap-6 items-end">
                {/* Main Content (2/3 width) */}
                <div className="w-2/3">
                    {/* Shop by Categories Section */}
                    <div className="mb-8 relative">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-2xl font-bold">Popular Categories</h2>
                            <button
                                ref={buttonRef}
                                className="flex items-center gap-1 text-[#556070] text-base font-normal focus:outline-none focus:underline hover:underline p-0 bg-transparent border-none shadow-none"
                                style={{ boxShadow: "none", border: "none" }}
                                onClick={() => setShowCategories((v) => !v)}
                                aria-expanded="false"
                                aria-controls="categories-dropdown"
                            >
                                Select Category
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>

                        {/* Featured/Popular Categories always visible */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-4">
                            {foodItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center bg-white rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer"
                                >
                                    <div className="rounded-full overflow-hidden mb-2 border-2 border-[#00A67E]/30">
                                        <Image
                                            src={item.image || "/images/dish-1.png"}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-xs text-center font-semibold text-gray-700">{item.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Dropdown as floating popover/modal */}
                        {showCategories && (
                            <div
                                ref={dropdownRef}
                                id="categories-dropdown"
                                role="dialog"
                                aria-modal="true"
                                tabIndex={-1}
                                className="absolute z-50 left-0 mt-1 w-full max-w-[90vw] bg-white border rounded-lg transition-all duration-200"
                                style={{
                                    top: buttonRef.current ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight + 4 : "44px",
                                    left: buttonRef.current ? buttonRef.current.offsetLeft : 0,
                                }}
                                onMouseLeave={() => setShowCategories(false)}
                            >
                                {/* Triangle pointer */}
                                <div aria-hidden="true" className="absolute -top-2 left-8 sm:left-10 w-4 h-4" style={{ zIndex: 51 }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" className="block mx-auto">
                                        <polygon points="8,0 16,16 0,16" className="fill-white stroke-gray-200" />
                                    </svg>
                                </div>
                                <div className="flex flex-col sm:flex-row h-[500px]">
                                    {/* Sidebar for Top Markets/Categories */}
                                    <aside className="w-full sm:w-64 bg-gray-50 border-r p-4 overflow-y-auto">
                                        <ul className="space-y-1">
                                            {sidebarCategories.map((cat) => (
                                                <li
                                                    key={cat}
                                                    className={`py-2 px-3 rounded-md cursor-pointer text-sm font-medium text-gray-700 transition-colors ${
                                                        selectedSidebar === cat ? "bg-[#E5F4F1] text-[#00A67E]" : "hover:bg-gray-100"
                                                    }`}
                                                    onClick={() => setSelectedSidebar(cat)}
                                                >
                                                    {cat}
                                                </li>
                                            ))}
                                        </ul>
                                    </aside>
                                    {/* Main grid for categories */}
                                    <div className="flex-1 p-6 overflow-y-auto">
                                        {selectedSidebar === "Featured" ? (
                                            <>
                                                <h3 className="text-lg font-semibold mb-4">Featured Categories</h3>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                    {foodItems.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex flex-col items-center bg-white rounded-lg p-3 hover:scale-105 transition-transform cursor-pointer"
                                                        >
                                                            <div className="rounded-full overflow-hidden mb-2 border-2 border-[#00A67E]/30">
                                                                <Image
                                                                    src={item.image || "/images/dish-1.png"}
                                                                    alt={item.name}
                                                                    width={80}
                                                                    height={80}
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                            <span className="text-sm text-center font-medium text-gray-700">{item.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <h3 className="text-lg font-semibold mb-4">{selectedSidebar} Categories</h3>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                    {(sidebarCategoryItems[selectedSidebar] || []).map((cat: SidebarCategoryItem) => (
                                                        <div
                                                            key={cat.name}
                                                            className="flex flex-col items-center bg-white rounded-lg p-3 hover:scale-105 transition-transform cursor-pointer"
                                                        >
                                                            <div className="rounded-full overflow-hidden mb-2 border-2 border-[#00A67E]/30 w-20 h-20 flex items-center justify-center bg-white relative">
                                                                <Image
                                                                    src={cat.image}
                                                                    alt={cat.name}
                                                                    width={80}
                                                                    height={80}
                                                                    className="object-cover"
                                                                />
                                                                {cat.hot && (
                                                                    <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] px-1 rounded">
                                                                        HOT
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-sm text-center font-medium text-gray-700">{cat.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Promotion Banner */}
                    <div>
                        <div className="relative h-[300px] rounded-lg overflow-hidden">
                            {promoBanners.map((banner, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                        index === activeSlide 
                                            ? 'opacity-100 translate-x-0' 
                                            : 'opacity-0 translate-x-full'
                                    }`}
                                >
                                <Image
                                        src={banner.image}
                                        alt={banner.alt}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Navigation Dots */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {promoBanners.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === activeSlide 
                                            ? 'bg-white scale-125' 
                                            : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Content (1/3 width) */}
                <div className="w-1/3 flex flex-col gap-6">
                    {/* Welcome Section with Shopping List */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center mb-4">
                            <Avatar className="h-12 w-12 mr-3">
                                <AvatarImage src="/images/Avatar.png" alt="Lucy" />
                                <AvatarFallback>LW</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-medium">Hi, Lucy</h2>
                                <p className="text-gray-600">Welcome back to waka2shop</p>
                            </div>
                        </div>
                        <Link
                            href={"/shopping-list"}
                            className={cn(
                                buttonVariants({ variant: "default" }),
                                "w-full flex items-center justify-center bg-[#00A67E] hover:bg-[#008F6B] text-white"
                            )}
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Create Shopping List
                        </Link>
                    </div>

                    {/* IMPROVED CUBE SLIDER */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Special Offers</h3>
                        <div className="relative h-[300px] w-full overflow-hidden rounded-lg cubePerspective">
                            <div className={`absolute inset-0 transition-all duration-700 cubeSlide ${cubeDirection} ${isTransitioning ? 'active' : ''}`}>
                                <Image
                                    src={promoBanners[currentCubeIndex].image}
                                    alt={promoBanners[currentCubeIndex].alt}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                {promoBanners.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${index === currentCubeIndex ? 'bg-white' : 'bg-white/50'}`}
                                        onClick={() => setCurrentCubeIndex(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Markets List */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Markets to Buy from</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {markets.map((market, index) => (
                        <Link
                            href="/markets"
                            key={index}
                            className="border overflow-hidden shadow-md bg-white hover:scale-105 transition-transform block"
                        >
                            <div className="h-[150px] relative">
                                <Image src={market.image || "/placeholder.svg"} alt={market.name} fill className="object-cover" />
                            </div>
                            <div className="p-3 text-center">
                                <h3 className="font-medium text-gray-800">{market.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Referral Banner */}
            <div className="rounded-lg overflow-hidden mt-8">
                <div className="relative bg-gradient-to-r from-[#32B768] via-[#A16207] to-[#EA580C] p-6 flex items-center">
                    <div className="flex-1 text-white">
                        <h2 className="text-2xl font-bold mb-2">Refer & Earn!</h2>
                        <p className="mb-4">Invite your friends & family and you will both get instant cash rewards upon purchase.</p>
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
    );
}
