export type GradientType = "linear" | "radial" | "conic"

export type ColorStop = {
  color: string
  position: number
}

export type GradientPreset = {
  name: string
  type: GradientType
  angle?: number
  colorStops: ColorStop[]
  category: string
}

export type GradientConfig = {
  type: GradientType
  angle: number
  colorStops: ColorStop[]
  radialShape: "circle" | "ellipse"
  radialPosition: string
  conicAngle: number
  conicPosition: string
}
