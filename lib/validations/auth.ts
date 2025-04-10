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
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
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

// Profile setup - personal info validation schema (for customers)
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

// Profile setup - location validation schema (for customers)
export const locationSchema = z.object({
    location: z.string().optional(),
    address: z.string().min(1, {
        message: "Address is required",
    }),
})


// Agent registration validation schema
export const agentRegistrationSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(11, "Phone number must be at most 11 digits"),
    countryCode: z.string().default("+234"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    state: z.string().min(1, "Please select a state"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    nin: z.string().min(11, "NIN must be 11 digits").max(11, "NIN must be 11 digits"),
    ninSlip: z.string().min(1, "Please upload your NIN slip"),
    proofOfAddress: z.string().min(1, "Please upload proof of address"),
    market: z.string().min(1, "Please select a market"),
    referralsName: z.string().optional(),
    referralsPhoneNumber: z.string().optional(),
    referralsCountryCode: z.string().default("+234"),
})
