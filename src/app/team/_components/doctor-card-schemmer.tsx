import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Doctor } from '@/app/team/_data/doctors';

export const DoctorCardSchemmer = ({ doctor }: { doctor: Doctor }) => (
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
                                src={doctor.imageUrl}
                                alt={`Portrait von ${doctor.name}`}
                                data-ai-hint="doctor portrait"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                <p className="text-[2.2cqw] text-primary">{doctor.title}</p>
                                <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                                {doctor.name}
                                </h4>
                                <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                                    {doctor.specialties.map((spec, index) => (
                                        <p key={index} className={index === 0 ? 'font-bold' : ''}>{spec}</p>
                                    ))}
                                </div>
                                <Image
                                    src="/images/schemmer-worni-logo.png"
                                    alt="Schemmer & Worni Logo"
                                    width={300}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="absolute inset-0 flex flex-col items-start justify-center overflow-auto bg-accent p-6 text-left text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ul className="space-y-1.5 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                        {doctor.cv.map((item, index) => {
                             if (item.isParagraph) {
                                return (
                                    <li key={index} className="flex font-medium text-background">
                                        <span className="mr-2">&#8226;</span>
                                        <span className='flex-1'>
                                            {item.point}
                                            {item.subPoints && (
                                                <ul className="list-disc space-y-px pl-9 pt-1 text-[clamp(0.7rem,2.3cqw,1rem)] font-normal text-background/80">
                                                    {item.subPoints.map((sub, subIndex) => (
                                                        <li key={subIndex}>{sub}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </span>
                                    </li>
                                );
                            }
                            return (
                                <li key={index} className={`font-bold text-primary ${item.isList ? 'mt-2' : ''}`}>
                                    {item.point}
                                    {item.subPoints && (
                                        <div className="mt-1 pl-9 text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug text-background/80">
                                            {item.subPointsTitle && (
                                                <h5 className="mb-1 tracking-wide text-background/90">
                                                    {item.subPointsTitle}
                                                </h5>
                                            )}
                                            <ul className="list-disc space-y-px pl-5 font-normal">
                                                {item.subPoints.map((sub, subIndex) => (
                                                    <li key={subIndex}>{sub}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Card>
        </div>
    </div>
);
