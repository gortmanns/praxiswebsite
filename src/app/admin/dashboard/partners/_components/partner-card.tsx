
'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import DOMPurify from 'dompurify';

export interface Partner {
    id: string;
    order: number;
    name: string;
    websiteUrl?: string;
    logoHtml: string;
    imageUrl?: string;
    openInNewTab?: boolean;
    hidden?: boolean;
    logoScale?: number;
    logoX?: number;
    logoY?: number;
    [key: string]: any;
}

const generateDynamicLogoHtml = (partner: Partner): string => {
    // If there is a specific imageUrl, prioritize it to generate the logo.
    if (partner.imageUrl) {
        const scale = partner.logoScale || 100;
        const x = partner.logoX || 0;
        const y = partner.logoY || 0;
        const transformStyle = `transform: scale(${scale / 100}) translate(${x}px, ${y}px);`;
        return `<img src="${partner.imageUrl}" alt="${partner.name || 'Partner Logo'}" style="object-fit: contain; width: 100%; height: 100%; transition: transform 0.2s ease-out; ${transformStyle}" />`;
    }
    // Fallback to the logoHtml from the database if no specific imageUrl is present.
    if (partner.logoHtml) {
        return partner.logoHtml;
    }
    // Final fallback for new or empty cards.
    return `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f0f0f0; border-radius: 8px;"><span style="font-family: sans-serif; color: #999;">Logo</span></div>`;
};


const CodeRenderer: React.FC<{ html: string }> = ({ html }) => {
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const config = {
                ADD_TAGS: ["svg", "path", "g", "text", "image", "rect", "polygon", "circle", "line", "defs", "clipPath", "style", "img"],
                ADD_ATTR: ['style', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'd', 'font-family', 'font-size', 'font-weight', 'x', 'y', 'dominant-baseline', 'text-anchor', 'aria-label', 'width', 'height', 'alt', 'data-ai-hint', 'class', 'className', 'fill-rule', 'clip-rule', 'id', 'transform', 'points', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'href', 'target', 'rel', 'src']
            };
            return { __html: DOMPurify.sanitize(html, config) };
        }
        return { __html: '' };
    }, [html]);

    return <div className="relative flex h-full w-full items-center justify-center overflow-hidden" dangerouslySetInnerHTML={sanitizedHtml} />;
};


export const PartnerCard = React.forwardRef<HTMLAnchorElement, Partner>((props, ref) => {
    const displayHtml = generateDynamicLogoHtml(props);
    
    return (
        <Link
            ref={ref}
            href={props.websiteUrl || '#'}
            target={props.openInNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
            <Card className="flex h-full w-full items-center justify-center bg-background p-2">
                <CodeRenderer html={displayHtml} />
            </Card>
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Link>
    );
});

PartnerCard.displayName = 'PartnerCard';
