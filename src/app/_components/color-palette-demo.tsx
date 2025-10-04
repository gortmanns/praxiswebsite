export function ColorPaletteDemo() {
  const colors = [
    { name: 'Primary', bg: 'bg-primary', text: 'text-primary-foreground' },
    { name: 'Secondary', bg: 'bg-secondary', text: 'text-secondary-foreground' },
    { name: 'Accent', bg: 'bg-accent', text: 'text-accent-foreground' },
    { name: 'Destructive', bg: 'bg-destructive', text: 'text-destructive-foreground' },
    { name: 'Background', bg: 'bg-background', text: 'text-foreground', border: true },
    { name: 'Foreground', bg: 'bg-foreground', text: 'text-background' },
    { name: 'Card', bg: 'bg-card', text: 'text-card-foreground', border: true },
    { name: 'Popover', bg: 'bg-popover', text: 'text-popover-foreground', border: true },
    { name: 'Muted', bg: 'bg-muted', text: 'text-muted-foreground' },
  ];

  return (
    <section className="w-full bg-background py-12">
      <div className="container">
        <h2 className="mb-8 text-center font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Aktuelles Farbschema
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {colors.map((color) => (
            <div
              key={color.name}
              className={`flex h-24 w-full items-center justify-center rounded-lg text-sm font-bold ${color.bg} ${color.text} ${color.border ? 'border border-border' : ''}`}
            >
              {color.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
