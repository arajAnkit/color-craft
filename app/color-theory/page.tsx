"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ColorWheel } from "@/components/theory/color-wheel"

export default function ColorTheoryPage() {
  return (
    <div className="container max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Color Theory</h1>
        <p className="text-lg text-muted-foreground">
          Understanding how colors work together is essential for creating visually appealing designs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>The Color Wheel</CardTitle>
            <CardDescription>The foundation of color theory</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ColorWheel />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Introduction to Color Theory</CardTitle>
            <CardDescription>Core principles of color in design</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Color theory is the collection of rules and guidelines which designers use to communicate with users
              through appealing color schemes in visual interfaces. It's a framework that informs the use of color in
              design, ensuring accessibility and enhancing user experience.
            </p>
            <p>
              Understanding color theory helps designers select colors that work harmoniously together, create visual
              hierarchy, and evoke specific emotions or responses from users.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="primary" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="primary">Primary Colors</TabsTrigger>
          <TabsTrigger value="secondary">Secondary Colors</TabsTrigger>
          <TabsTrigger value="tertiary">Tertiary Colors</TabsTrigger>
        </TabsList>
        <TabsContent value="primary" className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold">Primary Colors</h2>
          <p className="text-muted-foreground">
            Primary colors are the foundation of color theory and cannot be created by mixing other colors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-24 bg-red-600 rounded-md shadow-md"></div>
              <p className="font-medium">Red</p>
              <p className="text-sm text-muted-foreground">#DC2626</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-24 bg-yellow-400 rounded-md shadow-md"></div>
              <p className="font-medium">Yellow</p>
              <p className="text-sm text-muted-foreground">#FBBF24</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-24 bg-blue-600 rounded-md shadow-md"></div>
              <p className="font-medium">Blue</p>
              <p className="text-sm text-muted-foreground">#2563EB</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="secondary" className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold">Secondary Colors</h2>
          <p className="text-muted-foreground">Secondary colors are created by mixing two primary colors together.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-24 bg-green-500 rounded-md shadow-md"></div>
              <p className="font-medium">Green (Blue + Yellow)</p>
              <p className="text-sm text-muted-foreground">#10B981</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-24 bg-purple-600 rounded-md shadow-md"></div>
              <p className="font-medium">Purple (Red + Blue)</p>
              <p className="text-sm text-muted-foreground">#7C3AED</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-24 bg-orange-500 rounded-md shadow-md"></div>
              <p className="font-medium">Orange (Red + Yellow)</p>
              <p className="text-sm text-muted-foreground">#F97316</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tertiary" className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold">Tertiary Colors</h2>
          <p className="text-muted-foreground">
            Tertiary colors are created by mixing a primary and a secondary color.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-full h-16 bg-red-orange-500 rounded-md shadow-md"
                style={{ backgroundColor: "#FF5722" }}
              ></div>
              <p className="font-medium text-sm">Red-Orange</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-full h-16 bg-yellow-orange-500 rounded-md shadow-md"
                style={{ backgroundColor: "#FFB100" }}
              ></div>
              <p className="font-medium text-sm">Yellow-Orange</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-full h-16 bg-yellow-green-500 rounded-md shadow-md"
                style={{ backgroundColor: "#9ACD32" }}
              ></div>
              <p className="font-medium text-sm">Yellow-Green</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-full h-16 bg-blue-green-500 rounded-md shadow-md"
                style={{ backgroundColor: "#0D9488" }}
              ></div>
              <p className="font-medium text-sm">Blue-Green</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-full h-16 bg-blue-violet-500 rounded-md shadow-md"
                style={{ backgroundColor: "#6366F1" }}
              ></div>
              <p className="font-medium text-sm">Blue-Violet</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-full h-16 bg-red-violet-500 rounded-md shadow-md"
                style={{ backgroundColor: "#C026D3" }}
              ></div>
              <p className="font-medium text-sm">Red-Violet</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-semibold mb-6">Color Harmonies</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Complementary Colors</CardTitle>
            <CardDescription>Colors opposite each other on the color wheel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center items-center gap-4">
              <div className="w-24 h-24 bg-blue-600 rounded-md shadow-md"></div>
              <div className="w-24 h-24 bg-orange-500 rounded-md shadow-md"></div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Blue & Orange create high contrast and visual vibrance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analogous Colors</CardTitle>
            <CardDescription>Colors adjacent to each other on the color wheel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center items-center gap-4">
              <div className="w-16 h-16 bg-purple-600 rounded-md shadow-md"></div>
              <div className="w-16 h-16 bg-indigo-600 rounded-md shadow-md"></div>
              <div className="w-16 h-16 bg-blue-600 rounded-md shadow-md"></div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Purple, Indigo & Blue create a harmonious, cohesive look
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Triadic Colors</CardTitle>
            <CardDescription>Three colors evenly spaced on the color wheel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center items-center gap-4">
              <div className="w-16 h-16 bg-red-600 rounded-md shadow-md"></div>
              <div className="w-16 h-16 bg-blue-600 rounded-md shadow-md"></div>
              <div className="w-16 h-16 bg-yellow-400 rounded-md shadow-md"></div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Red, Blue & Yellow offer vibrant contrast while maintaining balance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tetradic Colors</CardTitle>
            <CardDescription>Four colors arranged in two complementary pairs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center items-center gap-3 flex-wrap">
              <div className="w-16 h-16 bg-purple-600 rounded-md shadow-md"></div>
              <div className="w-16 h-16 bg-yellow-500 rounded-md shadow-md"></div>
              <div className="w-16 h-16 bg-red-600 rounded-md shadow-md"></div>
              <div className="w-16 h-16 bg-green-500 rounded-md shadow-md"></div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Offers rich color possibilities with balanced contrast
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
