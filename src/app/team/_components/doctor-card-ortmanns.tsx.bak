
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardOrtmanns = () => {
    const backsideContent = (
        <div className="space-y-4 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
            <div>
                <h5 className="font-bold text-primary">Medizinstudium & frühe Karriere</h5>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                    <li>Medizinstudium in Bonn (Deutschland) und Hobart (Australien)</li>
                    <li>Masterstudium Public Health und Health Management in Sydney (Australien)</li>
                    <li>Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor</li>
                </ul>
            </div>
            <hr className="my-3 border-t border-background/20" />
            <div>
                <h5 className="font-bold text-primary">Projektmanagement im Gesundheitswesen</h5>
                <p className="text-xs text-background/80">Wichtige Meilensteine</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                    <li>Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)</li>
                    <li>Manager für Klinische Sicherheit bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</li>
                    <li>Direktor der Memory-Strategie für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</li>
                </ul>
            </div>
            <hr className="my-3 border-t border-background/20" />
            <div>
                <h5 className="font-bold text-primary">Weiterbildung & Lehre</h5>
                <p className="text-xs text-background/80">Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                    <li>Universitätsspital Basel (USB)</li>
                    <li>Kantonsspital Baselland (KSBL)</li>
                    <li>Kantonsspital Winterthur (KSW)</li>
                    <li>Kantonsspital Wil (SRFT)</li>
                    <li>Hausarztpraxis in Winterthur</li>
                </ul>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                    <li>Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)</li>
                    <li>Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)</li>
                </ul>
            </div>
        </div>
    );
    
    return (
        <div className="mx-auto max-w-7xl group">
            <Card className="relative w-full overflow-hidden">
                {/* Vorderseite */}
                <CardContent className="p-0">
                    <div className="grid h-full grid-cols-1 md:grid-cols-2">
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
                        <div className="hidden h-[490px] items-center justify-center bg-accent/95 p-6 text-left text-background md:flex">
                            <p className="text-center text-lg">
                               Klicken Sie auf die Karte, um mehr zu erfahren.
                            </p>
                        </div>
                    </div>
                </CardContent>
                
                {/* Rückseite (Slide-Over) */}
                <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-500 group-hover:translate-y-0">
                     <div className="w-full">
                        {backsideContent}
                    </div>
                </div>
            </Card>
        </div>
    );
};
