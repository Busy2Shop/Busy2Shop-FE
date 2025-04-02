"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, Edit2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"

export default function EditProfilePage() {
    const [formData, setFormData] = useState({
        name: "Lucy Gina",
        email: "lucygina13@gmail.com",
        gender: "Female",
        phone: "+234 123 4567 892",
        address: "Ikeja City Mall, Obafemi Awolowo Wy",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, you would save the data to the backend
        console.log("Saving profile data:", formData)
        // Redirect back to profile page
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <div className="max-w-[800px] mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Edit Profile</h1>
                            <Button className="bg-[#00A67E] hover:bg-[#008F6B]" onClick={handleSubmit}>
                                Save Changes
                            </Button>
                        </div>

                        {/* Profile Card */}
                        <div className="bg-[#00A67E] text-white rounded-lg p-6 mb-6">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-2">
                                    <Avatar className="h-24 w-24 border-2 border-white">
                                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Lucy Gina" />
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

                        {/* Edit Form */}
                        <div className="bg-white rounded-lg border p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <Input name="name" value={formData.name} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                        <Input name="email" type="email" value={formData.email} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <div className="relative">
                                            <Input name="gender" value={formData.gender} onChange={handleChange} className="pr-10" />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <ChevronRight className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <Input name="phone" value={formData.phone} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <Input name="address" value={formData.address} onChange={handleChange} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

