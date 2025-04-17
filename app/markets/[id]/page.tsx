import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"

const supermarkets = [
    "Atlantic Centre Chevron (Lekki)",
    "Blenco (Abule-Egba)",
    "Blenco (Ajah)",
    "Blenco (Eputu)",
    "Blenco (Lekki)",
    "Blenco (Sangotedo)",
    "Jendol (Abule-Egba)",
    "Jendol (Abraham Adesanya Ajah)",
    "Jendol (Alakuko)",
    "Jendol (Egbeda)",
    "Jendol (Isheri)",
    "Shoprite (Circle Mall Jakande)",
    "Shoprite (Festival Mall, Festac Town)",
    "Shoprite (Ikeja City Mall, Obafemi Awolowo Wy)",
    "Shoprite (Leisure Mall Surulere)",
    "Shoprite (Lekki Mall)",
    "Shoprite (Sangotedo)",
    "Shoprite (The Palms Shopping Mall, Bisway St)",
    "Skymail (Shopping Mall, Ogidan Sangotedo)",
]

export default function SupermarketsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
                <Sidebar />
                <main className="flex-1 bg-gray-50 overflow-y-auto">
                    <div className="max-w-[1200px] mx-auto p-4 md:p-6">
                        <div className="mb-2">
                            <Link href="/markets" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                                <ChevronLeft className="h-5 w-5 mr-1" />
                                <span>Back</span>
                            </Link>
                        </div>

                        <h1 className="text-3xl font-bold mb-2">Available Supermarkets</h1>
                        <p className="text-[#00A67E] mb-6">Choose your favourite supermarket near you</p>

                        <div className="bg-white rounded-md overflow-hidden">
                            {supermarkets.map((supermarket, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer ${supermarket === "Blenco (Sangotedo)" ? "bg-gray-200" : ""
                                        }`}
                                >
                                    {supermarket}
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

