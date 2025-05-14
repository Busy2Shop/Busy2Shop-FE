"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import "./home-content.module.css";
import { useMediaQuery } from "@/hooks/use-media-query";

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
    const isMobile = useMediaQuery("(max-width: 768px)");
    const categoriesRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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

    // Handle touch events for mobile categories
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - (categoriesRef.current?.offsetLeft || 0));
        setScrollLeft(categoriesRef.current?.scrollLeft || 0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - (categoriesRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (categoriesRef.current) {
            categoriesRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div className="w-full px-4 sm:px-6 md:px-12 pt-0">
            {/* HOT Deals Flash Banner */}
            <div className="w-full mb-6">
                <div
                    className="relative flex items-center justify-between bg-primary rounded-2xl shadow-2xl p-4 sm:p-8 text-white overflow-hidden"
                    style={{ boxShadow: "0 8px 32px 0 rgba(0,166,126,0.25)", background: "linear-gradient(135deg, #00A67E 60%, #00C896 100%)" }}
                >
                    <div className="flex flex-col gap-2 z-10">
                        <span className="text-2xl sm:text-4xl font-extrabold drop-shadow-lg tracking-tight">HOT Deals</span>
                        <span className="text-sm sm:text-lg font-medium opacity-90">Flash sales & trending offers, just for you!</span>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-end pointer-events-none">
                        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                            <circle cx="90" cy="90" r="90" fill="#fff" />
                        </svg>
                    </div>
                    <span className="absolute top-4 right-8 bg-white text-secondary-foreground font-bold px-4 py-1 rounded-full shadow-md text-lg z-20 animate-pulse border-2 border-primary">
                        HOT
                    </span>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-end">
                {/* Main Content (2/3 width) */}
                <div className="w-full lg:w-2/3">
                    {/* Shop by Categories Section */}
                    <div className="mb-8 relative">
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <h2 className="text-xl sm:text-2xl font-bold">Popular Categories</h2>
                            <div className="md:hidden">
                                <Link href="/categories" className="text-sm text-[#556070] hover:text-[#00A67E] transition-colors">
                                    Explore Categories
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <button
                                    ref={buttonRef}
                                    className="flex items-center gap-1 text-[#556070] text-base font-normal focus:outline-none focus:underline hover:underline p-0 bg-transparent border-none shadow-none"
                                    onClick={() => setShowCategories((v) => !v)}
                                    aria-expanded="false"
                                    aria-controls="categories-dropdown"
                                >
                                    Select Category
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>

                        {/* Featured/Popular Categories - Now scrollable on mobile */}
                        <div
                            ref={categoriesRef}
                            className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {foodItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="category-item flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer"
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
                                    <span className="category-text text-center font-semibold text-gray-700">{item.name}</span>
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
                    <div className="relative h-[200px] sm:h-[300px] rounded-lg overflow-hidden">
                        {promoBanners.map((banner, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                    index === activeSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                                }`}
                            >
                                <Image src={banner.image} alt={banner.alt} fill className="object-cover" priority={index === 0} />
                            </div>
                        ))}
                        {/* Navigation Dots */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {promoBanners.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                        index === activeSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Content (1/3 width) */}
                <div className="w-full lg:w-1/3 flex flex-col gap-8">
                    {/* Tablet-style Sell on Busy2Shop Card */}
                    <div
                        className="rounded-3xl p-6 shadow-lg relative flex flex-col items-stretch"
                        style={{
                            background: "linear-gradient(135deg, #FF7A00 60%, #FFB800 100%)",
                            boxShadow: "0 8px 32px 0 rgba(255,122,0,0.15)",
                            minHeight: 420,
                        }}
                    >
                        {/* Sell on Busy2Shop Action Button */}
                        <Link
                            href={"/sell"}
                            className="w-full flex items-center justify-center bg-white text-[#FF7A00] hover:bg-[#FFB800] hover:text-white font-bold text-base py-3 rounded-xl shadow transition-colors mb-4 border-2 border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                            style={{ letterSpacing: 0.5 }}
                        >
                            <span className="mr-2">Become a Seller</span>
                        </Link>
                        <div className="flex items-center mb-3">
                            <div>
                                <h2 className="text-sm font-semibold text-white mb-1">Want to reach more customers?</h2>
                                <p className="text-xs text-white/90 leading-snug">
                                    List your products or get your business featured on our platform!
                                </p>
                            </div>
                        </div>
                        {/* Create Shopping List - Primary Action */}
                        <Link
                            href={"/shopping-list"}
                            className={cn(
                                buttonVariants({ variant: "default" }),
                                "w-full flex items-center justify-center bg-[#00A67E] text-white hover:bg-[#008F6B] font-extrabold text-lg py-4 rounded-2xl shadow-lg transition-colors mt-2 mb-7 border-2 border-white focus:outline-none focus:ring-2 focus:ring-[#00A67E]"
                            )}
                            style={{ boxShadow: "0 4px 16px 0 rgba(0,166,126,0.18)" }}
                        >
                            <Plus className="h-6 w-6 mr-2" />
                            Create Shopping List
                        </Link>
                        <div className="flex items-center my-2">
                            <div className="flex-1 h-px bg-white/30" />
                            <span className="mx-2 text-xs text-white/70 font-medium">Special Offers</span>
                            <div className="flex-1 h-px bg-white/30" />
                        </div>
                        {/* Special Offers Cube Slider */}
                        <div className="relative h-[220px] w-full overflow-hidden rounded-2xl mt-2 mb-1 bg-white/80 shadow-inner flex items-center justify-center">
                            <div
                                className={`absolute inset-0 transition-all duration-700 cubeSlide ${cubeDirection} ${
                                    isTransitioning ? "active" : ""
                                }`}
                                style={{ padding: 12 }}
                            >
                                <Image
                                    src={promoBanners[currentCubeIndex].image}
                                    alt={promoBanners[currentCubeIndex].alt}
                                    fill
                                    className="object-cover rounded-2xl"
                                />
                            </div>
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
                                {promoBanners.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2.5 h-2.5 rounded-full border border-[#FF7A00] transition-all duration-200 ${
                                            index === currentCubeIndex ? "bg-[#FF7A00]" : "bg-white/70 hover:bg-[#FFB800]"
                                        }`}
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
            <div className="mb-8 mt-8 sm:mt-12">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Markets to Buy from</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {markets.map((market, index) => (
                        <Link
                            href="/markets"
                            key={index}
                            className="border overflow-hidden shadow-md bg-white hover:scale-105 transition-transform block"
                        >
                            <div className="h-[120px] sm:h-[150px] relative">
                                <Image src={market.image || "/placeholder.svg"} alt={market.name} fill className="object-cover" />
                            </div>
                            <div className="p-3 text-center">
                                <h3 className="font-medium text-gray-800 text-sm sm:text-base">{market.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Referral Banner */}
            <div className="rounded-lg overflow-hidden mt-6 sm:mt-8">
                <div className="relative bg-gradient-to-r from-[#32B768] via-[#A16207] to-[#EA580C] p-4 sm:p-6 flex flex-col sm:flex-row items-center">
                    <div className="flex-1 text-white text-center sm:text-left">
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">Refer & Earn!</h2>
                        <p className="mb-4 text-sm sm:text-base">
                            Invite your friends & family and you will both get instant cash rewards upon purchase.
                        </p>
                        <Button className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-none">Share Now</Button>
                    </div>
                    <div className="flex-1 flex justify-center sm:justify-end mt-4 sm:mt-0">
                        <div className="relative h-[120px] sm:h-[160px] w-[240px] sm:w-[300px]">
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

// Add this CSS to your home-content.module.css file
const styles = `
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
`;
