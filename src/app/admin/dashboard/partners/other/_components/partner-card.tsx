
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { OtherPartner } from '@/docs/backend-types';


export const PartnerCard: React.FC<OtherPartner> = (props) => {
    const target = props.openInNewTab ? '_blank' : '_self';
    const rel = props.openInNewTab ? 'noopener noreferrer' : undefined;

    return (
        <Link
          href={props.websiteUrl || '#'}
          target={target}
          rel={rel}
          className="group relative h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Card className="flex h-full w-full items-center bg-card p-6">
            <CardContent className="flex w-full items-center justify-center p-0">
                <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                    {props.logoUrl ? (
                        <Image
                            src={props.logoUrl}
                            alt={`${props.name} Logo`}
                            width={400}
                            height={225}
                            className="object-contain"
                        />
                    ) : (
                        <span className="text-lg font-bold">{props.name}</span>
                    )}
                </div>
            </CardContent>
          </Card>
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Link>
    );
};
