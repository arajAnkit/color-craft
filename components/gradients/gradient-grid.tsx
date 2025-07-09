"use client";

import { useState, useMemo } from "react";
import { GradientCard } from "./gradient-card";
import { GradientCardSkeleton } from "@/components/loading/gradient-card-skeleton";
import { gradients } from "@/lib/gradient-data";

interface GradientGridProps {
  searchQuery?: string;
  selectedCategory?: string;
  copiedGradient?: string;
  onCopyGradient?: (css: string, name: string) => void;
}

export function GradientGrid({
  searchQuery = "",
  selectedCategory = "all",
  copiedGradient,
  onCopyGradient,
}: GradientGridProps) {
  const [isLoading, setIsLoading] = useState(false);

  const filteredGradients = useMemo(() => {
    return gradients.filter((gradient) => {
      const matchesSearch =
        gradient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gradient.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || gradient.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <GradientCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredGradients.map((gradient) => (
        <GradientCard
          key={gradient.id}
          gradient={gradient}
          copiedGradient={copiedGradient ?? null}
          onCopyGradient={onCopyGradient}
        />
      ))}
    </div>
  );
}
