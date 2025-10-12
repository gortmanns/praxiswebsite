export function ColorPaletteDemo() {
  const colors = [
    { name: 'Primary', bg: 'bg-primary', text: 'text-primary-foreground', hex: '#00AAFF' },
    { name: 'Secondary', bg: 'bg-secondary', text: 'text-secondary-foreground', hex: '#98A4B0' },
    { name: 'Accent', bg: 'bg-accent', text: 'text-accent-foreground', hex: '#5E616B' },
    { name: 'Destructive', bg: 'bg-destructive', text: 'text-destructive-foreground', hex: '#CB3535' },
    { name: 'Background', bg: 'bg-background', text: 'text-foreground', border: true, hex: '#FFFFFF' },
    { name: 'Foreground', bg: 'bg-foreground', text: 'text-background', hex: '#03081A' },
    { name: 'Card', bg: 'bg-card', text: 'text-card-foreground', border: true, hex: '#FAFEFE' },
    { name: 'Popover', bg: 'bg-popover', text: 'text-popover-foreground', border: true, hex: '#FFFFFF' },
    { name: 'Muted', bg: 'bg-muted', text: 'text-muted-foreground', hex: '#E3E8F0' },
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
              className={`flex h-24 w-full flex-col items-center justify-center rounded-lg text-sm font-bold ${color.bg} ${color.text} ${color.border ? 'border border-border' : ''}`}
            >
              <span>{color.name}</span>
              <span className="mt-1 font-mono text-xs opacity-70">{color.hex}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
