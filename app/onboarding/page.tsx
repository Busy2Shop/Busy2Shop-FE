"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface OnboardingSlide {
    title: string
    description: string
    image: string
}

export default function OnboardingPage() {
    const router = useRouter()
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides: OnboardingSlide[] = [
        {
            title: "Shop any market",
            description: "Chat with agents and have your shopping delivered to your doorstep",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            title: "No stress shopping",
            description: "Forget about traffic jams and long queues. Shop from the comfort of your home",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            title: "Refer, shop, earn",
            description: "Earn cash when your friends shop with us",
            image: "/placeholder.svg?height=300&width=300",
        },
    ]

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1)
        } else {
            router.push("/")
        }
    }

    const handleSkip = () => {
        router.push("/")
    }

    return (
        <div className="min-h-screen bg-[#00A67E] flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-white">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <Image
                            src={slides[currentSlide].image || "/placeholder.svg"}
                            alt={slides[currentSlide].title}
                            width={300}
                            height={300}
                            className="mx-auto"
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-2">{slides[currentSlide].title}</h2>

                    <p className="text-center mb-8">{slides[currentSlide].description}</p>

                    <div className="flex justify-center space-x-2 mb-8">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/30"}`}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center">
                        {currentSlide < slides.length - 1 ? (
                            <Button className="w-12 h-12 rounded-full bg-white text-[#00A67E] hover:bg-white/90" onClick={handleNext}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 18L15 12L9 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Button>
                        ) : (
                            <Button className="w-12 h-12 rounded-full bg-white text-[#00A67E] hover:bg-white/90" onClick={handleNext}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5 12L19 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 5L19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <button className="text-white text-center w-full" onClick={handleSkip}>
                    Skip
                </button>
            </div>
        </div>
    )
}

