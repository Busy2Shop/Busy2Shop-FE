"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { z } from "zod"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

interface LoginFormData {
    email: string
    password: string
}

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
})

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login, googleLogin, isLoading, error, clearError } = useAuthStore()

    // Form data
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    })

    // UI states
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<{
        email?: string
        password?: string
    }>({})

    const validateField = (field: keyof LoginFormData, value: string) => {
        try {
            if (field === "email") {
                z.string().email({ message: "Please enter a valid email address" }).parse(value)
            } else if (field === "password") {
                z.string().min(1, { message: "Password is required" }).parse(value)
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

    const handleInputChange = (field: keyof LoginFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        clearError()

        try {
            // Validate the entire form
            loginSchema.parse(formData)
            console.log('before success');

            // Call the login mutation
            const response = await login({
                email: formData.email,
                password: formData.password,
            })
            

            console.log('after success', response);

            // Show success message
            toast.success("Login successful!")

            // Redirect to the intended page or dashboard
            const redirectTo = searchParams.get("redirect") || "/"
            router.push(redirectTo)
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

    const handleGoogleLogin = async () => {
        await googleLogin();
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side - Logo */}
            <div className="hidden md:flex md:w-1/2 bg-[#00A67E] items-center justify-center">
                <div className="w-64">
                    <Image
                        src="/busy2shop-splash.png"
                        alt="Busy2Shop Logo"
                        width={200}
                        height={200}
                        className="mx-auto"
                    />
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-6">
                        <Link href="/" className="flex items-center text-gray-600">
                            <ArrowLeft className="h-5 w-5 mr-1" />
                            <span>Back</span>
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-[#00A67E] mb-2">Welcome back</h2>
                    <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

                    <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <input
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`w-full p-3 border rounded-md pr-10 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                        onBlur={() => validateField("password", formData.password)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                            </div>
                            </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-[#00A67E] focus:ring-[#00A67E]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <Link href="/auth/forgot-password" className="text-sm font-medium text-[#00A67E] hover:text-[#008F6B]">
                                Forgot password?
                            </Link>
                        </div>

                        <div className="mt-8">
                            <Button type="submit" className="w-full bg-[#00A67E] hover:bg-[#008F6B]" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                        </div>

                        <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                </div>
                        </div>

                        <div className="mt-6">
                                <Button
                                type="button"
                                    onClick={handleGoogleLogin}
                                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
                                >
                                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                    />
                                    <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                    />
                                    <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                    />
                                    <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                    />
                                </svg>
                                    Sign in with Google
                                </Button>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link href="/auth/signup" className="font-medium text-[#00A67E] hover:text-[#008F6B]">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}

