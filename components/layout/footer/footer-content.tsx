"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Palette, Github, Twitter, Instagram } from "lucide-react";

export function FooterContent() {
  return (
    <>
      <div className="footer-content md:col-span-2 space-y-4">
        <div className="flex items-center gap-2 footer-logo">
          <Palette className="h-8 w-8 text-indigo-400" />
          <span className="font-bold text-2xl">ColorCraft</span>
        </div>
        <p className="text-muted-foreground max-w-md">
          A modern educational platform for learning CSS colors and gradients.
          Create, explore, and master the art of color theory.
        </p>
        <div className="flex space-x-4 pt-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-indigo-100 hover:text-indigo-400 dark:hover:bg-indigo-950"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-indigo-100 hover:text-indigo-400 dark:hover:bg-indigo-950"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-indigo-100 hover:text-indigo-400 dark:hover:bg-indigo-950"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Button>
        </div>
      </div>

      <div className="footer-content space-y-4">
        <h3 className="font-semibold text-lg">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/colors"
              className="text-muted-foreground hover:text-indigo-400 transition-colors"
            >
              Colors Library
            </Link>
          </li>
          <li>
            <Link
              href="/color-theory"
              className="text-muted-foreground hover:text-indigo-400 transition-colors"
            >
              Color Theory
            </Link>
          </li>
          <li>
            <Link
              href="/gradient-theory"
              className="text-muted-foreground hover:text-indigo-400 transition-colors"
            >
              Gradient Theory
            </Link>
          </li>
          <li>
            <Link
              href="/gradient-generator"
              className="text-muted-foreground hover:text-indigo-400 transition-colors"
            >
              Gradient Generator
            </Link>
          </li>
          <li>
            <Link
              href="/palette-generator"
              className="text-muted-foreground hover:text-indigo-400 transition-colors"
            >
              Palette Generator
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
