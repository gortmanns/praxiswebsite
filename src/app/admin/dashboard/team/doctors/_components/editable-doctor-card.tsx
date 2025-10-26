
'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { LanguageFlags } from './language-flags';

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
    createdAt?: any;
    _dialog?: { type: string; data: any };
    // Deprecated fields, no longer used for rendering but might exist in old DB entries
    frontSideCode?: string;
}

export const initialDoctorState: Omit<Doctor, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Arzt",
    title: "Titel",
    specialty: "Spezialisierung",
    qual1: "Qualifikation 1",
    qual2: "Qualifikation 2",
    qual3: "Qualifikation 3",
    qual4: "Qualifikation 4",
    imageUrl: "",
    positionText: "Position oder Logo",
    positionImageUrl: "",
    languages: ['de'],
    hidden: false,
    backSideCode: `
        <div class="vita-content w-full h-full">
            <h4>Curriculum Vitae</h4>
            <p>Zum Bearbeiten klicken</p>
        </div>
    `,
};


const BacksideRenderer: React.FC<{ html: string; }> = ({ html }) => {
    const sanitizedHtml = useMemo(() => {
        if (typeof window !== 'undefined') {
            return { __html: DOMPurify.sanitize(html) };
        }
        return { __html: '' };
    }, [html]);

    return (
         <div id="edit-vita" className="w-full h-full text-left p-8">
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-ul:my-2 text-white" dangerouslySetInnerHTML={sanitizedHtml} />
        </div>
    );
};

interface EditableDoctorCardProps {
    doctor: Doctor;
    onCardClick?: (e: React.MouseEvent) => void;
    isBeingEdited?: boolean;
    showBackside?: boolean;
}

export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor, onCardClick, isBeingEdited, showBackside = false }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

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

    const cardStyle = {
        '--card-scale': scale
    } as React.CSSProperties;
    
    // Render the card's back side using the data
    const backSide = (
        <div className="absolute inset-0 flex flex-col items-center justify-start overflow-auto bg-accent/95 text-left text-background">
            <BacksideRenderer html={doctor.backSideCode} />
        </div>
    );
    
    // Render the card's front side using the data
    const frontSide = (
        <div className="w-full h-full bg-background text-card-foreground p-6 font-headline">
            <div className="flex h-full w-full items-start">
                <div id="image-container" className="relative h-full aspect-[2/3] overflow-hidden rounded-md shrink-0 bg-muted">
                    <div id="edit-image" className="image-button w-full h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
                        {doctor.imageUrl ? (
                           <Image src={doctor.imageUrl} alt={`Portrait von ${doctor.name}`} fill className="object-cover" />
                        ) : (
                             <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="font-extrabold"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <span className="mt-2 text-sm font-bold">Zum Ändern klicken</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <div id="edit-title" className="w-full text-left">
                            <p className="text-2xl font-bold text-primary">{doctor.title || 'Titel'}</p>
                        </div>
                        <div id="edit-name" className="w-full text-left">
                            <h3 className="text-5xl font-bold text-primary my-2">{doctor.name || 'Name'}</h3>
                        </div>
                        <div id="edit-specialty" className="w-full text-left">
                            <p className="text-xl font-bold">{doctor.specialty || 'Spezialisierung'}</p>
                        </div>
                        <div className="mt-6 text-xl">
                            {doctor.qual1 && <div id="edit-qual1" className="w-full text-left"><p>{doctor.qual1}</p></div>}
                            {doctor.qual2 && <div id="edit-qual2" className="w-full text-left"><p>{doctor.qual2}</p></div>}
                            {doctor.qual3 && <div id="edit-qual3" className="w-full text-left"><p>{doctor.qual3}</p></div>}
                            {doctor.qual4 && <div id="edit-qual4" className="w-full text-left"><p>{doctor.qual4}</p></div>}
                        </div>
                        <div id="position-container" className="mt-6">
                            <div id="edit-position">
                                {doctor.positionImageUrl ? (
                                    <div className="w-full text-left h-[50px] relative">
                                        <Image src={doctor.positionImageUrl} alt="Position Logo" layout="fill" objectFit="contain" object-position="left" />
                                    </div>
                                ) : (
                                    <div className="w-full text-left"><p className="text-base">{doctor.positionText || 'Position oder Logo'}</p></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div id="edit-language" className="absolute bottom-0 right-0">
                         <LanguageFlags languages={doctor.languages} />
                    </div>
                </div>
            </div>
        </div>
    );
    
    return (
        <div id="card-root" ref={wrapperRef} className="template-card-wrapper relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm border" onClick={onCardClick} style={cardStyle}>
            <div className='template-card'>
                {showBackside ? backSide : frontSide}
            </div>
             {isBeingEdited && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary/90">
                    <span className="text-2xl font-bold text-primary-foreground">In Bearbeitung</span>
                </div>
            )}
            <style jsx>{`
                .template-card-wrapper {
                    background-color: hsl(var(--muted));
                }
                .template-card {
                    width: 1000px;
                    height: 495px;
                    transform-origin: top left;
                    transform: scale(var(--card-scale, 1));
                    transition: transform 0.2s ease-out;
                    background-color: hsl(var(--background));
                }
            `}</style>
            <style>{templateStyles}</style>
        </div>
    );
};


const templateStyles = `
    .template-card button, .template-card div[id^="edit-"] { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; display: block; }
    .template-card .image-button:hover { background-color: rgba(0,0,0,0.1); }
    .template-card .image-button-background { background-color: white; }
    .template-card p, .template-card h3, .template-card span { margin:0; }
    .template-card .font-headline { font-family: var(--font-headline); }
    .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
    .template-card .bg-background { background-color: hsl(var(--background)); }
    .template-card .p-6 { padding: 1.5rem; }
    .template-card .flex { display: flex; }
    .template-card .h-full { height: 100%; }
    .template-card .w-full { width: 100%; }
    .template-card .items-start { align-items: flex-start; }
    .template-card .relative { position: relative; }
    .template-card .aspect-\\[2\\/3\\] { aspect-ratio: 2 / 3; }
    .template-card .overflow-hidden { overflow: hidden; }
    .template-card .rounded-md { border-radius: 0.375rem; }
    .template-card .flex-grow { flex-grow: 1; }
    .template-card .flex-col { flex-direction: column; }
    .template-card .justify-center { justify-content: center; }
    .template-card .ml-6 { margin-left: 1.5rem; }
    .template-card .text-2xl { font-size: 1.5rem; line-height: 2rem; }
    .template-card .font-bold { font-weight: 700; }
    .template-card .text-primary { color: hsl(var(--primary)); }
    .template-card .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .template-card .text-5xl { font-size: 3rem; line-height: 1; }
    .template-card .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    .template-card .mt-6 { margin-top: 1.5rem; }
    .template-card .text-base { font-size: 1rem; line-height: 1.5rem; }
    .template-card .text-left { text-align: left; }
    .template-card .absolute { position: absolute; }
    .template-card .bottom-0 { bottom: 0; }
    .template-card .right-0 { right: 0; }
    .template-card .items-center { align-items: center; }
    .template-card .gap-2 { gap: 0.5rem; }
    .template-card .object-contain { object-fit: contain; }
    .template-card .object-cover { object-fit: cover; }
    .template-card .text-muted-foreground { color: hsl(var(--muted-foreground)); }
    .template-card .bg-muted { background-color: hsl(var(--muted)); }
    .template-card .text-center { text-align: center; }
    .template-card .mt-2 { margin-top: 0.5rem; }
    .template-card .font-extrabold { font-weight: 800; }
    .template-card .bg-white { background-color: white; }
    .template-card .shrink-0 { flex-shrink: 0; }
`;



