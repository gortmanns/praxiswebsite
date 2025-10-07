
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardRosenov = () => {
    const backsideContent = (
        <>
            <p>
                In enger Kooperation mit der <span className="font-bold">VASC-ALLIANCE</span>, einem Zusammenschluss von Spezialisten im Bereich der Gefässmedizin, bieten wir Ihnen eine umfassende Versorgung bei Gefässerkrankungen.
            </p>
            <br />
            <p>
                Herr Dr. med. A. Rosenov führt regelmässig Sprechstunden in unseren Räumlichkeiten durch, sodass auch Patienten mit komplexen Gefässerkrankungen eine wohnortnahe Betreuung auf höchstem Niveau erhalten.
            </p>
            <br />
            <p className="font-bold text-primary">Untersuchungsmethoden</p>
            <hr className="my-2 border-t border-background/20" />
            <ul className="list-disc space-y-1 pl-4 text-left">
                <li>Farbcodierte Duplexsonographie (Ultraschall) der Arterien und Venen</li>
                <li>Oszillographie/Photoplethysmographie</li>
                <li>Knöchel-Arm-Druck-Index</li>
            </ul>
        </>
    );

    return (
        <div className="mx-auto max-w-7xl">
            <Card className="group relative w-full overflow-hidden">
                <CardContent className="p-0">
                    {/* VORDERSEITE */}
                    <div
                        className="relative w-full bg-card"
                        style={{ 'containerType': 'inline-size', aspectRatio: '1000 / 495' } as React.CSSProperties}
                    >
                        <div className="grid h-full grid-cols-3 items-center gap-[4.5%] p-6">
                            <div className="relative col-span-1 h-full w-full">
                                <Image
                                    src="/images/team/Dr.Rosenov.jpg"
                                    alt="Portrait von Dr. Rosenov"
                                    data-ai-hint="doctor portrait"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                    <p className="text-[2.2cqw] text-primary">Dr. med.</p>
                                    <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                                    A. Rosenov
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                                        <p className="font-bold">Facharzt für Angiologie</p>
                                    </div>
                                    <div className="relative h-[10cqw] w-[30cqw]">
                                        <Image
                                        src="/images/VASC-Alliance-Logo.png"
                                        alt="VASC Alliance Logo"
                                        width={381}
                                        height={127}
                                        className="object-contain"
                                        data-ai-hint="partner logo"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* RÜCKSEITE */}
                    <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-center overflow-auto bg-accent/95 p-6 text-center text-background transition-all duration-1000 group-hover:translate-y-0">
                        <div className="text-[clamp(0.8rem,2.5cqw,1.1rem)] leading-tight">
                            {backsideContent}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
