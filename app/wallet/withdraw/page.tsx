"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/navbar"

interface BankAccount {
    id: string
    name: string
    accountNumber: string
    bank: string
}

export default function WithdrawFundsPage() {
    const [amount, setAmount] = useState("")
    const [step, setStep] = useState(1)
    const [selectedAccount, setSelectedAccount] = useState<string | null>("1")

    const accounts: BankAccount[] = [
        {
            id: "1",
            name: "Lucy Gina",
            accountNumber: "1000371934",
            bank: "Moniepoint MFB",
        },
    ]

    const handleContinue = () => {
        if (step === 1 && amount) {
            setStep(2)
        } else if (step === 2 && selectedAccount) {
            // Process withdrawal
            console.log("Processing withdrawal", { amount, selectedAccount })
        }
    }

    const handleWithdrawAll = () => {
        setAmount("500000")
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
                <div className="max-w-[500px] mx-auto">
                    <div className="mb-6">
                        <Link
                            href={step === 1 ? "/wallet" : "/wallet/withdraw"}
                            className="inline-flex items-center text-gray-600"
                            onClick={(e) => {
                                if (step > 1) {
                                    e.preventDefault()
                                    setStep(step - 1)
                                }
                            }}
                        >
                            <ChevronLeft className="h-5 w-5 mr-1" />
                            <span className="text-xl font-semibold">
                                {step === 1 ? "Withdraw from Wallet" : "Withdraw destination"}
                            </span>
                        </Link>
                    </div>

                    {step === 1 && (
                        <div className="bg-white rounded-lg border p-6">
                            <h2 className="font-medium mb-4">How much do you want to withdrw?</h2>

                            <div className="flex mb-2">
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

                            <div className="text-xs text-gray-500 mb-4">Balance: N500,000.00</div>

                            <div className="flex justify-center mb-6">
                                <button className="text-[#00A67E] text-sm" onClick={handleWithdrawAll}>
                                    Withdraw All
                                </button>
                            </div>

                            <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]" onClick={handleContinue} disabled={!amount}>
                                Continue
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white rounded-lg border p-6">
                            <h2 className="font-medium mb-4">Where are you withdrawing to?</h2>

                            <div className="space-y-4 mb-6">
                                {accounts.map((account) => (
                                    <div
                                        key={account.id}
                                        className={`flex items-center p-3 border rounded-md cursor-pointer ${selectedAccount === account.id ? "border-[#00A67E]" : ""
                                            }`}
                                        onClick={() => setSelectedAccount(account.id)}
                                    >
                                        <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                            <Building className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{account.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {account.accountNumber} • {account.bank}
                                            </div>
                                        </div>
                                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                                            {selectedAccount === account.id && <div className="h-3 w-3 rounded-full bg-[#00A67E]"></div>}
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-center"
                                    onClick={() => console.log("Add new account")}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New Account
                                </Button>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-md mb-6 flex items-start">
                                <div className="h-5 w-5 rounded-full bg-gray-300 text-white flex items-center justify-center mr-2 mt-0.5">
                                    !
                                </div>
                                <div className="text-sm text-gray-600">
                                    Confirm receiving account details to avoid loss of funds or error in transactions.
                                </div>
                            </div>

                            <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]" onClick={handleContinue}>
                                Continue
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

