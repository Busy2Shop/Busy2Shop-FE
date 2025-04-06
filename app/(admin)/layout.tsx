"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MapPin, TrendingUp, Calculator, BarChart2, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface SidebarItemProps {
    icon: React.ElementType
    label: string
    href: string
    active?: boolean
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
    return (
        <Link href={href}>
            <div
                className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    active ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800",
                )}
            >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
            </div>
        </Link>
    )
}

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <h1 className="text-xl font-bold">
                        <span className="text-primary">Busy</span>
                        <span className="text-accent">2</span>
                        <span className="text-primary">shop</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarItem icon={LayoutDashboard} label="Overview" href="/admin" active={pathname === "/admin"} />
                    <SidebarItem
                        icon={MapPin}
                        label="Location Admin Overview"
                        href="/admin/location"
                        active={pathname === "/admin/location"}
                    />
                    <SidebarItem
                        icon={TrendingUp}
                        label="Marketing Admin Overview"
                        href="/admin/marketing"
                        active={pathname === "/admin/marketing"}
                    />
                    <SidebarItem
                        icon={Calculator}
                        label="Accounting Admin Overview"
                        href="/admin/accounting"
                        active={pathname === "/admin/accounting"}
                    />
                    <SidebarItem
                        icon={BarChart2}
                        label="Reports & Analytics"
                        href="/admin/reports"
                        active={pathname === "/admin/reports"}
                    />
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-sm mr-2">Dark mode</span>
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <div className="p-6">{children}</div>
            </main>
        </div>
    )
}

