
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
    { name: "Muted", className: "bg-muted text-muted-foreground", value: "210 40% 96.1%" },
    { name: "Muted FG", className: "bg-muted-foreground text-muted", value: "215.4 16.3% 46.9%" },
    { name: "Accent", className: "bg-accent text-accent-foreground", value: "210 40% 98%" },
    { name: "Accent FG", className: "bg-accent-foreground text-accent", value: "222.2 47.4% 11.2%" },
    { name: "Destructive", className: "bg-destructive text-destructive-foreground", value: "0 84.2% 60.2%" },
    { name: "Border", className: "bg-border text-foreground", value: "214.3 31.8% 91.4%" },
    { name: "Input", className: "bg-input text-foreground", value: "214.3 31.8% 91.4%" },
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
                className={`flex h-24 w-full flex-col items-center justify-center rounded-lg ${color.className} ${color.border ? 'border' : ''}`}
                style={{
                  backgroundColor: color.name === 'Muted' ? 'hsl(210 40% 96.1%)' : color.name === 'Muted FG' ? 'hsl(215.4 16.3% 46.9%)' : color.name === 'Accent' ? 'hsl(210 40% 98%)' : color.name === 'Accent FG' ? 'hsl(222.2 47.4% 11.2%)' : color.name === 'Border' ? 'hsl(214.3 31.8% 91.4%)' : color.name === 'Input' ? 'hsl(214.3 31.8% 91.4%)' : undefined,
                  color: color.name === 'Muted' ? 'hsl(215.4 16.3% 46.9%)' : color.name === 'Muted FG' ? 'hsl(210 40% 96.1%)' : color.name === 'Accent' ? 'hsl(222.2 47.4% 11.2%)' : color.name === 'Accent FG' ? 'hsl(210 40% 98%)' : color.name === 'Border' ? 'hsl(var(--foreground))' : color.name === 'Input' ? 'hsl(var(--foreground))' : undefined
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
