"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function FooterNewsletter() {
  return (
    <div className="footer-content space-y-4">
      <h3 className="font-semibold text-lg">Stay Updated</h3>
      <p className="text-muted-foreground">
        Subscribe to our newsletter for the latest updates.
      </p>
      <div className="flex gap-2">
        <Input placeholder="Enter your email" className="max-w-[220px]" />
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Send className="h-4 w-4" />
          <span className="sr-only">Subscribe</span>
        </Button>
      </div>
    </div>
  );
}
