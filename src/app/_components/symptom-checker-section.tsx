import { SymptomCheckerForm } from './symptom-checker-form';

export function SymptomCheckerSection() {
  return (
    <section id="symptoms" className="py-16 sm:py-24 bg-muted/50">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            KI-gestützter Symptom-Check
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Erhalten Sie einen schnellen Einblick in Ihre gesundheitlichen Bedenken. Dieses Tool bietet eine vorläufige Analyse, keine medizinische Diagnose.
          </p>
        </div>
        <SymptomCheckerForm />
      </div>
    </section>
  );
}
