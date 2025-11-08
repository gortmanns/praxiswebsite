
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ClientLayout from '../_components/ClientLayout';

const services = [
  {
    name: 'Audiometry',
    image: '/images/leistungen/audiometrie.jpg',
    hint: 'audiometry test',
    backsideContent: (
      <>
        <p>Through orienting audiometry (hearing test), we can easily detect hearing loss and, if necessary, refer you for treatment by a specialist (ENT doctor).</p>
      </>
    ),
  },
  {
    name: 'ECG',
    image: '/images/leistungen/ekg.jpg',
    hint: 'ecg machine',
    backsideContent: (
      <>
        <p>With our modern, digital 12-channel ECG, we can analyze the electrical signals of your heart and detect potential problems such as atrial fibrillation and arrhythmias at an early stage.</p>
      </>
    ),
  },
  {
    name: 'Extended Health Check-up',
    image: '/images/leistungen/Gesundheitscheck.jpg',
    hint: 'health checkup',
    backsideContent: (
      <>
        <p>Unfortunately, basic insurance only covers preventive check-ups to a very limited extent. We are happy to perform further analyses, such as determining vitamin and mineral levels, as a private additional service.</p>
      </>
    ),
  },
  {
    name: 'In-house Laboratory',
    image: '/images/leistungen/labor.jpg',
    hint: 'lab technician microscope',
    backsideContent: (
      <>
        <p>In our modern in-house laboratory, we can perform many analyses during the consultation, ensuring treatment can begin without delay.</p>
        <br />
        <p>For analyses that we cannot perform on-site, we collaborate with MCL, one of the largest laboratory service providers in Switzerland.</p>
        <br />
        <p>Upon request, we also conduct lab tests not covered by basic insurance (e.g., vitamin level determinations or Covid tests).</p>
      </>
    ),
  },
  {
    name: 'In-house Pharmacy',
    image: '/images/leistungen/praxisapotheke.jpg',
    hint: 'pharmacy shelf medication',
    backsideContent: (
      <>
        <p>As a self-dispensing practice, we supply you with the necessary medications from our well-stocked in-house pharmacy. The storage and dispensing of medications are, of course, carried out in accordance with legal regulations.</p>
      </>
    ),
  },
  {
    name: 'Travel Medicine Consultations',
    image: '/images/leistungen/Reisemedizin.jpg',
    hint: 'travel medicine',
    backsideContent: (
      <>
        <p>We are happy to advise you on recommended vaccinations and other relevant preventive measures before your trip. This is a private service not covered by basic insurance; billing is based on time and effort.</p>
      </>
    ),
  },
    {
    name: 'RSV Vaccination',
    image: '/images/leistungen/RSV-Impfung.jpg',
    hint: 'vaccination rsv',
    backsideContent: (
      <>
        <p>RSV stands for human Respiratory Syncytial Virus, which causes severe respiratory diseases. Already standard in other countries, the now available vaccine is not yet covered by basic insurance in Switzerland. If you have supplementary insurance and are over 65 or a high-risk patient due to other illnesses, we are happy to submit a request for cost approval to your supplementary insurance.</p>
      </>
    ),
  },
  {
    name: 'X-ray',
    image: '/images/leistungen/roentgen.jpg',
    hint: 'x-ray scan',
    backsideContent: (
      <>
        <p>With our fully digital X-ray machine, we can quickly and easily detect bone fractures, pneumonia, and other problems, and then initiate the necessary treatment without delay.</p>
      </>
    ),
  },
  {
    name: 'Spirometry',
    image: '/images/leistungen/spirometrie.jpg',
    hint: 'spirometry test',
    backsideContent: (
      <>
        <p>Through lung function testing (spirometry), a suspicion of a lung disease such as asthma or COPD can be identified early and appropriate treatment can be initiated.</p>
      </>
    ),
  },
  {
    name: 'TWINT',
    image: '/images/leistungen/twint_logo.png',
    hint: 'twint logo',
    backsideContent: (
      <>
        <p>You can pay for additional services not only in cash but also modernly and conveniently with your smartphone via TWINT.</p>
        <br />
        <p>Of course, we will continue to bill all services covered by your insurance company directly to them.</p>
      </>
    ),
  },
  {
    name: 'Driving Fitness Examinations',
    image: '/images/leistungen/VMU.png',
    hint: 'driving test eye chart',
    backsideContent: (
      <>
        <p>We conduct Level 1 driving fitness examinations (for seniors). This is an elective service and not covered by health insurance.</p>
      </>
    ),
  },
  {
    name: 'Wound Care & Minor Surgery',
    image: '/images/leistungen/wundversorgung.jpg',
    hint: 'wound dressing',
    backsideContent: (
      <>
        <p>We can take care of small wounds and perform minor procedures (e.g., removal of skin lesions) directly during normal consultation hours.</p>
        <br/>
        <p>For larger procedures, specialist <Link href="/team-en#prof-dr-med-dr-h-c-peter-schemmer" className="underline hover:text-primary">Prof. Dr. med. Dr. h. c. P. Schemmer</Link> is available, offering consultations at the practice center several times a month.</p>
      </>
    ),
  }
].sort((a, b) => a.name.localeCompare(b.name));

export default function ServicesPage() {
  return (
    <ClientLayout>
      <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                  OUR SERVICES
              </h2>
          </div>

          <div className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
                <div key={service.name} className="group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-2xl transition-transform duration-500">
                  <div className="flex items-center justify-center p-4 min-h-[9rem]">
                      <div className="text-center">
                        <h3 className="font-headline text-2xl font-bold text-primary">
                          {service.name === 'TWINT' ? (
                              <>
                                  TWINT
                                  <br />
                                  <span className="text-xl">Pay with your phone</span>
                              </>
                          ) : service.name}
                        </h3>
                      </div>
                  </div>
                  <div className={cn("relative w-full aspect-square", service.name === 'TWINT' && "bg-black")}>
                      <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover"
                          data-ai-hint={service.hint}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                  </div>
                  {service.backsideContent && (
                        <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                            <div className="text-center text-lg">
                                {service.backsideContent}
                            </div>
                        </div>
                    )}
                </div>
              ))}
          </div>
      </div>
    </ClientLayout>
  );
}
