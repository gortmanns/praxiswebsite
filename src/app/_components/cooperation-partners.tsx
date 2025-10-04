import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export function CooperationPartnersSection() {
  const partners = [
    {
      name: 'VASC-ALLIANCE',
      logoUrl:
        'https://www.vasc-alliance.ch/view/data/10907/VASC-Alliance-Logo.png',
      websiteUrl: 'https://www.vasc-alliance.ch/',
      isSvg: false,
    },
    {
      name: 'Schemmer & Worni',
      logoUrl:
        'https://schemmer-worni.ch/wp-content/uploads/2025/02/logo_de.png',
      websiteUrl: 'https://schemmer-worni.ch/',
      isSvg: false,
    },
    {
      name: 'MCL',
      logoUrl:
        'https://www.mcl.ch/Portals/3/LOGO%20MCL%20DE%20WEB%20513X126.png?ver=cvc-6YjvCrM5oNcznlXoCQ%3d%3d',
      websiteUrl: 'https://www.mcl.ch/',
      isSvg: false,
    },
    {
      name: 'orthozentrum-bern',
      websiteUrl: 'https://www.orthozentrum-bern.ch/',
      isSvg: true,
    },
  ];
  return (
    <section id="partners" className="bg-primary">
      <div className="container mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Unsere Kooperationspartner
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.websiteUrl}
              target={partner.websiteUrl === '#' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="flex min-h-[144px] items-center p-6 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                <CardContent className="flex w-full items-center justify-center p-0">
                  {partner.isSvg ? (
                    <OrthozentrumLogo className="h-16 w-auto" />
                  ) : (
                    <div className="relative flex h-[80px] w-full items-center justify-center overflow-hidden">
                      <Image
                        src={partner.logoUrl!}
                        alt={`${partner.name} Logo`}
                        fill
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
