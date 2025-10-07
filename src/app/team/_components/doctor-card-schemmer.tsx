
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardSchemmer = () => {
    const backsideContent = (
        <>
            <p>
                In enger Kooperation mit der Praxis <span className="font-bold">Schemmer & Worni</span> in Bern bieten wir eine hochspezialisierte viszeralchirurgische Versorgung direkt in unseren Räumlichkeiten an.
            </p>
            <br />
            <p>
                Herr Prof. Dr. med. Dr. h. c. P. Schemmer führt mehrmals im Monat Sprechstunden und kleinere Eingriffe in unserem Praxiszentrum durch. So können wir auch für komplexe chirurgische Fragestellungen eine wohnortnahe Betreuung auf universitärem Niveau sicherstellen.
            </p>
            <br />
            <p className="font-bold text-primary">Leistungsspektrum im Praxiszentrum</p>
            <hr className="my-2 border-t border-background/20" />
            <ul className="list-disc space-y-1 pl-4 text-left">
                <li>Beratung und Zweitmeinung</li>
                <li>Kleinchirurgische Eingriffe in Lokalanästhesie</li>
                <li>Vorbereitung und Nachsorge für Operationen</li>
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
                                    src="/images/team/Prof.Schemmer.jpg"
                                    alt="Portrait von P. Schemmer"
                                    data-ai-hint="doctor portrait"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                    <p className="text-[2.2cqw] text-primary">Prof. Dr. med. Dr. h. c.</p>
                                    <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                                    P. Schemmer
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                                        <p className="font-bold">Facharzt für Allgemein- und Viszeralchirurgie</p>
                                    </div>
                                    <div className="relative mt-[2.5cqw] h-[10cqw] w-[30cqw]">
                                        <Image
                                        src="/images/schemmer-worni-logo.png"
                                        alt="Schemmer & Worni Logo"
                                        width={300}
                                        height={100}
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
