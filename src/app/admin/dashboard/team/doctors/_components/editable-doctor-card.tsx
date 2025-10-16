
'use client';

import React, { useRef, useEffect, useState } from 'react';
import type { Doctor } from '@/app/admin/dashboard/team/doctors/page';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';


interface EditableDoctorCardProps {
    doctor: Doctor;
    onCardClick?: (e: React.MouseEvent) => void;
    isBeingEdited?: boolean;
    showBackside?: boolean;
}

const CodeRenderer: React.FC<{ html: string; className?: string;}> = ({ html, className }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateScale = () => {
            if (wrapperRef.current) {
                const parentWidth = wrapperRef.current.offsetWidth;
                if (parentWidth > 0) {
                   setScale(parentWidth / 1000);
                }
            }
        };

        calculateScale();
        const resizeObserver = new ResizeObserver(calculateScale);
        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);
    
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const config = {
                ADD_TAGS: ["svg", "path", "g", "text", "image", "rect", "polygon", "circle", "line", "defs", "clipPath", "style", "img", "div"],
                ADD_ATTR: ['style', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'd', 'font-family', 'font-size', 'font-weight', 'x', 'y', 'dominant-baseline', 'text-anchor', 'aria-label', 'width', 'height', 'alt', 'data-ai-hint', 'class', 'className', 'fill-rule', 'clip-rule', 'id', 'transform', 'points', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'href', 'target', 'rel', 'src']
            };
            return { __html: DOMPurify.sanitize(html, config) };
        }
        return { __html: '' };
    }, [html]);

    return (
         <div ref={wrapperRef} className={cn("relative w-full aspect-[1000/495] overflow-hidden", className)}>
             <div 
                className="absolute top-0 left-0 origin-top-left"
                style={{ 
                    width: '1000px', 
                    height: '495px',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
                dangerouslySetInnerHTML={sanitizedHtml}
            />
        </div>
    );
};


export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor, onCardClick, isBeingEdited, showBackside = false }) => {
    
    return (
        <div 
            id="card-root"
            className="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm border"
            onClick={onCardClick}
        >
             <CodeRenderer html={showBackside ? doctor.backSideCode : doctor.frontSideCode} />
            
            {isBeingEdited && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary/90">
                    <span className="text-2xl font-bold text-primary-foreground">In Bearbeitung</span>
                </div>
            )}
        </div>
    );
};
