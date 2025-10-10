
'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import DOMPurify from 'dompurify';
import React from 'react';
import { User } from 'lucide-react';
import {
    AgnieszkaSlezakLogo,
    OrthozentrumLogo,
    SchemmerWorniLogo,
    VascAllianceLogo
} from '@/components/logos';
import { cn } from '@/lib/utils';

export interface Doctor {
    id: string;
    title: string;
    name: string;
    imageUrl: string;
    imageHint: string;
    specialty: string;
    qualifications: string[];
    vita: string;
    additionalInfo?: string;
    partnerLogoComponent?: 'OrthozentrumLogo' | 'AgnieszkaSlezakLogo' | 'VascAllianceLogo' | 'SchemmerWorniLogo';
    order: number;
}


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

const partnerLogos = {
  OrthozentrumLogo,
  AgnieszkaSlezakLogo,
  VascAllianceLogo,
  SchemmerWorniLogo,
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
    partnerLogoComponent,
}) => {
    const LogoComponent = partnerLogoComponent ? partnerLogos[partnerLogoComponent] : null;

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
                                        <p className="font-bold">{specialty}</p>
                                        {qualifications.map((q, i) => <p key={i}>{q}</p>)}
                                    </div>
                                    
                                    {additionalInfo && !LogoComponent && (
                                        <p className="mt-[2.5cqw] text-[clamp(0.6rem,1.6cqw,1rem)] italic">
                                            {additionalInfo}
                                        </p>
                                    )}
                                    
                                    {LogoComponent && (
                                        <div className="relative mt-[2.5cqw] flex w-fit justify-start">
                                            <LogoComponent className={cn(
                                              "h-auto w-full",
                                              name === "A. Slezak" ? "max-w-[200px]" : "max-w-[240px]"
                                            )} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flip-card-back absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                 <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary">
                    <VitaRenderer html={vita} />
                 </div>
            </div>
        </div>
    );
};
