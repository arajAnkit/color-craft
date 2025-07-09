"use client";

import type React from "react";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Harmony } from "@/types/color";

interface ColorWheelProps {
  colors: string[];
  baseColor: string;
  harmonyType: Harmony;
  onBaseColorChange?: (newBaseColor: string) => void;
}

interface AnimationState {
  progress: number;
  isAnimating: boolean;
  previousColors: string[];
  previousHarmony: Harmony;
}

interface InteractionState {
  isHovering: boolean;
  hoverPosition: { x: number; y: number } | null;
  hoverColor: string | null;
  isClicking: boolean;
  clickPosition: { x: number; y: number } | null;
}

export function ColorWheel({
  colors,
  baseColor,
  harmonyType,
  onBaseColorChange,
}: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [animationState, setAnimationState] = useState<AnimationState>({
    progress: 1,
    isAnimating: false,
    previousColors: [],
    previousHarmony: harmonyType,
  });
  const [interactionState, setInteractionState] = useState<InteractionState>({
    isHovering: false,
    hoverPosition: null,
    hoverColor: null,
    isClicking: false,
    clickPosition: null,
  });

  // Detect harmony type changes and trigger animation
  useEffect(() => {
    if (
      animationState.previousHarmony !== harmonyType &&
      animationState.previousColors.length > 0
    ) {
      setAnimationState((prev) => ({
        ...prev,
        isAnimating: true,
        progress: 0,
      }));
    }
  }, [
    harmonyType,
    animationState.previousHarmony,
    animationState.previousColors.length,
  ]);

  // Animation loop
  useEffect(() => {
    if (animationState.isAnimating) {
      const animate = () => {
        setAnimationState((prev) => {
          const newProgress = Math.min(prev.progress + 0.02, 1);

          if (newProgress >= 1) {
            return {
              progress: 1,
              isAnimating: false,
              previousColors: colors,
              previousHarmony: harmonyType,
            };
          }

          return { ...prev, progress: newProgress };
        });

        if (animationState.progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    animationState.isAnimating,
    animationState.progress,
    colors,
    harmonyType,
  ]);

  // Store previous state when colors change
  useEffect(() => {
    if (!animationState.isAnimating) {
      setAnimationState((prev) => ({
        ...prev,
        previousColors: colors,
        previousHarmony: harmonyType,
      }));
    }
  }, [colors, harmonyType, animationState.isAnimating]);

  // Get canvas coordinates from mouse event
  const getCanvasCoordinates = useCallback(
    (event: MouseEvent | React.MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  // Calculate color from position on wheel
  const getColorFromPosition = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 50;

    // Calculate distance from center
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if click is within the color wheel (excluding inner circle)
    if (distance < radius * 0.4 || distance > radius) {
      return null;
    }

    // Calculate angle (hue)
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360; // Normalize to 0-360, with 0° at top

    // Calculate saturation based on distance from center
    const saturation = Math.min(
      90,
      60 + ((distance - radius * 0.4) / (radius * 0.6)) * 30
    );

    // Fixed lightness for consistent color picking
    const lightness = 50;

    return hslToHex(angle, saturation, lightness);
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const coords = getCanvasCoordinates(event);
      if (!coords) return;

      const color = getColorFromPosition(coords.x, coords.y);

      setInteractionState((prev) => ({
        ...prev,
        isHovering: !!color,
        hoverPosition: color ? coords : null,
        hoverColor: color,
      }));

      // Update cursor style
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.cursor = color ? "crosshair" : "default";
      }
    },
    [getCanvasCoordinates, getColorFromPosition]
  );

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setInteractionState((prev) => ({
      ...prev,
      isHovering: false,
      hoverPosition: null,
      hoverColor: null,
      isClicking: false,
      clickPosition: null,
    }));

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = "default";
    }
  }, []);

  // Mouse down handler
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      const coords = getCanvasCoordinates(event);
      if (!coords) return;

      const color = getColorFromPosition(coords.x, coords.y);
      if (!color) return;

      setInteractionState((prev) => ({
        ...prev,
        isClicking: true,
        clickPosition: coords,
      }));
    },
    [getCanvasCoordinates, getColorFromPosition]
  );

  // Mouse up handler
  const handleMouseUp = useCallback(
    (event: React.MouseEvent) => {
      const coords = getCanvasCoordinates(event);
      if (!coords || !interactionState.isClicking) return;

      const color = getColorFromPosition(coords.x, coords.y);
      if (color && onBaseColorChange) {
        onBaseColorChange(color);
      }

      setInteractionState((prev) => ({
        ...prev,
        isClicking: false,
        clickPosition: null,
      }));
    },
    [
      getCanvasCoordinates,
      getColorFromPosition,
      interactionState.isClicking,
      onBaseColorChange,
    ]
  );

  // Main drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 50;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw color wheel background
    drawColorWheelBackground(ctx, centerX, centerY, radius);

    // Draw hover indicator
    if (
      interactionState.isHovering &&
      interactionState.hoverPosition &&
      interactionState.hoverColor
    ) {
      drawHoverIndicator(
        ctx,
        interactionState.hoverPosition,
        interactionState.hoverColor,
        interactionState.isClicking
      );
    }

    // Draw animated harmony visualization
    if (
      animationState.isAnimating &&
      animationState.previousColors.length > 0
    ) {
      drawAnimatedHarmonyTransition(
        ctx,
        centerX,
        centerY,
        radius,
        animationState.previousColors,
        colors,
        animationState.previousHarmony,
        harmonyType,
        animationState.progress
      );
    } else {
      drawHarmonyVisualization(
        ctx,
        centerX,
        centerY,
        radius,
        colors,
        baseColor,
        harmonyType
      );
    }

    // Draw animated color indicators
    if (
      animationState.isAnimating &&
      animationState.previousColors.length > 0
    ) {
      drawAnimatedColorIndicators(
        ctx,
        centerX,
        centerY,
        radius,
        animationState.previousColors,
        colors,
        baseColor,
        animationState.progress
      );
    } else {
      drawColorIndicators(ctx, centerX, centerY, radius, colors, baseColor);
    }

    // Draw legend
    drawLegend(
      ctx,
      harmonyType,
      animationState.isAnimating,
      interactionState.isHovering
    );
  }, [colors, baseColor, harmonyType, animationState, interactionState]);

  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const componentToHex = (c: number): string => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    return (
      "#" +
      componentToHex(r) +
      componentToHex(g) +
      componentToHex(b)
    ).toUpperCase();
  };

  const drawHoverIndicator = (
    ctx: CanvasRenderingContext2D,
    position: { x: number; y: number },
    color: string,
    isClicking: boolean
  ) => {
    const { x, y } = position;
    const radius = isClicking ? 20 : 16;

    // Draw outer glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius + 10);
    gradient.addColorStop(0, `${color}40`);
    gradient.addColorStop(0.7, `${color}20`);
    gradient.addColorStop(1, `${color}00`);

    ctx.beginPath();
    ctx.arc(x, y, radius + 10, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw main indicator
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Draw border
    ctx.strokeStyle = isClicking ? "#000000" : "#ffffff";
    ctx.lineWidth = isClicking ? 4 : 3;
    ctx.stroke();

    // Draw crosshair
    ctx.strokeStyle = isClicking ? "#ffffff" : "#000000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - radius + 4, y);
    ctx.lineTo(x + radius - 4, y);
    ctx.moveTo(x, y - radius + 4);
    ctx.lineTo(x, y + radius - 4);
    ctx.stroke();

    // Draw color preview text
    ctx.font = "12px system-ui";
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    const textY = y + radius + 20;
    ctx.strokeText(color, x, textY);
    ctx.fillText(color, x, textY);

    // Draw instruction text
    ctx.font = "10px system-ui";
    ctx.fillStyle = "#666666";
    const instructionText = isClicking
      ? "Release to select"
      : "Click to select";
    ctx.strokeText(instructionText, x, textY + 15);
    ctx.fillText(instructionText, x, textY + 15);
  };

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const interpolateColor = (
    color1: string,
    color2: string,
    progress: number
  ): string => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * progress);
    const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * progress);
    const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * progress);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const interpolatePosition = (
    pos1: { x: number; y: number },
    pos2: { x: number; y: number },
    progress: number
  ): { x: number; y: number } => {
    const easedProgress = easeInOutCubic(progress);
    return {
      x: pos1.x + (pos2.x - pos1.x) * easedProgress,
      y: pos1.y + (pos2.y - pos1.y) * easedProgress,
    };
  };

  const drawColorWheelBackground = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    // Draw the main color wheel with 360 segments
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 90) * (Math.PI / 180);
      const endAngle = (angle + 1 - 90) * (Math.PI / 180);

      // Create gradient for each segment
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.4,
        centerX,
        centerY,
        radius
      );
      gradient.addColorStop(0, `hsl(${angle}, 30%, 90%)`);
      gradient.addColorStop(0.6, `hsl(${angle}, 80%, 60%)`);
      gradient.addColorStop(1, `hsl(${angle}, 90%, 40%)`);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw inner white circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw outer border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add degree markers
    drawDegreeMarkers(ctx, centerX, centerY, radius);

    // Draw interactive zone indicator
    if (interactionState.isHovering) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  };

  const drawDegreeMarkers = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.font = "10px system-ui";
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "center";

    // Draw major markers every 30 degrees
    for (let angle = 0; angle < 360; angle += 30) {
      const radian = (angle - 90) * (Math.PI / 180);
      const x1 = centerX + Math.cos(radian) * (radius - 10);
      const y1 = centerY + Math.sin(radian) * (radius - 10);
      const x2 = centerX + Math.cos(radian) * (radius + 5);
      const y2 = centerY + Math.sin(radian) * (radius + 5);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Add degree labels
      const labelX = centerX + Math.cos(radian) * (radius + 20);
      const labelY = centerY + Math.sin(radian) * (radius + 20);
      ctx.fillText(`${angle}°`, labelX, labelY + 3);
    }
  };

  const drawAnimatedHarmonyTransition = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    previousColors: string[],
    currentColors: string[],
    previousHarmony: Harmony,
    currentHarmony: Harmony,
    progress: number
  ) => {
    const easedProgress = easeInOutCubic(progress);

    // Get positions for both states
    const prevPositions = getColorPositions(
      previousColors,
      centerX,
      centerY,
      radius
    );
    const currPositions = getColorPositions(
      currentColors,
      centerX,
      centerY,
      radius
    );

    // Set line style with animated opacity
    ctx.strokeStyle = `rgba(0, 0, 0, ${0.4 * (1 - easedProgress * 0.3)})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);

    // Draw fading previous harmony lines
    if (easedProgress < 0.8) {
      ctx.globalAlpha = 1 - easedProgress * 1.25;
      drawHarmonyLines(ctx, prevPositions, previousHarmony);
      ctx.globalAlpha = 1;
    }

    // Draw appearing current harmony lines
    if (easedProgress > 0.2) {
      ctx.globalAlpha = (easedProgress - 0.2) * 1.25;
      drawHarmonyLines(ctx, currPositions, currentHarmony);
      ctx.globalAlpha = 1;
    }

    ctx.setLineDash([]);
  };

  const drawAnimatedColorIndicators = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    previousColors: string[],
    currentColors: string[],
    baseColor: string,
    progress: number
  ) => {
    const prevPositions = getColorPositions(
      previousColors,
      centerX,
      centerY,
      radius
    );
    const currPositions = getColorPositions(
      currentColors,
      centerX,
      centerY,
      radius
    );

    // Animate existing colors
    const maxLength = Math.max(previousColors.length, currentColors.length);

    for (let i = 0; i < maxLength; i++) {
      const prevColor = previousColors[i];
      const currColor = currentColors[i];
      const isBaseColor =
        currColor && currColor.toUpperCase() === baseColor.toUpperCase();

      if (prevColor && currColor) {
        // Animate existing color
        const prevPos = prevPositions[i];
        const currPos = currPositions[i];
        const animatedPos = interpolatePosition(prevPos, currPos, progress);
        const animatedColor = interpolateColor(prevColor, currColor, progress);

        drawSingleColorIndicator(
          ctx,
          animatedPos.x,
          animatedPos.y,
          animatedColor,
          i,
          !!isBaseColor,
          radius,
          centerX,
          centerY
        );
      } else if (prevColor && !currColor) {
        // Fade out old color
        const pos = prevPositions[i];
        ctx.globalAlpha = 1 - easeInOutCubic(progress);
        drawSingleColorIndicator(
          ctx,
          pos.x,
          pos.y,
          prevColor,
          i,
          false,
          radius,
          centerX,
          centerY
        );
        ctx.globalAlpha = 1;
      } else if (!prevColor && currColor) {
        // Fade in new color
        const pos = currPositions[i];
        ctx.globalAlpha = easeInOutCubic(progress);
        drawSingleColorIndicator(
          ctx,
          pos.x,
          pos.y,
          currColor,
          i,
          !!isBaseColor,
          radius,
          centerX,
          centerY
        );
        ctx.globalAlpha = 1;
      }
    }
  };

  const getColorPositions = (
    colors: string[],
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    return colors.map((color) => {
      const hue = hexToHue(color);
      const angle = (hue - 90) * (Math.PI / 180);
      return {
        x: centerX + Math.cos(angle) * radius * 0.8,
        y: centerY + Math.sin(angle) * radius * 0.8,
        hue,
        color,
      };
    });
  };

  const drawSingleColorIndicator = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    index: number,
    isBaseColor: boolean,
    radius: number,
    centerX: number,
    centerY: number
  ) => {
    const indicatorRadius = isBaseColor ? 16 : 12;

    // Draw outer glow for base color
    if (isBaseColor) {
      ctx.beginPath();
      ctx.arc(x, y, indicatorRadius + 6, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fill();
    }

    // Draw main color circle
    ctx.beginPath();
    ctx.arc(x, y, indicatorRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Draw border
    ctx.strokeStyle = isBaseColor ? "#000000" : "#ffffff";
    ctx.lineWidth = isBaseColor ? 4 : 3;
    ctx.stroke();

    // Draw star for base color
    if (isBaseColor) {
      drawStar(ctx, x, y, indicatorRadius - 2, indicatorRadius - 6, 5);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw color label
    const hue = hexToHue(color);
    const angle = (hue - 90) * (Math.PI / 180);
    const labelRadius = radius * 0.95;
    const labelX = centerX + Math.cos(angle) * labelRadius;
    const labelY = centerY + Math.sin(angle) * labelRadius;

    ctx.font = "10px system-ui";
    ctx.fillStyle = "#374151";
    ctx.textAlign = "center";
    ctx.fillText(color, labelX, labelY + 3);

    // Draw index number
    ctx.font = "8px system-ui";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(`${index + 1}`, x, y - indicatorRadius - 8);
  };

  const drawHarmonyVisualization = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    colors: string[],
    baseColor: string,
    harmonyType: Harmony
  ) => {
    if (colors.length < 2) return;

    const positions = getColorPositions(colors, centerX, centerY, radius);

    // Set line style for harmony connections
    ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);

    drawHarmonyLines(ctx, positions, harmonyType);

    ctx.setLineDash([]);
  };

  const drawHarmonyLines = (
    ctx: CanvasRenderingContext2D,
    positions: any[],
    harmonyType: Harmony
  ) => {
    switch (harmonyType) {
      case "analogous":
        drawAnalogousLines(ctx, positions);
        break;
      case "complementary":
        drawComplementaryLines(ctx, positions);
        break;
      case "triadic":
        drawTriadicLines(ctx, positions);
        break;
      case "compound":
        drawCompoundLines(ctx, positions);
        break;
      case "monochromatic":
        // No lines needed for monochromatic
        break;
    }
  };

  const drawAnalogousLines = (
    ctx: CanvasRenderingContext2D,
    positions: any[]
  ) => {
    // Connect adjacent colors in sequence
    for (let i = 0; i < positions.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(positions[i].x, positions[i].y);
      ctx.lineTo(positions[i + 1].x, positions[i + 1].y);
      ctx.stroke();
    }
  };

  const drawComplementaryLines = (
    ctx: CanvasRenderingContext2D,
    positions: any[]
  ) => {
    // Draw line between base color and its complement
    if (positions.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(positions[0].x, positions[0].y);
      ctx.lineTo(positions[1].x, positions[1].y);
      ctx.stroke();
    }
  };

  const drawTriadicLines = (
    ctx: CanvasRenderingContext2D,
    positions: any[]
  ) => {
    // Draw triangle connecting the three main triadic colors
    if (positions.length >= 3) {
      ctx.beginPath();
      ctx.moveTo(positions[0].x, positions[0].y);
      ctx.lineTo(positions[1].x, positions[1].y);
      ctx.lineTo(positions[2].x, positions[2].y);
      ctx.closePath();
      ctx.stroke();
    }
  };

  const drawCompoundLines = (
    ctx: CanvasRenderingContext2D,
    positions: any[]
  ) => {
    if (positions.length < 3) return;

    // Draw lines from base color to split-complementary colors
    ctx.beginPath();
    ctx.moveTo(positions[0].x, positions[0].y);
    ctx.lineTo(positions[1].x, positions[1].y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(positions[0].x, positions[0].y);
    ctx.lineTo(positions[2].x, positions[2].y);
    ctx.stroke();
  };

  const drawColorIndicators = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    colors: string[],
    baseColor: string
  ) => {
    colors.forEach((color, index) => {
      const isBaseColor = color.toUpperCase() === baseColor.toUpperCase();
      const hue = hexToHue(color);
      const angle = (hue - 90) * (Math.PI / 180);
      const x = centerX + Math.cos(angle) * radius * 0.8;
      const y = centerY + Math.sin(angle) * radius * 0.8;

      drawSingleColorIndicator(
        ctx,
        x,
        y,
        color,
        index,
        isBaseColor,
        radius,
        centerX,
        centerY
      );
    });
  };

  const drawStar = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    outerRadius: number,
    innerRadius: number,
    points: number
  ) => {
    const angle = Math.PI / points;
    ctx.beginPath();
    for (let i = 0; i < 2 * points; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = cx + Math.cos(i * angle - Math.PI / 2) * radius;
      const y = cy + Math.sin(i * angle - Math.PI / 2) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  };

  const drawLegend = (
    ctx: CanvasRenderingContext2D,
    harmonyType: Harmony,
    isAnimating: boolean,
    isInteractive: boolean
  ) => {
    const legendX = 20;
    const legendY = 30;

    // Background for legend with interaction indicator
    const bgColor = isInteractive
      ? "rgba(220, 252, 231, 0.95)"
      : isAnimating
      ? "rgba(255, 248, 220, 0.95)"
      : "rgba(255, 255, 255, 0.9)";

    ctx.fillStyle = bgColor;
    ctx.fillRect(legendX - 10, legendY - 20, 320, 140);

    const borderColor = isInteractive
      ? "#10b981"
      : isAnimating
      ? "#f59e0b"
      : "#e5e7eb";

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = isInteractive || isAnimating ? 2 : 1;
    ctx.strokeRect(legendX - 10, legendY - 20, 320, 140);

    ctx.font = "12px system-ui";
    ctx.fillStyle = "#374151";
    ctx.textAlign = "left";

    // Title with status indicator
    ctx.font = "14px system-ui";
    ctx.fillStyle = "#111827";
    const title = isInteractive
      ? "🎯 Click to Select Color"
      : isAnimating
      ? "🎬 Animating Color Harmony"
      : "🎨 Interactive Color Wheel";
    ctx.fillText(title, legendX, legendY);

    ctx.font = "11px system-ui";
    ctx.fillStyle = "#374151";

    // Base color legend
    ctx.fillText("★ Base Color (with star)", legendX, legendY + 20);

    // Palette colors legend
    ctx.fillText("● Generated Colors (numbered)", legendX, legendY + 35);

    // Interactive instructions
    if (isInteractive) {
      ctx.fillStyle = "#10b981";
      ctx.fillText(
        "🖱️ Hover to preview • Click to select new base color",
        legendX,
        legendY + 55
      );
    } else {
      // Harmony explanation
      const harmonyDescriptions = {
        analogous: "Adjacent colors connected in sequence",
        monochromatic: "Same hue with different lightness",
        triadic: "Three colors forming a triangle",
        complementary: "Opposite colors connected by line",
        compound: "Base color connected to split-complements",
      };

      ctx.fillStyle = "#6b7280";
      ctx.fillText(
        `Harmony: ${harmonyDescriptions[harmonyType]}`,
        legendX,
        legendY + 55
      );
    }

    // Status messages
    if (isAnimating) {
      ctx.fillStyle = "#f59e0b";
      ctx.fillText(
        "⚡ Transitioning between harmony types...",
        legendX,
        legendY + 75
      );
    } else if (isInteractive) {
      ctx.fillStyle = "#6b7280";
      ctx.fillText(
        "💡 Click anywhere on the color ring to pick a new base color",
        legendX,
        legendY + 75
      );
    } else {
      ctx.fillStyle = "#6b7280";
      ctx.fillText(
        "Degree markers show hue positions (0°-360°)",
        legendX,
        legendY + 75
      );
    }

    // Interactive tip
    ctx.fillStyle = "#9ca3af";
    ctx.font = "10px system-ui";
    const tip = isInteractive
      ? "Tip: The crosshair shows the exact color you'll select!"
      : "Tip: Hover over the color wheel to see interactive preview!";
    ctx.fillText(tip, legendX, legendY + 95);

    // Click zone indicator
    ctx.fillStyle = "#9ca3af";
    ctx.fillText(
      "Interactive zone: Between inner and outer circles",
      legendX,
      legendY + 110
    );
  };

  const hexToHue = (hex: string): number => {
    // Convert hex to RGB
    const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
    const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
    const b = Number.parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;

    if (max !== min) {
      const d = max - min;
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return Math.round(h * 360);
  };

  const hexToRgb = (hex: string): [number, number, number] => {
    const r = Number.parseInt(hex.slice(1, 3), 16);
    const g = Number.parseInt(hex.slice(3, 5), 16);
    const b = Number.parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {interactionState.isHovering
            ? "🎯"
            : animationState.isAnimating
            ? "🎬"
            : "🎨"}{" "}
          Interactive Color Wheel
          {animationState.isAnimating && (
            <span className="text-sm font-normal text-orange-600 animate-pulse">
              Animating...
            </span>
          )}
          {interactionState.isHovering && (
            <span className="text-sm font-normal text-green-600">
              Click to Select!
            </span>
          )}
        </CardTitle>
        <CardDescription>
          {interactionState.isHovering
            ? `Hover preview: ${interactionState.hoverColor} - Click to select this color as your new base!`
            : animationState.isAnimating
            ? "Watch as colors smoothly move to their new positions!"
            : "Click anywhere on the color wheel to select a new base color. Hover to preview colors before selecting."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="border rounded-lg shadow-sm bg-white"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{
            cursor: interactionState.isHovering ? "crosshair" : "default",
          }}
        />
      </CardContent>
    </Card>
  );
}
