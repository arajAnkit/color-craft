"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Palette, Target, Sparkles } from "lucide-react";
import type { Harmony } from "@/types/color";
import { HARMONY_EXPLANATIONS } from "@/constants/harmony-explanations";

interface HarmonyExplanationProps {
  harmonyType: Harmony;
}

export function HarmonyExplanation({ harmonyType }: HarmonyExplanationProps) {
  const explanation = HARMONY_EXPLANATIONS[harmonyType];

  if (!explanation) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          {explanation.title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {explanation.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* How It Works */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            How It Works
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation.howItWorks}
          </p>
        </div>

        <Separator />

        {/* Characteristics */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Key Characteristics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {explanation.characteristics.map((characteristic, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {characteristic}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Use Cases */}
        <div>
          <h4 className="font-semibold mb-3">Perfect For</h4>
          <div className="flex flex-wrap gap-2">
            {explanation.useCases.map((useCase, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {useCase}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tips */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Pro Tips
          </h4>
          <div className="space-y-2">
            {explanation.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Examples */}
        <div>
          <h4 className="font-semibold mb-3">Real-World Examples</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {explanation.examples.map((example, index) => (
              <div key={index} className="bg-muted/50 p-3 rounded-lg">
                <span className="text-sm font-medium">{example}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
