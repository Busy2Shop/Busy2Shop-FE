"use client"

import { useState } from "react"
import { ChevronLeft, CheckCircle2, RefreshCcw, XCircle } from "lucide-react"
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
            date: "2023-05-09",
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
                    <div className="bg-[#00A67E] text-white rounded-2xl p-8 mb-6 flex flex-col items-center">
                        <div className="text-lg mb-2">Current Balance</div>
                        <div className="text-4xl font-extrabold mb-6">N{balance.toLocaleString()}.00</div>
                        <div className="flex gap-4 w-full max-w-xs justify-center">
                            <Link href="/wallet/withdraw" className="flex-1">
                                <button className="w-full bg-[#21B573] hover:bg-[#179e5d] text-white font-semibold py-2 rounded transition">Withdraw Funds</button>
                            </Link>
                            <Link href="/wallet/add-funds" className="flex-1">
                                <button className="w-full bg-[#1DA1F2] hover:bg-[#178cd1] text-white font-semibold py-2 rounded transition">Add Funds</button>
                            </Link>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white rounded-2xl border p-0 overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="font-semibold">Transaction History</h2>
                        </div>
                        <div>
                            {transactions.map((transaction, idx) => (
                                <div key={transaction.id} className="flex items-center px-4 py-3" style={{ borderBottom: idx !== transactions.length - 1 ? '1px solid #F1F1F1' : 'none' }}>
                                    <div className="mr-3">
                                        {transaction.type === "payment" ? (
                                            <XCircle className="h-6 w-6 text-red-400" />
                                        ) : transaction.type === "deposit" ? (
                                            <CheckCircle2 className="h-6 w-6 text-green-400" />
                                        ) : (
                                            <RefreshCcw className="h-6 w-6 text-blue-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-[15px]">{transaction.description}</div>
                                        <div className="text-xs text-gray-400 mt-1">{transaction.date}</div>
                                    </div>
                                    <div className={`font-semibold text-[15px] ${transaction.type === "payment" ? "text-red-500" : transaction.type === "deposit" ? "text-green-500" : "text-green-500"}`}>
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

