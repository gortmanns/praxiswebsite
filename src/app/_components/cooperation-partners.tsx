import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const ZahnradIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 285 56"
    width="342"
    height="67"
    className="h-auto w-auto"
  >
    <path
      d="M48.2,35.4c-0.2-1-0.5-2-0.8-3l-2.2-0.4c-0.6-2.6-1.5-5-2.8-7.3l1.1-2c0.9-1.8,1.2-3.8,0.9-5.7 c-0.4-1.9-1.3-3.6-2.7-4.9l-1.6-1.6c-1.3-1.3-3-2.2-4.9-2.7c-1.9-0.4-3.9-0.1-5.7,0.9l-2,1.1c-2.3-1.3-4.8-2.2-7.3-2.8 l-0.4-2.2c-0.5-2.5-1.8-4.7-3.8-6.1l-2.2-1.6c-2.3-1.7-5.3-2-7.9-0.8l-2.2,1c-2.5,1.1-4.5,2.9-5.7,5.2l-1,2.2 c-2.6,0.6-5,1.5-7.3,2.8l-2-1.1c-1.8-0.9-3.8-1.2-5.7-0.9c-1.9,0.4-3.6,1.3-4.9,2.7l-1.6,1.6c-1.3,1.3-2.2,3-2.7,4.9 c-0.4,1.9-0.1,3.9,0.9,5.7l1.1,2c-1.3,2.3-2.2,4.8-2.8,7.3l-2.2,0.4c-2.5,0.5-4.7,1.8-6.1,3.8l-1.6,2.2c-1.7,2.3-2,5.3-0.8,7.9l1,2.2c1.1,2.5,2.9,4.5,5.2,5.7l2.2,1c2.6,0.6,5,1.5,7.3,2.8l-1.1,2c-0.9,1.8-1.2,3.8-0.9,5.7c0.4,1.9,1.3,3.6,2.7,4.9l1.6,1.6 c1.3,1.3,3,2.2,4.9,2.7c1.9,0.4,3.9,0.1,5.7-0.9l2-1.1c2.3,1.3,4.8,2.2,7.3,2.8l0.4,2.2c0.5,2.5,1.8,4.7,3.8,6.1l2.2,1.6 c2.3,1.7,5.3,2,7.9,0.8l2.2-1c2.5-1.1,4.5-2.9,5.7-5.2l1-2.2c2.6-0.6,5-1.5,7.3-2.8l2,1.1c1.8,0.9,3.8,1.2,5.7,0.9 c1.9-0.4,3.6-1.3,4.9-2.7l1.6-1.6c1.3-1.3,2.2-3,2.7-4.9c0.4-1.9,0.1-3.9-0.9-5.7l-1.1-2c1.3-2.3,2.2-4.8,2.8-7.3l2.2-0.4 c2.5-0.5,4.7-1.8,6.1-3.8l1.6-2.2c1.7-2.3,2-5.3,0.8-7.9l-1-2.2c-1.1-2.5-2.9-4.5-5.2-5.7l-2.2-1c-2.6-0.6-5-1.5-7.3-2.8l1.1-2 c0.9-1.8,1.2-3.8,0.9-5.7c-0.4-1.9-1.3-3.6-2.7-4.9l-1.6-1.6c-1.3-1.3-3-2.2-4.9-2.7c-1.9-0.4-3.9-0.1-5.7,0.9l-2,1.1 c-2.3,1.3-4.8,2.2-7.3,2.8l-0.4,2.2c-0.5,2.5-1.8,4.7-3.8,6.1l-2.2,1.6c-2.3,1.7-5.3,2-7.9,0.8l-2.2-1c-2.5-1.1-4.5-2.9-5.7-5.2 l-1-2.2c-2.6,0.6-5,1.5-7.3,2.8l-2-1.1c-1.8-0.9-3.8-1.2-5.7-0.9c-1.9,0.4-3.6,1.3-4.9,2.7l-1.6,1.6c-1.3,1.3-2.2,3-2.7,4.9 c-0.4,1.9-0.1,3.9,0.9,5.7l1.1,2c-1.3,2.3-2.2,4.8-2.8,7.3l-2.2,0.4c-2.5,0.5-4.7,1.8-6.1,3.8l-1.6,2.2C50.2,40.7,49.8,37.7,48.2,35.4z M28,38.8c-5.9,0-10.8-4.8-10.8-10.8s4.8-10.8,10.8-10.8s10.8,4.8,10.8,10.8S33.9,38.8,28,38.8z"
      fill="#00aaef"
    />
    <text
      x="65"
      y="38"
      fontFamily="Montserrat, sans-serif"
      fontSize="24"
      fontWeight="bold"
      fill="#003359"
    >
      orthozentrum-bern
    </text>
  </svg>
);


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
      name: 'Zahnrad',
      websiteUrl: 'https://www.orthozentrum-bern.ch/',
      isSvg: true,
    },
  ];
  return (
    <section id="partners" className="bg-primary">
      <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
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
                    <ZahnradIcon />
                  ) : (
                    <div className="relative flex h-[80px] w-[280px] items-center justify-center">
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
          ))}
        </div>
      </div>
    </section>
  );
}
