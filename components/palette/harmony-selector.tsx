"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Control } from "react-hook-form";
import type { PaletteFormValues } from "@/types/color";
import { HARMONY_OPTIONS } from "@/constants/harmonies";

interface HarmonySelectorProps {
  control: Control<PaletteFormValues>;
}

export function HarmonySelector({ control }: HarmonySelectorProps) {
  return (
    <FormField
      control={control}
      name="harmony"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Harmony</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              {HARMONY_OPTIONS.map((harmony) => (
                <FormItem
                  key={harmony.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={harmony.value} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      {harmony.label}
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      {harmony.description}
                    </p>
                  </div>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
