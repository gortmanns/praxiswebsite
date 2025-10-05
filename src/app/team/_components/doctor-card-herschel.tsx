import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export const DoctorCardHerschel = () => (
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
                                <div className="relative h-[10cqw] w-[30cqw] mt-[1.1cqw]">
                                  <OrthozentrumLogo className="h-full w-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="absolute inset-0 flex flex-col items-start justify-center overflow-auto bg-accent p-6 text-left text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ul className="space-y-1.5 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                        <li className="font-bold text-primary mb-4">Weitere Informationen folgen in Kürze.</li>
                    </ul>
                </div>
            </Card>
        </div>
    </div>
);
{/*
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export const DoctorCardHerschel = () => (
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
                                <div className="relative h-[10cqw] w-[30cqw]">
                                  <OrthozentrumLogo className="h-full w-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="absolute inset-0 flex flex-col items-start justify-center overflow-auto bg-accent p-6 text-left text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ul className="space-y-1.5 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                        <li className="font-bold text-primary mb-4">Weitere Informationen folgen in Kürze.</li>
                    </ul>
                </div>
            </Card>
        </div>
    </div>
);
*/}
