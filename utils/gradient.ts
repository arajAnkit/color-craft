import type { ColorStop, GradientConfig } from "@/types/gradient";

export const generateCSS = (config: GradientConfig): string => {
  const sortedStops = [...config.colorStops].sort(
    (a, b) => a.position - b.position
  );
  const colorStopsString = sortedStops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  if (config.type === "linear") {
    return `linear-gradient(${config.angle}deg, ${colorStopsString})`;
  } else if (config.type === "radial") {
    return `radial-gradient(${config.radialShape} at ${config.radialPosition}, ${colorStopsString})`;
  } else {
    return `conic-gradient(from ${config.conicAngle}deg at ${config.conicPosition}, ${colorStopsString})`;
  }
};

export const getGradientStyle = (
  config: GradientConfig,
  isAnimated = false
) => {
  const baseStyle = {
    background: generateCSS(config),
  };

  if (isAnimated) {
    return {
      ...baseStyle,
      backgroundSize: "400% 400%",
      animation: "gradientShift 4s ease infinite",
    };
  }

  return baseStyle;
};

export const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

export const generateRandomGradient = (): Partial<GradientConfig> => {
  const types: ("linear" | "radial" | "conic")[] = [
    "linear",
    "radial",
    "conic",
  ];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const numStops = Math.floor(Math.random() * 4) + 2; // 2-5 stops

  const newStops: ColorStop[] = [];
  for (let i = 0; i < numStops; i++) {
    newStops.push({
      color: generateRandomColor(),
      position: Math.round((100 / (numStops - 1)) * i),
    });
  }

  return {
    type: randomType,
    angle: Math.floor(Math.random() * 360),
    colorStops: newStops,
  };
};
