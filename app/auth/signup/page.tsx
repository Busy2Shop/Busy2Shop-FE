"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, User, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useAuthStore } from "@/store/authStore"
import { toast } from "react-toastify"

interface SignUpFormData {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    dob?: string
    gender?: string
    location?: {
        country?: string
        city?: string
        address?: string
    }
    phone?: {
        countryCode?: string
        number?: string
    }
}

const signUpSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function SignUpPage() {
    const router = useRouter()
    const { register, isLoading, error, clearError } = useAuthStore()
    const [step, setStep] = useState(1)
    const [userType, setUserType] = useState<"agent" | "customer" | null>(null)

    // Form data
    const [formData, setFormData] = useState<SignUpFormData>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    })

    // UI states
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Validation states
    const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({})

    const validateField = (field: keyof SignUpFormData, value: string) => {
        try {
            if (field === "email") {
                z.string().email({ message: "Please enter a valid email address" }).parse(value)
            } else if (field === "password") {
                z.string()
                    .min(8, { message: "Password must be at least 8 characters long" })
                    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
                    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
                    .regex(/[0-9]/, { message: "Password must contain at least one number" })
                    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
                    .parse(value)
            } else if (field === "firstName" || field === "lastName") {
                z.string().min(1, { message: `${field} is required` }).parse(value)
            }
            setErrors((prev) => ({ ...prev, [field]: undefined }))
            return true
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
            }
            return false
        }
    }

    const handleInputChange = (field: keyof SignUpFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleContinue = () => {
        if (step === 1 && userType) {
            setStep(2)
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        clearError()

        try {
            // Validate the entire form
            signUpSchema.parse(formData)

            // Call the registration mutation
            await register({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
            })

            // Show success message
            toast.success("Registration successful! Please check your email for verification.")

            // Redirect to OTP verification
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
            }
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side - Logo */}
            <div className="hidden md:flex md:w-1/2 bg-[#00A67E] items-center justify-center">
                <div className="w-64">
                    <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="Busy2Shop Logo"
                        width={200}
                        height={200}
                        className="mx-auto"
                    />
                    <h1 className="text-4xl font-bold text-center">
                        <span className="text-[#FF6B00]">Busy</span>
                        <span className="text-white">2</span>
                        <span className="text-white">Shop</span>
                    </h1>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {step === 1 ? (
                        <>
                            <h2 className="text-2xl font-bold text-center text-[#00A67E] mb-2">Sign up</h2>
                            <p className="text-center text-gray-600 mb-8">Choose your role to continue</p>

                            <div className="space-y-4">
                                <button
                                    className={`w-full p-4 border rounded-md flex items-center justify-center ${userType === "customer" ? "border-[#00A67E]" : "border-gray-300"
                                        }`}
                                    onClick={() => setUserType("customer")}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${userType === "customer" ? "bg-[#00A67E] text-white" : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            <User className="h-5 w-5" />
                                        </div>
                                        <span>Sign up as a Customer</span>
                                    </div>
                                </button>

                                <button
                                    className={`w-full p-4 border rounded-md flex items-center justify-center ${userType === "agent" ? "border-[#00A67E]" : "border-gray-300"
                                        }`}
                                    onClick={() => setUserType("agent")}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${userType === "agent" ? "bg-[#00A67E] text-white" : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <span>Sign up as an Agent</span>
                                    </div>
                                </button>
                            </div>

                            <div className="mt-8">
                                <Button
                                    className="w-full bg-[#00A67E] hover:bg-[#008F6B]"
                                    onClick={handleContinue}
                                    disabled={!userType || isLoading}
                                >
                                    {isLoading ? "Loading..." : "Continue"}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-6">
                                <button onClick={() => setStep(1)} className="flex items-center text-gray-600">
                                    <ArrowLeft className="h-5 w-5 mr-1" />
                                    <span>Back</span>
                                </button>
                            </div>

                            <h2 className="text-2xl font-bold text-center text-[#00A67E] mb-8">Sign up</h2>

                            <form onSubmit={handleSignUp}>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            className={errors.firstName ? "border-red-500" : ""}
                                        />
                                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            className={errors.lastName ? "border-red-500" : ""}
                                        />
                                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className={errors.email ? "border-red-500" : ""}
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => handleInputChange("password", e.target.value)}
                                                className={errors.password ? "border-red-500" : ""}
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

                                    <div>
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                                className={errors.confirmPassword ? "border-red-500" : ""}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                                    </div>

                                    <div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-[#00A67E] hover:bg-[#008F6B]"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Signing up..." : "Sign up"}
                                        </Button>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">
                                            Already have an account?{" "}
                                            <Link href="/auth/login" className="text-[#00A67E] font-medium">
                                                Login
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}