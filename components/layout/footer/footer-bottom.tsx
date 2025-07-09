"use client";

import { Heart } from "lucide-react";

export function FooterBottom() {
  return (
    <div className="footer-content border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} ColorCraft. All rights reserved.
      </p>
      <p className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0">
        Made with <Heart className="h-4 w-4 mx-1 text-red-500 heart-icon" />{" "}
        using Next.js & Tailwind CSS
      </p>
    </div>
  );
}
