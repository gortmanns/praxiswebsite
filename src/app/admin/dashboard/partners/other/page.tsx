
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PartnerCard, type Partner } from './_components/partner-card';

const otherPartnersData: Omit<Partner, 'id' | 'order'>[] = [
    {
      name: 'Go-Medical',
      websiteUrl: 'https://www.go-medical.ch/',
      logoUrl: '/images/go-medical-logo.png',
      hint: 'medical services logo',
      width: 200,
      height: 60,
      hidden: false,
    },
    {
      name: 'MCL',
      websiteUrl: 'https://www.mcl.ch/',
      logoUrl: '/images/mcl-labor-logo.png',
      hint: 'laboratory logo',
      width: 200,
      height: 60,
      hidden: false,
    },
    {
      name: 'doxnet',
      websiteUrl: 'https://www.doxnet.ch/',
      logoUrl: '/images/doxnet-logo.jpg',
      hint: 'medical network logo',
      width: 200,
      height: 60,
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
                        Dies ist eine statische Vorschau der Partnerkarten. Die Datenbearbeitung wird im nächsten Schritt wiederhergestellt.
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
