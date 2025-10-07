
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardSlezak = () => {
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
                         {/* RÜCKSEITE */}
                         <div className="bg-accent/95 p-6 text-left text-background">
                            <div className="h-full overflow-y-auto text-[clamp(0.8rem,2.5cqw,1.1rem)] leading-tight">
                                <div className="flex w-full flex-col space-y-4">
                                    <p className="font-bold text-primary">ALLGEMEINE NEUROLOGIE</p>
                                    <p className="font-bold text-primary">VASKULÄRE ERKRANKUNGEN</p>
                                    <p className="font-bold text-primary">EPILEPSIE</p>
                                    <p className="font-bold text-primary">BEWEGUNGSSTÖRUNGEN <span className="font-bold text-primary">(Schwerpunkt Parkinsonsyndrome)</span></p>
                                    <p className="font-bold text-primary">KOPFSCHMERZEN UND MIGRÄNE</p>
                                    <p className="font-bold text-primary">NEUROREHABILITATION</p>
                                    
                                    <div className="space-y-4 pt-4">
                                        <p>Viele Untersuchungen können direkt im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> durchgeführt werden.</p>
                                        <p>Wenn spezielle Untersuchungen wie z. B. die Bestimmung der Nervenleitgeschwindigkeit Geräte erfordern, die im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> nicht zur Verfügung stehen, dann finden diese in den Räumlichkeiten an der Thunstrasse 95 in Bern statt.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
