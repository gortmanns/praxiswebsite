import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { VitaRenderer } from '@/app/admin/dashboard/team/doctors/_components/vita-renderer';

const vita = `[fett][blau]Medizinstudium & frühe Karriere[/blau][/fett]
[liste]Medizinstudium in Bonn (Deutschland) und Hobart (Australien)[/liste]
[liste]Masterstudium Public Health und Health Management in Sydney (Australien)[/liste]
[liste]Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor[/liste]
[linie]
[fett][blau]Projektmanagement im Gesundheitswesen[/blau][/fett]
[klein][grau]Wichtige Meilensteine[/grau][/klein]
[liste]Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)[/liste]
[liste]Manager für Klinische Sicherheit bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien[/liste]
[liste]Direktor der Memory-Strategie für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien[/liste]
[linie]
[fett][blau]Weiterbildung & Lehre[/blau][/fett]
[klein][grau]Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz[/grau][/klein]
[liste]Universitätsspital Basel (USB)[/liste]
[liste]Kantonsspital Baselland (KSBL)[/liste]
[liste]Kantonsspital Winterthur (KSW)[/liste]
[liste]Kantonsspital Wil (SRFT)[/liste]
[liste]Hausarztpraxis in Winterthur[/liste]
[break]
[liste]Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)[/liste]
[liste]Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)[/liste]
`;

export const DoctorCardOrtmanns = () => (
    <div 
        className="mx-auto max-w-7xl" 
    >
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
                                <Image
                                    src="/images/team/Ortmanns.jpg"
                                    alt="Portrait von G. Ortmanns"
                                    data-ai-hint="doctor portrait"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                    <p className="text-[2.2cqw] text-primary">Dipl. med.</p>
                                    <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                                    G. Ortmanns
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                                        <p className="font-bold">Praktischer Arzt</p>
                                        <p>Master of Public Health (UNSW)</p>
                                        <p>Master of Health Management (UNSW)</p>
                                    </div>
                                    <p className="mt-[2.5cqw] text-[1.6cqw] italic">
                                        <span className="whitespace-nowrap">Medizinische und Administrative Leitung</span>{' '}
                                        <span className="whitespace-nowrap">Praxiszentrum im Ring</span>{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Rechte Spalte: Vita */}
                    <div className="relative bg-accent/95 p-6 text-left text-background">
                         <div className="h-full overflow-y-auto text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                            <VitaRenderer text={vita} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);
