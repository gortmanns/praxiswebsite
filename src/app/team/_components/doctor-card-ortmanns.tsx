
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface DoctorCardProps {
    backsideContent: React.ReactNode;
}

export const DoctorCardOrtmanns: React.FC<DoctorCardProps> = ({ backsideContent }) => {
    return (
        <div className="group relative w-full overflow-hidden rounded-lg shadow-sm">
            <Card className="w-full overflow-hidden">
                <CardContent className="p-0">
                    <div 
                        className="relative w-full bg-card"
                        style={{ 'containerType': 'inline-size' } as React.CSSProperties}
                    >
                        <div className="grid h-full grid-cols-3 items-center gap-[4.5%] p-6">
                            <div className="relative col-span-1 h-full w-full aspect-[2/3]">
                                <Image
                                    src="/images/team/Ortmanns.jpg"
                                    alt="Portrait von G. Ortmanns"
                                    data-ai-hint="doctor portrait"
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                    <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">Dipl. med.</p>
                                    <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                                    G. Ortmanns
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                                        <p className="font-bold">Praktischer Arzt</p>
                                        <p>Master of Public Health (UNSW)</p>
                                        <p>Master of Health Management (UNSW)</p>
                                    </div>
                                    <p className="mt-[2.5cqw] text-[clamp(0.6rem,1.6cqw,1rem)] italic">
                                        (Ärztliche und administrative Leitung) <span className="whitespace-nowrap">Praxiszentrum im Ring</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                {backsideContent}
            </div>
        </div>
    );
};
