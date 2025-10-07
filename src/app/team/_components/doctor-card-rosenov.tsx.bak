
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

/* START RESTORE BLOCK 2024-05-24-A -- Reverting to original card content and structure as per user request. */
export const DoctorCardRosenov = () => (
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
                    <div>
                        <h5 className="font-bold uppercase text-primary">Vita / Lebenslauf</h5>
                    </div>
                    <hr className="my-3 border-t border-background/20" />
                    <div>
                        <h5 className="font-bold text-primary">FACHGEBIETE</h5>
                        <ul className="mt-2 list-disc space-y-1 pl-6">
                            <li>Spezialist für Arterien-, Venen- und Lymphgefässerkrankungen</li>
                            <li>Behandlung von Thrombosen, Krampfadern, „offenen Beinen“, Schaufensterkrankheit, Aneurysmen, diabetischem Fusssyndrom, Lymphödemen und Erektionsstörungen.</li>
                        </ul>
                    </div>
                     <div>
                        <h5 className="pt-4 font-bold text-primary">SPRACHEN</h5>
                        <ul className="mt-2 list-disc space-y-1 pl-6">
                            <li>Deutsch, Englisch, Bulgarisch, Russisch, Grundkenntnisse in Französisch und Italienisch</li>
                        </ul>
                    </div>
                     <div>
                        <h5 className="pt-4 font-bold text-primary">WERDEGANG</h5>
                        <ul className="mt-2 list-disc space-y-1 pl-6">
                            <li>Medizinstudium an der Medizinischen Universität Varna, Bulgarien</li>
                            <li>Weiterbildung zum Facharzt für Angiologie in Deutschland und der Schweiz (Universitätsspital Zürich, Kantonsspital Winterthur)</li>
                            <li>Oberarzt Angiologie am Kantonsspital Winterthur und Lehrtätigkeit an der Universität Zürich</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);
/* END RESTORE BLOCK 2024-05-24-A */
