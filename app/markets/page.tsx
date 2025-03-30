import { ChevronLeft, ChevronDown, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"

const markets = [
    { name: "Supermarkets", image: "/placeholder.svg?height=200&width=300", href: "/markets/supermarkets" },
    {
        name: "Water/ Drinks (Sangotedo Warehouse)",
        image: "/placeholder.svg?height=200&width=300",
        href: "/markets/water-drinks",
    },
    {
        name: "Local Markets near you",
        image: "/placeholder.svg?height=200&width=300",
        highlight: true,
        href: "/markets/local",
    },
    { name: "Alaba International Market", image: "/placeholder.svg?height=200&width=300", href: "/markets/alaba" },
    { name: "Computer Village", image: "/placeholder.svg?height=200&width=300", href: "/markets/computer-village" },
    {
        name: "Original Vietnam Hair Importation",
        image: "/placeholder.svg?height=200&width=300",
        href: "/markets/vietnam-hair",
    },
    { name: "Wine & Liquor", image: "/placeholder.svg?height=200&width=300", href: "/markets/wine-liquor" },
    { name: "Furniture", image: "/placeholder.svg?height=200&width=300", href: "/markets/furniture" },
    { name: "Mile 2 Market", image: "/placeholder.svg?height=200&width=300", href: "/markets/mile-2" },
    { name: "Balogun Market", image: "/placeholder.svg?height=200&width=300", href: "/markets/balogun" },
    { name: "Trade Fair", image: "/placeholder.svg?height=200&width=300", href: "/markets/trade-fair" },
]

export default function MarketsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <Link href="/" className="mr-3">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <h1 className="text-2xl font-bold">Choose a Market</h1>
                            </div>

                            <div className="relative">
                                <Button variant="outline" className="flex items-center text-[#00A67E] border-[#00A67E]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <span>Filter/type Shopping Location</span>
                                    <ChevronDown className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {markets.map((market, index) => (
                                <Link key={index} href={market.href} className="rounded-lg overflow-hidden border">
                                    <div className="relative">
                                        <div className="h-[180px] w-full relative">
                                            <Image src={market.image || "/placeholder.svg"} alt={market.name} fill className="object-cover" />
                                        </div>
                                        <div
                                            className={`absolute bottom-0 left-0 right-0 flex justify-between items-center p-3 ${market.highlight ? "bg-[#00A67E]" : "bg-white border-t"
                                                }`}
                                        >
                                            <h3 className={`font-medium ${market.highlight ? "text-white" : ""}`}>{market.name}</h3>
                                            <ChevronDown className={`h-5 w-5 ${market.highlight ? "text-white" : ""}`} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

