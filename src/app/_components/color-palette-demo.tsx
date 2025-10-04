
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
    { name: "Muted", className: "bg-[#faf8f1] text-[#5c4b3c]", value: "45 53% 96%", hsl: { bg: "hsl(45 53% 96%)", fg: "hsl(30 42% 24%)" } },
    { name: "Muted FG", className: "bg-[#5c4b3c] text-[#faf8f1]", value: "30 42% 24%", hsl: { bg: "hsl(30 42% 24%)", fg: "hsl(45 53% 96%)" } },
    { name: "Accent", className: "bg-[#eef6f2] text-[#202f27]", value: "140 45% 95%", hsl: { bg: "hsl(140 45% 95%)", fg: "hsl(140 25% 15%)" } },
    { name: "Accent FG", className: "bg-[#202f27] text-[#eef6f2]", value: "140 25% 15%", hsl: { bg: "hsl(140 25% 15%)", fg: "hsl(140 45% 95%)" } },
    { name: "Destructive", className: "bg-destructive text-destructive-foreground", value: "0 84.2% 60.2%" },
    { name: "Border", className: "bg-[#e5e2db] text-foreground", value: "45 15% 88%", hsl: { bg: "hsl(45 15% 88%)", fg: "hsl(var(--foreground))" } },
    { name: "Input", className: "bg-[#e5e2db] text-foreground", value: "45 15% 88%", hsl: { bg: "hsl(45 15% 88%)", fg: "hsl(var(--foreground))" } },
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
