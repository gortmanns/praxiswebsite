'use client'

import React from 'react';
import DOMPurify from 'dompurify';

export interface Doctor {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
    [key: string]: any; // Allow other properties for static data compatibility
}

const CodeRenderer: React.FC<{ html: string }> = ({ html }) => {
    // This is safe because we trust the source of the HTML (our own admin UI)
    // In a general-purpose app, you MUST sanitize user-provided HTML.
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            return { __html: DOMPurify.sanitize(html, { ADD_TAGS: ["svg", "path", "g", "text"], ADD_ATTR: ['style', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'd', 'font-family', 'font-size', 'font-weight', 'x', 'y', 'dominant-baseline', 'text-anchor', 'aria-label'] }) };
        }
        return { __html: '' };
    }, [html]);

    return (
        <div className="w-full h-full" dangerouslySetInnerHTML={sanitizedHtml} />
    );
};


export const DoctorCard: React.FC<Doctor> = (props) => {
    const { frontSideCode, backSideCode } = props;

    return (
        <div className="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm">
             {frontSideCode && <CodeRenderer html={frontSideCode} />}
            
            <div className="flip-card-back absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                {backSideCode && <CodeRenderer html={backSideCode} />}
            </div>
        </div>
    );
};
