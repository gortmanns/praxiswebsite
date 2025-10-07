
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const DoctorCardSlezak = () => {
    return (
        <div className="mx-auto max-w-7xl">
            <Card className="w-full overflow-hidden">
                {/* Vorderseite */}
                <CardContent className="p-0">
                    <div className="grid grid-cols-1">
                        <div
                            className="relative w-full bg-card"
                            style={{ 'containerType': 'inline-size', aspectRatio: '1000 / 495' } as React.CSSProperties}
                        >
                            <div className="grid h-full grid-cols-3 items-center gap-[4.5%] p-6">
                                <div className="relative col-span-1 h-full w-full">
                                    <Image
                                        src="/images/team/Dr.Slezak.jpg"
                                        alt="Portrait von Dr. Slezak"
                                        data-ai-hint="doctor portrait"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                        <p className="text-[2.2cqw] text-primary">Dr. med.</p>
                                        <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                                        A. Slezak
                                        </h4>
                                        <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                                            <p className="font-bold">Fachärztin für Neurologie</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
