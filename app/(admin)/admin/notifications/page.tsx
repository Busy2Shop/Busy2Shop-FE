"use client"

import { useState } from "react"
import { ArrowUp, Mail, Bell, MessageSquare, MessageCircle, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Campaign data
interface Campaign {
    id: string
    name: string
    type: "Email" | "Push Notification" | "SMS" | "In-App"
    status: "Sent" | "Draft" | "Scheduled"
    audience: string
    sentDate: string
    openRate: string
    usage: string
}

export default function NotificationsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([
        {
            id: "1",
            name: "Summer Collection",
            type: "Email",
            status: "Sent",
            audience: "All Customers",
            sentDate: "Jan-01-2023",
            openRate: "24.5%",
            usage: "12.3%",
        },
        {
            id: "2",
            name: "New Feature Announcement",
            type: "Push Notification",
            status: "Draft",
            audience: "App Users",
            sentDate: "-",
            openRate: "-",
            usage: "-",
        },
        {
            id: "3",
            name: "Holiday Special",
            type: "Email",
            status: "Scheduled",
            audience: "Loyalty Members",
            sentDate: "May-15-2023",
            openRate: "-",
            usage: "-",
        },
        {
            id: "4",
            name: "Flash Sale Alert",
            type: "SMS",
            status: "Sent",
            audience: "Previous Buyers",
            sentDate: "Jan-01-2023",
            openRate: "68.2%",
            usage: "32.7%",
        },
    ])

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Sent":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sent</Badge>
            case "Draft":
                return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
            case "Scheduled":
                return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Scheduled</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Email":
                return <Mail className="h-4 w-4 text-blue-500" />
            case "Push Notification":
                return <Bell className="h-4 w-4 text-purple-500" />
            case "SMS":
                return <MessageSquare className="h-4 w-4 text-green-500" />
            case "In-App":
                return <MessageCircle className="h-4 w-4 text-orange-500" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notifications & Marketing Messages</h1>
                <Button className="bg-[#00A67E] hover:bg-[#008F6B]">
                    <Mail className="mr-2 h-4 w-4" /> New Campaign
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Email Open Rate */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Email Open Rate</p>
                                <div className="text-2xl font-bold mt-2">24.8%</div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center text-green-500 mr-2">
                                        <ArrowUp className="h-4 w-4 mr-1" />
                                        <span className="text-xs">+2.1%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">from last month</span>
                                </div>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Mail className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Push Notification CTR */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Push Notification CTR</p>
                                <div className="text-2xl font-bold mt-2">12.5%</div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center text-green-500 mr-2">
                                        <ArrowUp className="h-4 w-4 mr-1" />
                                        <span className="text-xs">+1.2%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">from last month</span>
                                </div>
                            </div>
                            <div className="bg-purple-100 p-2 rounded-full">
                                <Bell className="h-5 w-5 text-purple-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* SMS Delivery Rate */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">SMS Delivery Rate</p>
                                <div className="text-2xl font-bold mt-2">98.7%</div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center text-green-500 mr-2">
                                        <ArrowUp className="h-4 w-4 mr-1" />
                                        <span className="text-xs">+0.5%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">from last month</span>
                                </div>
                            </div>
                            <div className="bg-green-100 p-2 rounded-full">
                                <MessageSquare className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* In-App Message Views */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">In-App Message Views</p>
                                <div className="text-2xl font-bold mt-2">45,231</div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center text-green-500 mr-2">
                                        <ArrowUp className="h-4 w-4 mr-1" />
                                        <span className="text-xs">+15.1%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">from last month</span>
                                </div>
                            </div>
                            <div className="bg-orange-100 p-2 rounded-full">
                                <MessageCircle className="h-5 w-5 text-orange-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Campaigns Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-[#00A67E] text-white">
                        <TableRow>
                            <TableHead className="text-white">Campaign Name</TableHead>
                            <TableHead className="text-white">Type</TableHead>
                            <TableHead className="text-white">Status</TableHead>
                            <TableHead className="text-white">Audience</TableHead>
                            <TableHead className="text-white">Sent</TableHead>
                            <TableHead className="text-white">Open Rate</TableHead>
                            <TableHead className="text-white">Usage</TableHead>
                            <TableHead className="text-white">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {getTypeIcon(campaign.type)}
                                        <span>{campaign.type}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                                <TableCell>{campaign.audience}</TableCell>
                                <TableCell>{campaign.sentDate}</TableCell>
                                <TableCell>{campaign.openRate}</TableCell>
                                <TableCell>{campaign.usage}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

