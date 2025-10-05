import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardRosenov = () => (
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
                </CardContent>
                <div className="absolute inset-0 flex translate-y-full flex-col items-start justify-center overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                    <ul className="space-y-1.5 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                        <li className="font-bold text-primary mb-4">FACHGEBIETE</li>
                        <li className="mb-2">Spezialist für Arterien-, Venen- und Lymphgefässerkrankungen</li>
                        <li className="mb-4">Behandlung von Thrombosen, Krampfadern, „offenen Beinen“, Schaufensterkrankheit, Aneurysmen, diabetischem Fusssyndrom, Lymphödemen und Erektionsstörungen.</li>
                        
                        <li className="font-bold text-primary mt-6 mb-4">SPRACHEN</li>
                        <li className="mb-4">Deutsch, Englisch, Bulgarisch, Russisch, Grundkenntnisse in Französisch und Italienisch</li>

                        <li className="font-bold text-primary mt-6 mb-4">WERDEGANG</li>
                        <li className="mb-2">Medizinstudium an der Medizinischen Universität Varna, Bulgarien</li>
                        <li className="mb-2">Weiterbildung zum Facharzt für Angiologie in Deutschland und der Schweiz (Universitätsspital Zürich, Kantonsspital Winterthur)</li>
                        <li className="mb-4">Oberarzt Angiologie am Kantonsspital Winterthur und Lehrtätigkeit an der Universität Zürich</li>
                    </ul>
                </div>
            </Card>
        </div>
    </div>
);
