import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function WelcomeSection() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
                <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Lucy" />
                    <AvatarFallback>LW</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xl font-medium">Hi, Lucy</h2>
                    <p className="text-gray-600">Welcome back to waka2shop</p>
                </div>
            </div>
            <Link href="/shopping-list">
                <Button className="bg-[#00A67E] hover:bg-[#008F6B] text-white">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Shopping List
                </Button>
            </Link>
        </div>
    )
}

