import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import { VitaRenderer } from '@/app/admin/dashboard/team/doctors/_components/vita-renderer';

const vita = `[fett][blau]SPEZIALGEBIETE[/blau][/fett]
[liste]Allgemeine Orthopädie[/liste]
[liste]Spezialgebiet Hüft- und Kniegelenke[/liste]
[break]
[fett][blau]LEISTUNGEN VOR ORT[/blau][/fett]
[liste]Röntgenuntersuchungen, Konsultationen und klinische Untersuchungen finden direkt im <span class="whitespace-nowrap">Praxiszentrum im Ring</span> statt.[/liste]
[liste]Auch Gelenkinfiltrationen, z. B. bei Schmerzen, können zum Teil direkt vor Ort durchgeführt werden.[/liste]
[break]
[fett][blau]OPERATIONEN[/blau][/fett]
[liste]Allenfalls nötige Operationen werden im gut erreichbaren Lindenhof-Spital durchgeführt.[/liste]
`;

export const DoctorCardHerschel = () => (
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
                    {/* Rechte Spalte: Vita */}
                    <div className="relative bg-accent/95 p-6 text-left text-background">
                         <div className="h-full overflow-y-auto text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                            <VitaRenderer text={vita} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);
