import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardSlezak = () => (
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
                                    src="/images/team/Dr.Slezak.jpg"
                                    alt="Portrait von Dr. Slezak"
                                    data-ai-hint="doctor portrait"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                    <p className="text-[2.2cqw] text-primary">Dr. med.</p>
                                    <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                                    A. Slezak
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                                        <p className="font-bold">Fachärztin für Neurologie</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Rechte Spalte: Vita */}
                    <div className="flex flex-col items-start justify-start overflow-auto bg-accent/95 p-6 text-left text-background">
                         <h3 className="mb-4 font-bold text-primary">Leistungsspektrum</h3>
                         <div className="text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                            <ul className="space-y-1.5">
                                <li className="font-bold text-primary">SPEZIALGEBIETE</li>
                                <li>Allgemeine Neurologie</li>
                                <li>Vaskuläre Erkrankungen</li>
                                <li>Epilepsie</li>
                                <li>Bewegungsstörungen (Schwerpunkt Parkinson-Syndrome)</li>
                                <li>Kopfschmerzen und Migräne</li>
                                <li>Neurorehabilitation</li>
                                <li>&nbsp;</li>
                                <li className="text-[clamp(0.7rem,2.3cqw,1rem)]">
                                    Viele Untersuchungen können direkt hier im <span className="whitespace-nowrap">Praxiszentrum im Ring</span> durchgeführt werden.
                                </li>
                                <li>&nbsp;</li>
                                <li className="text-[clamp(0.7rem,2.3cqw,1rem)]">
                                    Wenn spezielle Untersuchungen wie z. B. die Bestimmung der Nervenleitgeschwindigkeit Geräte erfordern, die hier im <span className="whitespace-nowrap">Praxiszentrum</span> nicht zur Verfügung stehen, dann finden diese in den Räumlichkeiten an der Thunstrasse 95 in Bern statt.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);