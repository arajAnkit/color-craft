"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  category?: string;
}

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavItem[];
  pathname: string;
}

export function MobileNav({ isOpen, navItems, pathname }: MobileNavProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Group items by category
  const groupedItems = navItems.reduce((acc, item) => {
    if (!item.category) {
      acc.uncategorized = acc.uncategorized || [];
      acc.uncategorized.push(item);
    } else {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
    }
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <div
      className={cn(
        "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[80vh] border-b" : "max-h-0"
      )}
    >
      <div className="container mx-auto px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
        {/* Uncategorized items (like Home) */}
        {groupedItems.uncategorized?.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center py-3 px-2 text-base font-medium transition-colors hover:text-indigo-400 rounded-md",
              pathname === item.href
                ? "text-indigo-400 bg-indigo-500/10"
                : "text-foreground/70"
            )}
          >
            {item.icon && <div className="mr-3 text-current">{item.icon}</div>}
            {item.label}
          </Link>
        ))}

        {/* Categorized items */}
        {Object.entries(groupedItems).map(([category, items]) => {
          if (category === "uncategorized") return null;

          const isExpanded = expandedCategories.includes(category);
          const hasActiveItem = items.some((item) => pathname === item.href);

          return (
            <div key={category} className="space-y-1">
              <button
                onClick={() => toggleCategory(category)}
                className={cn(
                  "flex items-center justify-between w-full py-3 px-2 text-base font-medium transition-colors hover:text-indigo-400 rounded-md",
                  hasActiveItem
                    ? "text-indigo-400 bg-indigo-500/10"
                    : "text-foreground/70"
                )}
              >
                <span className="flex items-center">
                  {category === "Colors" && (
                    <div className="mr-3 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  )}
                  {category === "Gradients" && (
                    <div className="mr-3 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                  )}
                  {category === "Tools" && (
                    <div className="mr-3 w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
                  )}
                  {category}
                </span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center py-2 px-3 text-sm font-medium transition-colors hover:text-indigo-400 rounded-md",
                        pathname === item.href
                          ? "text-indigo-400 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                          : "text-foreground/60 hover:bg-muted/50"
                      )}
                    >
                      {item.icon && (
                        <div className="mr-3 text-current">{item.icon}</div>
                      )}
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Theme Toggle */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between py-2 px-2">
            <span className="text-sm font-medium text-foreground/70">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
