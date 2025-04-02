import { z } from "zod"

// Email validation schema
export const emailSchema = z.string().email({
    message: "Please enter a valid email address",
})

// Password validation schema
export const passwordSchema = z
    .string()
    .min(8, {
        message: "Password must be at least 8 characters",
    })
    .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
        message: "Password must contain at least one number",
    })

// Sign up form validation schema
export const signUpFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
})

// This exposes the base object schema without the refinement
export const signUpSchema = signUpFormSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
)

// Login form validation schema
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, {
        message: "Password is required",
    }),
})

// Forgot password form validation schema
export const forgotPasswordSchema = z.object({
    email: emailSchema,
})

// OTP validation schema
export const otpSchema = z
    .string()
    .length(4, {
        message: "OTP must be 4 digits",
    })
    .regex(/^\d+$/, {
        message: "OTP must contain only numbers",
    })

// Profile setup - personal info validation schema
export const personalInfoSchema = z.object({
    firstName: z.string().min(1, {
        message: "First name is required",
    }),
    lastName: z.string().min(1, {
        message: "Last name is required",
    }),
    phoneNumber: z
        .string()
        .min(10, {
            message: "Phone number must be at least 10 digits",
        })
        .regex(/^\d+$/, {
            message: "Phone number must contain only numbers",
        }),
    countryCode: z.string(),
})

// Profile setup - location validation schema
export const locationSchema = z.object({
    location: z.string().optional(),
    address: z.string().min(1, {
        message: "Address is required",
    }),
})