"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MoreHorizontal } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  verified: boolean;
  text: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 4.5,
    verified: true,
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "August 14, 2023",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4,
    verified: true,
    text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: "August 15, 2023",
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 3.5,
    verified: true,
    text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    date: "August 16, 2023",
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 4,
    verified: true,
    text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    date: "August 17, 2023",
  },
  {
    id: 5,
    name: "Liam K.",
    rating: 4,
    verified: true,
    text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    date: "August 18, 2023",
  },
  {
    id: 6,
    name: "Ava H.",
    rating: 4.5,
    verified: true,
    text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    date: "August 19, 2023",
  },
];

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState("latest");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          All Reviews{" "}
          <span className="text-gray-500 font-normal">({reviews.length})</span>
        </h2>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-gray-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div className="relative">
            <select
              className="appearance-none bg-gray-100 rounded-md px-4 py-2 pr-8 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 4L6 7.5L9.5 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium">
            Write a Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex mb-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const isHalf = i + 0.5 === review.rating;
                    const isFilled = i < review.rating;

                    return (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          isFilled
                            ? "fill-current text-yellow-400"
                            : isHalf
                            ? "fill-current text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center">
                  <h3 className="font-medium">{review.name}</h3>
                  {review.verified && (
                    <span className="ml-2 text-green-600">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
              <button className="text-gray-400">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">{review.text}</p>
            <p className="text-gray-400 text-sm">Posted on {review.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
