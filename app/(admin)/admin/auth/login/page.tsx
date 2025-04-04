import LoginForm from "@/components/auth/admin-login"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login | Busy2Shop Admin",
    description: "Login to Busy2Shop Admin Dashboard",
}

export default function LoginPage() {
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

            {/* Right side - Login form */}
            <div className="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-emerald-500">Login</h1>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

