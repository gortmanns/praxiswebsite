
'use client';

import React, { useRef, useEffect, useState } from 'react';
import type { Doctor } from '../page';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';


interface EditableDoctorCardProps {
    doctor: Doctor;
    onEditRequest?: (field: string) => void;
    isBeingEdited?: boolean;
    showBacksideOnly?: boolean;
}

const CodeRenderer: React.FC<{ html: string; className?: string; onClick?: (e: React.MouseEvent) => void;}> = ({ html, className, onClick }) => {
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

        return () => {
            if (wrapperRef.current) {
                resizeObserver.unobserve(wrapperRef.current);
            }
        };
    }, [html]);
    
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
                onClick={onClick}
                dangerouslySetInnerHTML={sanitizedHtml}
            />
        </div>
    );
};


export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor, onEditRequest, isBeingEdited, showBacksideOnly = false }) => {
    
    const handleCardClick = (e: React.MouseEvent) => {
        if (!onEditRequest) return;

        let target = e.target as HTMLElement;
        
        while (target && target.id !== 'card-root') {
            if (target.id && target.id.startsWith('edit-')) {
                e.stopPropagation();
                e.preventDefault();
                const field = target.id.substring(5);
                onEditRequest(field);
                return;
            }
            target = target.parentElement as HTMLElement;
        }
    };
    
    if (showBacksideOnly) {
         return (
             <div 
                id="card-root"
                className="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm border"
            >
                <div className="absolute inset-0 flex flex-col items-center justify-start overflow-auto bg-accent/95 text-left text-background">
                    <CodeRenderer html={doctor.backSideCode} onClick={handleCardClick} />
                </div>
                 {isBeingEdited && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary/90">
                        <span className="text-2xl font-bold text-primary-foreground">In Bearbeitung</span>
                    </div>
                )}
            </div>
        );
    }
    
    return (
        <div 
            id="card-root"
            className="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm border"
        >
             <CodeRenderer html={doctor.frontSideCode} onClick={handleCardClick} />
            
            {isBeingEdited && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary/90">
                    <span className="text-2xl font-bold text-primary-foreground">In Bearbeitung</span>
                </div>
            )}
        </div>
    );
};
