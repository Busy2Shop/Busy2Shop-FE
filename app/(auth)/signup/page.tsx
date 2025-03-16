import type { Metadata } from "next"
import SignUpForm from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
    title: "Sign Up | Busy2Shop Admin",
    description: "Sign up for Busy2Shop Admin Dashboard",
}

export default function SignUpPage() {
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

            {/* Right side - Sign up form */}
            <div className="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-emerald-500">Sign up</h1>
                    </div>
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}

