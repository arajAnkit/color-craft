"use client";

import { useEffect, useRef } from "react";
import { HeroContent } from "./hero-content";
import { HeroDecorations } from "./hero-decorations";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window;

      // Main title animation
      gsap.fromTo(
        ".hero-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // Subtitle animation
      gsap.fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      // Buttons animation
      gsap.fromTo(
        ".hero-buttons > *",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          delay: 0.6,
          ease: "back.out(1.7)",
        }
      );

      // Decoration animation
      gsap.fromTo(
        ".hero-decoration",
        { scale: 0, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger: 0.1,
          duration: 1,
          delay: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // Scroll-triggered animations
      if (window.ScrollTrigger) {
        gsap.to(".hero-parallax", {
          y: (i, el) =>
            -Number.parseFloat(el.getAttribute("data-speed") || "0") * 100,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-16 pb-24 md:pt-20 md:pb-32"
    >
      <HeroDecorations />
      <HeroContent />
    </div>
  );
}
