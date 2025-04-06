"use client"

import { useState } from "react"
import { ArrowUp, Users, DollarSign, BarChart2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    type TooltipProps,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Monthly referral data
const referralData = [
    {
        name: "Jan",
        referrals: 1800,
        conversions: 800,
    },
    {
        name: "Feb",
        referrals: 4000,
        conversions: 1200,
        tooltip: true,
    },
    {
        name: "Mar",
        referrals: 3500,
        conversions: 2500,
    },
    {
        name: "Apr",
        referrals: 5200,
        conversions: 1800,
    },
    {
        name: "May",
        referrals: 4800,
        conversions: 3000,
    },
    {
        name: "Jun",
        referrals: 4000,
        conversions: 2200,
    },
    {
        name: "Jul",
        referrals: 4500,
        conversions: 2300,
    },
    {
        name: "Aug",
        referrals: 3800,
        conversions: 2000,
    },
    {
        name: "Sep",
        referrals: 2000,
        conversions: 1200,
    },
    {
        name: "Oct",
        referrals: 5500,
        conversions: 3800,
    },
    {
        name: "Nov",
        referrals: 9000,
        conversions: 5000,
    },
    {
        name: "Dec",
        referrals: 5000,
        conversions: 2500,
    },
]

// Referrer data
const referrerData = [
    {
        id: "1",
        name: "John Smith",
        email: "Johnsmith@email.com",
        referrals: 24,
        conversionRate: 75,
        rewardsEarned: "N128,950",
        status: "active",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "Sarahjohnson@email.com",
        referrals: 18,
        conversionRate: 83,
        rewardsEarned: "N75,000",
        status: "active",
    },
    {
        id: "3",
        name: "Michael Brown",
        email: "michaelb@email.com",
        referrals: 32,
        conversionRate: 68,
        rewardsEarned: "N200,500",
        status: "active",
    },
    {
        id: "4",
        name: "Emily Davis",
        email: "Emilydavis@email.com",
        referrals: 12,
        conversionRate: 92,
        rewardsEarned: "N34,700",
        status: "active",
    },
]

// Custom tooltip for the referral chart
const CustomReferralTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length && label === "Feb") {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
                <p className="font-medium mb-1">{label}</p>
                <p className="text-[#00A67E] text-sm">4,000 referrals</p>
                <p className="text-[#10B981] text-sm">1,200 conversion</p>
            </div>
        )
    }

    return null
}

export default function ReferralsPage() {
    const [timeframe, setTimeframe] = useState("monthly")

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Referral Programs</h1>

                <Select defaultValue="monthly" onValueChange={setTimeframe}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Referrals */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Referrals</p>
                                <div className="text-2xl font-bold mt-2">2,845</div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center text-green-500 mr-2">
                                        <ArrowUp className="h-4 w-4 mr-1" />
                                        <span className="text-xs">+18.2%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">from last month</span>
                                </div>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Users className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Conversion Rate */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                                <div className="text-2xl font-bold mt-2">72.4%</div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center text-green-500 mr-2">
                                        <ArrowUp className="h-4 w-4 mr-1" />
                                        <span className="text-xs">+5.1%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">from last month</span>
                                </div>
                            </div>
                            <div className="bg-green-100 p-2 rounded-full">
                                <BarChart2 className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Referrers */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Referrers</p>
                                <div className="text-2xl font-bold mt-2">487</div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center text-green-500 mr-2">
                                        <ArrowUp className="h-4 w-4 mr-1" />
                                        <span className="text-xs">+12.5%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">from last month</span>
                                </div>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Users className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Rewards Distributed */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Rewards Distributed</p>
                                <div className="text-2xl font-bold mt-2">N 12,489,464.32</div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center text-green-500 mr-2">
                                        <ArrowUp className="h-4 w-4 mr-1" />
                                        <span className="text-xs">+22.5%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">from last month</span>
                                </div>
                            </div>
                            <div className="bg-green-100 p-2 rounded-full">
                                <DollarSign className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Referral Performance Chart */}
            <Card>
                <CardContent className="pt-6">
                    <div>
                        <h2 className="text-lg font-semibold">Referral Performance</h2>
                        <p className="text-sm text-gray-500">Monthly referral program performance and conversion rates.</p>
                    </div>
                    <div className="h-[400px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={referralData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis
                                    label={{
                                        value: "People",
                                        angle: -90,
                                        position: "insideLeft",
                                        style: { textAnchor: "middle" },
                                    }}
                                />
                                <Tooltip content={<CustomReferralTooltip />} />
                                <Legend
                                    wrapperStyle={{ bottom: 0 }}
                                    formatter={(value) => {
                                        return value === "referrals" ? "Referral" : "Conversion"
                                    }}
                                />
                                <Bar dataKey="referrals" stackId="a" fill="#00A67E" name="referrals" />
                                <Bar dataKey="conversions" stackId="a" fill="#10B981" name="conversions" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-2 text-sm">
                        <span className="text-[#00A67E] font-medium">Referral</span>
                        <span className="mx-2">&</span>
                        <span className="text-[#10B981] font-medium">Conversion</span>
                        <span className="text-gray-500 ml-2">rate</span>
                    </div>
                </CardContent>
            </Card>

            {/* Referrers Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-[#00A67E] text-white">
                        <TableRow>
                            <TableHead className="text-white">Referrer</TableHead>
                            <TableHead className="text-white">Email</TableHead>
                            <TableHead className="text-white">Referrals</TableHead>
                            <TableHead className="text-white">Conversion Rate</TableHead>
                            <TableHead className="text-white">Rewards Earned</TableHead>
                            <TableHead className="text-white">Usage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {referrerData.map((referrer) => (
                            <TableRow key={referrer.id}>
                                <TableCell className="font-medium">{referrer.name}</TableCell>
                                <TableCell>{referrer.email}</TableCell>
                                <TableCell>{referrer.referrals}</TableCell>
                                <TableCell>{referrer.conversionRate}%</TableCell>
                                <TableCell>{referrer.rewardsEarned}</TableCell>
                                <TableCell>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{referrer.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

