
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SeedButton } from './_components/seed-button';
import { medicalPartnersData, slezakPartner } from './_components/medical-partners-data';
import DOMPurify from 'dompurify';

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


export default function MedicalPartnersPage() {
    const combinedSeedData = [...medicalPartnersData, slezakPartner];

    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-primary">Vorschau &amp; Initialisierung: Ärztliche Partner</CardTitle>
                    <CardDescription>
                       Überprüfen Sie die Darstellung der Partnerlogos. Klicken Sie danach auf den Button, um diese Daten in die Datenbank zu schreiben oder sie zurückzusetzen.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-8 rounded-lg bg-primary p-4">
                        <h3 className="mb-4 text-center font-headline text-lg font-bold text-primary-foreground">Vorschau der Seed-Daten</h3>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {combinedSeedData.map(partner => (
                                <div key={partner.name} className="h-32 w-full">
                                    <Card className="flex h-full w-full items-center justify-center bg-background p-2">
                                        <CodeRenderer html={partner.logoHtml} />
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    <SeedButton
                        collectionName="medicalPartners"
                        seedData={combinedSeedData}
                        entityName="Ärztliche Partner"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
