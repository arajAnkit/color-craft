import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { PaletteFormValues } from "@/types/color";

interface ColorPickerProps {
  control: Control<PaletteFormValues>;
}

export function ColorPicker({ control }: ColorPickerProps) {
  return (
    <FormField
      control={control}
      name="baseColor"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Base Color</FormLabel>
          <FormControl>
            <Input type="color" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
