"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { products } from "../lib/products"
import ProductCard from "../components/product-card"

export default function Home() {
  const newArrivals = products.slice(0, 5)
  const topSelling = products.slice(5, 10)
  const onSale = products.slice(10, 15)

  const newArrivalsRef = useRef<HTMLElement>(null)
  const topSellingRef = useRef<HTMLElement>(null)
  const onSaleRef = useRef<HTMLElement>(null)

  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if there's a section to scroll to
    const section = searchParams.get("section")
    if (section) {
      const sectionRef =
        section === "new-arrivals"
          ? newArrivalsRef.current
          : section === "top-selling"
            ? topSellingRef.current
            : section === "on-sale"
              ? onSaleRef.current
              : null

      if (sectionRef) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          sectionRef.scrollIntoView({ behavior: "smooth" })
        }, 300)
      }
    }
  }, [searchParams])

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      verified: true,
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      id: 2,
      name: "Mark K.",
      rating: 5,
      verified: true,
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
      id: 3,
      name: "James L.",
      rating: 5,
      verified: true,
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
  ]

  const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"]

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-5">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl pt-15 md:pt-20 font-bold mb-4">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="text-gray-600 mb-8 max-w-md">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <Link
                href="/shop"
                className="bg-black text-white px-8 py-3 rounded-full inline-block font-medium hover:bg-gray-800 transition-colors"
              >
                Shop Now
              </Link>

              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold">200+</p>
                  <p className="text-sm text-gray-600">International Brands</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">2,000+</p>
                  <p className="text-sm text-gray-600">High-Quality Products</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">30,000+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/hero.png"
                alt="Fashion models wearing Shop.co clothing"
                width={430}
                height={430}
                className="ml-0 md:ml-20"
              />
              <motion.div
                className="absolute -top-4 -right-4 text-4xl"
                animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 text-4xl"
                animate={{ rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  delay: 1.5,
                }}
              >
                ⭐
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-8 border-t border-b">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex justify-between items-center flex-wrap gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                className="text-xl md:text-2xl font-bold text-center mx-auto"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section
        ref={newArrivalsRef}
        id="new-arrivals"
        className="py-16 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            NEW ARRIVALS
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Section */}
      <section
        ref={topSellingRef}
        id="top-selling"
        className="py-16 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            TOP SELLING
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {topSelling.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* On Sale Section */}
      <section ref={onSaleRef} id="on-sale" className="py-16 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            ON SALE
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {onSale.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            OUR HAPPY CUSTOMERS
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="p-6 rounded-lg"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex items-center mb-4">
                  <span className="font-medium">{testimonial.name}</span>
                  {testimonial.verified && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
