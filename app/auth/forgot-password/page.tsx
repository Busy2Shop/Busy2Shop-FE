"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { z } from 'zod';
import { toast } from 'react-toastify';

const emailSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
});

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { forgotPassword, isLoading, error, clearError } = useAuthStore();

    // Form data
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{
        email?: string;
    }>({});

    const handleInputChange = (value: string) => {
        setEmail(value);
        if (errors.email) {
            setErrors({});
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        try {
            // Validate email
            emailSchema.parse({ email });

            // Call the forgot password mutation
            await forgotPassword(email);

            // Show success message
            toast.success('Password reset instructions sent to your email!');

            // Redirect to login
            router.push('/auth/login');
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors({ email: error.errors[0].message });
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Forgot your password?</h2>
                    <p className="mt-2 text-gray-600">
                        Enter your email address and we'll send you instructions to reset your password.
                    </p>
            </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => handleInputChange(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {isLoading ? 'Sending...' : 'Send reset instructions'}
                        </button>
                                </div>

                        <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Remember your password?{' '}
                            <a href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign in
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

