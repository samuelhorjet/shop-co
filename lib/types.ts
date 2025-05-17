export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  image: string
  colors: string[]
  sizes: string[]
  description?: string
  category: string
}

export interface Review {
  id: number
  name: string
  rating: number
  verified: boolean
  text: string
  date: string
}
