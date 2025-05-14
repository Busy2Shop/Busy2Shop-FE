"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Plus, HelpCircle } from "lucide-react"

export default function PaymentMethodPage() {
    // 0: no cards, 1: saved cards, 2: add new card
    const [step, setStep] = useState(0)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet")

    // Card form state
    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvc, setCvc] = useState("")

    return (
        <div className="w-full max-w-5xl mx-auto px-4 pt-4 pb-20">
            <div className="flex items-center mb-8">
                <Link href="#" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800 ml-2">
                    {step === 2 ? "New Card" : "Payment Method"}
                </h1>
            </div>
            <div className="flex gap-8 items-start">
                {/* Left: Card Image */}
                <div className="flex-1 flex justify-center items-center min-h-[320px]">
                    <Image src="/credit-card.png" alt="Credit Card" width={220} height={140} priority />
                </div>
                {/* Right: Step Content */}
                <div className="flex-1 flex flex-col items-center">
                    {step === 0 && (
                        <div className="flex flex-col items-center justify-center w-full">
                            <Link
                                href="#"
                                onClick={e => { e.preventDefault(); setStep(2); }}
                                className="flex items-center justify-center w-full max-w-md h-12 border border-gray-300 rounded-md text-gray-800 font-medium"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add New Card
                            </Link>
                        </div>
                    )}
                    {step === 1 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-4 w-full max-w-md">
                            <h2 className="text-base font-medium text-gray-800 mb-4">Saved Cards</h2>
                            <div className="space-y-3">
                                {/* Wallet Option */}
                                <div
                                    className={`flex items-center justify-between p-3 border rounded-md ${selectedPaymentMethod === "wallet" ? "border-[#00AA88]" : "border-gray-200"}`}
                                    onClick={() => setSelectedPaymentMethod("wallet")}
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center">
                                            {/* Wallet SVG */}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                                    className={`flex items-center justify-between p-3 border rounded-md ${selectedPaymentMethod === "visa" ? "border-[#00AA88]" : "border-gray-200"}`}
                                    onClick={() => setSelectedPaymentMethod("visa")}
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center">
                                            {/* Visa SVG */}
                                            <svg width="40" height="13" viewBox="0 0 40 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.5 1.5L15 11.5H11.5L8 1.5H11.5L13.5 8L15.5 1.5H18.5Z" fill="#172B85" />
                                                <path d="M19.5 1.5H22.5L20 11.5H17L19.5 1.5Z" fill="#172B85" />
                                                <path d="M30 1.5L33 11.5H29.5L29 10H25L24.5 11.5H21L24 1.5H30ZM28 7.5L27 4L26 7.5H28Z" fill="#172B85" />
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
                                {/* Paystack */}
                                <div
                                    className={`flex items-center justify-between p-3 border rounded-md ${selectedPaymentMethod === "paystack" ? "border-[#00AA88]" : "border-gray-200"}`}
                                    onClick={() => setSelectedPaymentMethod("paystack")}
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded">
                                            <span className="text-blue-700 font-bold">P</span>
                                        </div>
                                        <div className="ml-2">
                                            <p className="font-medium text-gray-800">Paystack</p>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border border-[#00AA88] flex items-center justify-center">
                                        {selectedPaymentMethod === "paystack" && <div className="w-3 h-3 rounded-full bg-[#00AA88]"></div>}
                                    </div>
                                </div>
                                {/* Flutterwave */}
                                <div
                                    className={`flex items-center justify-between p-3 border rounded-md ${selectedPaymentMethod === "flutterwave" ? "border-[#00AA88]" : "border-gray-200"}`}
                                    onClick={() => setSelectedPaymentMethod("flutterwave")}
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded">
                                            <span className="text-yellow-700 font-bold">F</span>
                                        </div>
                                        <div className="ml-2">
                                            <p className="font-medium text-gray-800">Flutterwave</p>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border border-[#00AA88] flex items-center justify-center">
                                        {selectedPaymentMethod === "flutterwave" && <div className="w-3 h-3 rounded-full bg-[#00AA88]"></div>}
                                    </div>
                                </div>
                            </div>
                            {/* Add New Card Button */}
                            <button
                                onClick={() => setStep(2)}
                                className="flex items-center justify-center w-full h-12 border border-gray-300 rounded-md text-gray-800 font-medium mt-4"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add New Card
                            </button>
                            {/* Apply Button */}
                            <button className="flex items-center justify-center w-full h-12 bg-[#00AA88] rounded-md text-white font-medium mt-4">
                                Apply
                            </button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-4 w-full max-w-md">
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
                                        value={cardNumber}
                                        onChange={e => setCardNumber(e.target.value)}
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
                                            value={expiryDate}
                                            onChange={e => setExpiryDate(e.target.value)}
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
                                                value={cvc}
                                                onChange={e => setCvc(e.target.value)}
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
                    )}
                </div>
            </div>
        </div>
    )
}

