"use client"

import { Home, Package, MessageSquare, UserCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const sidebarItems = [
    { icon: Home, label: "Home", href: "/", active: true },
    { icon: Package, label: "Orders", href: "/orders", count: 4 },
    { icon: MessageSquare, label: "Chat", href: "/messages", count: 2 },
    { icon: UserCircle, label: "Profile", href: "/profile" },
]

export default function Sidebar() {
    return (
        <aside className="hidden md:block w-[226px] min-w-[226px] bg-white border-r">
            <nav className="flex flex-col space-y-2">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 relative transition-colors",
                            item.active && "bg-[#00A67E] text-white hover:bg-[#00A67E]",
                            (item.count ) && !item.active && "bg-[#FAFAFA]"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="flex-1">{item.label}</span>
                        {item.count && (
                            <span className="ml-auto flex items-center justify-center text-xs font-bold text-white bg-[#FF6600] rounded-full w-6 h-6">
                                {item.count}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

