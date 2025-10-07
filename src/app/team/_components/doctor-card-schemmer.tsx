import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { VitaRenderer } from '@/app/admin/dashboard/team/doctors/_components/vita-renderer';

const vita = `[fett][blau]LEISTUNGSSPEKTRUM[/blau][/fett]
[linie]
[klein][grau]KLEINCHIRURGISCHE EINGRIFFE KÖNNEN DIREKT VOR ORT IM PRAXISZENTRUM IM RING ERFOLGEN[/grau][/klein]
[break]
[klein][grau]GROSSE CHIRURGISCHE EINGRIFFE WERDEN IN ENGER KOOPERATION ZWISCHEN CHIRURG UND HAUSARZT DURCHGEFÜHRT[/grau][/klein]
[break]
[liste]Die Vorbesprechung und Planung des Eingriffs erfolgen im PRAXISZENTRUM IM RING.[/liste]
[liste]Allenfalls notwendige Abklärungen vor dem Eingriff finden ebenfalls im Praxiszentrum statt oder – falls nötig – per Überweisung an weitere Spezialisten.[/liste]
[liste]Die Operation selbst findet in einer der Partnerkliniken in der Stadt Bern statt.
    <ul class="list-disc space-y-px pl-9 pt-1 text-[clamp(0.7rem,2.3cqw,1rem)] font-normal text-background/80">
        <li>Hirslanden</li>
        <li>Lindehof-Spital</li>
        <li>Siloah-Spital</li>
    </ul>
[/liste]
[liste]Die Nachbetreuung (z. B. Fadenentfernung und Schmerzbehandlung) findet wieder vor Ort im PRAXISZENTRUM IM RING statt.[/liste]
`;


export const DoctorCardSchemmer = () => (
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
