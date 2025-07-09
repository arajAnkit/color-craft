"use client";

import { useEffect, useRef } from "react";

export function GradientHero() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window;

      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div ref={headerRef} className="text-center mb-12">
      <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
        Gradients
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Discover our curated collection of beautiful CSS gradients. Copy the
        code and use them in your projects.
      </p>
    </div>
  );
}
