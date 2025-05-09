"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, MapPin, Clock, Heart } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"

const supermarkets = [
    {
        id: "atlantic-centre",
        name: "Atlantic Centre Chevron (Lekki)",
        address: "Chevron Drive, Lekki",
        hours: "8:00 AM - 9:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [
            {
                author: "Adebayo Johnson",
                rating: 5,
                comment: "Great supermarket with a wide variety of products. The staff are friendly and prices are reasonable.",
            },
            {
                author: "Chioma Okafor",
                rating: 5,
                comment: "I love shopping here. You can find almost anything you need, though it can get crowded on weekends.",
            },
        ],
    },
    {
        id: "blenco-abule",
        name: "Blenco (Abule-Egba)",
        address: "Abule-Egba Junction, Lagos",
        hours: "8:00 AM - 10:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
    {
        id: "blenco-ajah",
        name: "Blenco (Ajah)",
        address: "Ajah Roundabout, Lagos",
        hours: "8:00 AM - 10:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
    {
        id: "blenco-eputu",
        name: "Blenco (Eputu)",
        address: "Eputu Town, Lekki",
        hours: "8:00 AM - 9:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
    {
        id: "blenco-lekki",
        name: "Blenco (Lekki)",
        address: "Lekki Phase 1, Lagos",
        hours: "8:00 AM - 10:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
    {
        id: "blenco-sangotedo",
        name: "Blenco (Sangotedo)",
        address: "Sangotedo, Ajah",
        hours: "8:00 AM - 9:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [
            {
                author: "Emmanuel Nwachukwu",
                rating: 5,
                comment: "Best supermarket in the area! Fresh produce and great prices. Highly recommended.",
            },
            {
                author: "Funke Akindele",
                rating: 4,
                comment: "Good selection of products and convenient location. Parking can be a challenge during peak hours.",
            },
        ],
    },
    {
        id: "jendol-abule",
        name: "Jendol (Abule-Egba)",
        address: "Abule-Egba, Lagos",
        hours: "8:00 AM - 9:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
    {
        id: "jendol-ajah",
        name: "Jendol (Abraham Adesanya Ajah)",
        address: "Abraham Adesanya Estate, Ajah",
        hours: "8:00 AM - 9:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
    {
        id: "jendol-alakuko",
        name: "Jendol (Alakuko)",
        address: "Alakuko, Lagos",
        hours: "8:00 AM - 9:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
    {
        id: "jendol-egbeda",
        name: "Jendol (Egbeda)",
        address: "Egbeda, Lagos",
        hours: "8:00 AM - 9:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
    {
        id: "jendol-isheri",
        name: "Jendol (Isheri)",
        address: "Isheri, Lagos",
        hours: "8:00 AM - 9:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
    {
        id: "shoprite-circle",
        name: "Shoprite (Circle Mall Jakande)",
        address: "Circle Mall, Jakande, Lekki",
        hours: "9:00 AM - 9:00 PM",
        image: "/shoprite-exterior.png",
        reviews: [],
    },
    {
        id: "shoprite-festac",
        name: "Shoprite (Festival Mall, Festac Town)",
        address: "Festival Mall, Festac Town",
        hours: "9:00 AM - 9:00 PM",
        image: "/shoprite-exterior.png",
        reviews: [],
    },
    {
        id: "shoprite-ikeja",
        name: "Shoprite (Ikeja City Mall, Obafemi Awolowo Wy)",
        address: "Ikeja City Mall, Obafemi Awolowo Way",
        hours: "9:00 AM - 9:00 PM",
        image: "/shoprite-exterior.png",
        reviews: [],
    },
    {
        id: "shoprite-surulere",
        name: "Shoprite (Leisure Mall Surulere)",
        address: "Leisure Mall, Surulere",
        hours: "9:00 AM - 9:00 PM",
        image: "/shoprite-exterior.png",
        reviews: [],
    },
    {
        id: "shoprite-lekki",
        name: "Shoprite (Lekki Mall)",
        address: "Lekki Mall, Lekki",
        hours: "9:00 AM - 9:00 PM",
        image: "/shoprite-exterior.png",
        reviews: [],
    },
    {
        id: "shoprite-sangotedo",
        name: "Shoprite (Sangotedo)",
        address: "Novare Mall, Sangotedo",
        hours: "9:00 AM - 9:00 PM",
        image: "/shoprite-exterior.png",
        reviews: [],
    },
    {
        id: "shoprite-palms",
        name: "Shoprite (The Palms Shopping Mall, Bisway St)",
        address: "The Palms Shopping Mall, Bisway Street",
        hours: "9:00 AM - 9:00 PM",
        image: "/shoprite-exterior.png",
        reviews: [],
    },
    {
        id: "skymall-sangotedo",
        name: "Skymall (Shopping Mall, Ogidan Sangotedo)",
        address: "Ogidan, Sangotedo",
        hours: "9:00 AM - 9:00 PM",
        image: "/supermarket-aisle.png",
        reviews: [],
    },
]

// Dummy products for demonstration
const dummyProducts = [
    { name: "5-alive Puppy Small (1 pack)", price: "₦6,000" },
    { name: "5-alive Berry Blast (1 pack)", price: "₦7,200" },
    { name: "Aquafina Water (1 pack) (minimum of 5 packs)", price: "₦2,500" },
    { name: "Bigi Apple Small (1 pack)", price: "₦2,200" },
    { name: "Bigi Orange (1 pack)", price: "₦2,200" },
    { name: "Bigi Tropical (1 pack)", price: "₦2,200" },
    { name: "Bigi Water (1 pack) (minimum of 5 packs)", price: "₦2,200" },
]

export default function SupermarketsPage() {
    const [selectedSupermarket, setSelectedSupermarket] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<"reviews" | "products">("reviews")

    const selectedSupermarketData = supermarkets.find((supermarket) => supermarket.id === selectedSupermarket)

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
                <Sidebar />
                <main className="flex-1 bg-gray-50 overflow-y-auto">
                    <div className="max-w-[1200px] mx-auto p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Panel - Supermarket List */}
                            <div className="w-full flex-1 bg-white rounded-lg shadow-sm">
                                <div className="p-4 border-b">
                                    <div className="flex items-center mb-2">
                                        <Link href="/markets" className="mr-3">
                                            <ChevronLeft className="h-5 w-5" />
                                        </Link>
                                        <h1 className="text-xl font-bold">Available Market</h1>
                                    </div>
                                    <p className="text-[#00A67E] font-medium">Choose your favourite supermarket near you</p>
                                </div>

                                <div className="max-h-[70vh] overflow-y-auto">
                                    {supermarkets.map((supermarket) => (
                                        <div
                                            key={supermarket.id}
                                            onClick={() => setSelectedSupermarket(supermarket.id)}
                                            className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedSupermarket === supermarket.id ? "bg-gray-200" : ""
                                                }`}
                                        >
                                            {supermarket.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Panel - Supermarket Details */}
                            <div className="w-full flex-1 bg-white rounded-2xl shadow-lg p-0 flex flex-col">
                                {selectedSupermarketData ? (
                                    <div className="flex flex-col h-full">
                                        {/* Image with Heart Icon Overlay */}
                                        <div className="relative rounded-t-2xl overflow-hidden h-[150px] w-full">
                                            <Image
                                                src={selectedSupermarketData.image || "/placeholder.svg"}
                                                alt={selectedSupermarketData.name}
                                                fill
                                                className="object-cover w-full h-full"
                                            />
                                            <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                                                <Heart className="h-5 w-5 text-[#00A67E]" />
                                            </button>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h2 className="text-2xl font-bold mb-2 text-center">{selectedSupermarketData.name}</h2>
                                            <div className="flex items-center text-gray-600 mb-2 justify-center">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                <span className="text-sm">{selectedSupermarketData.address}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-4 justify-center">
                                                <Clock className="h-4 w-4 mr-2" />
                                                <span className="text-sm">{selectedSupermarketData.hours}</span>
                                                <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Open Now</span>
                                            </div>
                                            {/* Tabs */}
                                            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                                                <button
                                                    className={`flex-1 py-2 font-medium rounded-lg transition-all text-sm ${activeTab === "reviews" ? "bg-white shadow text-[#00A67E]" : "text-gray-500"}`}
                                                    onClick={() => setActiveTab("reviews")}
                                                >
                                                    Review & Ratings
                                                </button>
                                                <button
                                                    className={`flex-1 py-2 font-medium rounded-lg transition-all text-sm ${activeTab === "products" ? "bg-white shadow text-[#00A67E]" : "text-gray-500"}`}
                                                    onClick={() => setActiveTab("products")}
                                                >
                                                    Available Products
                                                </button>
                                            </div>
                                            {/* Reviews Tab */}
                                            {activeTab === "reviews" ? (
                                                <>
                                                    {selectedSupermarketData.reviews.length > 0 ? (
                                                        <div className="space-y-4 mb-4 max-h-[180px] overflow-y-auto pr-1">
                                                            {selectedSupermarketData.reviews.map((review, index) => (
                                                                <div key={index} className="flex items-start gap-3 border-b pb-3">
                                                                    <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                                                        <Image
                                                                            src={`/placeholder.svg?height=36&width=36&query=avatar`}
                                                                            alt={review.author}
                                                                            width={36}
                                                                            height={36}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2">
                                                                            <p className="font-semibold text-sm">{review.author}</p>
                                                                            <div className="flex text-yellow-400 text-xs">
                                                                                {Array(review.rating).fill(0).map((_, i) => <span key={i}>★</span>)}
                                                                                {Array(5 - review.rating).fill(0).map((_, i) => <span key={i} className="text-gray-300">★</span>)}
                                                                            </div>
                                                                        </div>
                                                                        <p className="text-xs text-gray-600 mt-1">{review.comment}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                                            <Image src="/icons/empty-cart.png" alt="No reviews" width={48} height={48} />
                                                            <p className="mt-2 text-sm">No reviews yet for this market</p>
                                                        </div>
                                                    )}
                                                    <button className="w-full border border-[#00A67E] text-[#00A67E] rounded-lg py-2 font-medium mb-8 transition-colors hover:bg-[#00A67E]/10">
                                                        Write a Review
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="mb-4">
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                placeholder="Search markets or items"
                                                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A67E] bg-white"
                                                            />
                                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg overflow-hidden border border-gray-200 divide-y divide-gray-100 mb-8 bg-gray-50">
                                                        {dummyProducts.map((product, idx) => (
                                                            <div key={idx} className="flex items-center justify-between px-4 py-3 text-sm">
                                                                <span className="text-gray-700">{product.name}</span>
                                                                <span className="font-semibold text-gray-900">{product.price}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                            <button className="w-full bg-[#00A67E] text-white rounded-lg py-3 font-semibold text-base mt-auto transition-colors hover:bg-[#008F6B]">
                                                Start Shopping in this Market
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
                                        <div className="w-16 h-16 mb-4">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1"
                                                className="text-gray-300"
                                            >
                                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path d="M9 22V12h6v10" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-500">Choose a market</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
