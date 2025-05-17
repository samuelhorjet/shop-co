import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import PromoBar from "../components/promo-bar"
import Header from "../components/header"
import Footer from "../components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SHOP.CO | Find Clothes That Match Your Style",
  description:
    "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PromoBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
