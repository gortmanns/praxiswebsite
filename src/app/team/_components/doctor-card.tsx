'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import DOMPurify from 'dompurify';
import React from 'react';

const VitaRenderer: React.FC<{ html: string }> = ({ html }) => {
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
        return { __html: DOMPurify.sanitize(html) };
        }
        return { __html: '' };
    }, [html]);

    return (
        <div
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={sanitizedHtml}
        />
    );
};

interface DoctorCardProps {
    title: string;
    name: string;
    imageUrl: string;
    imageHint: string;
    specialty: React.ReactNode;
    qualifications: string[];
    vita: string;
    additionalInfo?: string;
    children?: React.ReactNode;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
    title,
    name,
    imageUrl,
    imageHint,
    specialty,
    qualifications,
    vita,
    additionalInfo,
    children,
}) => {
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
                                    src={imageUrl}
                                    alt={`Portrait von ${name}`}
                                    data-ai-hint={imageHint}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                    <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">{title}</p>
                                    <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                                      {name}
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                                        <p className="font-bold">{specialty}</p>
                                        {qualifications.map((q, i) => <p key={i}>{q}</p>)}
                                    </div>
                                    
                                    {additionalInfo && (
                                        <p className="mt-[2.5cqw] text-[clamp(0.6rem,1.6cqw,1rem)] italic">
                                            {additionalInfo}
                                        </p>
                                    )}
                                    
                                    {children && (
                                        <div className="relative mt-[2.5cqw] flex w-fit justify-start">
                                            {children}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                 <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary">
                    <VitaRenderer html={vita} />
                 </div>
            </div>
        </div>
    );
};
