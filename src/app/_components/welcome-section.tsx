export function WelcomeSection() {
  return (
    <section id="welcome" className="pt-8 pb-12 sm:pt-12 sm:pb-16 debug-outline">
      <div className="container debug-outline">
        <div className="mx-auto max-w-5xl text-center debug-outline">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl sm:whitespace-nowrap text-primary">
            WILLKOMMEN BEIM PRAXISZENTRUM IM RING
          </h2>
          <p className="mt-6 text-lg text-foreground/80">
            Im Herzen des Kappelenrings gelegen verstehen wir uns als Ansprechpartner und Ratgeber in allen Gesundheitsfragen für unsere Patienten. Als Ausbildungspraxis für Hausarztmedizin der Universität Bern unterstützen wir ausserdem aktiv die Ausbildung der nächsten Generation.
          </p>
        </div>
      </div>
    </section>
  );
}
