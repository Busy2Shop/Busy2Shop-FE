import Image from "next/image"

export default function OrderSummary() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="mb-4">
                    <Image src="/icons/empty-cart.png" alt="Empty cart" width={80} height={80} />
                </div>
                <h2 className="text-xl font-bold mb-4 text-center">Your Order</h2>
                <p className="text-gray-500 text-center mb-1">You've not added any products yet.</p>
                <p className="text-gray-500 text-center">When you do, you'll see them here!</p>
            </div>
        </div>
    )
}

