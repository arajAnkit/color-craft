import { Palette, Layers, Sparkles } from "lucide-react";

export function FeatureHighlights() {
  const features = [
    {
      icon: <Palette className="h-5 w-5 text-white" />,
      gradient: "from-blue-500 to-cyan-500",
      title: "Color Tools",
      description: "Professional color utilities",
    },
    {
      icon: <Layers className="h-5 w-5 text-white" />,
      gradient: "from-purple-500 to-pink-500",
      title: "Gradient Tools",
      description: "Advanced gradient creation",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-white" />,
      gradient: "from-emerald-500 to-teal-500",
      title: "AI-Powered",
      description: "Smart color analysis",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/20"
        >
          <div
            className={`p-2 bg-gradient-to-r ${feature.gradient} rounded-xl`}
          >
            {feature.icon}
          </div>
          <div className="text-left">
            <div className="font-semibold text-slate-900 dark:text-white">
              {feature.title}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {feature.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
