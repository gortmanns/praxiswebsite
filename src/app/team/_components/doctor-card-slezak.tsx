import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardSlezak = () => (
    <div 
        className="mx-auto max-w-5xl" 
        style={{ 'containerType': 'inline-size' } as React.CSSProperties}
    >
        <div
            className="group relative w-full"
            style={{ aspectRatio: '1000 / 495' }}
        >
            <Card className="absolute inset-0 overflow-hidden">
                <CardContent className="h-full p-6 transition-opacity duration-300">
                    <div className="grid h-full grid-cols-3 items-center gap-[4.5%]">
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
                </CardContent>
                <div className="absolute inset-0 flex translate-y-full flex-col items-start justify-center overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                    <ul className="space-y-1.5 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                        <li className="font-bold text-primary">SPEZIALGEBIETE</li>
                        <li>Allgemeine Neurologie</li>
                        <li>Vaskuläre Erkrankungen</li>
                        <li>Epilepsie</li>
                        <li>Bewegungsstörungen (Schwerpunkt Parkinsonsyndrome)</li>
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
            </Card>
        </div>
    </div>
);
