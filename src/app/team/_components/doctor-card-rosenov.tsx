
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardRosenov = () => {
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
                                src="/images/team/Dr.Rosenov.jpg"
                                alt="Portrait von Dr. Rosenov"
                                data-ai-hint="doctor portrait"
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">Dr. med.</p>
                                <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                                A. Rosenov
                                </h4>
                                <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight">
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
            </CardContent>
        </Card>
    );
};
