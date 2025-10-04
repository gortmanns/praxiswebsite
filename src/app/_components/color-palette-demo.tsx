
export function ColorPaletteDemo() {
  const colors = [
    { name: "Primary", className: "bg-primary text-primary-foreground", value: "197 100% 47%" },
    { name: "Primary FG", className: "bg-primary-foreground text-primary", value: "0 0% 100%", border: true },
    { name: "Secondary", className: "bg-secondary text-secondary-foreground", value: "209 15% 65%" },
    { name: "Secondary FG", className: "bg-secondary-foreground text-secondary", value: "0 0% 100%", border: true },
    { name: "Background", className: "bg-background text-foreground", value: "0 0% 100%", border: true },
    { name: "Foreground", className: "bg-foreground text-background", value: "224 71.4% 4.1%" },
    { name: "Card", className: "bg-card text-card-foreground", value: "0 0% 100%", border: true },
    { name: "Card FG", className: "bg-card-foreground text-card", value: "224 71% 4%" },
    { name: "Muted", className: "text-foreground", value: "220 13% 94%", hsl: { bg: "hsl(220 13% 94%)", fg: "hsl(220 9% 40%)" } },
    { name: "Muted FG", className: "text-background", value: "220 9% 40%", hsl: { bg: "hsl(220 9% 40%)", fg: "hsl(220 13% 94%)" } },
    { name: "Accent", className: "text-foreground", value: "14 83% 60%", hsl: { bg: "hsl(14 83% 60%)", fg: "hsl(0 0% 100%)" } },
    { name: "Accent FG", className: "text-background", value: "0 0% 100%", hsl: { bg: "hsl(0 0% 100%)", fg: "hsl(14 83% 60%)" } },
    { name: "Destructive", className: "bg-destructive text-destructive-foreground", value: "0 84.2% 60.2%" },
    { name: "Border", className: "text-foreground", value: "220 13% 88%", hsl: { bg: "hsl(220 13% 88%)", fg: "hsl(var(--foreground))" } },
    { name: "Input", className: "text-foreground", value: "220 13% 88%", hsl: { bg: "hsl(220 13% 88%)", fg: "hsl(var(--foreground))" } },
    { name: "Ring", className: "bg-ring text-primary-foreground", value: "197 100% 47%" },
  ];

  return (
    <section id="color-demo" className="py-16 bg-white">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Farbpalette Demo
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dies ist eine temporäre Vorschau der Farbpalette.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col items-center">
              <div
                className={`flex h-24 w-full flex-col items-center justify-center rounded-lg ${color.className} ${color.border ? 'border border-border' : ''}`}
                style={{
                  backgroundColor: color.hsl?.bg,
                  color: color.hsl?.fg,
                }}
              >
                <span className="font-bold">{color.name}</span>
                <span className="mt-1 text-xs opacity-80">{color.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
