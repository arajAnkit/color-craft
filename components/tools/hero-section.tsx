import { Zap } from "lucide-react";
import { BackgroundEffects } from "./background-effects";
import { FloatingElements } from "./floating-elements";
import { StatsSection } from "./stats-section";
import { FeatureHighlights } from "./feature-highlights";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects />
      <FloatingElements />

      <div className="relative container max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
              <Zap className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Professional Color Tools
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              All Tools
            </h1>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                Discover our complete collection of professional-grade color and
                gradient tools
              </p>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                From basic color conversion to advanced gradient animation,
                we've got everything you need to create stunning visual
                experiences. Each tool is crafted with precision and designed
                for both beginners and professionals.
              </p>
            </div>
          </div>

          <StatsSection />
          <FeatureHighlights />
        </div>
      </div>
    </div>
  );
}
