import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';

export function CooperationPartnersSection() {
  const topPartners = [
    {
      name: 'VASC-ALLIANCE',
      logoUrl:
        'https://www.vasc-alliance.ch/view/data/10907/VASC-Alliance-Logo.png',
      websiteUrl: 'https://www.vasc-alliance.ch/',
    },
    {
      name: 'Schemmer & Worni',
      logoUrl:
        'https://schemmer-worni.ch/wp-content/uploads/2025/02/logo_de.png',
      websiteUrl: 'https://schemmer-worni.ch/',
    },
    {
      name: 'orthozentrum-bern',
      websiteUrl: 'https://www.orthozentrum-bern.ch/',
    },
  ];

  const otherPartners = [
    {
        name: 'go-medical',
        logoUrl: 'http://www.praxiszentrum-im-ring.ch//images/2024/08/18/go-medical-logo-600x117.png',
        websiteUrl: '#'
    },
    {
        name: 'MCL',
        logoUrl:
        'https://www.mcl.ch/Portals/3/LOGO%20MCL%20DE%20WEB%20513X126.png?ver=cvc-6YjvCrM5oNcznlXoCQ%3d%3d',
        websiteUrl: 'https://www.mcl.ch/',
    },
    {
        name: 'doxnet',
        logoUrl: 'http://www.praxiszentrum-im-ring.ch//images/2024/08/18/doxnet_logo_rgb1.jpg',
        websiteUrl: '#'
    }
  ];


  return (
    <section id="partners" className="w-full bg-primary">
      <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Unsere ärztlichen Kooperationspartner
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {topPartners.map((partner) => {
            return (
              <Link
                key={partner.name}
                href={partner.websiteUrl!}
                target={partner.websiteUrl === '#' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="flex h-32 items-center p-6 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardContent className="flex w-full items-center justify-center p-0">
                    {partner.name === 'VASC-ALLIANCE' ? (
                      <Image
                        src={partner.logoUrl!}
                        alt={`${partner.name} Logo`}
                        width={340}
                        height={100}
                        className="h-auto w-full object-contain"
                      />
                    ) : partner.name === 'Schemmer & Worni' ? (
                      <div className="relative flex h-[55px] w-full items-center justify-center overflow-hidden">
                        <Image
                          src={partner.logoUrl!}
                          alt={`${partner.name} Logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : partner.name === 'orthozentrum-bern' ? (
                      <OrthozentrumLogo className="h-20 w-auto" />
                    ) : (
                      <div className="relative flex h-[50px] w-full items-center justify-center overflow-hidden">
                        <Image
                          src={partner.logoUrl!}
                          alt={`${partner.name} Logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
          <Card className="flex h-32 items-center justify-center p-6 text-center text-special-green">
            <CardContent className="p-0">
              <AgnieszkaSlezakLogo className="h-20 w-auto" />
            </CardContent>
          </Card>
        </div>
        <h3 className="mt-16 text-center font-headline text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
          Unsere weiteren Partner
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-start-2">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {otherPartners.map((partner) => (
                  <Link
                      key={partner.name}
                      href={partner.websiteUrl}
                      target={partner.websiteUrl === '#' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className='group'
                  >
                      <Card className="flex h-32 items-center justify-center p-6 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                          <CardContent className="flex w-full items-center justify-center p-0">
                              <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                                  <Image
                                  src={partner.logoUrl!}
                                  alt={`${partner.name} Logo`}
                                  fill
                                  className="object-contain"
                                  />
                              </div>
                          </CardContent>
                      </Card>
                  </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
