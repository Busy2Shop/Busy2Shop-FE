import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Forgot Password | Busy2Shop Admin",
    description: "Reset your Busy2Shop Admin Dashboard password",
}

export default function ForgotPasswordPage() {
    return (
        <div className="flex h-screen w-full flex-col md:flex-row">
            {/* Left side - Logo and branding */}
            <div className="flex w-full flex-col items-center justify-center bg-emerald-500 p-6 md:w-1/2">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 w-48 md:w-64">
                        <img src="/logo.svg" alt="Busy2Shop Logo" className="h-auto w-full" />
                    </div>
                </div>
            </div>

            {/* Right side - Forgot password placeholder */}
            <div className="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-emerald-500">Forgot Password</h1>
                        <p className="mt-4 text-gray-600">
                            Enter your email address and we&apos;ll send you instructions to reset your password.
                        </p>
                    </div>
                    <div className="text-center">
                        <Link href="/login" className="text-sm font-medium text-orange-500 hover:text-orange-600">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

