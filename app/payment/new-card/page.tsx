"use client"

import Link from "next/link"
import { ChevronLeft, HelpCircle } from "lucide-react"

export default function NewCardPage() {
    return (
        <div className="w-full max-w-3xl mx-auto px-4 pt-4 pb-20">
            <div className="flex items-center mb-8">
                <Link href="/payment" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800 ml-2">New Card</h1>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-md mx-auto">
                <h2 className="text-base font-medium text-gray-800 mb-4">Add Debit or Credit Card</h2>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-800">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            placeholder="Enter your card number"
                            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00AA88]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-800">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                id="expiryDate"
                                placeholder="MM/YY"
                                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00AA88]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="securityCode" className="block text-sm font-medium text-gray-800">
                                Security Code
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="securityCode"
                                    placeholder="CVC"
                                    className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00AA88]"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    aria-label="Help"
                                >
                                    <HelpCircle className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full h-12 bg-[#00AA88] text-white font-medium rounded-md mt-4">
                        Add Card
                    </button>
                </form>
            </div>
        </div>
    )
}

