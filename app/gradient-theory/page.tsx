"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GradientTheoryPage() {
  return (
    <div className="container max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Gradient Theory</h1>
        <p className="text-lg text-muted-foreground">
          Learn how CSS gradients work and how to use them effectively in your designs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>What Are CSS Gradients?</CardTitle>
            <CardDescription>The basics of gradient creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              CSS gradients let you display smooth transitions between two or more specified colors. They're created
              using the CSS functions like <code>linear-gradient()</code>, <code>radial-gradient()</code>, and{" "}
              <code>conic-gradient()</code>.
            </p>
            <p>
              Gradients can be used anywhere a image might be used, such as backgrounds or border images. They're
              rendered by the browser, making them faster to load than actual image files and scalable to any size.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>When to Use Gradients</CardTitle>
            <CardDescription>Design considerations for gradient usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Gradients are ideal for creating depth, dimension, and visual interest in interfaces. They're commonly
              used for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Button and UI element backgrounds</li>
              <li>Section dividers and subtle backgrounds</li>
              <li>Creating focus on important content</li>
              <li>Adding a modern touch to otherwise flat designs</li>
              <li>Simulating lighting effects or depth</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="linear" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="linear">Linear Gradients</TabsTrigger>
          <TabsTrigger value="radial">Radial Gradients</TabsTrigger>
          <TabsTrigger value="conic">Conic Gradients</TabsTrigger>
        </TabsList>
        <TabsContent value="linear" className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold">Linear Gradients</h2>
          <p className="text-muted-foreground mb-6">
            Linear gradients transition colors along a straight line. You can control the direction and color stops.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "linear-gradient(to right, #7C3AED, #10B981)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">Horizontal Gradient</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: linear-gradient(to right, #7C3AED, #10B981);
                </code>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "linear-gradient(to bottom, #7C3AED, #10B981)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">Vertical Gradient</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: linear-gradient(to bottom, #7C3AED, #10B981);
                </code>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "linear-gradient(135deg, #7C3AED, #10B981)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">Diagonal Gradient</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: linear-gradient(135deg, #7C3AED, #10B981);
                </code>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "linear-gradient(to right, #7C3AED, #10B981, #F97316)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">Multiple Color Stops</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: linear-gradient(to right, #7C3AED, #10B981, #F97316);
                </code>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="radial" className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold">Radial Gradients</h2>
          <p className="text-muted-foreground mb-6">
            Radial gradients transition colors from a central point outward in a circular or elliptical shape.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "radial-gradient(circle, #7C3AED, #10B981)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">Circle Gradient</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: radial-gradient(circle, #7C3AED, #10B981);
                </code>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "radial-gradient(ellipse, #7C3AED, #10B981)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">Ellipse Gradient</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: radial-gradient(ellipse, #7C3AED, #10B981);
                </code>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "radial-gradient(circle at top left, #7C3AED, #10B981)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">Positioned Gradient</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: radial-gradient(circle at top left, #7C3AED, #10B981);
                </code>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "radial-gradient(circle, #7C3AED 0%, #10B981 50%, #F97316 100%)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">With Color Stops</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: radial-gradient(circle, #7C3AED 0%, #10B981 50%, #F97316 100%);
                </code>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="conic" className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold">Conic Gradients</h2>
          <p className="text-muted-foreground mb-6">
            Conic gradients transition colors around a center point (rather than from the center outward).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "conic-gradient(#7C3AED, #10B981, #7C3AED)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">Basic Conic Gradient</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: conic-gradient(#7C3AED, #10B981, #7C3AED);
                </code>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "conic-gradient(from 90deg, #7C3AED, #10B981)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">With Starting Angle</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: conic-gradient(from 90deg, #7C3AED, #10B981);
                </code>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{ background: "conic-gradient(from 45deg at 50% 25%, #7C3AED, #10B981, #F97316)" }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">Positioned Conic</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: conic-gradient(from 45deg at 50% 25%, #7C3AED, #10B981, #F97316);
                </code>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="h-32 rounded-lg shadow-md"
                style={{
                  background:
                    "conic-gradient(#7C3AED 0deg, #10B981 90deg, #F97316 180deg, #FF5722 270deg, #7C3AED 360deg)",
                }}
              ></div>
              <div className="space-y-2">
                <p className="font-medium">With Angle Stops</p>
                <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
                  background: conic-gradient(#7C3AED 0deg, #10B981 90deg, #F97316 180deg, #FF5722 270deg, #7C3AED
                  360deg);
                </code>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-semibold mb-6">Advanced Gradient Techniques</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Gradient Overlays</CardTitle>
            <CardDescription>Adding gradients on top of images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-48 rounded-lg shadow-md overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(/placeholder.svg?height=300&width=500)` }}
              ></div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)" }}
              ></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold">Gradient Overlay</h3>
                <p className="text-sm">Improves text readability</p>
              </div>
            </div>
            <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
              background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%);
            </code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Multiple Gradients</CardTitle>
            <CardDescription>Layering gradients for complex effects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="h-48 rounded-lg shadow-md"
              style={{
                background: `
                linear-gradient(135deg, rgba(124, 58, 237, 0.5) 0%, rgba(16, 185, 129, 0) 70%),
                radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.5), rgba(249, 115, 22, 0) 70%),
                conic-gradient(from 270deg at 40% 30%, rgba(16, 185, 129, 0.3), rgba(124, 58, 237, 0) 60%)
              `,
              }}
            ></div>
            <code className="text-sm p-2 bg-muted rounded-md block overflow-x-auto">
              background: linear-gradient(135deg, rgba(124, 58, 237, 0.5) 0%, rgba(16, 185, 129, 0) 70%),
              radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.5), rgba(249, 115, 22, 0) 70%),
              conic-gradient(from 270deg at 40% 30%, rgba(16, 185, 129, 0.3), rgba(124, 58, 237, 0) 60%);
            </code>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
