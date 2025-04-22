"use client"

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { z } from 'zod';
import { toast } from 'react-toastify';

const otpSchema = z.object({
    otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
});

function OTPVerificationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { verifyEmail, resendVerificationEmail, isLoading, error, clearError } = useAuthStore();

    // Form data
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState<{
        otp?: string;
    }>({});

    const handleInputChange = (value: string) => {
        // Only allow numbers and limit to 6 digits
        const numericValue = value.replace(/\D/g, '').slice(0, 6);
        setOtp(numericValue);
        if (errors.otp) {
            setErrors({});
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        try {
            // Validate OTP
            otpSchema.parse({ otp });

            // Call the verification mutation
            await verifyEmail(otp);

            // Show success message
            toast.success('Email verified successfully!');

            // Redirect to login
            router.push('/auth/login');
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors({ otp: error.errors[0].message });
            } 
        }
    };

    const handleResendOTP = async () => {
        await resendVerificationEmail();
        toast.success('Verification code resent successfully!');
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Verify your email</h2>
                    <p className="mt-2 text-gray-600">
                        Enter the 6-digit code sent to your email address
                    </p>
                </div>

                <form onSubmit={handleVerify} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            Verification Code
                        </label>
                        <input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => handleInputChange(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-widest shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="000000"
                            maxLength={6}
                        />
                        {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {isLoading ? 'Verifying...' : 'Verify'}
                        </button>
                    </div>

                <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?{' '}
                    <button
                                type="button"
                        onClick={handleResendOTP}
                                className="font-medium text-blue-600 hover:text-blue-500"
                    >
                                Resend
                    </button>
                        </p>
                </div>
                </form>
            </div>
        </div>
    );
}

export default function OTPVerificationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OTPVerificationForm />
        </Suspense>
    );
}