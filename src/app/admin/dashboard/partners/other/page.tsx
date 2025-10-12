
'use client';

import React from 'react';
import { PartnerEditor as EditorComponent } from './_components/partner-editor';
import { ReusableCardManager } from '../../_components/reusable-card-manager';
import type { OtherPartner as CardData } from '@/docs/backend-types';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const initialPartnerState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Partner",
    websiteUrl: "https://example.com",
    logoUrl: "https://picsum.photos/seed/otherpartner/400/130",
    openInNewTab: true,
    hidden: false,
    logoScale: 100,
    logoX: 0,
    logoY: 0,
};

const DisplayCard: React.FC<CardData> = (props) => {
    return (
        <Link
            href={props.websiteUrl || '#'}
            target={props.openInNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={(e) => e.preventDefault()}
        >
            <Card className="flex h-full w-full items-center justify-center p-2 bg-background">
                <CardContent className="relative flex w-full h-full items-center justify-center p-0 overflow-hidden">
                   {props.logoUrl ? (
                        <Image
                            src={props.logoUrl}
                            alt={`${props.name} Logo`}
                            fill
                            className="object-contain"
                            style={{
                                transform: `scale(${ (props.logoScale || 100) / 100}) translate(${props.logoX || 0}px, ${props.logoY || 0}px)`,
                                transformOrigin: 'center center',
                            }}
                        />
                   ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">Kein Logo</div>
                   )}
                </CardContent>
            </Card>
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Link>
    );
};


export default function OtherPartnersPage() {
    return (
        <ReusableCardManager
            collectionName="otherPartners"
            pageTitle="Sonstige Kooperationspartner"
            pageDescription="Verwalten Sie die sonstigen Kooperationspartner, die auf der Startseite angezeigt werden."
            initialCardState={initialPartnerState}
            DisplayCardComponent={DisplayCard}
            EditorCardComponent={EditorComponent}
            entityName="Partner"
        />
    );
}
