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
                         <div className="w-full text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight whitespace-pre-wrap">
                            <h4 className="font-bold text-primary mb-2">Medizinstudium &amp; frühe Karriere</h4>
                            <p>Medizinstudium in Bonn (Deutschland) und Hobart (Australien)</p>
                            <p>Masterstudium Public Health und Health Management in Sydney (Australien)</p>
                            <p>Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor</p>
                            <div className="my-4 border-t border-background/20"></div>
                            <h4 className="font-bold text-primary mb-2">Projektmanagement im Gesundheitswesen</h4>
                            <div className="mt-1 pl-4 text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug text-background/80">
                                <h5 className="mb-1 tracking-wide text-background/90">Wichtige Meilensteine</h5>
                                <ul className="list-disc space-y-px pl-5 font-normal">
                                    <li>Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)</li>
                                    <li>Manager für Klinische Sicherheit bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</li>
                                    <li>Direktor der Memory-Strategie für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</li>
                                </ul>
                            </div>
                            <div className="my-4 border-t border-background/20"></div>
                            <h4 className="font-bold text-primary mb-2">Weiterbildung &amp; Lehre</h4>
                             <div className="mt-1 pl-4 text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug text-background/80">
                                <h5 className="mb-1 tracking-wide text-background/90">Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz</h5>
                                <ul className="list-disc space-y-px pl-5 font-normal">
                                    <li>Universitätsspital Basel (USB)</li>
                                    <li>Kantonsspital Baselland (KSBL)</li>
                                    <li>Kantonsspital Winterthur (KSW)</li>
                                    <li>Kantonsspital Wil (SRFT)</li>
                                    <li>Hausarztpraxis in Winterthur</li>
                                </ul>
                            </div>
                            <p className="mt-2">Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)</p>
                            <p>Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);
