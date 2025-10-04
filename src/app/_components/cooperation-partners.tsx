import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const ZahnradIcon = () => (
  <svg
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 59.9 55.5"
    xmlns="http://www.w3.org/2000/svg"
    className="h-auto max-h-20 w-auto object-contain"
    aria-label="Zahnrad Logo"
  >
    <g>
      <path
        d="M46.7 7.8S44.5 3.9 40 3.9H20.8s-4.4 0-6.7 3.9L4.6 24.4s-2.2 3.9 0 7.7l9.6 16.6s2.2 3.9 6.7 3.9H40s4.4 0 6.7-3.9l9.6-16.6s2.2-3.9 0-7.7L46.7 7.8z"
        fill="none"
        stroke="#588791"
        strokeWidth="1.639"
      ></path>
      <path
        d="M24 52.4c-1.1-3.4-3.1-8-5.1-11.1-.6-.9-1-1.9-1.2-2.9-.3-1.8.9-3.2 2.9-3.5 6.5-1 13-1 19.5 0 2.2.3 3.4 2 2.9 4-.2.7-.5 1.4-1 2.1-2 3.1-4.1 8-5.2 11.4"
        fill="none"
        stroke="#588791"
        strokeWidth="1.639"
      ></path>
      <path
        d="M35.4 4.4c.4 3.8 1.7 8 4.1 11.3 1.8 2.4 3.1 2.6 3.7 5.6.5 2.5-.3 6.9-2.3 7.9-2.3 1.2-4.6 1-6.8-.4-1.4-1.2-2.4-1.4-3.6-1.3-1.3 0-2.3.2-3.6 1.3-2.2 1.5-4.4 1.6-6.8.4-2-1-2.8-5.3-2.3-7.9.6-3 1.9-3.2 3.7-5.6 2.4-3.2 3.7-7.4 4.1-11.3"
        fill="none"
        stroke="#588791"
        strokeWidth="1.639"
      ></path>
    </g>
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
      websiteUrl: '#',
      isSvg: true,
    },
  ];
  return (
    <section id="partners" className="bg-primary">
      <div className="container py-16 text-center sm:py-24">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary-foreground">
          Unsere Kooperationspartner
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.websiteUrl}
              target={partner.websiteUrl === '#' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="flex h-full items-center justify-center p-6 transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-0">
                  {partner.isSvg ? (
                    <ZahnradIcon />
                  ) : (
                    <Image
                      src={partner.logoUrl!}
                      alt={`${partner.name} Logo`}
                      width={200}
                      height={80}
                      className="h-auto max-h-20 w-auto object-contain"
                    />
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
