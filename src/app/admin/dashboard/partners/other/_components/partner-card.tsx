
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

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
    return (
        <Link
          href={props.websiteUrl || '#'}
          target={props.websiteUrl === '#' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="group relative h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Card className="flex h-full w-full items-center p-6 bg-card">
            <CardContent className="flex w-full items-center justify-center p-0">
                {props.logoUrl ? (
                    <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                        <Image
                            src={props.logoUrl}
                            alt={`${props.name} Logo`}
                            width={props.width || 150}
                            height={props.height || 50}
                            className="object-contain"
                            data-ai-hint={props.hint}
                        />
                    </div>
                ) : (
                    <span className="text-lg font-bold">{props.name}</span>
                )}
            </CardContent>
          </Card>
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Link>
    );
};
