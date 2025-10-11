'use client';

import React from 'react';
import type { Doctor } from '@/app/admin/dashboard/team/doctors/page';
import DOMPurify from 'dompurify';

interface EditableDoctorCardProps {
    doctor: Doctor;
    onVitaClick: () => void;
}

const CodeRenderer: React.FC<{ html: string }> = ({ html }) => {
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const config = {
                ADD_TAGS: ["svg", "path", "g", "text", "image", "rect", "polygon", "circle", "line", "defs", "clipPath", "style", "img"],
                ADD_ATTR: ['style', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'd', 'font-family', 'font-size', 'font-weight', 'x', 'y', 'dominant-baseline', 'text-anchor', 'aria-label', 'width', 'height', 'alt', 'data-ai-hint', 'class', 'className', 'fill-rule', 'clip-rule', 'id', 'transform', 'points', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'href', 'target', 'rel', 'src']
            };
            return { __html: DOMPurify.sanitize(html, config) };
        }
        return { __html: '' };
    }, [html]);

    return (
        <div className="w-full h-full" dangerouslySetInnerHTML={sanitizedHtml} />
    );
};


export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor, onVitaClick }) => {
    
    return (
        <div 
            className="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm"
        >
             {doctor.frontSideCode && <CodeRenderer html={doctor.frontSideCode} />}
            
            <div 
                className="absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 text-left text-background transition-all duration-1000 group-hover:translate-y-0"
                onClick={onVitaClick}
            >
                {doctor.backSideCode && <CodeRenderer html={doctor.backSideCode} />}
            </div>
        </div>
    );
};
