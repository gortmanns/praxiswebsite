
'use client'

import React, { useMemo, useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { LanguageFlags } from '@/app/admin/dashboard/team/doctors/_components/language-flags';

export interface Doctor {
    id: string;
    order: number;
    name: string;
    title?: string;
    specialty?: string;
    qual1?: string;
    qual2?: string;
    qual3?: string;
    qual4?: string;
    imageUrl?: string;
    positionText?: string;
    positionImageUrl?: string;
    backSideCode: string;
    languages: string[];
    hidden: boolean;
    disableFlip?: boolean;
    frontSideCode?: string; // Kept for legacy data
}

const BacksideRenderer: React.FC<{ html: string; }> = ({ html }) => {
    const sanitizedHtml = useMemo(() => {
        if (typeof window !== 'undefined') {
            return { __html: DOMPurify.sanitize(html) };
        }
        return { __html: '' };
    }, [html]);

    return (
        <div className="w-full h-full text-left p-8">
            <div className="text-sm text-white max-w-none [&_p]:my-0 [&_ul]:my-2" dangerouslySetInnerHTML={sanitizedHtml} />
        </div>
    );
};


const LegacyCardRenderer: React.FC<{ html: string }> = ({ html }) => {
    const sanitizedHtml = useMemo(() => {
        if (typeof window !== 'undefined') {
            return { __html: DOMPurify.sanitize(html) };
        }
        return { __html: '' };
    }, [html]);

    return <div className="w-full h-full" dangerouslySetInnerHTML={sanitizedHtml} />;
};


export const DoctorCard: React.FC<Doctor> = (props) => {
    const { backSideCode, disableFlip, frontSideCode } = props;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    
    // Determine if we should use the legacy frontSideCode for rendering.
    // This is true if frontSideCode exists and is not just an empty container.
    const useLegacyRendering = useMemo(() => {
        if (!frontSideCode) return false;
        const cleaned = frontSideCode.replace(/<style>.*?<\/style>/gs, '').trim();
        return cleaned.length > 50; // Heuristic: empty templates are small.
    }, [frontSideCode]);


    useEffect(() => {
        const calculateScale = () => {
            if (wrapperRef.current) {
                const parentWidth = wrapperRef.current.offsetWidth;
                const scaleValue = parentWidth / 1000; // Original width is 1000px
                setScale(scaleValue);
            }
        };

        calculateScale();
        const resizeObserver = new ResizeObserver(calculateScale);
        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }

        return () => {
            if (wrapperRef.current) {
                resizeObserver.unobserve(wrapperRef.current);
            }
        };
    }, []);

    // The single source of truth for rendering the card front.
    const frontSide = useLegacyRendering ? (
        <LegacyCardRenderer html={frontSideCode!} />
    ) : (
        <div className="w-full h-full bg-background text-card-foreground p-6 font-headline">
            <div className="flex h-full w-full items-start">
                <div className="relative h-full aspect-[2/3] overflow-hidden rounded-md shrink-0 bg-muted">
                    {props.imageUrl ? (
                       <Image src={props.imageUrl} alt={`Portrait von ${props.name}`} fill className="object-cover" />
                    ) : (
                         <div className="w-full h-full flex items-center justify-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                    )}
                </div>
                <div className="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <p className="text-2xl font-bold text-primary">{props.title || ''}</p>
                        <h3 className="text-5xl font-bold text-primary my-2">{props.name}</h3>
                        <p className="text-xl font-bold">{props.specialty || ''}</p>
                        <div className="mt-6 text-xl">
                            {props.qual1 && <p>{props.qual1}</p>}
                            {props.qual2 && <p>{props.qual2}</p>}
                            {props.qual3 && <p>{props.qual3}</p>}
                            {props.qual4 && <p>{props.qual4}</p>}
                        </div>
                        <div className="mt-6">
                            {props.positionImageUrl ? (
                                <div className="w-full text-left h-[50px] relative">
                                    <Image src={props.positionImageUrl} alt="Position Logo" layout="fill" objectFit="contain" className="object-left"/>
                                </div>
                            ) : (
                                <div className="w-full text-left"><p className="text-base">{props.positionText || ''}</p></div>
                            )}
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0">
                         <LanguageFlags languages={props.languages} />
                    </div>
                </div>
            </div>
        </div>
    );
    
    return (
        <div ref={wrapperRef} className={cn(
            "group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg border bg-muted",
            "shadow-xl"
        )}>
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: '1000px', height: '495px' }}>
                 {frontSide}
            </div>
            
            {!disableFlip && backSideCode && (
                <div className="flip-card-back absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: '1000px', height: '495px' }}>
                        <BacksideRenderer html={backSideCode} />
                    </div>
                </div>
            )}
        </div>
    );
};
