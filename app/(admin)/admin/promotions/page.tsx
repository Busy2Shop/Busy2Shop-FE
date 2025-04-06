"use client"

import type React from "react"

import { useState } from "react"
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"

// Define promotion types
interface Promotion {
    id: string
    name: string
    code: string
    type: "Fixed Amount" | "Percentage"
    amount?: number
    status: "active" | "scheduled" | "ended"
    startDate: string
    endDate: string
    usage: string
}

export default function PromotionsPage() {
    // State for promotions list
    const [promotions, setPromotions] = useState<Promotion[]>([
        {
            id: "1",
            name: "New User Discount",
            code: "WELCOME10",
            type: "Fixed Amount",
            amount: 1000,
            status: "active",
            startDate: "Jan-01-2023",
            endDate: "Dec-31-2023",
            usage: "3,872/ 10,000",
        },
        {
            id: "2",
            name: "Holiday Special",
            code: "HOLIDAY30",
            type: "Percentage",
            amount: 30,
            status: "scheduled",
            startDate: "Nov-15-2023",
            endDate: "Dec-31-2023",
            usage: "0/ 2,000",
        },
        {
            id: "3",
            name: "Flash Sale",
            code: "FLASH50",
            type: "Percentage",
            amount: 50,
            status: "ended",
            startDate: "May-15-2023",
            endDate: "May-17-2023",
            usage: "1,872/ 2,000",
        },
        {
            id: "4",
            name: "Referral Bonus",
            code: "FRIEND20",
            type: "Percentage",
            amount: 20,
            status: "active",
            startDate: "Jan-01-2023",
            endDate: "Dec-31-2023",
            usage: "2,145/ 5,000",
        },
        {
            id: "5",
            name: "Summer Sale",
            code: "SUMMER25",
            type: "Percentage",
            amount: 25,
            status: "active",
            startDate: "Jun-01-2023",
            endDate: "Aug-31-2023",
            usage: "1,245/ 5,000",
        },
    ])

    // State for delete dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [promotionToDelete, setPromotionToDelete] = useState<Promotion | null>(null)

    // State for create/edit dialog
    const [formDialogOpen, setFormDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        type: "",
        amount: "",
        startDate: null as Date | null,
        endDate: null as Date | null,
    })

    // Open create dialog
    const handleCreate = () => {
        setIsEditing(false)
        setCurrentPromotion(null)
        setFormData({
            name: "",
            code: "",
            type: "",
            amount: "",
            startDate: null,
            endDate: null,
        })
        setFormDialogOpen(true)
    }

    // Open edit dialog
    const handleEdit = (promotion: Promotion) => {
        setIsEditing(true)
        setCurrentPromotion(promotion)

        // Parse dates
        let startDate = null
        let endDate = null
        try {
            startDate = parse(promotion.startDate, "MMM-dd-yyyy", new Date())
            endDate = parse(promotion.endDate, "MMM-dd-yyyy", new Date())
        } catch (error) {
            console.error("Error parsing dates:", error)
        }

        setFormData({
            name: promotion.name,
            code: promotion.code,
            type: promotion.type === "Fixed Amount" ? "fixed" : "percentage",
            amount: promotion.amount?.toString() || "",
            startDate,
            endDate,
        })

        setFormDialogOpen(true)
    }

    // Open delete dialog
    const handleDelete = (promotion: Promotion) => {
        setPromotionToDelete(promotion)
        setDeleteDialogOpen(true)
    }

    // Confirm delete
    const confirmDelete = () => {
        if (promotionToDelete) {
            setPromotions(promotions.filter((p) => p.id !== promotionToDelete.id))
            setDeleteDialogOpen(false)
            setPromotionToDelete(null)
        }
    }

    // Handle form submission
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (isEditing && currentPromotion) {
            // Update existing promotion
            const updatedPromotion: Promotion = {
                ...currentPromotion,
                name: formData.name,
                code: formData.code,
                type: formData.type === "fixed" ? "Fixed Amount" : "Percentage",
                amount: Number.parseFloat(formData.amount),
                startDate: formData.startDate ? format(formData.startDate, "MMM-dd-yyyy") : currentPromotion.startDate,
                endDate: formData.endDate ? format(formData.endDate, "MMM-dd-yyyy") : currentPromotion.endDate,
            }

            setPromotions(promotions.map((p) => (p.id === currentPromotion.id ? updatedPromotion : p)))
        } else {
            // Create new promotion
            const newPromotion: Promotion = {
                id: Date.now().toString(),
                name: formData.name,
                code: formData.code,
                type: formData.type === "fixed" ? "Fixed Amount" : "Percentage",
                amount: Number.parseFloat(formData.amount),
                status: "active",
                startDate: formData.startDate ? format(formData.startDate, "MMM-dd-yyyy") : "Jan-01-2023",
                endDate: formData.endDate ? format(formData.endDate, "MMM-dd-yyyy") : "Dec-31-2023",
                usage: "0/ 1,000",
            }

            setPromotions([...promotions, newPromotion])
        }

        setFormDialogOpen(false)
    }

    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">active</Badge>
            case "scheduled":
                return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Scheduled</Badge>
            case "ended":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Ended</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Promotions & Discounts</h1>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> New Promotion
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Usage</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {promotions.map((promotion) => (
                            <TableRow key={promotion.id}>
                                <TableCell>{promotion.name}</TableCell>
                                <TableCell>{promotion.code}</TableCell>
                                <TableCell>{promotion.type}</TableCell>
                                <TableCell>{getStatusBadge(promotion.status)}</TableCell>
                                <TableCell>{promotion.startDate}</TableCell>
                                <TableCell>{promotion.endDate}</TableCell>
                                <TableCell>{promotion.usage}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEdit(promotion)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(promotion)}>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Create/Edit Promotion Dialog */}
            <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Promotion" : "Create New Promo"}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="promoName">Promo Name</Label>
                            <Input
                                id="promoName"
                                placeholder="Enter a promo name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="promoCode">Promo Code</Label>
                            <Input
                                id="promoCode"
                                placeholder="Enter a promo code"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="promoType">Promo Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a promo type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {formData.type === "fixed" && (
                            <div className="space-y-2">
                                <Label htmlFor="fixedAmount">Fixed Amount</Label>
                                <Input
                                    id="fixedAmount"
                                    placeholder="Enter a promo price"
                                    type="number"
                                    min="0"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        {formData.type === "percentage" && (
                            <div className="space-y-2">
                                <Label htmlFor="percentageAmount">Percentage</Label>
                                <Input
                                    id="percentageAmount"
                                    placeholder="Enter percentage discount"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Promo Starting Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="startDate"
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !formData.startDate && "text-muted-foreground",
                                            )}
                                        >
                                            {formData.startDate ? format(formData.startDate, "PPP") : "Enter the promo starting date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={formData.startDate || undefined}
                                            onSelect={(date) => setFormData({ ...formData, startDate: date || null })}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endDate">Promo Ending Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="endDate"
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !formData.endDate && "text-muted-foreground",
                                            )}
                                        >
                                            {formData.endDate ? format(formData.endDate, "PPP") : "Enter the promo ending date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={formData.endDate || undefined}
                                            onSelect={(date) => setFormData({ ...formData, endDate: date || null })}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setFormDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-[#00A67E] hover:bg-[#008F6B]">
                                {isEditing ? "Update Promotion" : "Create New Promo"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Promotion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the promotion "{promotionToDelete?.name}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

