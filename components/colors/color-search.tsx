"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface ColorSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function ColorSearch({ searchTerm, onSearchChange }: ColorSearchProps) {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />

      <Input
        type="text"
        placeholder="Search colors..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-10"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
