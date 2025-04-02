"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Eye, EyeOff, ArrowLeft, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { agentRegistrationSchema } from "@/lib/validations/auth"

type AgentRegistrationFormData = z.infer<typeof agentRegistrationSchema>

export default function AgentRegistrationPage() {
    const router = useRouter()
    const ninSlipInputRef = useRef<HTMLInputElement>(null)
    const proofOfAddressInputRef = useRef<HTMLInputElement>(null)

    // Form data
    const [formData, setFormData] = useState<AgentRegistrationFormData>({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        countryCode: "+234",
        email: "",
        password: "",
        state: "",
        address: "",
        nin: "",
        ninSlip: "",
        proofOfAddress: "",
        market: "",
        referralsName: "",
        referralsPhoneNumber: "",
        referralsCountryCode: "+234",
    })

    // UI states
    const [showPassword, setShowPassword] = useState(false)
    const [ninSlipPreview, setNinSlipPreview] = useState<string | null>(null)
    const [proofOfAddressPreview, setProofOfAddressPreview] = useState<string | null>(null)

    // Validation states
    const [errors, setErrors] = useState<Partial<Record<keyof AgentRegistrationFormData, string>>>({})

    const validateField = (field: keyof AgentRegistrationFormData, value: string) => {
        try {
            // Create a partial schema for just this field
            const fieldSchema = z.object({ [field]: agentRegistrationSchema.shape[field] })
            fieldSchema.parse({ [field]: value })

            // Clear error if validation passes
            setErrors((prev) => ({ ...prev, [field]: undefined }))
            return true
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldError = error.errors.find((err) => err.path[0] === field)
                if (fieldError) {
                    setErrors((prev) => ({ ...prev, [field]: fieldError.message }))
                }
            }
            return false
        }
    }

    const handleInputChange = (field: keyof AgentRegistrationFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleFileChange = (field: "ninSlip" | "proofOfAddress", e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // In a real app, you would upload this file to a server and get a URL back
        // For now, we'll just create a local object URL for preview
        const objectUrl = URL.createObjectURL(file)

        if (field === "ninSlip") {
            setNinSlipPreview(objectUrl)
            setFormData((prev) => ({ ...prev, ninSlip: file.name })) // In a real app, this would be the URL from the server
        } else {
            setProofOfAddressPreview(objectUrl)
            setFormData((prev) => ({ ...prev, proofOfAddress: file.name })) // In a real app, this would be the URL from the server
        }

        // Clear error when user uploads a file
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            // Validate the entire form
            agentRegistrationSchema.parse(formData)

            // In a real app, you would submit the form and create the account
            console.log("Form data is valid:", formData)
            router.push("/auth/otp-verification")
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Convert ZodError to a more usable format
                const fieldErrors: Record<string, string> = {}
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as string] = err.message
                    }
                })
                setErrors(fieldErrors)

                // Scroll to the first error
                const firstErrorField = Object.keys(fieldErrors)[0]
                if (firstErrorField) {
                    const element = document.getElementById(firstErrorField)
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                }
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-md mx-auto p-4">
                <div className="mb-6">
                    <Link href="/auth/signup" className="flex items-center text-gray-600">
                        <ArrowLeft className="h-5 w-5 mr-1" />
                        <span>Back</span>
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-center text-[#00A67E] mb-2">Personal Details</h1>
                <p className="text-center text-gray-600 mb-8">Fill in your details to continue</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First Name */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            className={`w-full p-3 border rounded-md ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            onBlur={() => validateField("firstName", formData.firstName)}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            className={`w-full p-3 border rounded-md ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            onBlur={() => validateField("lastName", formData.lastName)}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <div className="flex">
                            <div className="flex-shrink-0 border border-r-0 rounded-l-md p-3 bg-white">
                                <div className="flex items-center">
                                    <Image
                                        src="/placeholder.svg?height=20&width=30"
                                        alt="Nigeria"
                                        width={30}
                                        height={20}
                                        className="mr-1"
                                    />
                                    <span>+234</span>
                                </div>
                            </div>
                            <input
                                id="phoneNumber"
                                type="tel"
                                className={`flex-1 p-3 border rounded-r-md ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder=""
                                value={formData.phoneNumber}
                                onChange={(e) => {
                                    // Only allow numbers
                                    const value = e.target.value.replace(/\D/g, "")
                                    handleInputChange("phoneNumber", value)
                                }}
                                onBlur={() => validateField("phoneNumber", formData.phoneNumber)}
                            />
                        </div>
                        {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                className={`w-full p-3 border rounded-md pr-10 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                placeholder="name@gmail.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                onBlur={() => validateField("email", formData.email)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 2V2.5L10 8.5L2 2.5V2H18ZM2 14V5.2L9.6 10.8C9.7 10.9 9.9 11 10 11C10.1 11 10.3 10.9 10.4 10.8L18 5.2V14H2Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className={`w-full p-3 border rounded-md pr-10 ${errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="••••••••••"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                onBlur={() => validateField("password", formData.password)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>

                    {/* State */}
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                        </label>
                        <div className="relative">
                            <select
                                id="state"
                                className={`w-full p-3 border rounded-md appearance-none bg-white pr-10 ${errors.state ? "border-red-500" : "border-gray-300"
                                    }`}
                                value={formData.state}
                                onChange={(e) => handleInputChange("state", e.target.value)}
                                onBlur={() => validateField("state", formData.state)}
                            >
                                <option value="" disabled>
                                    Select a state
                                </option>
                                <option value="lagos">Lagos</option>
                                <option value="abuja">Abuja</option>
                                <option value="port-harcourt">Port Harcourt</option>
                                <option value="ibadan">Ibadan</option>
                                <option value="kano">Kano</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1 1.5L6 6.5L11 1.5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            className={`w-full p-3 border rounded-md ${errors.address ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your house address"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            onBlur={() => validateField("address", formData.address)}
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                    </div>

                    {/* NIN */}
                    <div>
                        <label htmlFor="nin" className="block text-sm font-medium text-gray-700 mb-1">
                            NIN
                        </label>
                        <input
                            id="nin"
                            type="text"
                            className={`w-full p-3 border rounded-md ${errors.nin ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your NIN number"
                            value={formData.nin}
                            onChange={(e) => {
                                // Only allow numbers
                                const value = e.target.value.replace(/\D/g, "")
                                handleInputChange("nin", value)
                            }}
                            onBlur={() => validateField("nin", formData.nin)}
                        />
                        {errors.nin && <p className="mt-1 text-sm text-red-500">{errors.nin}</p>}
                    </div>

                    {/* Upload NIN Slip */}
                    <div>
                        <label htmlFor="ninSlip" className="block text-sm font-medium text-gray-700 mb-1">
                            Upload NIN Slip
                        </label>
                        <div
                            className={`border rounded-md p-4 flex items-center justify-center h-[100px] cursor-pointer ${errors.ninSlip ? "border-red-500" : "border-gray-300"
                                }`}
                            onClick={() => ninSlipInputRef.current?.click()}
                        >
                            {ninSlipPreview ? (
                                <Image
                                    src={ninSlipPreview || "/placeholder.svg"}
                                    alt="NIN Slip Preview"
                                    width={80}
                                    height={80}
                                    className="object-contain h-full"
                                />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Camera className="h-5 w-5 text-gray-500" />
                                    </div>
                                </div>
                            )}
                            <input
                                id="ninSlip"
                                ref={ninSlipInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange("ninSlip", e)}
                            />
                        </div>
                        {errors.ninSlip && <p className="mt-1 text-sm text-red-500">{errors.ninSlip}</p>}
                    </div>

                    {/* Upload Proof of Address */}
                    <div>
                        <label htmlFor="proofOfAddress" className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Proof of Address (Utility Bill/ Bank Sta)
                        </label>
                        <div
                            className={`border rounded-md p-4 flex items-center justify-center h-[100px] cursor-pointer ${errors.proofOfAddress ? "border-red-500" : "border-gray-300"
                                }`}
                            onClick={() => proofOfAddressInputRef.current?.click()}
                        >
                            {proofOfAddressPreview ? (
                                <Image
                                    src={proofOfAddressPreview || "/placeholder.svg"}
                                    alt="Proof of Address Preview"
                                    width={80}
                                    height={80}
                                    className="object-contain h-full"
                                />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Camera className="h-5 w-5 text-gray-500" />
                                    </div>
                                </div>
                            )}
                            <input
                                id="proofOfAddress"
                                ref={proofOfAddressInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange("proofOfAddress", e)}
                            />
                        </div>
                        {errors.proofOfAddress && <p className="mt-1 text-sm text-red-500">{errors.proofOfAddress}</p>}
                    </div>

                    {/* Market */}
                    <div>
                        <label htmlFor="market" className="block text-sm font-medium text-gray-700 mb-1">
                            Market
                        </label>
                        <div className="relative">
                            <select
                                id="market"
                                className={`w-full p-3 border rounded-md appearance-none bg-white pr-10 ${errors.market ? "border-red-500" : "border-gray-300"
                                    }`}
                                value={formData.market}
                                onChange={(e) => handleInputChange("market", e.target.value)}
                                onBlur={() => validateField("market", formData.market)}
                            >
                                <option value="" disabled>
                                    Select a market
                                </option>
                                <option value="ajah-market">Ajah Market</option>
                                <option value="balogun-market">Balogun Market</option>
                                <option value="computer-village">Computer Village</option>
                                <option value="alaba-international">Alaba International Market</option>
                                <option value="mile-12-market">Mile 12 Market</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1 1.5L6 6.5L11 1.5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        {errors.market && <p className="mt-1 text-sm text-red-500">{errors.market}</p>}
                    </div>

                    {/* Referrals Name */}
                    <div>
                        <label htmlFor="referralsName" className="block text-sm font-medium text-gray-700 mb-1">
                            Referrals Name
                        </label>
                        <input
                            id="referralsName"
                            type="text"
                            className="w-full p-3 border rounded-md border-gray-300"
                            placeholder="Enter Referrals Name"
                            value={formData.referralsName || ""}
                            onChange={(e) => handleInputChange("referralsName", e.target.value)}
                        />
                    </div>

                    {/* Referrals Phone Number */}
                    <div>
                        <label htmlFor="referralsPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Referrals Phone Number
                        </label>
                        <div className="flex">
                            <div className="flex-shrink-0 border border-r-0 rounded-l-md p-3 bg-white">
                                <div className="flex items-center">
                                    <Image
                                        src="/placeholder.svg?height=20&width=30"
                                        alt="Nigeria"
                                        width={30}
                                        height={20}
                                        className="mr-1"
                                    />
                                    <span>+234</span>
                                </div>
                            </div>
                            <input
                                id="referralsPhoneNumber"
                                type="tel"
                                className="flex-1 p-3 border rounded-r-md border-gray-300"
                                placeholder=""
                                value={formData.referralsPhoneNumber || ""}
                                onChange={(e) => {
                                    // Only allow numbers
                                    const value = e.target.value.replace(/\D/g, "")
                                    handleInputChange("referralsPhoneNumber", value)
                                }}
                            />
                        </div>
                        {errors.referralsPhoneNumber && <p className="mt-1 text-sm text-red-500">{errors.referralsPhoneNumber}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-[#00A67E] hover:bg-[#008F6B] text-white py-3">
                        Submit
                    </Button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-[#00A67E] font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

