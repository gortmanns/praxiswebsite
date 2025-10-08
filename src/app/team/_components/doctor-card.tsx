
'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';
import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';


export interface Doctor {
    id: string;
    title: string;
    name: string;
    imageUrl: string;
    imageHint: string;
    specialty: string;
    qualifications?: string[];
    additionalInfo?: string;
    partnerLogo?: 'schemmer-worni' | 'vasc-alliance' | 'orthozentrum' | 'slezak';
    backsideContent: string;
}

const PartnerLogo: React.FC<{ logo?: Doctor['partnerLogo'] }> = ({ logo }) => {
    if (!logo) return null;

    switch (logo) {
        case 'schemmer-worni':
            return (
                <div className="relative mt-[2.5cqw] h-[10cqw] w-[30cqw]">
                    <Image
                        src="/images/schemmer-worni-logo.png"
                        alt="Schemmer & Worni Logo"
                        width={300}
                        height={100}
                        className="object-contain"
                        data-ai-hint="partner logo"
                    />
                </div>
            );
        case 'vasc-alliance':
            return (
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
            );
        case 'orthozentrum':
             return (
                <div className="relative mt-8 h-[10cqw] w-[30cqw]">
                    <OrthozentrumLogo className="h-full w-auto" />
                </div>
            );
        case 'slezak':
             return (
                <div className="relative mt-8 h-[10cqw] w-[30cqw]">
                    <AgnieszkaSlezakLogo className="h-full w-auto" />
                </div>
            );
        default:
            return null;
    }
};

const ContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const sanitizedHtml = useMemo(() => {
    // Ensure DOMPurify only runs on the client
    if (typeof window !== 'undefined') {
      return { __html: DOMPurify.sanitize(content) };
    }
    return { __html: '' };
  }, [content]);

  return (
    <div
      className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col prose prose-sm prose-invert max-w-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary"
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
    additionalInfo,
    partnerLogo,
    backsideContent
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
                                    {title && <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">{title}</p>}
                                    <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                                      {name}
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                                        <p className="font-bold">{specialty}</p>
                                        {qualifications?.map((q, i) => <p key={i}>{q}</p>)}
                                    </div>
                                    {partnerLogo ? (
                                        <PartnerLogo logo={partnerLogo} />
                                    ) : additionalInfo && (
                                        <p className="mt-[2.5cqw] text-[clamp(0.6rem,1.6cqw,1rem)] italic">
                                            {additionalInfo}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                 <ContentRenderer content={backsideContent} />
            </div>
        </div>
    );
};
