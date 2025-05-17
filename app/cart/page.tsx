"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart items from localStorage
    const storedItems = localStorage.getItem("cartItems")
    if (storedItems) {
      setCartItems(JSON.parse(storedItems))
    }
  }, [])

  // Update localStorage when cart items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState(false)

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "moemen") {
      setAppliedPromo(true)
    } else {
      alert("Invalid promo code")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo ? subtotal * 0.2 : 0
  const deliveryFee = 15
  const total = subtotal - discount + deliveryFee

  return (
    <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-black">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <span className="font-medium text-black">Cart</span>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-8">YOUR CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="border rounded-lg p-4 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-sm text-gray-500 mb-2">
                      Size: {item.size} | Color: {item.color}
                    </div>
                    <div className="font-bold">${item.price}</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <button className="px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        −
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button className="px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>

                    <button className="text-red-500" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/shop" className="bg-black text-white px-6 py-3 rounded-md inline-block font-medium">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <motion.div
            className="border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>

              <div className="flex justify-between text-red-500">
                <span>Discount ({appliedPromo ? "20%" : "0%"})</span>
                <span>-${discount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium">${deliveryFee}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center border rounded-md mb-2">
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="flex-grow px-4 py-2 focus:outline-none"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="bg-black text-white px-4 py-2 rounded-r-md" onClick={applyPromoCode}>
                  Apply
                </button>
              </div>

              {appliedPromo && <p className="text-sm text-green-600">Promo code "Moemen" applied for 20% discount!</p>}

              {!appliedPromo && <p className="text-sm text-gray-500">Use promo code Moemen for 20% discount</p>}
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md font-medium mb-4">Go to Checkout</button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
