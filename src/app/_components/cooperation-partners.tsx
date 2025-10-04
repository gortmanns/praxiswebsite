import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function CooperationPartnersSection() {
  const partners = [
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
      name: 'MCL',
      logoUrl:
        'https://www.mcl.ch/Portals/3/LOGO%20MCL%20DE%20WEB%20513X126.png?ver=cvc-6YjvCrM5oNcznlXoCQ%3d%3d',
      websiteUrl: 'https://www.mcl.ch/',
    },
  ];
  return (
    <section id="partners" className="bg-muted/50">
      <div className="container py-16 text-center sm:py-24">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Unsere Kooperationspartner
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="flex h-full items-center justify-center p-6 transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-0">
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} Logo`}
                    width={200}
                    height={80}
                    className="h-auto max-h-20 w-auto object-contain"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
