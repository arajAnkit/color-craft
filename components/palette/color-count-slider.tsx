"use client";

import type { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

import type { PaletteFormValues } from "@/types/color";

interface ColorCountSliderProps {
  control: Control<PaletteFormValues>;
}

export function ColorCountSlider({ control }: ColorCountSliderProps) {
  return (
    <FormField
      control={control}
      name="count"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Colors</FormLabel>
          <FormControl>
            <Slider
              defaultValue={[field.value]}
              max={10}
              min={2}
              step={1}
              onValueChange={(value) => field.onChange(value[0])}
            />
          </FormControl>
          <FormMessage />
          <p className="text-sm text-muted-foreground">{field.value} colors</p>
        </FormItem>
      )}
    />
  );
}
