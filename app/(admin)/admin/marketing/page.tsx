"use client"

import { useState } from "react"
import { ArrowUp, Gift, Users, DollarSign, BarChart2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Referral Performance data
const referralData = [
    {
        name: "Jan",
        referrals: 1800,
        conversions: 800,
    },
    {
        name: "Feb",
        referrals: 2500,
        conversions: 1500,
        tooltip: true,
    },
    {
        name: "Mar",
        referrals: 2000,
        conversions: 1200,
    },
    {
        name: "Apr",
        referrals: 3000,
        conversions: 1000,
    },
    {
        name: "May",
        referrals: 2500,
        conversions: 1500,
    },
    {
        name: "Jun",
        referrals: 1800,
        conversions: 1200,
    },
    {
        name: "Jul",
        referrals: 2000,
        conversions: 1300,
    },
    {
        name: "Aug",
        referrals: 1700,
        conversions: 1100,
    },
    {
        name: "Sep",
        referrals: 1200,
        conversions: 700,
    },
    {
        name: "Oct",
        referrals: 2800,
        conversions: 2000,
    },
    {
        name: "Nov",
        referrals: 4000,
        conversions: 3000,
    },
    {
        name: "Dec",
        referrals: 2800,
        conversions: 1500,
    },
]

// Monthly Engagement data
const engagementData = [
    {
        name: "Jan",
        Instagram: 380,
        Facebook: 820,
        Email: 680,
        App: 300,
    },
    {
        name: "Feb",
        Instagram: 780,
        Facebook: 620,
        Email: 1000,
        tooltip: true,
        App: 580,
    },
    {
        name: "Mar",
        Instagram: 700,
        Facebook: 1380,
        Email: 950,
        App: 980,
    },
    {
        name: "Apr",
        Instagram: 720,
        Facebook: 420,
        Email: 610,
        App: 990,
    },
    {
        name: "May",
        Instagram: 740,
        Facebook: 1180,
        Email: 1250,
        App: 980,
    },
    {
        name: "Jun",
        Instagram: 780,
        Facebook: 950,
        Email: 1150,
        App: 800,
    },
]

// Custom tooltip for the referral chart
const CustomReferralTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length && label === "Feb") {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
                <p className="font-medium mb-1">{label}</p>
                <p className="text-[#0EA5E9] text-sm">4,000 referrals</p>
                <p className="text-[#10B981] text-sm">1,500 conversion</p>
            </div>
        )
    }

    return null
}

// Custom tooltip for the engagement chart
const CustomEngagementTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length && label === "Feb") {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
                <p className="font-medium mb-1">{label}</p>
                <p className="text-[#10B981] text-sm">Emails</p>
                <p className="font-medium">1100</p>
            </div>
        )
    }

    return null
}

export default function MarketingDashboard() {
    const [timeframe, setTimeframe] = useState("monthly")

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Marketing Dashboard</h1>

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
                {/* Active Promotions */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Active Promotions</CardTitle>
                        <Gift className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <div className="flex items-center mt-1">
                            <div className="flex items-center text-green-500 mr-2">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span className="text-xs">+2</span>
                            </div>
                            <span className="text-xs text-gray-500">from last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Referral Signups */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Referral Signups</CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <div className="flex items-center mt-1">
                            <div className="flex items-center text-green-500 mr-2">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span className="text-xs">+18.2%</span>
                            </div>
                            <span className="text-xs text-gray-500">from last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Campaign Revenue */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Campaign Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦ 22,472,489.50</div>
                        <div className="flex items-center mt-1">
                            <div className="flex items-center text-green-500 mr-2">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span className="text-xs">+12.5%</span>
                            </div>
                            <span className="text-xs text-gray-500">from last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Engagement Rate */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Engagement Rate</CardTitle>
                        <BarChart2 className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24.8%</div>
                        <div className="flex items-center mt-1">
                            <div className="flex items-center text-green-500 mr-2">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span className="text-xs">+5.1%</span>
                            </div>
                            <span className="text-xs text-gray-500">from last month</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Referral Performance Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Referral Performance</CardTitle>
                    <p className="text-sm text-gray-500">Monthly referral program performance and conversion rates.</p>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
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
                                    ticks={[0, 2500, 5000, 7500, 10000]}
                                />
                                <Tooltip content={<CustomReferralTooltip />} />
                                <Legend wrapperStyle={{ bottom: 0 }} />
                                <Bar dataKey="referrals" stackId="a" fill="#0EA5E9" name="Referral" />
                                <Bar dataKey="conversions" stackId="a" fill="#10B981" name="Conversion" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-2 text-sm">
                        <span className="text-[#0EA5E9] font-medium">Referral</span>
                        <span className="mx-2">&</span>
                        <span className="text-[#10B981] font-medium">Conversion</span>
                        <span className="text-gray-500 ml-2">rate</span>
                    </div>
                </CardContent>
            </Card>

            {/* Monthly Engagement Trends */}
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Engagement Trends</CardTitle>
                    <p className="text-sm text-gray-500">Engagement across different marketing channels</p>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={engagementData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600]} />
                                <Tooltip content={<CustomEngagementTooltip />} />
                                <Legend />
                                <Bar dataKey="Instagram" fill="#0EA5E9" />
                                <Bar dataKey="Facebook" fill="#F59E0B" />
                                <Bar dataKey="Email" fill="#10B981" />
                                <Bar dataKey="App" fill="#8B5CF6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

