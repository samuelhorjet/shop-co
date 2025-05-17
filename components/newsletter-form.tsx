"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    setEmail("")
    // Show success message or toast notification
  }

  return (
    <motion.div
      className="bg-black text-white p-8 rounded-lg max-w-[1400px] mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold uppercase mb-4">Stay up to date about our latest offers</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full py-3 pl-10 pr-4 rounded-md bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-white text-black font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors"
        >
          Subscribe to Newsletter
        </button>
      </form>
    </motion.div>
  )
}
