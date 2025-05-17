"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import type { Product } from "../lib/types"

interface ProductCardProps {
  product: Product
}

function isValidUrl(url?: string) {
  try {
    return Boolean(url && new URL(url));
  } catch {
    return false;
  }
}


export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, originalPrice, rating, discount, image } = product

  return (
    <motion.div
      className="group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/product/${id}`}>
        <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-3">
          <Image
            src={isValidUrl(image) ? image : "/placeholder.png"}
            alt={name}
            width={300}
            height={300}
            className="w-full h-auto object-cover aspect-square"
          />
          {discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
        </div>

        <h3 className="font-medium text-base mb-1">{name}</h3>

        <div className="flex items-center mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating)
                  ? "fill-current text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">{rating} / 5</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold">${price}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm">
              ${originalPrice}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
