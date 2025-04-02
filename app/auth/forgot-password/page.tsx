"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { z } from "zod"
import { forgotPasswordSchema } from "@/lib/validations/auth"

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
    const [formData, setFormData] = useState<ForgotPasswordFormData>({
        email: "",
    })
    const [errors, setErrors] = useState<{
        email?: string
    }>({})
    const [submitted, setSubmitted] = useState(false)

    const validateField = (field: keyof ForgotPasswordFormData, value: string) => {
        try {
            if (field === "email") {
                z.string().email({ message: "Please enter a valid email address" }).parse(value)
            }

            // Clear error if validation passes
            setErrors((prev) => ({ ...prev, [field]: undefined }))
            return true
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
            }
            return false
        }
    }

    const handleInputChange = (field: keyof ForgotPasswordFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            // Validate the entire form
            forgotPasswordSchema.parse(formData)

            // In a real app, you would send a password reset email
            console.log("Form data is valid:", formData)
            setSubmitted(true)
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
                    <div className="mb-6">
                        <Link href="/auth/login" className="flex items-center text-gray-600">
                            <ArrowLeft className="h-5 w-5 mr-1" />
                            <span>Back</span>
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-[#00A67E] mb-2">Forgot Password</h2>

                    {!submitted ? (
                        <>
                            <p className="text-center text-gray-600 mb-8">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                className={`w-full p-3 border rounded-md pr-10 ${errors.email ? "border-red-500" : "border-gray-300"
                                                    }`}
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
                                </div>

                                <div className="mt-8">
                                    <Button type="submit" className="w-full bg-[#00A67E] hover:bg-[#008F6B]">
                                        Send Reset Link
                                    </Button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#E6F7F1] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="#00A67E" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Check your email</h3>
                            <p className="text-gray-600 mb-8">We've sent a password reset link to {formData.email}</p>
                            <p className="text-sm text-gray-500 mb-4">
                                Didn't receive the email? Check your spam folder or try again.
                            </p>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <Link href="/auth/login" className="text-[#00A67E] font-medium">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

