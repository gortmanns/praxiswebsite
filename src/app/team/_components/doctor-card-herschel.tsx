import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export const DoctorCardHerschel = () => (
    <div 
        className="mx-auto max-w-7xl group/card"
        style={{ perspective: '1000px' }}
    >
        <Card 
            className="relative h-[490px] w-full overflow-hidden transition-transform duration-1000 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]"
        >
            {/* Vorderseite */}
            <CardContent 
                className="absolute h-full w-full p-0 [backface-visibility:hidden]"
            >
                <div className="grid h-full grid-cols-1 md:grid-cols-2">
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
                     <div className="hidden h-full items-center justify-center bg-accent/95 p-6 text-left text-background md:flex">
                        <p className="text-center text-lg">
                           Klicken Sie auf die Karte, um mehr zu erfahren.
                        </p>
                    </div>
                </div>
            </CardContent>
             {/* Rückseite */}
            <CardContent
                className="absolute h-full w-full overflow-y-auto bg-accent/95 p-6 text-left text-background [backface-visibility:hidden] [transform:rotateY(180deg)]"
            >
                 <div className="space-y-4 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                    <h5 className="font-bold text-primary">SPEZIALGEBIETE</h5>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>Allgemeine Orthopädie</li>
                        <li>Spezialgebiet Hüft- und Kniegelenke</li>
                    </ul>

                    <h5 className="pt-4 font-bold text-primary">LEISTUNGEN VOR ORT</h5>
                    <ul className="list-disc space-y-2 pl-6">
                       <li>Röntgenuntersuchungen, Konsultationen und klinische Untersuchungen finden direkt im <span className="whitespace-nowrap">Praxiszentrum im Ring</span> statt.</li>
                       <li>Auch Gelenkinfiltrationen, z. B. bei Schmerzen, können zum Teil direkt vor Ort durchgeführt werden.</li>
                    </ul>
                    
                    <h5 className="pt-4 font-bold text-primary">OPERATIONEN</h5>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>Allenfalls nötige Operationen werden im gut erreichbaren Lindenhof-Spital durchgeführt.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    </div>
);
