"use client";

import { useEffect, useRef } from "react";
import { FooterContent } from "./footer-content";
import { FooterNewsletter } from "./footer-newsletter";
import { FooterBottom } from "./footer-bottom";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && window.ScrollTrigger) {
      const { gsap, ScrollTrigger } = window;

      // Footer animation
      gsap.fromTo(
        ".footer-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Logo animation
      gsap.fromTo(
        ".footer-logo",
        { scale: 0, rotation: -10 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Heart beat animation
      gsap.to(".heart-icon", {
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, []);

  return (
    <footer ref={footerRef} className="bg-muted/30 border-t">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <FooterContent />
          <FooterNewsletter />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
