"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { toast } from "react-toastify"

export default function TransactionPinPage() {
    const [pin, setPin] = useState(["", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newPin = [...pin]
            newPin[index] = value
            setPin(newPin)

            // Move to next input if value is entered
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSave = () => {
        // In a real app, save the PIN securely
        toast.success("PIN saved successfully")
    };

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus()
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
                <div className="max-w-[500px] mx-auto">
                    <div className="mb-6">
                        <Link href="/profile" className="flex items-center mb-4 text-gray-700 hover:text-gray-900">
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Back to Profile
                        </Link>
                    </div>

                    <div className="flex flex-col items-center justify-center py-8">
                        <h1 className="text-3xl font-bold text-[#00A67E] mb-2">PIN</h1>
                        <p className="text-gray-500 mb-8">Enter your transaction pin</p>

                        <div className="flex gap-4 mb-12">
                            {[0, 1, 2, 3].map((index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    type="password"
                                    maxLength={1}
                                    value={pin[index]}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center border rounded-md focus:border-[#00A67E] focus:ring-1 focus:ring-[#00A67E] focus:outline-none text-xl"
                                />
                            ))}
                        </div>

                        <button
                            className="bg-[#00A67E] hover:bg-[#008F6B] text-white font-semibold py-2 px-8 rounded mb-6"
                            onClick={handleSave}
                        >
                            Save
                        </button>

                        <p className="text-xs text-gray-500 text-center">
                            By continuing, you agree to our{" "}
                            <Link href="/terms" className="text-[#00A67E]">
                                Terms of Service and Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}