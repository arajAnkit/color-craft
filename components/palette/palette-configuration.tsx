"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import type { PaletteFormValues } from "@/types/color";
import { ColorPicker } from "./color-picker";
import { HarmonySelector } from "./harmony-selector";
import { ColorCountSlider } from "./color-count-slider";

interface PaletteConfigurationProps {
  form: UseFormReturn<PaletteFormValues>;
  onSubmit: (values: PaletteFormValues) => void;
}

export function PaletteConfiguration({
  form,
  onSubmit,
}: PaletteConfigurationProps) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>
          Choose a base color and a harmony type to generate a palette.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ColorPicker control={form.control} />
            <HarmonySelector control={form.control} />
            <ColorCountSlider control={form.control} />
            <Button type="submit" className="w-full">
              Generate Palette
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
