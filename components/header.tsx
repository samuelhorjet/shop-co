"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, Menu } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Update cart count from localStorage
    const updateCartCount = () => {
      const storedItems = localStorage.getItem("cartItems")
      if (storedItems) {
        const items = JSON.parse(storedItems)
        const count = items.reduce((total: any, item: { quantity: any }) => total + item.quantity, 0)
        setCartCount(count)
      } else {
        setCartCount(0)
      }
    }

    // Initial count
    updateCartCount()

    // Listen for storage events (when cart is updated from another tab)
    window.addEventListener("storage", updateCartCount)

    // Custom event for cart updates within the same tab
    window.addEventListener("cartUpdated", updateCartCount)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
    }
  }, [])

  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "New Arrivals", href: "/#new-arrivals" },
    { name: "Top Selling", href: "/#top-selling" },
    { name: "On Sale", href: "/#on-sale" },
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      // If we're already on the homepage, just scroll to the section
      if (pathname === "/") {
        const sectionId = href.substring(2)
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        // Otherwise, navigate to the homepage and then scroll
        router.push(href)
      }
    } else {
      // Regular navigation
      router.push(href)
    }

    // Close mobile menu if open
    setMobileMenuOpen(false)
  }

  return (
    <motion.header
      className="border-b sticky top-0 bg-white z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold">
            SHOP.CO
          </Link>
          <nav className="hidden md:flex cursor-pointer items-center ml-20 space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-md hover:text-black transition-colors cursor-pointer ${
                  pathname === item.href ||
                  (pathname === "/" && item.href.startsWith("/#"))
                    ? "font-medium"
                    : "text-gray-600"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-[300px] text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-8 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left py-2 text-sm font-medium"
              >
                {item.name}
              </button>
            ))}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search for products..."
                className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-full text-sm focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
