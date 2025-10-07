
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardOrtmanns = () => {
    return (
        <div className="mx-auto max-w-7xl">
            <Card className="w-full overflow-hidden">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* VORDERSEITE */}
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
                                            (Ärztliche und administrative Leitung) <span className="whitespace-nowrap">Praxiszentrum im Ring</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* RÜCKSEITE */}
                        <div className="bg-accent/95 p-6 text-left text-background">
                            <div className="h-full overflow-y-auto text-[clamp(0.8rem,2.5cqw,1.1rem)] leading-tight">
                                <div className="flex w-full flex-col space-y-3">
                                    <p>Medizinstudium in Bonn und Hobart (Australien)</p>
                                    <p>Masterstudium Public Health und Health Management in Sydney (Australien)</p>
                                    
                                    <p>Projektmanagement im Gesundheitswesen in Europa und Australien</p>
                                    <div>
                                        <p>Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor</p>
                                        <ul className="flex list-disc flex-col pl-5 pt-1 text-sm text-background/80" style={{ gap: '0.15rem' }}>
                                            <li>Leiter Klinische Entwicklung und Analytik für DxCG Gesundheitsanalytik GmbH (Deutschland)</li>
                                            <li>Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</li>
                                            <li>Direktor der Memory-Strategie (elektronisches Medikamenten-Management und elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</li>
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <p>Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz:</p>
                                        <ul className="flex list-disc flex-col pl-5 pt-1 text-sm text-background/80" style={{ gap: '0.15rem' }}>
                                            <li>Universitätsspital Basel (USB)</li>
                                            <li>Kantonsspital Baselland (KSBL)</li>
                                            <li>Kantonsspital Winterthur (KSW)</li>
                                            <li>Kantonsspital Wil (SRFT)</li>
                                            <li>Hausarztpraxis in Winterthur</li>
                                        </ul>
                                    </div>
                                     <p>Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Klinik für Pneumologie)</p>
                                     <p>Leitung <span className="whitespace-nowrap">Praxiszentrum im Ring</span> (Ärztliche und administrative Leitung)</p>
                                     <p>Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
