"use client"

import { useState } from "react"
import { ChevronLeft, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/navbar"

interface Transaction {
    id: string
    type: "payment" | "deposit" | "refund"
    description: string
    date: string
    amount: number
}

export default function WalletPage() {
    const [balance, setBalance] = useState(500000)

    const transactions: Transaction[] = [
        {
            id: "1",
            type: "payment",
            description: "Payment for groceries",
            date: "2023-05-08",
            amount: 9000,
        },
        {
            id: "2",
            type: "deposit",
            description: "Order #1234 completed",
            date: "2023-05-10",
            amount: 7000,
        },
        {
            id: "3",
            type: "refund",
            description: "Refund for returned item",
            date: "2023-05-08",
            amount: 4000,
        },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
                <div className="max-w-[600px] mx-auto">
                    <div className="mb-6">
                        <Link href="/" className="inline-flex items-center text-gray-600">
                            <ChevronLeft className="h-5 w-5 mr-1" />
                            <span className="text-xl font-semibold">My Wallet</span>
                        </Link>
                    </div>

                    {/* Balance Card */}
                    <div className="bg-[#00A67E] text-white rounded-lg p-6 mb-6">
                        <div className="flex flex-col items-center">
                            <h2 className="text-white/80 mb-2">Current Balance</h2>
                            <div className="text-3xl font-bold mb-6">N{balance.toLocaleString()}.00</div>

                            <div className="flex gap-4 w-full max-w-xs">
                                <Link href="/wallet/withdraw" className="flex-1">
                                    <Button
                                        variant="default"
                                        className="w-full border-white text-white hover:bg-white/20 hover:text-white bg-green-400"
                                    >
                                        Withdraw Funds
                                    </Button>
                                </Link>
                                <Link href="/wallet/add-funds" className="flex-1">
                                    <Button className="w-full text-white hover:bg-white/90 hover:text-white bg-blue-400 hover:bg-blue-500">
                                        Add Funds
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white rounded-lg border overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="font-semibold">Transaction History</h2>
                        </div>

                        <div className="divide-y">
                            {transactions.map((transaction) => (
                                <div key={transaction.id} className="p-4 flex items-center">
                                    <div
                                        className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${transaction.type === "payment"
                                                ? "bg-red-100"
                                                : transaction.type === "deposit"
                                                    ? "bg-green-100"
                                                    : "bg-green-100"
                                            }`}
                                    >
                                        {transaction.type === "payment" ? (
                                            <ArrowUpRight className={`h-5 w-5 text-red-500`} />
                                        ) : (
                                            <ArrowDownLeft className={`h-5 w-5 text-green-500`} />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="font-medium">{transaction.description}</div>
                                        <div className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
                                    </div>

                                    <div
                                        className={`font-semibold ${transaction.type === "payment" ? "text-red-500" : "text-green-500"}`}
                                    >
                                        {transaction.type === "payment" ? "-" : "+"}N{transaction.amount.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

