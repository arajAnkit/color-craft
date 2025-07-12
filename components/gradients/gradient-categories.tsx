"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  gradient: string;
}

interface GradientCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function GradientCategories({
  categories,
  selectedCategory,
  onCategoryChange,
}: GradientCategoriesProps) {
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window;

      // Filters animation
      gsap.fromTo(
        filtersRef.current?.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className="rounded-full relative overflow-hidden"
          onClick={() => onCategoryChange(category.id)}
        >
          <span
            className="w-3 h-3 rounded-full mr-2"
            style={{
              background: category.gradient,
            }}
          />
          {category.name}
        </Button>
      ))}
    </div>
  );
}
