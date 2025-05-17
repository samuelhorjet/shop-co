"use client"

import type { ReactNode } from "react"

interface TabProps {
  children: ReactNode
  active: boolean
  onClick: () => void
}

export function Tab({ children, active, onClick }: TabProps) {
  return (
    <button
      className={`px-8 py-4 font-medium text-center ${
        active ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
