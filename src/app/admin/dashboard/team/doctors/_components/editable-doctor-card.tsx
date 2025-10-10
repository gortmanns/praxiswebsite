
'use client';

import React from 'react';
import type { Doctor } from '@/app/team/_components/doctor-card';
import Image from 'next/image';
import { User } from 'lucide-react';
import DOMPurify from 'dompurify';

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

interface EditableDoctorCardProps {
    doctor: Doctor;
    onImageClick: () => void;
    onVitaClick: () => void;
}

export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor, onImageClick, onVitaClick }) => {
    
    // Front side component that replicates the original DoctorCard structure and styling
    const FrontSide = () => (
        <div 
            className="relative h-full w-full bg-card"
            style={{ containerType: 'inline-size' } as React.CSSProperties}
        >
            <div className="grid h-full grid-cols-3 items-stretch gap-[4.5%] p-6">
                <div className="relative col-span-1 w-full overflow-hidden rounded-md">
                    <div className="relative h-full w-full aspect-[2/3] cursor-pointer" onClick={onImageClick}>
                        {doctor.imageUrl ? (
                            <Image
                                src={doctor.imageUrl}
                                alt={`Portrait von ${doctor.name}`}
                                data-ai-hint={doctor.imageHint}
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
                        <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">{doctor.title}</p>
                        <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                          {doctor.name}
                        </h4>
                        <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                            <p className="font-bold">{doctor.specialty}</p>
                            {doctor.qualifications.map((q, i) => <p key={i}>{q}</p>)}
                        </div>
                        
                        {doctor.additionalInfo && (
                            <p className="mt-[2.5cqw] text-[clamp(0.6rem,1.6cqw,1rem)] italic">
                                {doctor.additionalInfo}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    
    // Back side component
    const BackSide = () => (
        <div className="h-full w-full cursor-pointer overflow-hidden bg-accent/95 p-6 text-left text-background" onClick={onVitaClick}>
            <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary">
                <VitaRenderer html={doctor.vita} />
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
           <div className="w-full aspect-[1000/495] rounded-lg border overflow-hidden">
                <FrontSide />
           </div>
           <div className="w-full aspect-[1000/495] rounded-lg border overflow-hidden">
                <BackSide />
           </div>
        </div>
    );
};
