
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export const DoctorCardHerschel = () => {
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
                                        src="/images/team/Dr.Herschel.jpg"
                                        alt="Portrait von Dr. Herschel"
                                        data-ai-hint="doctor portrait"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                        <p className="text-[2.2cqw] text-primary">Dr. med.</p>
                                        <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                                        R. Herschel
                                        </h4>
                                        <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                                            <p className="font-bold">Facharzt für Orthopädische Chirurgie und Traumatologie des Bewegungsapparates</p>
                                        </div>
                                        <div className="relative mt-8 h-[10cqw] w-[30cqw]">
                                            <OrthozentrumLogo className="h-full w-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* RÜCKSEITE */}
                        <div className="bg-accent/95 p-6 text-left text-background">
                             <div className="h-full overflow-y-auto text-[clamp(0.8rem,2.5cqw,1.1rem)] leading-tight">
                                <div className="flex w-full flex-col space-y-4">
                                    <p className="font-bold text-primary">ALLGEMEINE ORTHOPÄDIE</p>
                                    <p className="font-bold text-primary">SPEZIALGEBIET HÜFT- UND KNIEGELENKE</p>
                                    <p>Röntgenuntersuchungen, Konsultationen und klinische Untersuchungen finden direkt im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> statt.</p>
                                    <p>Auch Gelenkinfiltrationen, z. B. bei Schmerzen, können zum Teil direkt vor Ort durchgeführt werden.</p>
                                    <p>Allenfalls nötige Operationen werden im gut erreichbaren Lindenhof-Spital durchgeführt.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
