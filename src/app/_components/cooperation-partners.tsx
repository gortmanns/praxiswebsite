
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import DOMPurify from 'dompurify';

// --- Static Data Definition ---

const medicalPartnersData = [
    {
      id: 'ortho',
      order: 1,
      name: 'orthozentrum-bern',
      websiteUrl: 'https://orthozentrum-bern.ch/',
      logoHtml: `
        <svg viewBox="0 0 240 55.5" xmlns="http://www.w3.org/2000/svg" class="text-card-foreground h-full w-full object-contain" aria-label="orthozentrum-bern Logo">
          <g>
            <path d="M46.7 7.8S44.5 3.9 40 3.9H20.8s-4.4 0-6.7 3.9L4.6 24.4s-2.2 3.9 0 7.7l9.6 16.6s2.2 3.9 6.7 3.9H40s4.4 0 6.7-3.9l9.6-16.6s2.2-3.9 0-7.7L46.7 7.8z" fill="none" stroke="#588791" stroke-width="1.639"></path>
            <path d="M24 52.4c-1.1-3.4-3.1-8-5.1-11.1-.6-.9-1-1.9-1.2-2.9-.3-1.8.9-3.2 2.9-3.5 6.5-1 13-1 19.5 0 2.2.3 3.4 2 2.9 4-.2.7-.5 1.4-1 2.1-2 3.1-4.1 8-5.2 11.4" fill="none" stroke="#588791" stroke-width="1.639"></path>
            <path d="M35.4 4.4c.4 3.8 1.7 8 4.1 11.3 1.8 2.4 3.1 2.6 3.7 5.6.5 2.5-.3 6.9-2.3 7.9-2.3 1.2-4.6 1-6.8-.4-1.4-1.2-2.4-1.4-3.6-1.3-1.3 0-2.3.2-3.6 1.3-2.2 1.5-4.4 1.6-6.8.4-2-1-2.8-5.3-2.3-7.9.6-3 1.9-3.2 3.7-5.6 2.4-3.2 3.7-7.4 4.1-11.3" fill="none" stroke="#588791" stroke-width="1.639"></path>
          </g>
          <text x="70" y="32" font-family="Montserrat, sans-serif" font-size="16" font-weight="bold" fill="#588791" dominant-baseline="middle">orthozentrum-bern</text>
        </svg>
      `,
      openInNewTab: true,
    },
    {
      id: 'vasc',
      order: 2,
      name: 'VASC ALLIANCE',
      websiteUrl: 'https://www.vasc-alliance.ch/',
      logoHtml: '<img src="/images/VASC-Alliance-Logo.png" alt="VASC ALLIANCE Logo" style="object-fit: contain; width: 100%; height: 100%;" data-ai-hint="vascular surgery logo" />',
      openInNewTab: true,
    },
    {
      id: 'schemmer',
      order: 3,
      name: 'Schemmer & Worni',
      websiteUrl: 'https://schemmer-worni.ch/',
      logoHtml: '<img src="/images/schemmer-worni-logo.png" alt="Schemmer & Worni Logo" style="object-fit: contain; width: 100%; height: 100%;" data-ai-hint="surgery logo" />',
      openInNewTab: true,
    },
    {
      id: 'slezak',
      order: 4,
      name: 'Agnieszka Slezak',
      websiteUrl: 'https://neurologie-plus.ch/',
      logoHtml: `
        <svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" class="text-special-green h-full w-full object-contain" aria-label="Agnieszka Slezak Logo">
          <style>.text-special-green { color: #358392; } .foreground-fill { fill: hsl(var(--foreground)); }</style>
          <text x="5" y="70" font-family="Montserrat, sans-serif" font-size="36" font-weight="bold" fill="currentColor">Dr. med. Agnieszka Slezak</text>
          <text x="250" y="110" font-family="Montserrat, sans-serif" font-size="24" font-weight="normal" class="foreground-fill" text-anchor="middle">Fachärztin für Neurologie</text>
        </svg>
      `,
      openInNewTab: true,
    },
];

const otherPartnersData = [
    {
      id: 'go-medical',
      order: 1,
      name: 'Go-Medical',
      websiteUrl: 'https://www.go-medical.ch/',
      logoHtml: '<img src="/images/go-medical-logo.png" alt="Go-Medical Logo" style="object-fit: contain; width: 100%; height: 100%;" data-ai-hint="medical services logo" />',
      openInNewTab: true,
    },
    {
      id: 'mcl',
      order: 2,
      name: 'MCL',
      websiteUrl: 'https://www.mcl.ch/',
      logoHtml: '<img src="/images/mcl-labor-logo.png" alt="MCL Logo" style="object-fit: contain; width: 100%; height: 100%;" data-ai-hint="laboratory logo" />',
      openInNewTab: true,
    },
    {
      id: 'doxnet',
      order: 3,
      name: 'doxnet',
      websiteUrl: 'https://www.doxnet.ch/',
      logoHtml: '<img src="/images/doxnet-logo.jpg" alt="doxnet Logo" style="object-fit: contain; width: 100%; height: 100%;" data-ai-hint="medical network logo" />',
      openInNewTab: true,
    },
];

// --- Components ---

const CodeRenderer: React.FC<{ html: string }> = ({ html }) => {
    const [sanitizedHtml, setSanitizedHtml] = useState({ __html: '' });

    useEffect(() => {
        const sanitize = DOMPurify.sanitize;
        const config = {
            ADD_TAGS: ["svg", "path", "g", "text", "image", "rect", "polygon", "circle", "line", "defs", "clipPath", "style", "img"],
            ADD_ATTR: ['style', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'd', 'font-family', 'font-size', 'font-weight', 'x', 'y', 'dominant-baseline', 'text-anchor', 'aria-label', 'width', 'height', 'alt', 'data-ai-hint', 'class', 'className', 'fill-rule', 'clip-rule', 'id', 'transform', 'points', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'href', 'target', 'rel', 'src']
        };
        setSanitizedHtml({ __html: sanitize(html, config) });
    }, [html]);

    return <div className="relative flex h-full w-full items-center justify-center overflow-hidden" dangerouslySetInnerHTML={sanitizedHtml} />;
};


const PartnerCard: React.FC<{ partner: typeof medicalPartnersData[0] }> = ({ partner }) => (
    <Link
        href={partner.websiteUrl || '#'}
        target={partner.openInNewTab ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="group relative block w-full aspect-[2/1] overflow-hidden rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
        <Card className="flex h-full w-full items-center justify-center bg-background p-4">
            {partner.logoHtml && <CodeRenderer html={partner.logoHtml} />}
        </Card>
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </Link>
);


const RowGrid: React.FC<{ partners: typeof medicalPartnersData[0][] }> = ({ partners }) => {
    if (!partners || partners.length === 0) return null;

    const total = partners.length;

    const getGridStyle = (index: number) => {
        let colStart;
        switch (total) {
            case 1: colStart = 4; break; 
            case 2: colStart = 3 + (index * 2); break;
            case 3: colStart = 2 + (index * 2); break;
            case 4: colStart = 1 + (index * 2); break;
            default: colStart = 1;
        }
        return { gridColumn: `span 2 / span 2`, gridColumnStart: colStart };
    };
    
    return (
        <div className="grid grid-cols-8 gap-x-8">
            {partners.map((partner, index) => (
                <div key={partner.id} style={getGridStyle(index)} className="flex items-center justify-center">
                    <PartnerCard partner={partner} />
                </div>
            ))}
        </div>
    );
};

const PartnerGrid: React.FC<{ partners: typeof medicalPartnersData[0][] }> = ({ partners }) => {
    if (!partners || partners.length === 0) return null;
    
    const chunkedPartners: typeof medicalPartnersData[0][][] = [];
    for (let i = 0; i < partners.length; i += 4) {
        chunkedPartners.push(partners.slice(i, i + 4));
    }

    return (
        <div className="space-y-8">
            {chunkedPartners.map((rowPartners, index) => (
                <RowGrid key={index} partners={rowPartners} />
            ))}
        </div>
    );
};

export function CooperationPartnersSection() {
  return (
    <section id="partners" className="w-full bg-primary">
      <div className="mx-auto w-full px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Unsere ärztlichen Kooperationspartner
        </h2>
        
        <div className="mt-12">
          <PartnerGrid partners={medicalPartnersData} />
        </div>

        {otherPartnersData && otherPartnersData.length > 0 && (
            <>
                <h3 className="mt-16 text-center font-headline text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
                Unsere weiteren Partner
                </h3>
                <div className="mt-12">
                    <PartnerGrid partners={otherPartnersData} />
                </div>
            </>
        )}
      </div>
    </section>
  );
}
