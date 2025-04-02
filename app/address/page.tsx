"use client"

import { useState } from "react"
import { ChevronLeft, MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/navbar"

interface Address {
    id: string
    nickname: string
    address: string
    isDefault: boolean
}

export default function AddressPage() {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: "1",
            nickname: "Home",
            address: "123 Balogun Express Way, Lagos",
            isDefault: true,
        },
        {
            id: "2",
            nickname: "Office",
            address: "123 Balogun Express Way, Lagos",
            isDefault: false,
        },
        {
            id: "3",
            nickname: "Parent's House",
            address: "123 Balogun Express Way, Lagos",
            isDefault: false,
        },
    ])

    const [selectedAddress, setSelectedAddress] = useState<string>("1")

    const handleSelectAddress = (id: string) => {
        setSelectedAddress(id)
    }

    const handleApply = () => {
        // In a real app, you would save the selected address and redirect
        console.log(
            "Selected address:",
            addresses.find((a) => a.id === selectedAddress),
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
                <div className="max-w-[600px] mx-auto">
                    <div className="mb-6">
                        <Link href="/" className="inline-flex items-center text-gray-600">
                            <ChevronLeft className="h-5 w-5 mr-1" />
                            <span className="text-xl font-semibold">Address</span>
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg border p-4">
                        <h2 className="font-medium mb-4">Saved Address</h2>

                        <div className="space-y-3 mb-4">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="flex items-center p-3 border rounded-md cursor-pointer"
                                    onClick={() => handleSelectAddress(address.id)}
                                >
                                    <div className="mr-3">
                                        <MapPin className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <span className="font-medium">{address.nickname}</span>
                                            {address.isDefault && (
                                                <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">Default</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">{address.address}</div>
                                    </div>
                                    <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                                        {selectedAddress === address.id && <div className="h-3 w-3 rounded-full bg-black"></div>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link href="/address/new">
                            <Button variant="outline" className="w-full flex items-center justify-center mb-4">
                                <Plus className="h-4 w-4 mr-2" />
                                Add New Address
                            </Button>
                        </Link>

                        <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]" onClick={handleApply}>
                            Apply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

