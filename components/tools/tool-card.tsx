import type React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: {
    title: string;
    tagline: string;
    description: string;
    detail: string;
    features: string[];
    icon: React.ReactNode;
    href: string;
    gradient: string;
  };
}

export function ToolCard({ tool }: ToolCardProps) {
  const isNewTool =
    tool.href.includes("blindness") ||
    tool.href.includes("extractor") ||
    tool.href.includes("advanced");

  return (
    <div className="group relative">
      {/* Neon Border Effect */}
      <div
        className={cn(
          "absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl blur transition-all duration-500",
          tool.gradient
        )}
      />

      <Card className="relative h-[520px] w-full overflow-hidden border-0 bg-gradient-to-br from-white/95 to-white/80 dark:from-slate-900/95 dark:to-slate-800/80 backdrop-blur-sm transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl flex flex-col">
        {/* Gradient Header */}
        <div
          className={cn("h-1.5 bg-gradient-to-r flex-shrink-0", tool.gradient)}
        />

        <CardHeader className="pb-3 flex-shrink-0 h-[180px] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "p-3 rounded-xl bg-gradient-to-br text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0",
                tool.gradient
              )}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {tool.icon}
              </div>
            </div>

            {/* New Badge */}
            {isNewTool && (
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg animate-pulse flex-shrink-0">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </Badge>
            )}
          </div>

          <div className="space-y-2 min-h-0 flex-grow">
            <CardTitle className="text-lg font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
              {tool.title}
            </CardTitle>

            {/* Tool Tagline */}
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide line-clamp-1">
              {tool.tagline}
            </div>

            <CardDescription className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
              {tool.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col justify-between pt-0 px-6 pb-6 min-h-0">
          <div className="flex-grow min-h-0">
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
              {tool.detail}
            </p>

            {/* Features List */}
            <div className="space-y-1.5 mb-4">
              {tool.features.slice(0, 3).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
                >
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full bg-gradient-to-r flex-shrink-0",
                      tool.gradient
                    )}
                  />
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Explore Button */}
          <Link href={tool.href} className="block mt-auto flex-shrink-0">
            <div
              className={cn(
                "relative overflow-hidden rounded-xl p-3 bg-gradient-to-r text-white font-semibold text-center transition-all duration-500 group-hover:shadow-2xl transform group-hover:-translate-y-1",
                tool.gradient
              )}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative flex items-center justify-center gap-2">
                <span className="text-sm font-medium line-clamp-1">
                  Explore {tool.title}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
              </div>

              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl bg-white/10 animate-ping" />
              </div>
            </div>
          </Link>
        </CardContent>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-bounce delay-100" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-bounce delay-300" />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-bounce delay-500" />
        </div>
      </Card>
    </div>
  );
}
