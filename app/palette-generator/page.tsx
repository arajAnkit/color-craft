"use client";

import { useForm } from "react-hook-form";

import type { PaletteFormValues } from "@/types/color";
import { usePaletteGenerator } from "@/hooks/use-palette-generator";
import { useColorConversion } from "@/hooks/use-color-conversion";
import { PaletteConfiguration } from "@/components/palette/palette-configuration";
import { PaletteDisplay } from "@/components/palette/palette-display";
import { PaletteActions } from "@/components/palette/palette-actions";
import { HarmonyExplanation } from "@/components/palette/harmony-explanation";

export default function PaletteGeneratorPage() {
  const { colors, harmonyType, generateNewPalette } = usePaletteGenerator();
  const { convertColorsToFullFormat } = useColorConversion();

  const form = useForm<PaletteFormValues>({
    defaultValues: {
      baseColor: "#00FFFF",
      harmony: "analogous",
      count: 5,
    },
  });

  function onSubmit(values: PaletteFormValues) {
    generateNewPalette(values.baseColor, values.harmony, values.count);
  }

  // Handle base color change from color wheel
  const handleBaseColorChange = (newBaseColor: string) => {
    form.setValue("baseColor", newBaseColor);
    const currentValues = form.getValues();
    generateNewPalette(
      newBaseColor,
      currentValues.harmony,
      currentValues.count
    );
  };

  const colorObjects = convertColorsToFullFormat(colors);
  const currentBaseColor = form.watch("baseColor");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Interactive Palette Generator
        </h1>
        <p className="max-w-[700px] text-sm text-muted-foreground">
          Generate beautiful color palettes for your next project. Choose a base
          color, select a harmony type, or click directly on the color wheel to
          pick colors interactively.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <PaletteConfiguration form={form} onSubmit={onSubmit} />

        {colors.length > 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-4">
            <PaletteDisplay
              colors={colors}
              harmonyType={harmonyType}
              baseColor={currentBaseColor}
              onBaseColorChange={handleBaseColorChange}
            />
            <PaletteActions
              colors={colors}
              colorObjects={colorObjects}
              harmonyType={harmonyType}
            />
          </div>
        )}
      </div>

      {/* Add harmony explanation below the main grid */}
      {colors.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <HarmonyExplanation harmonyType={harmonyType} />
        </div>
      )}
    </div>
  );
}
