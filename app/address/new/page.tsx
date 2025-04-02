"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"

export default function NewAddressPage() {
    const [nickname, setNickname] = useState("")
    const [address, setAddress] = useState("")
    const [isDefault, setIsDefault] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [locationPermission, setLocationPermission] = useState<boolean | null>(null)

    const nicknames = ["Home", "Office", "Parent's House", "Friend's Place", "Other"]

    const handleSaveAddress = () => {
        // In a real app, you would save the address and redirect
        console.log("Saving address:", { nickname, address, isDefault })
    }

    const handleAllowLocation = () => {
        // In a real app, you would request location permission
        setLocationPermission(true)
    }

    const handleManualEntry = () => {
        setLocationPermission(false)
    }

    if (locationPermission === null) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
                    <div className="max-w-[600px] mx-auto">
                        <div className="mb-6">
                            <Link href="/address" className="inline-flex items-center text-gray-600">
                                <ChevronLeft className="h-5 w-5 mr-1" />
                                <span className="text-xl font-semibold">Location</span>
                            </Link>
                        </div>

                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-16 h-16 bg-[#E6F7F1] rounded-full flex items-center justify-center mb-6">
                                <MapIcon className="h-8 w-8 text-[#00A67E]" />
                            </div>

                            <h2 className="text-xl font-bold mb-2">What is Your Location?</h2>
                            <p className="text-gray-500 text-center mb-8 max-w-md">
                                We need to know your location in order to suggest nearby services.
                            </p>

                            <Button className="w-full max-w-md bg-[#00A67E] hover:bg-[#008F6B] mb-4" onClick={handleAllowLocation}>
                                Allow Location Access
                            </Button>

                            <button className="text-[#00A67E]" onClick={handleManualEntry}>
                                Enter Location Manually
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 flex flex-col md:flex-row">
                {/* Map Area */}
                <div className="flex-1 relative">
                    <div className="absolute top-4 left-4 z-10">
                        <Link href="/address" className="inline-flex items-center text-gray-600 bg-white p-2 rounded-md shadow">
                            <ChevronLeft className="h-5 w-5 mr-1" />
                            <span className="font-semibold">New Address</span>
                        </Link>
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                        <button className="bg-white p-2 rounded-md shadow">
                            <HelpCircle className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>

                    <div className="h-full w-full">
                        <Image src="/placeholder.svg?height=800&width=800" alt="Map" fill className="object-cover" />
                    </div>

                    <div className="absolute bottom-4 right-4 z-10">
                        <button className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 22v-5"></path>
                                <path d="M9 8l3-6 3 6"></path>
                                <path d="M18 12l-6 3-6-3"></path>
                                <path d="M12 17l-6-3 6-3 6 3-6 3z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Address Form */}
                <div className="w-full md:w-[350px] border-l p-6">
                    <h2 className="text-xl font-bold mb-6">Address</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address Nickname</label>
                            <div className="relative">
                                <button
                                    className="w-full flex items-center justify-between border rounded-md p-2.5"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <span className={nickname ? "text-black" : "text-gray-400"}>{nickname || "Choose one"}</span>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </button>

                                {showDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                                        {nicknames.map((name) => (
                                            <div
                                                key={name}
                                                className="p-2.5 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => {
                                                    setNickname(name)
                                                    setShowDropdown(false)
                                                }}
                                            >
                                                {name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                            <textarea
                                className="w-full border rounded-md p-2.5 min-h-[80px] resize-none"
                                placeholder="Enter your full address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="default"
                                checked={isDefault}
                                onCheckedChange={(checked) => setIsDefault(checked === true)}
                            />
                            <label
                                htmlFor="default"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Make this as a default address
                            </label>
                        </div>

                        <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]" onClick={handleSaveAddress}>
                            Apply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Custom Map Icon component
function MapIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z" />
        </svg>
    )
}

