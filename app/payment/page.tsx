"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Plus } from "lucide-react"

export default function PaymentMethodPage() {
    // Toggle between no cards and saved cards views
    const [hasCards, setHasCards] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet")

    // Toggle function for demo purposes
    const toggleCardsView = () => {
        setHasCards(!hasCards)
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pt-4 pb-20">
            <div className="flex items-center mb-8">
                <Link href="#" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800 ml-2">Payment Method</h1>
            </div>

            {/* Toggle button for demo purposes */}
            <div className="mb-6 flex justify-center">
                <button onClick={toggleCardsView} className="px-4 py-2 bg-gray-100 rounded-md text-sm text-gray-700">
                    Toggle Cards View (Demo)
                </button>
            </div>

            {!hasCards ? (
                // No cards available view
                <div className="flex flex-col items-center justify-center mt-8">
                    <div className="w-48 h-48 relative mb-6">
                        <Image src="/credit-card.png" alt="Credit Card" width={200} height={200} priority />
                    </div>
                    <p className="text-lg font-medium text-gray-800 mb-8">No Card Added Yet!</p>
                    <Link
                        href="/payment/new-card"
                        className="flex items-center justify-center w-full max-w-md h-12 border border-gray-300 rounded-md text-gray-800 font-medium"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Card
                    </Link>
                </div>
            ) : (
                // Saved cards view
                <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-md mx-auto">
                    <h2 className="text-base font-medium text-gray-800 mb-4">Saved Cards</h2>

                    <div className="space-y-3">
                        {/* Wallet Option */}
                        <div
                            className={`flex items-center justify-between p-3 border rounded-md ${selectedPaymentMethod === "wallet" ? "border-[#00AA88]" : "border-gray-200"
                                }`}
                            onClick={() => setSelectedPaymentMethod("wallet")}
                        >
                            <div className="flex items-center">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                            stroke="#333333"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path d="M3 10H21" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="ml-2">
                                    <p className="font-medium text-gray-800">Wallet</p>
                                    <div className="flex items-center">
                                        <p className="text-xs text-gray-500">Balance NGN3,900</p>
                                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">Default</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border border-[#00AA88] flex items-center justify-center">
                                {selectedPaymentMethod === "wallet" && <div className="w-3 h-3 rounded-full bg-[#00AA88]"></div>}
                            </div>
                        </div>

                        {/* Visa Card */}
                        <div
                            className={`flex items-center justify-between p-3 border rounded-md ${selectedPaymentMethod === "visa" ? "border-[#00AA88]" : "border-gray-200"
                                }`}
                            onClick={() => setSelectedPaymentMethod("visa")}
                        >
                            <div className="flex items-center">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <svg width="40" height="13" viewBox="0 0 40 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.5 1.5L15 11.5H11.5L8 1.5H11.5L13.5 8L15.5 1.5H18.5Z" fill="#172B85" />
                                        <path d="M19.5 1.5H22.5L20 11.5H17L19.5 1.5Z" fill="#172B85" />
                                        <path
                                            d="M30 1.5L33 11.5H29.5L29 10H25L24.5 11.5H21L24 1.5H30ZM28 7.5L27 4L26 7.5H28Z"
                                            fill="#172B85"
                                        />
                                        <path d="M33.5 1.5L32 5L31 7.5L34 11.5H38L40 1.5H37L36 7.5L34 4.5L35 1.5H33.5Z" fill="#172B85" />
                                    </svg>
                                </div>
                                <div className="ml-2">
                                    <p className="font-medium text-gray-800">**** **** **** 2512</p>
                                    <p className="text-xs text-gray-500">Expiry 06/27</p>
                                </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border border-[#00AA88] flex items-center justify-center">
                                {selectedPaymentMethod === "visa" && <div className="w-3 h-3 rounded-full bg-[#00AA88]"></div>}
                            </div>
                        </div>

                        {/* Bank Transfer */}
                        <div
                            className={`flex items-center justify-between p-3 border rounded-md ${selectedPaymentMethod === "bank" ? "border-[#00AA88]" : "border-gray-200"
                                }`}
                            onClick={() => setSelectedPaymentMethod("bank")}
                        >
                            <div className="flex items-center">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 21H21" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 10H21" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path
                                            d="M5 6L12 3L19 6"
                                            stroke="#333333"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path d="M4 10V21" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 10V21" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 14V17" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 14V17" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 14V17" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="ml-2">
                                    <p className="font-medium text-gray-800">Bank Transfer</p>
                                </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border border-[#00AA88] flex items-center justify-center">
                                {selectedPaymentMethod === "bank" && <div className="w-3 h-3 rounded-full bg-[#00AA88]"></div>}
                            </div>
                        </div>
                    </div>

                    {/* Add New Card Button */}
                    <Link
                        href="/payment/new-card"
                        className="flex items-center justify-center w-full h-12 border border-gray-300 rounded-md text-gray-800 font-medium mt-4"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Card
                    </Link>

                    {/* Apply Button */}
                    <button className="flex items-center justify-center w-full h-12 bg-[#00AA88] rounded-md text-white font-medium mt-4">
                        Apply
                    </button>
                </div>
            )}
        </div>
    )
}

