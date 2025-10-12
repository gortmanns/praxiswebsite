
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
    openInNewTab?: boolean;
    hidden?: boolean;
    [key: string]: any;
}

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


export const PartnerCard: React.FC<Partner> = (props) => {
    return (
        <Link
            href={props.websiteUrl || '#'}
            target={props.openInNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
            <Card className="flex h-full w-full items-center justify-center bg-background p-2">
                {props.logoHtml && <CodeRenderer html={props.logoHtml} />}
            </Card>
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Link>
    );
};
