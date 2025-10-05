{/*import Image from 'next/image';
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
                <CardContent className="h-full p-6 transition-opacity duration-300 group-hover:opacity-10">
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
                                P. Rosenov
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
                <div className="absolute inset-0 flex flex-col items-start justify-center overflow-auto bg-accent p-6 text-left text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ul className="space-y-1.5 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                        <li className="font-bold text-primary mb-4">UNTERSUCHUNGEN DER VENEN, ARTERIEN UND LYMPHGEFÄSSE</li>
                        <li className="font-bold text-primary mb-4">ABKLÄRUNG VON EREKTIONSSTÖRUNGEN</li>
                        <li className="mb-4">Viele Untersuchungen und Abklärungen können direkt hier im PRAXISZENTRUM IM RING durchgeführt werden.</li>
                        <li className="mb-4">Sind zusätzliche Spezialuntersuchungen oder weiterführende Eingriffe nötig, die mit den Geräten im Praxiszentrum nicht durchführbar sind, wird ein Folgetermin in den Räumlichkeiten der VASC ALLIANCE am Beau-site Spital in Bern vereinbart.</li>
                    </ul>
                </div>
            </Card>
        </div>
    </div>
);*/}
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
                <CardContent className="h-full p-6 transition-opacity duration-300 group-hover:opacity-10">
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
                <div className="absolute inset-0 flex flex-col items-start justify-center overflow-auto bg-accent p-6 text-left text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ul className="space-y-1.5 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                        <li className="font-bold text-primary mb-4">UNTERSUCHUNGEN DER VENEN, ARTERIEN UND LYMPHGEFÄSSE</li>
                        <li className="font-bold text-primary mb-4">ABKLÄRUNG VON EREKTIONSSTÖRUNGEN</li>
                        <li className="mb-4">Viele Untersuchungen und Abklärungen können direkt hier im PRAXISZENTRUM IM RING durchgeführt werden.</li>
                        <li className="mb-4">Sind zusätzliche Spezialuntersuchungen oder weiterführende Eingriffe nötig, die mit den Geräten im Praxiszentrum nicht durchführbar sind, wird ein Folgetermin in den Räumlichkeiten der VASC ALLIANCE am Beau-site Spital in Bern vereinbart.</li>
                    </ul>
                </div>
            </Card>
        </div>
    </div>
);