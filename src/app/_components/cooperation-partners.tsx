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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="200"
                      height="50"
                      viewBox="0 0 379.79 70.36"
                      aria-label="orthozentrum-bern Logo"
                      className="text-foreground"
                      style={{ color: '#4d4d4d' }}
                    >
                      <g>
                        <path
                          d="M35.18,0A35.18,35.18,0,0,0,20.5,67.65L24,58.53a25.86,25.86,0,1,1,22.39,0l3.49,9.12A35.18,35.18,0,0,0,35.18,0Z"
                          style={{ fill: '#00aaef' }}
                        ></path>
                        <path
                          d="M35.18,13.6a21.58,21.58,0,1,0,21.58,21.58A21.58,21.58,0,0,0,35.18,13.6Zm12.6,23.33H38.1v9.68a2.92,2.92,0,0,1-5.84,0V36.93H22.58a2.92,2.92,0,1,1,0-5.84h9.68V21.41a2.92,2.92,0,0,1,5.84,0v9.68h9.68a2.92,2.92,0,1,1,0,5.84Z"
                          style={{ fill: '#fff' }}
                        ></path>
                      </g>
                      <g
                        style={{
                          isolation: 'isolate',
                        }}
                      >
                        <text
                          transform="translate(80.63 46.51)"
                          fontSize="43"
                          fill="currentColor"
                          fontFamily="Prompt-Regular, Prompt"
                        >
                          orthozentrum-bern
                        </text>
                      </g>
                    </svg>
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
