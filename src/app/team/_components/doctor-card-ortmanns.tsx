import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

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
                    <div className="flex flex-col items-start justify-start overflow-auto bg-accent/95 p-6 text-left text-background">
                         <div className="w-full text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                            <p className="min-h-[1.2em]"><span className="text-primary"><span className="font-bold">Medizinstudium &amp; frühe Karriere</span></span></p><p className="min-h-[1.2em]"><span className="text-background">Medizinstudium in Bonn (Deutschland) und Hobart (Australien)</span></p><p className="min-h-[1.2em]"><span className="text-background">Masterstudium Public Health und Health Management in Sydney (Australien)</span></p><p className="min-h-[1.2em]"><span className="text-background">Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor</span></p><hr className="my-4 border-t border-background/20" /><p className="min-h-[1.2em]"><span className="text-primary"><span className="font-bold">Projektmanagement im Gesundheitswesen</span></span></p><p className="min-h-[1.2em]"><span className="text-background/80"><span className="font-bold"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Wichtige Meilensteine</span></span></span></p><li className="list-disc ml-5 pl-2"><span className="text-background/80"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)</span></span></li><li className="list-disc ml-5 pl-2"><span className="text-background/80"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Manager für Klinische Sicherheit bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</span></span></li><li className="list-disc ml-5 pl-2"><span className="text-background/80"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Direktor der Memory-Strategie für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</span></span></li><hr className="my-4 border-t border-background/20" /><p className="min-h-[1.2em]"><span className="text-primary"><span className="font-bold">Weiterbildung &amp; Lehre</span></span></p><p className="min-h-[1.2em]"><span className="text-background/80"><span className="font-bold"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz</span></span></span></p><li className="list-disc ml-5 pl-2"><span className="text-background/80"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Universitätsspital Basel (USB)</span></span></li><li className="list-disc ml-5 pl-2"><span className="text-background/80"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Kantonsspital Baselland (KSBL)</span></span></li><li className="list-disc ml-5 pl-2"><span className="text-background/80"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Kantonsspital Winterthur (KSW)</span></span></li><li className="list-disc ml-5 pl-2"><span className="text-background/80"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Kantonsspital Wil (SRFT)</span></span></li><li className="list-disc ml-5 pl-2"><span className="text-background/80"><span className="text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug">Hausarztpraxis in Winterthur</span></span></li><div className="h-[0.5em]"></div><p className="min-h-[1.2em]"><span className="text-background">Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)</span></p><p className="min-h-[1.2em]"><span className="text-background">Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)</span></p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);

    