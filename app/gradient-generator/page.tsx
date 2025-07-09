"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { GradientConfig, GradientPreset } from "@/types/gradient";
import { generateRandomGradient, generateRandomColor } from "@/utils/gradient";
import { gradientPresets } from "@/data/presets";

// Components
import { GradientHeader } from "@/components/gradient/gradient-header";
import { GradientToolbar } from "@/components/gradient/gradient-toolbar";
import { GradientPresets } from "@/components/gradient/gradient-presets";
import { GradientTypeSelector } from "@/components/gradient/gradient-type-selector";
import { LinearGradientControls } from "@/components/gradient/linear-gradient-controls";
import { RadialGradientControls } from "@/components/gradient/radial-gradient-controls";
import { ConicGradientControls } from "@/components/gradient/conic-gradient-controls";
import { ColorStopsManager } from "@/components/gradient/color-stops-manager";
import { GradientPreview } from "@/components/gradient/gradient-preview";
import { CSSOutput } from "@/components/gradient/css-output";
import { UsageExamples } from "@/components/gradient/usage-examples";

export default function GradientGeneratorPage() {
  const { toast } = useToast();
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const [config, setConfig] = useState<GradientConfig>({
    type: "linear",
    angle: 90,
    colorStops: [
      { color: "#7C3AED", position: 0 },
      { color: "#10B981", position: 100 },
    ],
    radialShape: "circle",
    radialPosition: "center",
    conicAngle: 0,
    conicPosition: "center",
  });

  const updateConfig = (updates: Partial<GradientConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const addColorStop = () => {
    if (config.colorStops.length >= 10) {
      toast({
        title: "Maximum Color Stops",
        description: "You can have a maximum of 10 color stops.",
        variant: "destructive",
      });
      return;
    }

    const newPosition =
      config.colorStops.length > 0
        ? Math.round(100 / (config.colorStops.length + 1))
        : 50;
    const randomColor = generateRandomColor();

    updateConfig({
      colorStops: [
        ...config.colorStops,
        { color: randomColor, position: newPosition },
      ],
    });
  };

  const removeColorStop = (index: number) => {
    if (config.colorStops.length <= 2) {
      toast({
        title: "Minimum Color Stops",
        description: "You need at least 2 color stops for a gradient.",
        variant: "destructive",
      });
      return;
    }

    updateConfig({
      colorStops: config.colorStops.filter((_, i) => i !== index),
    });
  };

  const updateColorStop = (
    index: number,
    field: "color" | "position",
    value: string | number
  ) => {
    const newColorStops = [...config.colorStops];
    newColorStops[index] = {
      ...newColorStops[index],
      [field]: value,
    };
    updateConfig({ colorStops: newColorStops });
  };

  const randomizeGradient = () => {
    const randomConfig = generateRandomGradient();
    updateConfig(randomConfig);

    toast({
      title: "Randomized!",
      description: "Generated a random gradient for you.",
    });
  };

  const applyPreset = (preset: GradientPreset) => {
    updateConfig({
      type: preset.type,
      colorStops: preset.colorStops,
      ...(preset.angle !== undefined && { angle: preset.angle }),
    });

    toast({
      title: "Preset Applied!",
      description: `Applied ${preset.name} gradient preset.`,
    });
  };

  const copyCSS = () => {
    const css = `background: linear-gradient(${
      config.angle
    }deg, ${config.colorStops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ")});`;
    navigator.clipboard.writeText(css);
    toast({
      title: "Copied!",
      description: "CSS gradient copied to clipboard.",
    });
  };

  const exportGradient = () => {
    const css = `background: linear-gradient(${
      config.angle
    }deg, ${config.colorStops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ")});`;
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gradient.css";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exported!",
      description: "Gradient CSS file downloaded.",
    });
  };

  useEffect(() => {
    // Add CSS animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-6 py-10">
      <GradientHeader />

      <GradientToolbar
        onRandomize={randomizeGradient}
        onExport={exportGradient}
        isAnimated={isAnimated}
        onToggleAnimation={() => setIsAnimated(!isAnimated)}
      />

      <GradientPresets presets={gradientPresets} onApplyPreset={applyPreset} />

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <GradientTypeSelector
            value={config.type}
            onChange={(type) => updateConfig({ type })}
          />

          {config.type === "linear" && (
            <LinearGradientControls
              angle={config.angle}
              onAngleChange={(angle) => updateConfig({ angle })}
            />
          )}

          {config.type === "radial" && (
            <RadialGradientControls
              shape={config.radialShape}
              position={config.radialPosition}
              onShapeChange={(radialShape) => updateConfig({ radialShape })}
              onPositionChange={(radialPosition) =>
                updateConfig({ radialPosition })
              }
            />
          )}

          {config.type === "conic" && (
            <ConicGradientControls
              angle={config.conicAngle}
              position={config.conicPosition}
              onAngleChange={(conicAngle) => updateConfig({ conicAngle })}
              onPositionChange={(conicPosition) =>
                updateConfig({ conicPosition })
              }
            />
          )}

          <ColorStopsManager
            colorStops={config.colorStops}
            onAddColorStop={addColorStop}
            onRemoveColorStop={removeColorStop}
            onUpdateColorStop={updateColorStop}
          />
        </div>

        <div className="space-y-6">
          <GradientPreview config={config} isAnimated={isAnimated} />

          <CSSOutput
            config={config}
            onCopy={copyCSS}
            onExport={exportGradient}
          />

          <UsageExamples config={config} />
        </div>
      </div>
    </div>
  );
}
