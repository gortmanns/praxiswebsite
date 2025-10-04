import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const ZahnradIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="280"
    height="80"
    viewBox="0 0 280 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M51.1348 39.9999C51.1348 46.155 46.1551 51.1347 40.0001 51.1347C33.845 51.1347 28.8653 46.155 28.8653 39.9999C28.8653 33.8448 33.845 28.8652 40.0001 28.8652C46.1551 28.8652 51.1348 33.8448 51.1348 39.9999Z"
      stroke="#00aaef"
      strokeWidth="3"
    />
    <path
      d="M40 23.3333V16.6666M40 63.3333V56.6666M50.2442 29.7557L54.7041 25.2958M25.2959 54.704L29.7558 50.2441M50.2442 50.2441L54.7041 54.704M25.2959 25.2958L29.7558 29.7557M23.3334 40H16.6667M63.3334 40H56.6667"
      stroke="#00aaef"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <text
      x="75"
      y="45"
      fontFamily="Montserrat, sans-serif"
      fontSize="16"
      fontWeight="bold"
      fill="hsl(var(--foreground))"
      className="text-foreground"
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
                     <ZahnradIcon />
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
