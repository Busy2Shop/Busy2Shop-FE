"use client"
import { User, Building, Key, Bell, Users, ChevronRight, LogOut, Edit2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"

export default function ProfilePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <div className="max-w-[800px] mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Profile</h1>
                            <Button variant="ghost" className="text-red-500">
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>

                        {/* Profile Card */}
                        <div className="bg-[#00A67E] text-white rounded-lg p-6 mb-6">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-2">
                                    <Avatar className="h-24 w-24 border-2 border-white">
                                        <AvatarImage src="/images/Avatar.png" alt="Lucy Gina" />
                                        <AvatarFallback>LG</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                                        <Edit2 className="h-4 w-4 text-[#00A67E]" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold">Lucy Gina</h2>
                                <p className="text-white/80">+234 123 4567 892</p>
                            </div>
                        </div>

                        {/* Settings Options */}
                        <div className="bg-white rounded-lg border overflow-hidden">
                            <Link href="/profile/edit" className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                        <User className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <span>Profile Settings</span>
                                </div>
                                <div className="text-gray-400">
                                    <Edit2 className="h-5 w-5" />
                                </div>
                            </Link>

                            <Link
                                href="/profile/bank-accounts"
                                className="flex items-center justify-between p-4 border-b hover:bg-gray-50"
                            >
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                        <Building className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <span>Bank Account Settings</span>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </Link>

                            <Link
                                href="/profile/transaction-pin"
                                className="flex items-center justify-between p-4 border-b hover:bg-gray-50"
                            >
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                        <Key className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <span>Reset Transaction Pin</span>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </Link>

                            <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-gray-600"
                                        >
                                            <path d="M7 12a5 5 0 1 0 5-5 5 5 0 0 0-5 5Z" />
                                            <path d="M22 12c-1.8-5.5-7-9-12-9S-.2 6.5 2 12c1.8 5.5 7 9 12 9s10.2-3.5 8-9Z" />
                                        </svg>
                                    </div>
                                    <span>Enable Biometrics</span>
                                </div>
                                <Switch />
                            </div>

                            <Link
                                href="/profile/notifications"
                                className="flex items-center justify-between p-4 border-b hover:bg-gray-50"
                            >
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                        <Bell className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <span>Notification Settings</span>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </Link>

                            <Link href="/profile/refer" className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                        <Users className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <span>Refer & Earn</span>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

