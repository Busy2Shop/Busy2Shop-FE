"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, User, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [role, setRole] = useState<"individual" | "agent" | null>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Validation states
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
            setEmailError("Email is required")
            return false
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address")
            return false
        }
        setEmailError("")
        return true
    }

    const validatePassword = (password: string) => {
        if (!password) {
            setPasswordError("Password is required")
            return false
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters")
            return false
        }
        setPasswordError("")
        return true
    }

    const validateConfirmPassword = (confirmPassword: string) => {
        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your password")
            return false
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match")
            return false
        }
        setConfirmPasswordError("")
        return true
    }

    const handleContinue = () => {
        if (step === 1 && role) {
            setStep(2)
        }
    }

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()

        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        const isConfirmPasswordValid = validateConfirmPassword(confirmPassword)

        if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            // In a real app, you would submit the form and create the account
            router.push("/auth/otp-verification")
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
                                    className={`w-full p-4 border rounded-md flex items-center justify-center ${role === "individual" ? "border-[#00A67E]" : "border-gray-300"
                                        }`}
                                    onClick={() => setRole("individual")}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${role === "individual" ? "bg-[#00A67E] text-white" : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            <User className="h-5 w-5" />
                                        </div>
                                        <span>Sign in as an Individual</span>
                                    </div>
                                </button>

                                <button
                                    className={`w-full p-4 border rounded-md flex items-center justify-center ${role === "agent" ? "border-[#00A67E]" : "border-gray-300"
                                        }`}
                                    onClick={() => setRole("agent")}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${role === "agent" ? "bg-[#00A67E] text-white" : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <span>Sign in as an Agent</span>
                                    </div>
                                </button>
                            </div>

                            <div className="mt-8">
                                <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]" onClick={handleContinue} disabled={!role}>
                                    Continue
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                className={`w-full p-3 border rounded-md pr-10 ${emailError ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                placeholder="name@gmail.com"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                    if (emailError) validateEmail(e.target.value)
                                                }}
                                                onBlur={() => validateEmail(email)}
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
                                        {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className={`w-full p-3 border rounded-md pr-10 ${passwordError ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                placeholder="••••••••••"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                    if (passwordError) validatePassword(e.target.value)
                                                }}
                                                onBlur={() => validatePassword(password)}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                className={`w-full p-3 border rounded-md pr-10 ${confirmPasswordError ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                placeholder="••••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value)
                                                    if (confirmPasswordError) validateConfirmPassword(e.target.value)
                                                }}
                                                onBlur={() => validateConfirmPassword(confirmPassword)}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        {confirmPasswordError && <p className="mt-1 text-sm text-red-500">{confirmPasswordError}</p>}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button type="submit" className="w-full bg-[#00A67E] hover:bg-[#008F6B]">
                                        Sign Up
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link href="/auth/login" className="text-[#FF6B00] font-medium">
                                        Login
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">OR CONTINUE WITH</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center p-3 border rounded-md hover:bg-gray-50"
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2"
                                        >
                                            <path
                                                d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                                                fill="#FFC107"
                                            />
                                            <path
                                                d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z"
                                                fill="#FF3D00"
                                            />
                                            <path
                                                d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z"
                                                fill="#4CAF50"
                                            />
                                            <path
                                                d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                                                fill="#1976D2"
                                            />
                                        </svg>
                                        Google
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

