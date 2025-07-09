"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface GradientSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function GradientSearch({
  searchTerm,
  onSearchChange,
}: GradientSearchProps) {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        placeholder="Search gradients..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
