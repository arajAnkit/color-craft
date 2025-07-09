import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatedNav } from "@/components/layout/navigation/animated-nav"
import { Footer } from "@/components/layout/footer/footer"
import { GsapProvider } from "@/components/gsap-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CSS Colors & Gradient Learning Platform",
  description: "A modern educational platform for learning CSS colors and gradients",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <GsapProvider>
            <div className="flex min-h-screen flex-col">
              <AnimatedNav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </GsapProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
