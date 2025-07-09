"use client";

import { useEffect, useRef } from "react";
import { ToolsHeader } from "./tools-header";
import { ToolsGrid } from "./tools-grid";

export function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && window.ScrollTrigger) {
      const { gsap, ScrollTrigger } = window;

      // Title animation
      gsap.fromTo(
        ".tools-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".tools-header",
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        ".tool-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tools-grid",
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations for cards
      const cards = document.querySelectorAll(".tool-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            duration: 0.3,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <ToolsHeader />
        <ToolsGrid />
      </div>
    </section>
  );
}
