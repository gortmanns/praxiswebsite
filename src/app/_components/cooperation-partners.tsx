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
      width: 363,
      height: 121,
    },
    {
      name: 'Schemmer & Worni',
      logoUrl: '/images/schemmer-worni-logo.png',
      websiteUrl: 'https://schemmer-worni.ch/de/',
      hint: 'partner logo',
      width: 300,
      height: 100,
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
      websiteUrl: 'https://www.go-medical.ch/',
      hint: 'partner logo',
      width: 300,
      height: 100,
    },
    {
      name: 'MCL',
      logoUrl: '/images/mcl-labor-logo.png',
      websiteUrl: 'https://www.mcl.ch/de-de/',
      hint: 'partner logo',
      width: 300,
      height: 100,
    },
    {
      name: 'doxnet',
      logoUrl: '/images/doxnet_logo.png',
      websiteUrl: 'https://www.doxnet.ch/',
      hint: 'partner logo',
      width: 300,
      height: 100,
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
              className="group"
            >
              <Card className="flex h-32 items-center p-6 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
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
                    <OrthozentrumLogo className="h-20 w-auto" />
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          ))}
          <Link
            href="https://neurologie-plus.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="flex h-32 items-center justify-center p-6 text-center text-special-green transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
              <CardContent className="p-0">
                <AgnieszkaSlezakLogo className="h-20 w-auto" />
              </CardContent>
            </Card>
          </Link>
        </div>
        <h3 className="mt-16 text-center font-headline text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
          Unsere weiteren Partner
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-8">
          <div className="hidden lg:block"></div> {/* Empty spacer */}
          {otherPartners.map(partner => (
            <Link
              key={partner.name}
              href={partner.websiteUrl}
              target={partner.websiteUrl === '#' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group sm:col-span-1 lg:col-span-2"
            >
              <Card className="flex h-32 items-center justify-center p-6 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
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
            </Link>
          ))}
          <div className="hidden lg:block"></div> {/* Empty spacer */}
        </div>
      </div>
    </section>
  );
}
