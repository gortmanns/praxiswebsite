
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

interface DoctorCardPreviewProps {
    doctor: Doctor;
    isBack?: boolean;
}

const DoctorCardPreview: React.FC<DoctorCardPreviewProps> = ({ doctor, isBack = false }) => {
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

    if (isBack) {
        return (
            <Card className="group relative w-full overflow-hidden rounded-lg shadow-sm h-full">
                <div className="flex h-full flex-col overflow-auto bg-accent/95 p-6 text-left text-background">
                    <div className="h-full w-full overflow-y-auto text-base leading-tight scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary">
                        <VitaRenderer html={vita} />
                    </div>
                </div>
            </Card>
        );
    }
    
    return (
        <Card className="w-full overflow-hidden rounded-lg shadow-sm">
            <CardContent className="p-0">
                <div 
                    className="relative w-full bg-card"
                    style={{ 'containerType': 'inline-size' } as React.CSSProperties}
                >
                    <div className="grid h-full grid-cols-3 items-center gap-[4.5%] p-6">
                        <div className="relative col-span-1 w-full aspect-[2/3] self-center overflow-hidden rounded-md">
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
                                
                                {additionalInfo && !LogoComponent && (
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


interface EditableDoctorCardProps {
    doctor: Doctor;
}

export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor }) => {
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <DoctorCardPreview 
              doctor={doctor} 
              isBack={false}
            />
            <DoctorCardPreview
              doctor={doctor}
              isBack={true}
            />
        </div>
    );
};
