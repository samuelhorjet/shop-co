"use client"

import { motion } from "framer-motion"

export default function PromoBar() {
  return (
    <motion.div
      className="bg-black text-white text-center py-2 text-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Use promo code <span className="font-bold">Moemen</span> for 20% discount
    </motion.div>
  )
}
