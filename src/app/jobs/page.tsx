
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ObfuscatedLink } from '@/components/ui/obfuscated-link';

export default function JobsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                    JOBS & MITARBEIT
                </h2>
            </div>
            <div className="mx-auto mt-16 max-w-4xl space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl font-bold text-primary">Werden Sie Teil unseres Teams</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-lg text-foreground/80">
                        <p>Wir sind stets auf der Suche nach engagierten und qualifizierten Fachkräften, die unsere Vision einer patientenorientierten und umfassenden medizinischen Versorgung teilen. Im Praxiszentrum im Ring bieten wir ein modernes Arbeitsumfeld, ein kollegiales Team und die Möglichkeit, sich aktiv in die Weiterentwicklung der Praxis einzubringen.</p>
                        
                        <div className="space-y-4 rounded-md border border-border bg-card p-6">
                            <h4 className="font-headline text-xl font-bold text-primary">Aktuell offene Stellen</h4>
                            <p className="text-base">Zurzeit haben wir keine spezifischen Stellen ausgeschrieben. Wir sind jedoch immer an talentierten Persönlichkeiten interessiert.</p>
                        </div>
                        
                        <div className="space-y-4">
                            <h4 className="font-headline text-xl font-bold text-primary">Initiativbewerbungen</h4>
                            <p>Wenn Sie glauben, dass Ihre Fähigkeiten und Ihre Persönlichkeit gut zu uns passen, freuen wir uns über Ihre Initiativbewerbung. Wir sind besonders interessiert an:</p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Fachärztinnen und Fachärzte für Allgemeinmedizin</li>
                                <li>Medizinische Praxisassistentinnen und Praxisassistenten (MPA)</li>
                                <li>Fachspezialisten, die unser medizinisches Angebot erweitern möchten</li>
                            </ul>
                            <p className="pt-2">Bitte senden Sie Ihre vollständigen Bewerbungsunterlagen per E-Mail an:</p>
                            <ObfuscatedLink
                                user="empfang"
                                domain="praxiszentrum-im-ring.ch"
                                className="font-bold text-primary hover:underline"
                            >
                                empfang@praxiszentrum-im-ring.ch
                            </ObfuscatedLink>
                        </div>

                        <p className="pt-4">Wir behandeln alle Bewerbungen streng vertraulich und freuen uns darauf, von Ihnen zu hören.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
