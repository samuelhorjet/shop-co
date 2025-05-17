"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, Star } from "lucide-react"
import { products } from "../../../lib/products"
import { Tab } from "../../../components/ui/tabs"
import ProductReviews from "../../../components/product-reviews"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id) || products[0]

  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5)

  return (
    <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-8">
      <nav className="text-sm text-gray-500 mb-8">
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
            <Link href="/shop" className="hover:text-black">
              Shop
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <span className="font-medium text-black">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Image
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold mb-4 uppercase">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "fill-current text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{product.rating} / 5</span>
          </div>

          <div className="text-2xl font-bold mb-6">${product.price}</div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Select Colors</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${selectedColor === color ? "ring-2 ring-black ring-offset-2" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Choose Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-md border ${
                    selectedSize === size ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border rounded-md">
              <button className="px-3 py-2 border-r" onClick={decreaseQuantity}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button className="px-3 py-2 border-l" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <motion.button
              className="flex-1 bg-black text-white py-3 rounded-md font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // In a real app, this would add the item to a cart state or context
                // For now, we'll just store in localStorage
                const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
                const newItem = {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: quantity,
                  size: selectedSize,
                  color: selectedColor,
                  image: product.image,
                }

                // Check if item already exists
                const existingItemIndex = cartItems.findIndex(
                  (item: { id: string; size: string; color: string }) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color,
                )

                if (existingItemIndex >= 0) {
                  // Update quantity if item exists
                  cartItems[existingItemIndex].quantity += quantity
                } else {
                  // Add new item
                  cartItems.push(newItem)
                }

                localStorage.setItem("cartItems", JSON.stringify(cartItems))
                alert(`Added ${quantity} ${product.name} to cart!`)
              }}
            >
              Add to Cart
            </motion.button>
          </div>

          {/* Product Description */}
          <p className="text-gray-600 mb-6">
            {product.description || "A premium quality product designed with attention to detail and comfort in mind."}
          </p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="border-b flex">
          <Tab active={activeTab === "details"} onClick={() => setActiveTab("details")}>
            Product Details
          </Tab>
          <Tab active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")}>
            Rating & Reviews
          </Tab>
          <Tab active={activeTab === "faqs"} onClick={() => setActiveTab("faqs")}>
            FAQs
          </Tab>
        </div>

        <div className="py-8">
          <AnimatePresence mode="wait">
            {activeTab === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-medium mb-4">Product Details</h3>
                <p className="text-gray-600">
                  Our {product.name} is crafted with premium materials to ensure both style and durability. The design
                  features clean lines and thoughtful details that make it versatile for various occasions.
                </p>
                <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
                  <li>Premium quality fabric</li>
                  <li>Comfortable fit</li>
                  <li>Durable construction</li>
                  <li>Easy care instructions</li>
                  <li>Versatile styling options</li>
                </ul>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductReviews productId={product.id} />
              </motion.div>
            )}

            {activeTab === "faqs" && (
              <motion.div
                key="faqs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">What sizes are available?</h4>
                    <p className="text-gray-600">
                      Our products typically come in sizes S, M, L, and XL. Please refer to our size guide for detailed
                      measurements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">How do I care for this product?</h4>
                    <p className="text-gray-600">
                      We recommend machine washing cold with like colors and tumble dry low. Do not bleach.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">What is your return policy?</h4>
                    <p className="text-gray-600">
                      We offer a 30-day return policy for unworn items in original packaging. Please see our Returns
                      page for more details.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">How long does shipping take?</h4>
                    <p className="text-gray-600">
                      Standard shipping typically takes 3-5 business days. Express shipping options are available at
                      checkout.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* You Might Also Like */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">YOU MIGHT ALSO LIKE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {relatedProducts.map((relatedProduct, index) => (
            <motion.div
              key={relatedProduct.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/product/${relatedProduct.id}`}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-3">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg?height=300&width=300"}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                    />
                    {relatedProduct.discount && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{relatedProduct.discount}%
                      </div>
                    )}
                  </div>

                  <h3 className="font-medium text-base mb-1">{relatedProduct.name}</h3>

                  <div className="flex items-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(relatedProduct.rating) ? "fill-current text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{relatedProduct.rating} / 5</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">${relatedProduct.price}</span>
                    {relatedProduct.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">${relatedProduct.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
