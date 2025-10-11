
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface Partner {
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

const PartnerCard: React.FC<Partner> = (props) => {
    return (
        <Link
          href={props.websiteUrl || '#'}
          target={props.websiteUrl === '#' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="group relative h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Card className="flex h-full w-full items-center bg-card p-6">
            <CardContent className="flex w-full items-center justify-center p-0">
                {props.logoUrl ? (
                    <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                        <Image
                            src={props.logoUrl}
                            alt={`${props.name} Logo`}
                            width={props.width || 200}
                            height={props.height || 60}
                            className="object-contain"
                            data-ai-hint={props.hint}
                            style={props.name === 'Go-Medical' ? { position: 'relative', top: '10px' } : {}}
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


const otherPartnersData: Omit<Partner, 'id' | 'order'>[] = [
    {
      name: 'Go-Medical',
      websiteUrl: 'https://www.go-medical.ch/',
      logoUrl: '/images/go-medical-logo.png',
      hint: 'medical services logo',
      width: 242,
      height: 73,
      hidden: false,
    },
    {
      name: 'MCL',
      websiteUrl: 'https://www.mcl.ch/',
      logoUrl: '/images/mcl-labor-logo.png',
      hint: 'laboratory logo',
      width: 254,
      height: 77,
      hidden: false,
    },
    {
      name: 'doxnet',
      websiteUrl: 'https://www.doxnet.ch/',
      logoUrl: '/images/doxnet-logo.jpg',
      hint: 'medical network logo',
      width: 220,
      height: 66,
      hidden: false,
    },
];


export default function OtherPartnersPage() {
    const staticPartners: Partner[] = otherPartnersData.map((p, i) => ({
        ...p,
        id: `static-${i}`,
        order: i + 1
    }));

    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-primary">Vorschau: Sonstige Kooperationspartner</CardTitle>
                    <CardDescription>
                        Dies ist eine statische Vorschau der Partnerkarten.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="rounded-lg bg-primary p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {staticPartners.map(partner => (
                             <div key={partner.id} className="flex flex-col gap-2 p-2">
                                <PartnerCard {...partner} />
                            </div>
                        ))}
                     </div>
                </CardContent>
            </Card>
        </div>
    );
}
