'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';

export function CooperationPartnersSection() {
  const topPartners = [
    {
      name: 'VASC-ALLIANCE',
      logoUrl: '/images/VASC-Alliance-Logo.png',
      websiteUrl: 'https://www.vasc-alliance.ch/',
      hint: 'partner logo',
      width: 495,
      height: 165,
    },
    {
      name: 'Schemmer & Worni',
      logoUrl: '/images/schemmer-worni-logo.png',
      websiteUrl: 'https://schemmer-worni.ch/de/',
      hint: 'partner logo',
      width: 390,
      height: 130,
    },
    {
      name: 'orthozentrum-bern',
      websiteUrl: 'https://www.orthozentrum-bern.ch/',
      hint: 'partner logo',
    },
  ];

  const otherPartners = [
    {
      name: 'go-medical',
      logoUrl: '/images/go-medical-logo.png',
      websiteUrl: '#',
      hint: 'partner logo',
      width: 390,
      height: 130,
    },
    {
      name: 'MCL',
      logoUrl: '/images/mcl-labor-logo.png',
      websiteUrl: 'https://www.mcl.ch/de-de/',
      hint: 'partner logo',
      width: 390,
      height: 130,
    },
    {
      name: 'doxnet',
      logoUrl: '/images/doxnet-logo.jpg',
      websiteUrl: 'https://www.doxnet.ch/',
      hint: 'partner logo',
      width: 316,
      height: 105,
    },
  ];

  return (
    <section id="partners" className="w-full bg-primary">
      <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Unsere ärztlichen Kooperationspartner
        </h2>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {topPartners.map(partner => (
            <Link
              key={partner.name}
              href={partner.websiteUrl!}
              target={partner.websiteUrl === '#' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group relative h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <Card className="flex h-full w-full items-center p-6">
                <CardContent className="flex w-full items-center justify-center p-0">
                  {partner.logoUrl ? (
                    <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                      <Image
                        src={partner.logoUrl}
                        alt={`${partner.name} Logo`}
                        width={partner.width}
                        height={partner.height}
                        className="object-contain"
                        data-ai-hint={partner.hint}
                      />
                    </div>
                  ) : partner.name === 'orthozentrum-bern' ? (
                     <OrthozentrumLogo className="h-24 w-auto" />
                  ) : null}
                </CardContent>
              </Card>
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>
          ))}
           <Link
              key="slezak-as-ortho"
              href="https://neurologie-plus.ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <Card className="flex h-full w-full items-center p-6">
                <CardContent className="flex w-full items-center justify-center p-0">
                   <AgnieszkaSlezakLogo className="h-24 w-auto text-special-green" />
                </CardContent>
              </Card>
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>
        </div>


        <h3 className="mt-16 text-center font-headline text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
          Unsere weiteren Partner
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-8">
          <div className="hidden lg:block"></div>
          {otherPartners.map(partner => (
            partner.websiteUrl === '#' ? (
              <div key={partner.name} className="group relative sm:col-span-1 lg:col-span-2 h-32 w-full overflow-hidden rounded-lg shadow-lg">
                <Card className="flex h-full w-full items-center justify-center p-6">
                  <CardContent className="flex w-full items-center justify-center p-0">
                    <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                      <Image
                        src={partner.logoUrl!}
                        alt={`${partner.name} Logo`}
                        width={partner.width}
                        height={partner.height}
                        className="object-contain"
                        data-ai-hint={partner.hint}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Link
                key={partner.name}
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative sm:col-span-1 lg:col-span-2 h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Card className="flex h-full w-full items-center justify-center p-6">
                  <CardContent className="flex w-full items-center justify-center p-0">
                    <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                      <Image
                        src={partner.logoUrl!}
                        alt={`${partner.name} Logo`}
                        width={partner.width}
                        height={partner.height}
                        className="object-contain"
                        data-ai-hint={partner.hint}
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
            )
          ))}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
