"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SlidersHorizontal } from "lucide-react"
import { products } from "../../lib/products"
import ProductCard from "../../components/product-card"
import Link from "next/link"

export default function ShopPage() {
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [priceRange] = useState<[number, number]>([0, 300])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedStyle, setSelectedStyle] = useState<string[]>([])

  const types = ["T-shirts", "Shirts", "Jeans", "Shorts"]
  const colors = [
    { name: "Brown", value: "brown" },
    { name: "Red", value: "red" },
    { name: "Green", value: "green" },
    { name: "Blue", value: "blue" },
    { name: "Yellow", value: "yellow" },
    { name: "Pink", value: "pink" },
    { name: "Light Green", value: "lightgreen" },
    { name: "Light Blue", value: "lightblue" },
    { name: "Black", value: "black" },
  ]
  const styles = ["Casual", "Formal", "Party", "Gym"]

  const handleTypeChange = (type: string) => {
    setSelectedType((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handleStyleChange = (style: string) => {
    setSelectedStyle((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]))
  }

  const applyFilters = () => {
    // In a real app, this would filter products based on selected criteria
    console.log("Applying filters:", { selectedType, priceRange, selectedColors, selectedStyle })
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-8">
      <div className="flex items-center mb-4">
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
              <span className="font-medium text-black">Shop</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <motion.aside
          className="w-full md:w-64 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Filters</h2>
              <button className="text-sm text-gray-500">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Type Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center justify-between">
                Type
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h3>
              <div className="space-y-2">
                {types.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      checked={selectedType.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    <span className="ml-2 text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center justify-between">
                Price
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h3>
              <div className="px-2">
                <div className="relative h-1 bg-gray-200 rounded-full">
                  <div className="absolute h-1 bg-black rounded-full" style={{ left: "0%", right: "0%" }}></div>
                  <div className="absolute w-4 h-4 bg-black rounded-full -mt-1.5" style={{ left: "0%" }}></div>
                  <div className="absolute w-4 h-4 bg-black rounded-full -mt-1.5" style={{ left: "100%" }}></div>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-sm">$0</span>
                  <span className="text-sm">$300</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-black text-white py-2 rounded-md text-sm" onClick={applyFilters}>
                Apply
              </button>
            </div>

            {/* Colors Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center justify-between">
                Colors
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-6 h-6 rounded-full border ${
                      selectedColors.includes(color.value) ? "ring-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.value)}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Dress Style Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center justify-between">
                Dress Style
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h3>
              <div className="space-y-2">
                {styles.map((style) => (
                  <label key={style} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      checked={selectedStyle.includes(style)}
                      onChange={() => handleStyleChange(style)}
                    />
                    <span className="ml-2 text-sm">{style}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Products Grid */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">All</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div key={product.id} custom={index} initial="hidden" animate="visible" variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
