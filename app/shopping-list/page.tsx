"use client"

import { useState } from "react"
import { Plus, Minus, Trash2, MapPin, Clock, ChevronLeft, ChevronDown, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/navbar"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ShoppingItem {
  id: number
  name: string
  quantity: number
  note?: string
  showNoteInput?: boolean
  price?: number
}

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [newItem, setNewItem] = useState("")
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  const addItem = () => {
    if (newItem.trim()) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItem.trim(),
          quantity: 1,
          showNoteInput: false,
          price: Math.floor(Math.random() * 2000) + 500, // Random price for demo
        },
      ])
      setNewItem("")
    }
  }

  const updateQuantity = (id: number, quantity: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item)))
  }

  const toggleNoteInput = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, showNoteInput: !item.showNoteInput } : item)))
  }

  const updateNote = (id: number, note: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, note } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">Shopping List</h1>
            <p className="text-[#00A67E] mb-6">Your're shopping from (Ajah Market)</p>

            {items.length > 0 ? (
              <p className="mb-4">{totalItems} Items added to order</p>
            ) : (
              <div className="flex items-center justify-center h-40 mb-4">
                <p className="text-gray-500">No Item added to order yet</p>
              </div>
            )}

            {items.map((item) => (
              <div key={item.id} className="mb-3 border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-md border-[#00A67E] text-[#00A67E]"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-md border-[#00A67E] text-[#00A67E]"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${item.showNoteInput ? "text-[#00A67E]" : "text-gray-400"}`}
                      onClick={() => toggleNoteInput(item.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Note input for existing items */}
                {item.showNoteInput && (
                  <div className="mt-3 border rounded">
                    <Textarea
                      placeholder="Add note (e.g. Two Crates)"
                      className="border-none resize-none min-h-[80px]"
                      value={item.note || ""}
                      onChange={(e) => updateNote(item.id, e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 border rounded-md flex items-center">
              <div className="flex-1 px-3">
                <Input
                  placeholder="Add new item..."
                  className="border-none shadow-none focus-visible:ring-0"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addItem()}
                />
              </div>
              <Button className="rounded-l-none bg-gray-800 hover:bg-gray-700" onClick={addItem}>
                Add
              </Button>
            </div>
          </div>

          {items.length > 0 && (
            <div className="lg:w-[350px] border rounded-md p-4">
              <h2 className="text-xl font-bold mb-4 text-center">Your Order</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <div>
                        {item.name} {item.quantity > 1 && `(${item.quantity})`}
                      </div>
                      {item.note && <div className="text-xs text-gray-500">{item.note}</div>}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center font-bold mb-4">
                <span>Total</span>
                <span>NGN {totalPrice.toLocaleString()}</span>
              </div>

              <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]" onClick={() => setShowCheckoutModal(true)}>
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <Dialog open={showCheckoutModal} onOpenChange={setShowCheckoutModal}>
        <DialogContent className="sm:max-w-[550px]">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => setShowCheckoutModal(false)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold">Order Confirmation</h2>
          </div>

          <div className="space-y-6">
            {/* Delivery Address */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Delivery Address</h3>
                <Button variant="link" className="text-[#00A67E] p-0 h-auto">
                  Change
                </Button>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span>Home 925 S Chugach St #APT 10, Alaska 9964</span>
              </div>
            </div>

            {/* Selected Market & Delivery */}
            <div>
              <h3 className="font-semibold mb-2">Selected Market & Delivery</h3>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span className="mr-4">PennyMart</span>
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span>Estimated delivery: 30-45 minutes</span>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <h3 className="font-semibold mb-2">Additional Notes</h3>
              <p className="text-sm">
                Hi! Good day,
                <br />
                pls make sure the milk is not expired and if you can find them at that store, you check Globus
                Supermarket.
                <br />
                Thanks.
              </p>
            </div>

            {/* Shopping List Summary */}
            <div>
              <h3 className="font-semibold mb-3">Shopping List Summary</h3>

              <div className="space-y-2 mb-4">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span>
                        {item.name} {item.quantity > 1 && `(${item.quantity})`}
                        {item.note && <span className="text-xs text-gray-500 ml-2">- {item.note}</span>}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>NGN {((item.price || 0) * item.quantity).toLocaleString()}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[#00A67E]">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center font-bold mb-4">
                <span>Total</span>
                <span>NGN {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Add Additional Items */}
            <div>
              <h3 className="font-semibold mb-2">Add Additional Items</h3>
              <div className="border rounded-md flex items-center">
                <Button variant="outline" className="w-full justify-between border-none">
                  <span className="text-gray-500">Choose market</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button className="w-full bg-[#00A67E] hover:bg-[#008F6B]">Continue to Payment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

