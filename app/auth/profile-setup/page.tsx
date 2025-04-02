"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { personalInfoSchema, locationSchema } from "@/lib/validations/auth"

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
type LocationFormData = z.infer<typeof locationSchema>

export default function ProfileSetupPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)

    // Personal info state
    const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData>({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        countryCode: "+234", // Nigeria
    })

    // Location state
    const [locationInfo, setLocationInfo] = useState<LocationFormData>({
        location: "",
        address: "",
    })

    // Validation states
    const [personalInfoErrors, setPersonalInfoErrors] = useState<{
        firstName?: string
        lastName?: string
        phoneNumber?: string
        countryCode?: string
    }>({})

    const [locationErrors, setLocationErrors] = useState<{
        location?: string
        address?: string
    }>({})

    const validatePersonalInfoField = (field: keyof PersonalInfoFormData, value: string) => {
        try {
            if (field === "firstName") {
                z.string().min(1, { message: "First name is required" }).parse(value)
            } else if (field === "lastName") {
                z.string().min(1, { message: "Last name is required" }).parse(value)
            } else if (field === "phoneNumber") {
                z.string()
                    .min(10, { message: "Phone number must be at least 10 digits" })
                    .regex(/^\d+$/, { message: "Phone number must contain only numbers" })
                    .parse(value)
            }

            // Clear error if validation passes
            setPersonalInfoErrors((prev) => ({ ...prev, [field]: undefined }))
            return true
        } catch (error) {
            if (error instanceof z.ZodError) {
                setPersonalInfoErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
            }
            return false
        }
    }

    const validateLocationField = (field: keyof LocationFormData, value: string) => {
        try {
            if (field === "address") {
                z.string().min(1, { message: "Address is required" }).parse(value)
            }

            // Clear error if validation passes
            setLocationErrors((prev) => ({ ...prev, [field]: undefined }))
            return true
        } catch (error) {
            if (error instanceof z.ZodError) {
                setLocationErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
            }
            return false
        }
    }

    const handlePersonalInfoChange = (field: keyof PersonalInfoFormData, value: string) => {
        setPersonalInfo((prev) => ({ ...prev, [field]: value }))

        // Clear error when user starts typing
        if (personalInfoErrors[field]) {
            setPersonalInfoErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleLocationInfoChange = (field: keyof LocationFormData, value: string) => {
        setLocationInfo((prev) => ({ ...prev, [field]: value }))

        // Clear error when user starts typing
        if (locationErrors[field]) {
            setLocationErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleNextStep = () => {
        if (step === 1) {
            try {
                // Validate the entire form
                personalInfoSchema.parse(personalInfo)
                setStep(2)
            } catch (error) {
                if (error instanceof z.ZodError) {
                    // Convert ZodError to a more usable format
                    const fieldErrors: Record<string, string> = {}
                    error.errors.forEach((err) => {
                        if (err.path[0]) {
                            fieldErrors[err.path[0] as string] = err.message
                        }
                    })
                    setPersonalInfoErrors(fieldErrors)
                }
            }
        } else if (step === 2) {
            try {
                // Validate the entire form
                locationSchema.parse(locationInfo)
                router.push("/onboarding")
            } catch (error) {
                if (error instanceof z.ZodError) {
                    // Convert ZodError to a more usable format
                    const fieldErrors: Record<string, string> = {}
                    error.errors.forEach((err) => {
                        if (err.path[0]) {
                            fieldErrors[err.path[0] as string] = err.message
                        }
                    })
                    setLocationErrors(fieldErrors)
                }
            }
        }
    }

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-md mx-auto">
                <div className="mb-6">
                    <button
                        onClick={() => (step === 1 ? router.push("/auth/otp-verification") : setStep(1))}
                        className="flex items-center text-gray-600"
                    >
                        <ArrowLeft className="h-5 w-5 mr-1" />
                        <span>Back</span>
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-[#00A67E] mb-6">
                    {step === 1 ? "Name/Number Input" : "Location Input"}
                </h2>

                {step === 1 ? (
                    <div className="space-y-4">
                        <p className="text-gray-600 mb-4">Please enter your personal information</p>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-md ${personalInfoErrors.firstName ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter First Name"
                                value={personalInfo.firstName}
                                onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                                onBlur={() => validatePersonalInfoField("firstName", personalInfo.firstName)}
                            />
                            {personalInfoErrors.firstName && (
                                <p className="mt-1 text-sm text-red-500">{personalInfoErrors.firstName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-md ${personalInfoErrors.lastName ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter Last Name"
                                value={personalInfo.lastName}
                                onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                                onBlur={() => validatePersonalInfoField("lastName", personalInfo.lastName)}
                            />
                            {personalInfoErrors.lastName && (
                                <p className="mt-1 text-sm text-red-500">{personalInfoErrors.lastName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="flex">
                                <div className="relative">
                                    <select
                                        className="appearance-none h-full py-3 pl-3 pr-8 border border-r-0 border-gray-300 rounded-l-md bg-white"
                                        value={personalInfo.countryCode}
                                        onChange={(e) => handlePersonalInfoChange("countryCode", e.target.value)}
                                    >
                                        <option value="+234">+234</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                                <input
                                    type="tel"
                                    className={`flex-1 p-3 border rounded-r-md ${personalInfoErrors.phoneNumber ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="Enter Phone Number"
                                    value={personalInfo.phoneNumber}
                                    onChange={(e) => {
                                        // Only allow numbers
                                        const value = e.target.value.replace(/\D/g, "")
                                        handlePersonalInfoChange("phoneNumber", value)
                                    }}
                                    onBlur={() => validatePersonalInfoField("phoneNumber", personalInfo.phoneNumber)}
                                    maxLength={10}
                                />
                            </div>
                            {personalInfoErrors.phoneNumber && (
                                <p className="mt-1 text-sm text-red-500">{personalInfoErrors.phoneNumber}</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-600 mb-4">Please enter your location information</p>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border rounded-md appearance-none bg-white pr-10"
                                    value={locationInfo.location}
                                    onChange={(e) => handleLocationInfoChange("location", e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select a location
                                    </option>
                                    <option value="lagos">Lagos</option>
                                    <option value="abuja">Abuja</option>
                                    <option value="port-harcourt">Port Harcourt</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                    <ChevronDown className="h-5 w-5" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                className={`w-full p-3 border rounded-md min-h-[100px] resize-none ${locationErrors.address ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter your home address"
                                value={locationInfo.address}
                                onChange={(e) => handleLocationInfoChange("address", e.target.value)}
                                onBlur={() => validateLocationField("address", locationInfo.address)}
                            />
                            {locationErrors.address && <p className="mt-1 text-sm text-red-500">{locationErrors.address}</p>}
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]" onClick={handleNextStep}>
                        {step === 1 ? "Next" : "Apply"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

