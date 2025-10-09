
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import DOMPurify from 'dompurify';
import type { Doctor } from '@/app/team/_components/doctor-card';
import {
    AgnieszkaSlezakLogo,
    OrthozentrumLogo,
    SchemmerWorniLogo,
    VascAllianceLogo
} from '@/components/logos';
import { cn } from '@/lib/utils';

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

const partnerLogos: { [key: string]: React.FC<any> } = {
  OrthozentrumLogo,
  AgnieszkaSlezakLogo,
  VascAllianceLogo,
  SchemmerWorniLogo,
};

interface EditableDoctorCardProps {
    doctor: Doctor;
}

const ScalableCard: React.FC<{doctor: Doctor, isBackside?: boolean}> = ({ doctor, isBackside = false }) => {
    const { 
        title,
        name,
        specialty,
        qualifications,
        additionalInfo,
        vita,
        imageUrl,
        imageHint,
        partnerLogoComponent,
    } = doctor;

    const LogoComponent = partnerLogoComponent ? partnerLogos[partnerLogoComponent] : null;

    if (isBackside) {
        return (
             <Card className="group relative w-full overflow-hidden rounded-lg shadow-sm h-full">
                <div className="flex h-full flex-col overflow-auto bg-accent/95 p-6 text-left text-background">
                    <div className="h-full w-full overflow-y-auto text-base leading-tight scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary">
                        <VitaRenderer html={vita} />
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <Card className="group relative w-full overflow-hidden rounded-lg shadow-sm h-full">
            <CardContent className="p-0">
                <div 
                    className="relative w-full bg-card h-full"
                    style={{ 'containerType': 'inline-size' } as React.CSSProperties}
                >
                    <div className="grid h-full grid-cols-3 items-center gap-[4.5%] p-6">
                        <div className="relative col-span-1 h-full w-full aspect-[2/3] overflow-hidden rounded-md">
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
                                
                                {LogoComponent && (
                                    <div className="relative mt-[2.5cqw] flex w-fit justify-start">
                                        <LogoComponent className="h-auto w-[80%]" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor }) => {
    const CARD_BASE_WIDTH = 550;
    const CARD_ASPECT_RATIO = 550 / 300; 

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div 
                className="relative w-full"
                style={{
                    aspectRatio: CARD_ASPECT_RATIO,
                }}
            >
                <div 
                    className="absolute top-0 left-0"
                    style={{
                        width: `${CARD_BASE_WIDTH}px`,
                        height: `${CARD_BASE_WIDTH / CARD_ASPECT_RATIO}px`,
                        transform: `scale(calc(100% / ${CARD_BASE_WIDTH}))`,
                        transformOrigin: 'top left',
                    }}
                >
                    <ScalableCard doctor={doctor} />
                </div>
            </div>

            <div 
                className="relative w-full"
                style={{
                    aspectRatio: CARD_ASPECT_RATIO,
                }}
            >
                 <div 
                    className="absolute top-0 left-0"
                    style={{
                        width: `${CARD_BASE_WIDTH}px`,
                        height: `${CARD_BASE_WIDTH / CARD_ASPECT_RATIO}px`,
                        transform: `scale(calc(100% / ${CARD_BASE_WIDTH}))`,
                        transformOrigin: 'top left',
                    }}
                >
                    <ScalableCard doctor={doctor} isBackside={true} />
                </div>
            </div>
        </div>
    );
};
