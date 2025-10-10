
'use client';

import React from 'react';
import type { Doctor } from '@/app/team/_components/doctor-card';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';

interface EditableDoctorCardProps {
    doctor: Doctor;
    onVitaClick: () => void;
}

const CodeRenderer: React.FC<{ html: string }> = ({ html }) => {
    // This is safe because we trust the source of the HTML (our own admin UI)
    // In a general-purpose app, you MUST sanitize user-provided HTML.
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const config = {
                ADD_TAGS: ["svg", "path", "g", "text", "image", "rect", "polygon", "circle", "line", "defs", "clipPath", "style"],
                ADD_ATTR: ['style', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'd', 'font-family', 'font-size', 'font-weight', 'x', 'y', 'dominant-baseline', 'text-anchor', 'aria-label', 'width', 'height', 'alt', 'data-ai-hint', 'class', 'className', 'fill-rule', 'clip-rule', 'id', 'transform', 'points', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'href', 'target', 'rel']
            };
            return { __html: DOMPurify.sanitize(html, config) };
        }
        return { __html: '' };
    }, [html]);

    return (
        <div className="w-full h-full" dangerouslySetInnerHTML={sanitizedHtml} />
    );
};


const FrontSide: React.FC<{ code: string; }> = ({ code }) => {
    return <CodeRenderer html={code} />;
};


const BackSide: React.FC<{ code: string; onVitaClick: () => void; }> = ({ code, onVitaClick }) => {
    return (
        <div
            className="relative w-full h-full bg-accent/95 overflow-hidden p-6 cursor-pointer"
            onClick={onVitaClick}
        >
            <div className="h-full overflow-y-auto flex w-full flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary pointer-events-none">
                <CodeRenderer html={code} />
            </div>
        </div>
    );
};

const ScalingCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
        const calculateScale = () => {
            if (wrapperRef.current) {
                const cardDesignWidth = 1000;
                const wrapperWidth = wrapperRef.current.offsetWidth;
                setScale(wrapperWidth / cardDesignWidth);
            }
        };

        calculateScale();

        const resizeObserver = new ResizeObserver(calculateScale);
        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }

        return () => {
            if (wrapperRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                resizeObserver.unobserve(wrapperRef.current);
            }
        };
    }, []);

    return (
        <div ref={wrapperRef} className={cn("w-full aspect-[1000/495] overflow-hidden rounded-lg shadow-sm", className)}>
            <div style={{
                width: '1000px',
                height: '495px',
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
            }}>
                {children}
            </div>
        </div>
    );
};

export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor, onVitaClick }) => {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <ScalingCard>
                <FrontSide code={doctor.frontSideCode} />
            </ScalingCard>
            <ScalingCard>
                <BackSide code={doctor.backSideCode} onVitaClick={onVitaClick} />
            </ScalingCard>
        </div>
    );
};
