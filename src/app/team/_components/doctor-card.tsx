
'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import DOMPurify from 'dompurify';
import React from 'react';
import { User } from 'lucide-react';

export interface Doctor {
    id: string;
    order: number;
    title: string;
    name: string;
    imageUrl: string;
    imageHint: string;
    specialty: string | React.ReactNode;
    qualifications: string[];
    vita: string;
    additionalInfo?: string;
    partnerLogoComponent?: React.FC<{className?: string}> | string;
    children?: React.ReactNode;
}


const VitaRenderer: React.FC<{ html: string }> = ({ html }) => {
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const config = {
                ADD_ATTR: ['style'], // Allow style attributes
            };
            return { __html: DOMPurify.sanitize(html, config) };
        }
        return { __html: '' };
    }, [html]);


    return (
        <div
            className="vita-content"
            dangerouslySetInnerHTML={sanitizedHtml}
        />
    );
};


export const DoctorCard: React.FC<Doctor> = ({
    title,
    name,
    imageUrl,
    imageHint,
    specialty,
    qualifications,
    vita,
    additionalInfo,
    partnerLogoComponent: LogoComponent,
    children
}) => {

    return (
        <div className="group relative w-full max-w-[1000px] overflow-hidden rounded-lg shadow-sm">
            <Card className="w-full overflow-hidden">
                <CardContent className="p-0">
                    <div 
                        className="relative w-full bg-card aspect-[1000/495]"
                        style={{ 'containerType': 'inline-size' } as React.CSSProperties}
                    >
                        <div className="grid h-full grid-cols-3 items-stretch gap-[4.5%] p-6">
                            <div className="relative col-span-1 w-full overflow-hidden rounded-md">
                                <div className="relative h-full w-full aspect-[2/3]">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={`Portrait von ${name}`}
                                            data-ai-hint={imageHint}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-muted">
                                            <User className="h-1/2 w-1/2 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <div className="text-left text-foreground/80">
                                    <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">{title}</p>
                                    <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                                      {name}
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                                        <div className="font-bold">{specialty}</div>
                                        {qualifications.map((q, i) => <p key={i}>{q}</p>)}
                                    </div>
                                    
                                     <div className="mt-[2.5cqw]">
                                        {children ? (
                                            <div className="relative flex h-auto max-h-28 w-full max-w-[400px] items-center justify-start">
                                                {children}
                                            </div>
                                        ) : LogoComponent ? (
                                             <div className="relative flex h-auto max-h-28 w-full max-w-[400px] items-center justify-start">
                                                {typeof LogoComponent === 'function' ? (
                                                    <LogoComponent className="h-full w-full object-contain object-left" />
                                                ) : typeof LogoComponent === 'string' && (LogoComponent.startsWith('/images') || LogoComponent.startsWith('data:image')) ? (
                                                    <Image src={LogoComponent} alt="Partner Logo" width={400} height={100} className="h-auto w-full object-contain object-left" />
                                                ) : null}
                                             </div>
                                        ) : additionalInfo ? (
                                            <p className="text-[clamp(0.6rem,1.6cqw,1rem)] italic">
                                                {additionalInfo}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flip-card-back absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                 <div className="h-full overflow-y-auto flex w-full flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary">
                    <VitaRenderer html={vita} />
                 </div>
            </div>
        </div>
    );
};
