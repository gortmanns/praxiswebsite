
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
                        <CardTitle className="font-headline text-2xl font-bold text-primary">Gestalten Sie die Zukunft der medizinischen Versorgung mit uns</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-lg text-foreground/80">
                        <p>Unsere Vision ist es, das Praxiszentrum im Ring zu einem umfassenden Gesundheitsstandort zu entwickeln, der unseren Patientinnen und Patienten eine integrierte und wohnortnahe Versorgung auf höchstem Niveau bietet. Ein zentraler Baustein dieser Vision ist die enge Zusammenarbeit mit qualifizierten Fachärztinnen und Fachärzten verschiedenster Richtungen.</p>

                        <div className="space-y-4 rounded-md border border-border bg-card p-6">
                            <h4 className="font-headline text-xl font-bold text-primary">Kooperationsangebot für Fachärztinnen und Fachärzte</h4>
                            <p className="text-base">Sie sind Fachärztin oder Facharzt und möchten Ihren Patientenstamm erweitern oder suchen nach einer flexiblen Möglichkeit, Ihre Expertise in einem modernen und kollegialen Umfeld anzubieten? Wir laden Sie herzlich ein, Teil unseres wachsenden Netzwerks zu werden.</p>
                            <p className="text-base">Wir bieten Ihnen die Möglichkeit, unsere voll ausgestatteten und modernen Praxisräumlichkeiten für Ihre eigenen Sprechstunden zu nutzen. Die Kooperationsmöglichkeiten sind dabei äusserst flexibel und passen sich Ihren Bedürfnissen an – von einer einmaligen Sprechstunde pro Monat bis hin zu mehrmaligen Terminen pro Woche ist alles denkbar.</p>
                        </div>
                        
                        <div className="space-y-4">
                            <h4 className="font-headline text-xl font-bold text-primary">Interesse an einer Zusammenarbeit?</h4>
                            <p>Wenn Sie daran interessiert sind, die medizinische Versorgung in der Region gemeinsam mit uns zu verbessern und unser Leistungsspektrum zu bereichern, dann freuen wir uns darauf, von Ihnen zu hören. Lassen Sie uns in einem unverbindlichen Gespräch die Möglichkeiten einer Partnerschaft ausloten.</p>
                            <p className="pt-2">Kontaktieren Sie uns für weitere Informationen per E-Mail:</p>
                            <ObfuscatedLink
                                user="empfang"
                                domain="praxiszentrum-im-ring.ch"
                                className="font-bold text-primary hover:underline"
                            >
                                empfang@praxiszentrum-im-ring.ch
                            </ObfuscatedLink>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl font-bold text-primary">Offene Stellen & Initiativbewerbungen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-lg text-foreground/80">
                         <div className="space-y-4">
                            <p>Wir sind ebenso stets auf der Suche nach engagierten Hausärztinnen, Hausärzten und Medizinischen Praxisassistentinnen (MPA), die unser Kernteam verstärken möchten.</p>
                             <ul className="list-disc space-y-2 pl-6">
                                <li>Fachärztinnen und Fachärzte für Allgemeinmedizin</li>
                                <li>Medizinische Praxisassistentinnen und Praxisassistenten (MPA)</li>
                            </ul>
                            <p className="pt-2">Sollten Sie Interesse haben, freuen wir uns über Ihre Initiativbewerbung an:</p>
                             <ObfuscatedLink
                                user="empfang"
                                domain="praxiszentrum-im-ring.ch"
                                className="font-bold text-primary hover:underline"
                            >
                                empfang@praxiszentrum-im-ring.ch
                            </ObfuscatedLink>
                        </div>

                        <p className="pt-4">Wir behandeln alle Bewerbungen streng vertraulich.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
