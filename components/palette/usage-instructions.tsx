interface UsageInstructionsProps {
  formatKey: string;
}

export function UsageInstructions({ formatKey }: UsageInstructionsProps) {
  const instructions = {
    json: (
      <>
        <p>• Import into web applications or design tools that support JSON</p>
        <p>• Use with JavaScript/TypeScript projects</p>
        <p>• Compatible with most modern development workflows</p>
      </>
    ),
    css: (
      <>
        <p>• Add to your CSS file or style sheet</p>
        <p>• Use variables like: color: var(--color-primary)</p>
        <p>• Apply utility classes: class="bg-primary text-secondary"</p>
      </>
    ),
    scss: (
      <>
        <p>• Import into your Sass/SCSS files</p>
        <p>• Use variables like: color: $color-primary</p>
        <p>• Access via map: color: map-get($colors, 'primary')</p>
      </>
    ),
    tailwind: (
      <>
        <p>• Add to your tailwind.config.js file</p>
        <p>• Use classes like: bg-primary text-secondary</p>
        <p>• Supports all Tailwind color utilities</p>
      </>
    ),
    ase: (
      <>
        <p>• Import into Adobe Creative Suite applications</p>
        <p>• Compatible with Photoshop, Illustrator, InDesign</p>
        <p>• Save as .ase file for proper import</p>
      </>
    ),
    sketch: (
      <>
        <p>• Import into Sketch app</p>
        <p>• Save as .sketchpalette file</p>
        <p>• Access via Document Colors panel</p>
      </>
    ),
    figma: (
      <>
        <p>• Use with Figma design token plugins</p>
        <p>• Import via Figma Tokens plugin</p>
        <p>• Sync with design system workflows</p>
      </>
    ),
    procreate: (
      <>
        <p>• Copy hex values to Procreate color picker</p>
        <p>• Create custom color palette in app</p>
        <p>• Perfect for digital art and illustration</p>
      </>
    ),
  };

  return (
    <div className="text-sm text-muted-foreground space-y-1">
      {instructions[formatKey as keyof typeof instructions] || (
        <p>No instructions available.</p>
      )}
    </div>
  );
}
