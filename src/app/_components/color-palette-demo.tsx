
export function ColorPaletteDemo() {
  const colors = [
    { name: "Primary", className: "bg-primary text-primary-foreground" },
    { name: "Secondary", className: "bg-secondary text-secondary-foreground" },
    { name: "Background", className: "bg-background text-foreground border" },
    { name: "Foreground", className: "bg-foreground text-background" },
    { name: "Card", className: "bg-card text-card-foreground border" },
    { name: "Popover", className: "bg-popover text-popover-foreground border" },
    { name: "Muted", className: "bg-muted text-muted-foreground" },
    { name: "Accent", className: "bg-accent text-accent-foreground" },
    { name: "Destructive", className: "bg-destructive text-destructive-foreground" },
    { name: "Border", className: "bg-border text-foreground" },
    { name: "Input", className: "bg-input text-foreground border" },
    { name: "Ring", className: "bg-ring text-primary-foreground" },
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
                className={`flex h-24 w-full items-center justify-center rounded-lg ${color.className}`}
              >
                <span className="font-bold">{color.name}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{color.name.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
