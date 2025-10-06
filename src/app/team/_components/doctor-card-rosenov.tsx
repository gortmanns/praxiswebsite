import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardRosenov = () => (
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
                    {/* Rechte Spalte: Vita */}
                    <div className="flex flex-col items-start justify-start overflow-auto bg-accent/95 p-6 text-left text-background">
                         <h3 className="mb-4 font-bold text-primary">Vita / Lebenslauf</h3>
                         <div className="text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                            <ul className="space-y-1.5">
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
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);