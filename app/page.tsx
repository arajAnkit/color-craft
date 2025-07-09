import { HeroSection } from "@/components/home/hero/hero-section";
import { ToolsSection } from "@/components/home/tools/tools-section";

export default function HomePage() {
  return (
    <div className="container max-w-6xl mx-auto px-6 py-10">
      <HeroSection />
      <ToolsSection />
    </div>
  );
}
