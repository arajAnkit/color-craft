"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

// Custom SVG Icons
const ColorLibraryIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
    <circle cx="6" cy="6" r="2" fill="currentColor" />
    <circle cx="18" cy="6" r="2" fill="currentColor" />
    <circle cx="6" cy="18" r="2" fill="currentColor" />
    <circle cx="18" cy="18" r="2" fill="currentColor" />
    <path
      d="M12 9v6M9 12h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ColorTheoryIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 2v20M2 12h20"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.5"
    />
    <circle cx="12" cy="6" r="2" fill="#ff6b6b" />
    <circle cx="18" cy="12" r="2" fill="#4ecdc4" />
    <circle cx="12" cy="18" r="2" fill="#45b7d1" />
    <circle cx="6" cy="12" r="2" fill="#96ceb4" />
  </svg>
);

const ColorHarmoniesIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
      fill="currentColor"
      opacity="0.3"
    />
    <circle cx="12" cy="9" r="1.5" fill="#ff6b6b" />
    <circle cx="16" cy="12" r="1.5" fill="#4ecdc4" />
    <circle cx="12" cy="15" r="1.5" fill="#45b7d1" />
    <circle cx="8" cy="12" r="1.5" fill="#96ceb4" />
  </svg>
);

const ColorConverterIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="8"
      height="8"
      rx="2"
      fill="#ff6b6b"
      opacity="0.7"
    />
    <rect
      x="13"
      y="13"
      width="8"
      height="8"
      rx="2"
      fill="#4ecdc4"
      opacity="0.7"
    />
    <path d="M11 8h2v8h-2z" fill="currentColor" opacity="0.3" />
    <path d="M8 11v2h8v-2z" fill="currentColor" opacity="0.3" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const ColorMixerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="4" fill="#ff6b6b" opacity="0.6" />
    <circle cx="16" cy="8" r="4" fill="#4ecdc4" opacity="0.6" />
    <circle cx="12" cy="16" r="4" fill="#45b7d1" opacity="0.8" />
    <path
      d="M12 12L8 8M12 12L16 8M12 12V16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ColorBlindnessIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 1v6m0 10v6m11-7h-6m-10 0H1m15.5-6.5l-4.24 4.24m-8.48 0L7.5 5.5m12.73 12.73l-4.24-4.24m-8.48 0l4.24 4.24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      fill="currentColor"
      opacity="0.1"
    />
  </svg>
);

const ColorExtractorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="7" cy="7" r="1" fill="#ff6b6b" />
    <circle cx="10" cy="7" r="1" fill="#4ecdc4" />
    <circle cx="13" cy="7" r="1" fill="#45b7d1" />
    <circle cx="16" cy="7" r="1" fill="#96ceb4" />
    <path
      d="M6 18h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8 21h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const GradientLibraryIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="50%" stopColor="#4ecdc4" />
        <stop offset="100%" stopColor="#45b7d1" />
      </linearGradient>
    </defs>
    <rect x="3" y="6" width="18" height="4" rx="2" fill="url(#grad1)" />
    <rect
      x="3"
      y="12"
      width="18"
      height="4"
      rx="2"
      fill="url(#grad1)"
      opacity="0.7"
    />
    <rect
      x="3"
      y="18"
      width="18"
      height="2"
      rx="1"
      fill="url(#grad1)"
      opacity="0.4"
    />
  </svg>
);

const GradientTheoryIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="radial1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="100%" stopColor="#4ecdc4" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="8" fill="url(#radial1)" opacity="0.8" />
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.5"
    />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

const GradientExplorerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="linear1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="100%" stopColor="#4ecdc4" />
      </linearGradient>
    </defs>
    <path d="M3 3h18v18H3z" fill="url(#linear1)" opacity="0.3" />
    <circle cx="8" cy="8" r="2" fill="currentColor" />
    <circle cx="16" cy="16" r="2" fill="currentColor" />
    <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const AdvancedGradientIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="advGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <radialGradient id="advGrad2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ef4444" />
      </radialGradient>
    </defs>
    <rect
      x="2"
      y="2"
      width="20"
      height="5"
      rx="1"
      fill="url(#advGrad1)"
      opacity="0.8"
    />
    <rect
      x="2"
      y="8"
      width="20"
      height="5"
      rx="1"
      fill="url(#advGrad2)"
      opacity="0.6"
    />
    <rect
      x="2"
      y="14"
      width="20"
      height="5"
      rx="1"
      fill="url(#advGrad1)"
      opacity="0.4"
    />
    <path d="M12 2v20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

const GradientExtractorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="extractGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="100%" stopColor="#4ecdc4" />
      </linearGradient>
    </defs>
    <rect
      x="3"
      y="3"
      width="18"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="5"
      y="5"
      width="14"
      height="8"
      rx="1"
      fill="url(#extractGrad)"
      opacity="0.8"
    />
    <path
      d="M3 17h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6 20h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="16" cy="8" r="1" fill="currentColor" />
  </svg>
);

const TintShadeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="4" width="4" height="16" fill="#ff6b6b" />
    <rect x="8" y="4" width="4" height="16" fill="#ff8a8a" />
    <rect x="12" y="4" width="4" height="16" fill="#ffaaaa" />
    <rect x="16" y="4" width="4" height="16" fill="#ffcccc" />
    <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const PaletteIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.55-.22-1.05-.58-1.41-.36-.36-.58-.86-.58-1.41 0-1.1.9-2 2-2h2.36c3.64 0 6.64-3 6.64-6.64C22 6.48 17.52 2 12 2z"
      fill="currentColor"
      opacity="0.3"
    />
    <circle cx="6.5" cy="11.5" r="1.5" fill="#ff6b6b" />
    <circle cx="9.5" cy="7.5" r="1.5" fill="#4ecdc4" />
    <circle cx="14.5" cy="7.5" r="1.5" fill="#45b7d1" />
    <circle cx="17.5" cy="11.5" r="1.5" fill="#96ceb4" />
  </svg>
);

const ThemeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.3" />
    <path
      d="M12 1v6m0 10v6m11-7h-6m-10 0H1m15.5-6.5l-4.24 4.24m-8.48 0L7.5 5.5m12.73 12.73l-4.24-4.24m-8.48 0l4.24 4.24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      fill="currentColor"
      opacity="0.1"
    />
  </svg>
);

const ContrastIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2a10 10 0 010 20z" fill="currentColor" />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

// Custom Logo SVG
const ColorCraftLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#logoGrad)" opacity="0.1" />
    <circle cx="16" cy="8" r="3" fill="#8b5cf6" />
    <circle cx="24" cy="16" r="3" fill="#06b6d4" />
    <circle cx="16" cy="24" r="3" fill="#10b981" />
    <circle cx="8" cy="16" r="3" fill="#f59e0b" />
    <circle cx="16" cy="16" r="2" fill="url(#logoGrad)" />
    <path
      d="M16 8v16M8 16h16"
      stroke="url(#logoGrad)"
      strokeWidth="1"
      opacity="0.3"
    />
  </svg>
);

// Hover Dropdown Component
interface HoverDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function HoverDropdown({ trigger, children, className }: HoverDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {trigger}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function AnimatedNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const colorItems = [
    { href: "/colors", label: "Color Library", icon: <ColorLibraryIcon /> },
    { href: "/color-theory", label: "Color Theory", icon: <ColorTheoryIcon /> },
    {
      href: "/color-harmonies",
      label: "Color Harmonies",
      icon: <ColorHarmoniesIcon />,
    },
    {
      href: "/color-converter",
      label: "Color Converter",
      icon: <ColorConverterIcon />,
    },
    { href: "/color-mixer", label: "Color Mixer", icon: <ColorMixerIcon /> },
    {
      href: "/color-blindness-simulator",
      label: "Color Blindness Simulator",
      icon: <ColorBlindnessIcon />,
    },
    {
      href: "/color-extractor",
      label: "Color Extractor",
      icon: <ColorExtractorIcon />,
    },
  ];

  const gradientItems = [
    {
      href: "/gradients",
      label: "Gradient Library",
      icon: <GradientLibraryIcon />,
    },
    {
      href: "/gradient-theory",
      label: "Gradient Theory",
      icon: <GradientTheoryIcon />,
    },
    {
      href: "/gradient-explorer",
      label: "Gradient Explorer",
      icon: <GradientExplorerIcon />,
    },
    {
      href: "/gradient-generator",
      label: "Gradient Generator",
      icon: <GradientLibraryIcon />,
    },
    {
      href: "/multistep-gradient",
      label: "Multistep Gradient",
      icon: <GradientExplorerIcon />,
    },
    {
      href: "/advanced-gradient-builder",
      label: "Advanced Gradient Builder",
      icon: <AdvancedGradientIcon />,
    },
    {
      href: "/gradient-extractor",
      label: "Gradient Extractor",
      icon: <GradientExtractorIcon />,
    },
  ];

  const toolItems = [
    {
      href: "/tint-shade-generator",
      label: "Tint & Shade Generator",
      icon: <TintShadeIcon />,
    },
    {
      href: "/palette-generator",
      label: "Palette Generator",
      icon: <PaletteIcon />,
    },
    { href: "/theme-generator", label: "Theme Generator", icon: <ThemeIcon /> },
    {
      href: "/contrast-checker",
      label: "Contrast Checker",
      icon: <ContrastIcon />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window;

      // Animate nav items
      gsap.fromTo(
        ".nav-item",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      // Animate logo
      gsap.fromTo(
        ".nav-logo",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.8)" }
      );
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <header
      ref={navRef}
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-lg"
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 nav-logo group"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <ColorCraftLogo />
              </div>
              <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                ColorCraft
              </span>
            </Link>
          </div>

          {/* Navigation - Right Side */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation - Only show on large screens */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                href="/"
                className={cn(
                  "nav-item text-sm font-medium transition-colors hover:text-indigo-400 relative group",
                  isActive("/") ? "text-indigo-400" : "text-foreground/70"
                )}
              >
                Home
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-indigo-400 transition-all duration-300",
                    isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>

              {/* Colors Dropdown */}
              <HoverDropdown
                trigger={
                  <button
                    className={cn(
                      "nav-item text-sm font-medium transition-colors hover:text-indigo-400 relative group flex items-center",
                      pathname.includes("/color")
                        ? "text-indigo-400"
                        : "text-foreground/70"
                    )}
                  >
                    Colors
                    <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-indigo-400 transition-all duration-300",
                        pathname.includes("/color")
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      )}
                    />
                  </button>
                }
              >
                <div className="w-64 bg-card/95 backdrop-blur-md border border-border/50 shadow-xl rounded-lg p-2">
                  {colorItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex w-full cursor-pointer items-center rounded-md p-3 transition-all duration-200",
                        "hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10",
                        pathname === item.href &&
                          "bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                      )}
                    >
                      <div className="mr-3 text-indigo-400">{item.icon}</div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </HoverDropdown>

              {/* Gradients Dropdown */}
              <HoverDropdown
                trigger={
                  <button
                    className={cn(
                      "nav-item text-sm font-medium transition-colors hover:text-indigo-400 relative group flex items-center",
                      pathname.includes("/gradient")
                        ? "text-indigo-400"
                        : "text-foreground/70"
                    )}
                  >
                    Gradients
                    <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-indigo-400 transition-all duration-300",
                        pathname.includes("/gradient")
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      )}
                    />
                  </button>
                }
              >
                <div className="w-64 bg-card/95 backdrop-blur-md border border-border/50 shadow-xl rounded-lg p-2">
                  {gradientItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex w-full cursor-pointer items-center rounded-md p-3 transition-all duration-200",
                        "hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-emerald-500/10",
                        pathname === item.href &&
                          "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20"
                      )}
                    >
                      <div className="mr-3 text-cyan-400">{item.icon}</div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </HoverDropdown>

              {/* Tools Dropdown */}
              <HoverDropdown
                trigger={
                  <button
                    className={cn(
                      "nav-item text-sm font-medium transition-colors hover:text-indigo-400 relative group flex items-center",
                      (pathname.includes("/tint") ||
                        pathname.includes("/palette") ||
                        pathname.includes("/theme") ||
                        pathname.includes("/contrast")) &&
                        "text-indigo-400",
                      "text-foreground/70"
                    )}
                  >
                    Tools
                    <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-indigo-400 transition-all duration-300",
                        (pathname.includes("/tint") ||
                          pathname.includes("/palette") ||
                          pathname.includes("/theme") ||
                          pathname.includes("/contrast")) &&
                          "w-full",
                        "w-0 group-hover:w-full"
                      )}
                    />
                  </button>
                }
              >
                <div className="w-64 bg-card/95 backdrop-blur-md border border-border/50 shadow-xl rounded-lg p-2">
                  {toolItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex w-full cursor-pointer items-center rounded-md p-3 transition-all duration-200",
                        "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10",
                        pathname === item.href &&
                          "bg-gradient-to-r from-emerald-500/20 to-teal-500/20"
                      )}
                    >
                      <div className="mr-3 text-emerald-400">{item.icon}</div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </HoverDropdown>
            </nav>

            {/* Separator */}
            <div className="hidden lg:block h-6 w-px bg-border/50" />

            {/* Theme Toggle */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* Mobile menu button - Show on all screens except large */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <MobileNav
        isOpen={isOpen}
        navItems={[
          { href: "/", label: "Home", icon: null },
          ...colorItems.map((item) => ({ ...item, category: "Colors" })),
          ...gradientItems.map((item) => ({ ...item, category: "Gradients" })),
          ...toolItems.map((item) => ({ ...item, category: "Tools" })),
        ]}
        pathname={pathname}
      />
    </header>
  );
}
