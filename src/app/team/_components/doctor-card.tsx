'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { DoctorData } from '@/app/admin/dashboard/team/doctors/_components/editable-doctor-card';
import { WithId } from '@/firebase';


export type Doctor = WithId<DoctorData>;

const ContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const sanitizedHtml = useMemo(() => {
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
    additionalInfoType,
    additionalInfoText,
    additionalInfoLogo,
    vita,
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
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={`Portrait von ${name}`}
                                        data-ai-hint={imageHint}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                                        <span className="text-sm text-muted-foreground">Kein Bild</span>
                                    </div>
                                )}
                            </div>
                            <div className="col-span-2">
                                <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                    {title && <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">{title}</p>}
                                    <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                                      {name}
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                                        <p className="font-bold">{specialty}</p>
                                        {qualifications?.filter(q => q).map((q, i) => <p key={i}>{q}</p>)}
                                    </div>
                                    
                                    {additionalInfoType === 'logo' && additionalInfoLogo ? (
                                        <div className="relative mt-[2.5cqw] w-[30cqw] aspect-[3/1]">
                                            <Image
                                                src={additionalInfoLogo}
                                                alt="Partner Logo"
                                                fill
                                                className="object-contain"
                                                data-ai-hint="partner logo"
                                            />
                                        </div>
                                    ) : additionalInfoType === 'text' && additionalInfoText ? (
                                        <p className="mt-[2.5cqw] text-[clamp(0.6rem,1.6cqw,1rem)] italic">
                                            {additionalInfoText}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                 <ContentRenderer content={vita} />
            </div>
        </div>
    );
};
