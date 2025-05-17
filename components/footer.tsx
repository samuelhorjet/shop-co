"use client"

import Link from "next/link"
import { Twitter, Facebook, Instagram, Github } from "lucide-react"
import NewsletterForm from "./newsletter-form"

export default function Footer() {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Features of SHOP.CO", href: "/features" },
        { name: "Works", href: "/works" },
        { name: "Career", href: "/career" },
      ],
    },
    {
      title: "Help",
      links: [
        { name: "Customer Support", href: "/support" },
        { name: "Delivery Details", href: "/delivery" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "FAQ",
      links: [
        { name: "Account", href: "/account" },
        { name: "Manage Deliveries", href: "/manage-deliveries" },
        { name: "Orders", href: "/orders" },
        { name: "Payments", href: "/payments" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Free eBooks", href: "/ebooks" },
        { name: "Development Tutorial", href: "/tutorial" },
        { name: "How to - Blog", href: "/blog" },
        { name: "Youtube Playlist", href: "/youtube" },
      ],
    },
  ]

  const paymentMethods = [
    { name: "Visa", image: "/visa.svg" },
    { name: "Mastercard", image: "/mastercard.svg" },
    { name: "PayPal", image: "/paypal.svg" },
    { name: "Apple Pay", image: "/apple-pay.svg" },
    { name: "Google Pay", image: "/google-pay.svg" },
  ]

  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
        <NewsletterForm />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold">
              SHOP.CO
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-black">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-black">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">Shop.co © 2000-2024, All Rights Reserved</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {paymentMethods.map((method) => (
              <span key={method.name} className="text-gray-400">
                {method.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
