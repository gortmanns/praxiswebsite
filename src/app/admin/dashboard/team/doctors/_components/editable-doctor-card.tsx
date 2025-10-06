import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';

export const EditableDoctorCard = () => (
    <div className="mx-auto max-w-7xl">
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Linke Spalte: Hauptkarte */}
                    <div 
                        className="relative w-full bg-card"
                        style={{ 'containerType': 'inline-size', aspectRatio: '1000 / 495' } as React.CSSProperties}
                    >
                        <div className="grid h-full grid-cols-3 items-center gap-[4.5%] p-6">
                            <div className="relative col-span-1 h-full w-full">
                                <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                                    <User className="h-1/2 w-1/2 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                    <p className="text-[2.2cqw] text-primary">Titel</p>
                                    <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                                        Name
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                                        <p className="font-bold">Spezialisierung</p>
                                        <p>Zusatzqualifikation 1 (Optional)</p>
                                        <p>Zusatzqualifikation 2 (Optional)</p>
                                    </div>
                                    <p className="mt-[2.5cqw] text-[1.6cqw] italic">
                                        <span className="whitespace-nowrap">Zusatzinformationen / Position (alternativ Logo)</span>{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Rechte Spalte: Vita */}
                    <div className="flex flex-col items-start justify-start overflow-auto bg-accent/95 p-6 text-left text-background">
                         <h3 className="mb-4 font-bold text-primary">Vita / Lebenslauf</h3>
                         <div className="h-full w-full text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                            <Textarea 
                                placeholder="Fügen Sie hier die Vita-Punkte ein, einen pro Zeile."
                                className="h-full w-full resize-none border-0 bg-transparent text-background placeholder:text-background/50 focus:ring-0"
                                defaultValue={`Medizinstudium in Bonn (Deutschland) und Hobart (Australien)
Masterstudium Public Health und Health Management in Sydney (Australien)
Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor
---
Projektmanagement im Gesundheitswesen in Europa und Australien
<Meilensteine>
Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)
Verantwortlicher Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien
Direktor der Memory-Strategie (Elektronisches Medikamenten-Management und Elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien
---
Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz
<Meilensteine>
Universitätsspital Basel (USB)
Kantonsspital Baselland (KSBL)
Kantonsspital Winterthur (KSW)
Kantonsspital Wil (SRFT)
Hausarztpraxis in Winterthur
---
Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)
Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)
`}
                            />
                         </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);
