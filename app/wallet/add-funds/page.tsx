"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Separator } from "@/components/ui/separator"

export default function AddFundsPage() {
    const [amount, setAmount] = useState("")
    const [step, setStep] = useState(1)
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

    const handleContinue = () => {
        if (step === 1 && amount) {
            setStep(2)
        } else if (step === 2 && paymentMethod) {
            setStep(3)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
                <div className="max-w-[500px] mx-auto">
                    <div className="mb-6">
                        <Link
                            href={step === 1 ? "/wallet" : "/wallet/add-funds"}
                            className="inline-flex items-center text-gray-600"
                            onClick={(e) => {
                                if (step > 1) {
                                    e.preventDefault()
                                    setStep(step - 1)
                                }
                            }}
                        >
                            <ChevronLeft className="h-5 w-5 mr-1" />
                            <span className="text-xl font-semibold">Add Funds to Wallet</span>
                        </Link>
                    </div>

                    {step === 1 && (
                        <div className="bg-white rounded-lg border p-6">
                            <h2 className="font-medium mb-4">How much do you want to deposit?</h2>

                            <div className="flex mb-6">
                                <input
                                    type="text"
                                    className="flex-1 p-3 border rounded-l-md text-right"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => {
                                        // Only allow numbers
                                        const value = e.target.value.replace(/[^0-9]/g, "")
                                        setAmount(value)
                                    }}
                                />
                                <div className="bg-gray-100 p-3 rounded-r-md border-t border-r border-b">NGN</div>
                            </div>

                            <div className="text-xs text-gray-500 mb-6">Balance: N500,000.00</div>

                            <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]" onClick={handleContinue} disabled={!amount}>
                                Continue
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white rounded-lg border p-6">
                            <div className="space-y-4 mb-6">
                                <div
                                    className={`flex items-center p-3 border rounded-md cursor-pointer ${paymentMethod === "wallet" ? "border-[#00A67E]" : ""
                                        }`}
                                    onClick={() => setPaymentMethod("wallet")}
                                >
                                    <div className="mr-3">
                                        <div
                                            className={`h-5 w-5 rounded-full border flex items-center justify-center ${paymentMethod === "wallet" ? "border-[#00A67E]" : "border-gray-300"
                                                }`}
                                        >
                                            {paymentMethod === "wallet" && <div className="h-3 w-3 rounded-full bg-[#00A67E]"></div>}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">Wallet</div>
                                        <div className="text-xs text-gray-500">Balance: N500,000.00</div>
                                    </div>
                                </div>

                                <div
                                    className={`flex items-center p-3 border rounded-md cursor-pointer ${paymentMethod === "card" ? "border-[#00A67E]" : ""
                                        }`}
                                    onClick={() => setPaymentMethod("card")}
                                >
                                    <div className="mr-3">
                                        <div
                                            className={`h-5 w-5 rounded-full border flex items-center justify-center ${paymentMethod === "card" ? "border-[#00A67E]" : "border-gray-300"
                                                }`}
                                        >
                                            {paymentMethod === "card" && <div className="h-3 w-3 rounded-full bg-[#00A67E]"></div>}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">VISA</div>
                                        <div className="text-xs text-gray-500">**** **** **** 2312</div>
                                    </div>
                                </div>

                                <div
                                    className={`flex items-center p-3 border rounded-md cursor-pointer ${paymentMethod === "bank" ? "border-[#00A67E]" : ""
                                        }`}
                                    onClick={() => setPaymentMethod("bank")}
                                >
                                    <div className="mr-3">
                                        <div
                                            className={`h-5 w-5 rounded-full border flex items-center justify-center ${paymentMethod === "bank" ? "border-[#00A67E]" : "border-gray-300"
                                                }`}
                                        >
                                            {paymentMethod === "bank" && <div className="h-3 w-3 rounded-full bg-[#00A67E]"></div>}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">Bank Transfer</div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-[#00A67E] hover:bg-[#008F6B]"
                                onClick={handleContinue}
                                disabled={!paymentMethod}
                            >
                                Continue
                            </Button>
                        </div>
                    )}

                    {step === 3 && paymentMethod === "bank" && (
                        <div className="bg-white rounded-lg border p-6">
                            <div className="text-center mb-4">
                                <h2 className="text-sm text-gray-500">Amount to send</h2>
                                <div className="text-2xl font-bold">NGN {(Number.parseInt(amount) + 1500).toLocaleString()}</div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Account Number</div>
                                    <div className="font-medium">4051016044</div>
                                </div>
                                <Separator />
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Bank Name</div>
                                    <div className="font-medium">Premium Trust Bank</div>
                                </div>

                                <Separator />
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Account Name</div>
                                    <div className="font-medium">Busy2Shop Digital / Lucy Gina</div>
                                </div>
                                <Separator />

                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Deposit Fee</div>
                                    <div className="font-medium">1500 NGN</div>
                                </div>
                                <Separator />
                            </div>

                            <div className="bg-gray-100 p-4 rounded-md mb-6 flex items-start">
                                <div className="h-5 w-8 rounded-full bg-gray-300 text-white flex items-center justify-center mr-2 mt-0.5">
                                    !
                                </div>
                                <div className="text-sm text-gray-600">
                                    Ensure you send the exact amount displayed above and use this account for this transaction only.
                                </div>
                            </div>

                            <Link href="/wallet">
                                <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]">I've Made the Transfer</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

