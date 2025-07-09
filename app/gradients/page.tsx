"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { gradients } from "@/lib/gradient-data";
import { GradientHero } from "@/components/gradients/gradient-hero";
import { GradientSearch } from "@/components/gradients/gradient-search";
import { GradientCategories } from "@/components/gradients/gradient-categories";
import { GradientGrid } from "@/components/gradients/gradient-grid";

export default function GradientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedGradient, setCopiedGradient] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [
    {
      id: "all",
      name: "All Gradients",
      gradient: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "warm",
      name: "Warm",
      gradient: "linear-gradient(45deg, #ff6b6b, #ffa500)",
    },
    {
      id: "cool",
      name: "Cool",
      gradient: "linear-gradient(45deg, #0077be, #00a8cc)",
    },
    {
      id: "nature",
      name: "Nature",
      gradient: "linear-gradient(45deg, #2d5016, #4a7c59)",
    },
    {
      id: "vibrant",
      name: "Vibrant",
      gradient: "linear-gradient(45deg, #8e44ad, #3498db)",
    },
    {
      id: "pastel",
      name: "Pastel",
      gradient: "linear-gradient(45deg, #ff69b4, #ffc0cb)",
    },
    {
      id: "dark",
      name: "Dark",
      gradient: "linear-gradient(45deg, #191970, #483d8b)",
    },
  ];

  // Filter gradients based on search term and category
  const filteredGradients = gradients.filter((gradient) => {
    const matchesSearch = gradient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || gradient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (css: string, name: string) => {
    navigator.clipboard.writeText(css);
    setCopiedGradient(name);

    toast({
      title: "Copied!",
      description: `${name} gradient CSS has been copied to clipboard.`,
    });

    setTimeout(() => {
      setCopiedGradient(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <GradientHero />

      <div className="mb-8">
        <GradientSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <GradientCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <GradientGrid
        copiedGradient={copiedGradient ?? undefined}
        onCopyGradient={copyToClipboard}
      />
    </div>
  );
}
