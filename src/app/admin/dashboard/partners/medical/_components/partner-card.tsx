
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';


export interface Partner {
    id: string;
    order: number;
    name: string;
    websiteUrl: string;
    logoUrl: string;
    hint?: string;
    width?: number;
    height?: number;
    hidden?: boolean;
}

export const PartnerCard: React.FC<Partner> = (props) => {
    
    const renderPartnerLogo = (partner: Partner) => {
        if (partner.name === 'orthozentrum-bern') {
          return <OrthozentrumLogo className="h-full w-full object-contain" />;
        }
        if (partner.name === 'Agnieszka Slezak') {
            return <AgnieszkaSlezakLogo className="h-full w-full object-contain" />;
        }
        if (props.logoUrl) {
            return (
                <Image
                    src={props.logoUrl}
                    alt={`${props.name} Logo`}
                    width={props.width || 200}
                    height={props.height || 60}
                    className="object-contain"
                    data-ai-hint={props.hint}
                />
            )
        }
        return <span className="text-lg font-bold">{props.name}</span>;
      };

    return (
        <Link
          href={props.websiteUrl || '#'}
          target={props.websiteUrl === '#' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Card className="flex h-full w-full items-center bg-card p-6">
            <CardContent className="flex w-full items-center justify-center p-0">
                <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                    {renderPartnerLogo(props)}
                </div>
            </CardContent>
          </Card>
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Link>
    );
};
