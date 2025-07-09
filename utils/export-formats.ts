import type { Color } from "@/types/color";

export function generateJSON(colors: Color[], paletteName: string) {
  return JSON.stringify(
    {
      name: paletteName,
      colors: colors.map((color) => ({
        name: color.name,
        hex: color.hex,
        rgb: color.rgb,
        hsl: color.hsl,
      })),
      metadata: {
        totalColors: colors.length,
        createdAt: new Date().toISOString(),
      },
    },
    null,
    2
  );
}

export function generateCSS(colors: Color[]) {
  let css = `:root {\n`;
  colors.forEach((color) => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, "-");
    css += `  --color-${safeName}: ${color.hex};\n`;
    css += `  --color-${safeName}-rgb: ${color.rgb.join(", ")};\n`;
  });
  css += `}\n\n/* Utility Classes */\n`;
  colors.forEach((color) => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, "-");
    css += `.bg-${safeName} { background-color: var(--color-${safeName}); }\n`;
    css += `.text-${safeName} { color: var(--color-${safeName}); }\n`;
    css += `.border-${safeName} { border-color: var(--color-${safeName}); }\n`;
  });
  return css;
}

export function generateSCSS(colors: Color[], paletteName: string) {
  let scss = `// ${paletteName} Color Palette\n\n`;
  colors.forEach((color) => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, "-");
    scss += `$color-${safeName}: ${color.hex};\n`;
    scss += `$color-${safeName}-rgb: ${color.rgb.join(", ")};\n`;
  });
  scss += `\n// Color Map\n$colors: (\n`;
  colors.forEach((color, index) => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, "-");
    scss += `  "${safeName}": $color-${safeName}${
      index < colors.length - 1 ? "," : ""
    }\n`;
  });
  scss += `);\n`;
  return scss;
}

export function generateTailwind(colors: Color[]) {
  const colorObj: { [key: string]: string } = {};
  colors.forEach((color) => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, "-");
    colorObj[safeName] = color.hex;
  });

  return `// Add to your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colorObj, null, 8).replace(/"/g, "'")}
    }
  }
}`;
}

export function generateASE(colors: Color[], paletteName: string) {
  let ase = `Adobe Swatch Exchange Format
Palette: ${paletteName}
Colors: ${colors.length}

`;
  colors.forEach((color, index) => {
    ase += `Color ${index + 1}: ${color.name}
Hex: ${color.hex}
RGB: ${color.rgb.join(", ")}
HSL: ${color.hsl.join(", ")}

`;
  });
  return ase;
}

export function generateSketch(colors: Color[]) {
  return JSON.stringify(
    {
      compatibleVersion: "3",
      pluginVersion: "3.0.2",
      colors: colors.map((color) => ({
        name: color.name,
        red: color.rgb[0] / 255,
        green: color.rgb[1] / 255,
        blue: color.rgb[2] / 255,
        alpha: 1,
      })),
    },
    null,
    2
  );
}

export function generateFigma(colors: Color[], paletteName: string) {
  const tokens: { [key: string]: any } = {};
  colors.forEach((color) => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, "-");
    tokens[safeName] = {
      value: color.hex,
      type: "color",
      description: `${color.name} from ${paletteName}`,
    };
  });

  return JSON.stringify(
    {
      colors: tokens,
    },
    null,
    2
  );
}

export function generateProcreate(colors: Color[], paletteName: string) {
  let procreate = `Procreate Color Palette: ${paletteName}\n\n`;
  colors.forEach((color, index) => {
    procreate += `${index + 1}. ${color.name}: ${color.hex}\n`;
  });
  procreate += `\nTo import: Copy hex values and paste into Procreate's color picker`;
  return procreate;
}
