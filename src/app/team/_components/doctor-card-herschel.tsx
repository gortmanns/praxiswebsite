
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export const DoctorCardHerschel = () => {
    return (
        <Card className="w-full overflow-hidden">
            <CardContent className="p-0">
                <div 
                    className="relative w-full bg-card"
                    style={{ 'containerType': 'inline-size' } as React.CSSProperties}
                >
                    <div className="grid h-full grid-cols-3 items-center gap-[4.5%] p-6">
                        <div className="relative col-span-1 h-full w-full aspect-[2/3]">
                            <Image
                                src="/images/team/Dr.Herschel.jpg"
                                alt="Portrait von Dr. Herschel"
                                data-ai-hint="doctor portrait"
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">Dr. med.</p>
                                <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                                R. Herschel
                                </h4>
                                <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight">
                                    <p className="font-bold">Facharzt für Orthopädische Chirurgie und Traumatologie des Bewegungsapparates</p>
                                </div>
                                <div className="relative mt-8 h-[10cqw] w-[30cqw]">
                                    <OrthozentrumLogo className="h-full w-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
