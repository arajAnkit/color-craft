"use client"

export function HeroDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="hero-decoration absolute top-[15%] left-[10%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-indigo-600/10 blur-xl" />
      <div className="hero-decoration absolute top-[45%] right-[15%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-emerald-500/10 blur-xl" />
      <div className="hero-decoration absolute bottom-[20%] left-[20%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-purple-500/10 blur-xl" />

      <div
        className="hero-decoration hero-parallax absolute top-[10%] right-[30%] w-6 h-6 rounded-full bg-indigo-600/30"
        data-speed="0.5"
      />
      <div
        className="hero-decoration hero-parallax absolute top-[60%] left-[25%] w-4 h-4 rounded-full bg-emerald-500/30"
        data-speed="0.8"
      />
      <div
        className="hero-decoration hero-parallax absolute bottom-[30%] right-[15%] w-8 h-8 rounded-full bg-purple-500/30"
        data-speed="0.3"
      />
    </div>
  )
}
