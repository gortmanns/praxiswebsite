
'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import DOMPurify from 'dompurify';
import React from 'react';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';

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

const PartnerLogo: React.FC<{ logo?: Doctor['partnerLogoComponent'] }> = ({ logo }) => {
    if (!logo) return null;

    switch (logo) {
        case 'OrthozentrumLogo':
            return <OrthozentrumLogo className="h-28 w-auto" />;
        case 'AgnieszkaSlezakLogo':
            return <AgnieszkaSlezakLogo className="h-28 w-auto" />;
        case 'VascAllianceLogo':
             return (
                <div className="relative h-24 w-[400px]">
                    <Image
                        src="/images/VASC-Alliance-Logo.png"
                        alt="VASC Alliance Logo"
                        fill
                        className="object-contain"
                        data-ai-hint="partner logo"
                    />
                </div>
            );
        case 'SchemmerWorniLogo':
            return (
                <Image
                    src="/images/schemmer-worni-logo.png"
                    alt="Schemmer & Worni Logo"
                    width={390}
                    height={130}
                    className="h-auto w-full max-w-[300px] object-contain"
                    data-ai-hint="partner logo"
                />
            );
        default:
            return null;
    }
};

export const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
    const {
        title,
        name,
        imageUrl,
        imageHint,
        specialty,
        qualifications,
        vita,
        additionalInfo,
        partnerLogoComponent,
    } = doctor;

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
                                    
                                    {partnerLogoComponent && (
                                        <div className="relative mt-[2.5cqw] flex w-fit justify-start">
                                            <PartnerLogo logo={partnerLogoComponent} />
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
