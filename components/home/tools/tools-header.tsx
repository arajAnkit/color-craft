"use client";

export function ToolsHeader() {
  return (
    <div className="tools-header mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-16">
      <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
        Explore Our <span className="text-indigo-400">Tools</span>
      </h2>
      <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        Interactive tools to help you understand and work with CSS colors and
        gradients effectively.
      </p>
    </div>
  );
}
