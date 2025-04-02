"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ProfileSetupPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)

    // Personal info state
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [countryCode, setCountryCode] = useState("+234") // Nigeria

    // Location state
    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")

    // Validation states
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [phoneNumberError, setPhoneNumberError] = useState("")
    const [addressError, setAddressError] = useState("")

    const validatePersonalInfo = () => {
        let isValid = true

        if (!firstName.trim()) {
            setFirstNameError("First name is required")
            isValid = false
        } else {
            setFirstNameError("")
        }

        if (!lastName.trim()) {
            setLastNameError("Last name is required")
            isValid = false
        } else {
            setLastNameError("")
        }

        if (!phoneNumber.trim()) {
            setPhoneNumberError("Phone number is required")
            isValid = false
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            setPhoneNumberError("Please enter a valid 10-digit phone number")
            isValid = false
        } else {
            setPhoneNumberError("")
        }

        return isValid
    }

    const validateLocation = () => {
        let isValid = true

        if (!address.trim()) {
            setAddressError("Address is required")
            isValid = false
        } else {
            setAddressError("")
        }

        return isValid
    }

    const handleNextStep = () => {
        if (step === 1) {
            if (validatePersonalInfo()) {
                setStep(2)
            }
        } else if (step === 2) {
            if (validateLocation()) {
                router.push("/onboarding")
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
                                className={`w-full p-3 border rounded-md ${firstNameError ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                    if (firstNameError) setFirstNameError("")
                                }}
                            />
                            {firstNameError && <p className="mt-1 text-sm text-red-500">{firstNameError}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-md ${lastNameError ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                    if (lastNameError) setLastNameError("")
                                }}
                            />
                            {lastNameError && <p className="mt-1 text-sm text-red-500">{lastNameError}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="flex">
                                <div className="relative">
                                    <select
                                        className="appearance-none h-full py-3 pl-3 pr-8 border border-r-0 border-gray-300 rounded-l-md bg-white"
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
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
                                    className={`flex-1 p-3 border rounded-r-md ${phoneNumberError ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="Enter Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        // Only allow numbers
                                        const value = e.target.value.replace(/\D/g, "")
                                        setPhoneNumber(value)
                                        if (phoneNumberError) setPhoneNumberError("")
                                    }}
                                    maxLength={10}
                                />
                            </div>
                            {phoneNumberError && <p className="mt-1 text-sm text-red-500">{phoneNumberError}</p>}
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
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
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
                                className={`w-full p-3 border rounded-md min-h-[100px] resize-none ${addressError ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter your home address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                    if (addressError) setAddressError("")
                                }}
                            />
                            {addressError && <p className="mt-1 text-sm text-red-500">{addressError}</p>}
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

