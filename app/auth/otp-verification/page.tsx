"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { otpSchema } from "@/lib/validations/auth"

export default function OTPVerificationPage() {
    const router = useRouter()
    const [otp, setOtp] = useState(["", "", "", ""])
    const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle")
    const [timer, setTimer] = useState(60)
    const [error, setError] = useState<string | null>(null)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null])

    useEffect(() => {
        // Focus the first input on mount
        inputRefs.current[0]?.focus()

        // Start the countdown timer
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval)
                    return 0
                }
                return prevTimer - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Clear error when user starts typing
            if (error) {
                setError(null)
            }

            // Move to next input if value is entered
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text/plain").trim()

        if (/^\d{4}$/.test(pastedData)) {
            const digits = pastedData.split("")
            setOtp(digits)
            inputRefs.current[3]?.focus()
        }
    }

    const handleVerify = () => {
        const otpValue = otp.join("")

        try {
            // Validate OTP
            otpSchema.parse(otpValue)

            // In a real app, you would verify the OTP with your backend
            if (otpValue === "1234") {
                setVerificationStatus("success")
                setTimeout(() => {
                    router.push("/auth/profile-setup")
                }, 1500)
            } else {
                setVerificationStatus("error")
                setError("Invalid verification code. Please try again.")
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError(error.errors[0].message)
            }
        }
    }

    const handleResendOTP = () => {
        // In a real app, you would call your API to resend the OTP
        setTimer(60)
        // Reset the verification status
        setVerificationStatus("idle")
        setError(null)
    }

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-md mx-auto">
                <div className="mb-6">
                    <Link href="/auth/signup" className="flex items-center text-gray-600">
                        <ArrowLeft className="h-5 w-5 mr-1" />
                        <span>Back</span>
                    </Link>
                </div>

                <h2 className="text-2xl font-bold text-center text-[#00A67E] mb-2">OTP</h2>
                <p className="text-center text-gray-600 mb-8">Please enter the verification code sent to your email address.</p>

                <div className="flex justify-center gap-3 mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className={`w-14 h-14 text-center text-xl font-semibold border-2 rounded-md focus:outline-none focus:ring-2 ${verificationStatus === "error"
                                ? "border-red-500 focus:ring-red-200"
                                : verificationStatus === "success"
                                    ? "border-green-500 focus:ring-green-200"
                                    : "border-gray-300 focus:border-[#00A67E] focus:ring-[#00A67E]/20"
                                }`}
                        />
                    ))}
                </div>

                {verificationStatus === "success" && (
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="#00A67E" />
                            </svg>
                        </div>
                        <p className="text-green-600 font-medium">Verification successful!</p>
                    </div>
                )}

                {verificationStatus === "error" && (
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                                    fill="#EF4444"
                                />
                            </svg>
                        </div>
                        <p className="text-red-600 font-medium">Error</p>
                        <p className="text-gray-500 text-sm">{error}</p>
                    </div>
                )}

                {error && verificationStatus === "idle" && <p className="text-center text-red-500 mb-4">{error}</p>}

                <Button
                    className="w-full bg-[#00A67E] hover:bg-[#008F6B] mb-4"
                    onClick={handleVerify}
                    disabled={otp.some((digit) => !digit) || verificationStatus === "success"}
                >
                    Verify
                </Button>

                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                    <button
                        className={`text-sm font-medium ${timer === 0 ? "text-[#00A67E]" : "text-gray-400"}`}
                        disabled={timer > 0}
                        onClick={handleResendOTP}
                    >
                        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                    </button>
                </div>

                <div className="mt-8 text-center text-xs text-gray-500">
                    <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}