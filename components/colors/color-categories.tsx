"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
  color: string
}

interface ColorCategoriesProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function ColorCategories({ categories, selectedCategory, onCategoryChange }: ColorCategoriesProps) {
  const filtersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window

      // Filters animation
      gsap.fromTo(
        filtersRef.current?.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, delay: 0.3, ease: "power2.out" },
      )
    }
  }, [])

  return (
    <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className="rounded-full"
          onClick={() => onCategoryChange(category.id)}
        >
          <span
            className="w-3 h-3 rounded-full mr-2"
            style={{
              backgroundColor: category.color,
              border: category.id === "white" ? "1px solid #e2e8f0" : "none",
            }}
          />
          {category.name}
        </Button>
      ))}
    </div>
  )
}
