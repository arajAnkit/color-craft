"use client";

import type React from "react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Tool {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  detail: string;
  gradient: string;
}

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={tool.href} className="group tool-card block">
      <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 flex flex-col">
        {/* Gradient Header */}
        <div className={`h-2 bg-gradient-to-r ${tool.gradient}`} />

        <CardHeader className="space-y-4 pb-4 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {tool.icon}
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-xl font-bold group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
              {tool.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2">
              {tool.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-0 flex-grow flex flex-col justify-between">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
            {tool.detail}
          </p>

          {/* Bottom accent */}
          <div className="pt-4 border-t border-border/50 mt-auto">
            <div className="flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
              <span>Explore tool</span>
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
