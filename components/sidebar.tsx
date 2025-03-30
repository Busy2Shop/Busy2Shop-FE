"use client"

import { Home, Package, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const sidebarItems = [
    { icon: Home, label: "Home", href: "/", active: true },
    { icon: Package, label: "Orders", href: "/orders" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: User, label: "Profile", href: "/profile" },
]

export default function Sidebar() {
    return (
        <aside className="hidden md:block w-[226px] min-w-[226px] bg-white border-r">
            <nav className="flex flex-col">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 hover:bg-gray-100",
                            item.active && "bg-[#00A67E] text-white hover:bg-[#00A67E]",
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

