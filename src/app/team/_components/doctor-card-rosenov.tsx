
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardRosenov = () => {
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
                        <div className="bg-accent/95 p-6 text-left text-background">
                            <div className="h-full overflow-y-auto text-[clamp(0.8rem,2.5cqw,1.1rem)] leading-tight">
                                <div className="flex w-full flex-col space-y-4">
                                    <p className="font-bold text-primary">UNTERSUCHUNGEN DER VENEN, ARTERIEN UND LYMPHGEFÄSSE</p>
                                    <p className="font-bold text-primary">ABKLÄRUNG VON EREKTIONSSTÖRUNGEN</p>
                                    <p>Viele Untersuchungen und Abklärungen können direkt im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> durchgeführt werden.</p>
                                    <p>Sind zusätzliche Spezialuntersuchungen oder weiterführende Eingriffe nötig, die mit den Geräten im Praxiszentrum nicht durchführbar sind, wird ein Folgetermin in den Räumlichkeiten der VASC ALLIANCE am Beau-site Spital in Bern vereinbart.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
