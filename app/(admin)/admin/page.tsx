"use client"

import { useState } from "react"
import { ArrowUp, Clock, CheckCircle, Users, User, Info, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LabelList,
    type TooltipProps,
} from "recharts"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

// Revenue by Location data
const locationData = [
    { name: "Ago Branch", value: 6, color: "#6B7280" },
    { name: "Lekki Branch", value: 30, color: "#10B981" },
    { name: "Computer Village Branch", value: 20, color: "#EF4444" },
    { name: "Alaba International Market Branch", value: 7, color: "#EC4899" },
    { name: "Isolo Branch", value: 3, color: "#F97316" },
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

// Agent Performance data
const agentData = [
    { name: "Alex W.", value: 45, target: 80 },
    { name: "Emma D.", value: 65, target: 80 },
    { name: "James M.", value: 75, target: 100 },
    { name: "Sophia C.", value: 42, target: 80 },
    { name: "Robert T.", value: 48, target: 80 },
    { name: "Maria R.", value: 60, target: 80 },
    { name: "Daniel K.", value: 88, target: 80 },
    { name: "Jessica B.", value: 62, target: 80 },
]

// Custom tooltip for the engagement chart
const CustomEngagementTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
                <p className="font-medium">{label}</p>
                {payload.map((entry, index) => (
                    <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3" style={{ backgroundColor: entry.color }}></div>
                        <span>
                            {entry.name}: {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        )
    }

    return null
}

// Custom tooltip for the pie chart
const CustomPieTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
                <p className="font-medium">{payload[0].name}</p>
                <p className="text-sm">{`${payload[0].value}% of total revenue`}</p>
            </div>
        )
    }

    return null
}

export default function AdminDashboard() {
    const [dateRange, setDateRange] = useState<{
        from: Date
        to: Date
    }>({
        from: new Date(2025, 0, 1),
        to: new Date(2025, 0, 31),
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                                    </>
                                ) : (
                                    format(dateRange.from, "MMM dd, yyyy")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={(range) => range?.from && range?.to && setDateRange({ from: range.from, to: range.to })}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Revenue */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                        <Info className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦22,200,000.6</div>
                        <div className="flex items-center mt-1">
                            <div className="flex items-center text-green-500 mr-2">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span className="text-xs">+203M</span>
                            </div>
                            <span className="text-xs text-gray-500">from last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Orders */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Active Orders</CardTitle>
                        <Info className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">198</div>
                        <div className="flex items-center justify-between mt-2 text-xs">
                            <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-yellow-500" />
                                <span>Pending</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-blue-500" />
                                <span>In Progress</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                <span>Completed</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Registered Agents */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Registered Agents</CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">302</div>
                        <div className="flex items-center mt-1">
                            <div className="flex items-center text-green-500 mr-2">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span className="text-xs">+14</span>
                            </div>
                            <span className="text-xs text-gray-500">new this month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Registered Customers */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Registered Customers</CardTitle>
                        <User className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2048</div>
                        <div className="flex items-center mt-1">
                            <div className="flex items-center text-green-500 mr-2">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span className="text-xs">+105</span>
                            </div>
                            <span className="text-xs text-gray-500">new this month</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue by Location Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Revenue by Location</CardTitle>
                    <p className="text-sm text-gray-500">Geographic distribution of revenue across regions</p>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={locationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={true}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, value }) => `${name} ${value}%`}
                                >
                                    {locationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
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
                                <YAxis />
                                <Tooltip content={<CustomEngagementTooltip />} />
                                <Legend />
                                <Bar dataKey="Instagram" fill="#0EA5E9" />
                                <Bar dataKey="Facebook" fill="#3B82F6" />
                                <Bar dataKey="Email" fill="#10B981" />
                                <Bar dataKey="App" fill="#8B5CF6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Agent Performance Report */}
            <Card>
                <CardHeader>
                    <CardTitle>Agent Performance Report</CardTitle>
                    <p className="text-sm text-gray-500">Monthly performance metrics for all agents</p>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={agentData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `${value}%`} />
                                <Tooltip formatter={(value) => [`${value}%`, "Performance"]} />
                                <Bar dataKey="value" fill="#0EA5E9">
                                    <LabelList dataKey="value" position="top" formatter={(value: any) => `${value}%`} />
                                </Bar>
                                {agentData.map((entry, index) => (
                                    <Bar
                                        key={`target-${index}`}
                                        dataKey="target"
                                        fill="transparent"
                                        stackId={`stack-${index}`}
                                        radius={[0, 0, 0, 0]}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

