'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { DoctorCard, type Doctor } from './_components/doctor-card';
import { TeamMemberCard } from './_components/team-member-card';
import { SchemmerWorniLogo } from '@/components/logos/schemmer-worni-logo';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const doctorsData: Doctor[] = [
    {
        id: 'ortmanns',
        order: 1,
        title: "Dipl. med.",
        name: "G. Ortmanns",
        imageUrl: "/images/team/Ortmanns.jpg",
        imageHint: "man portrait",
        specialty: "Praktischer Arzt",
        qualifications: ['Master of Public Health (UNSW)', 'Master of Health Management (UNSW)'],
        vita: `<h4>Curriculum Vitae</h4><ul><li><span style="color: var(--color-tiptap-blue);">2022</span> Niederlassung als Hausarzt im Praxiszentrum im Ring</li><li><span style="color: var(--color-tiptap-blue);">2021-22</span> Tätigkeit in der Hausarztpraxis Dr. G. Gyger, Thun</li><li><span style="color: var(--color-tiptap-blue);">2019-21</span> Oberarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2018</span> Oberarzt Innere Medizin, Spital Interlaken</li><li><span style="color: var(--color-tiptap-blue);">2017</span> Assistenzarzt Kardiologie, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2016-17</span> Assistenzarzt Pneumologie, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2015-16</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2015</span> Erlangung des Facharzttitels für Innere Medizin</li><li><span style="color: var(--color-tiptap-blue);">2014-15</span> Assistenzarzt Intensivmedizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2013-14</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2011-13</span> Assistenzarzt Innere Medizin, Spital Interlaken</li><li><span style="color: var(--color-tiptap-blue);">2011</span> Promotion zum Dr. med.</li><li><span style="color: var(--color-tiptap-blue);">2010-11</span> Assistenzarzt Chirurgie, Klinik für Viszerale Chirurgie und Medizin, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2009</span> Staatsexamen</li><li><span style="color: var(--color-tiptap-blue);">2003-09</span> Studium der Humanmedizin an der Universität zu Köln</li></ul><br><p class="is-small">Mitgliedschaften:<br>Verbindung der Schweizer Ärztinnen und Ärzte (FMH)<br>Ärztegesellschaft des Kantons Bern (BEKAG)<br>Schweizerische Gesellschaft für Ultraschall in der Medizin (SGUM)</p>`,
        additionalInfo: "Ärztliche und administrative Leitung Praxiszentrum im Ring",
    },
    {
        id: 'schemmer',
        order: 2,
        title: "Prof. Dr. med. Dr. h. c.",
        name: "P. Schemmer",
        imageUrl: "/images/team/Prof.Schemmer.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt für Chirurgie",
        qualifications: [],
        vita: `<p>Prof. Schemmer war von 2013 bis 2022 Direktor der Universitätsklinik für Viszerale Transplantationschirurgie am Inselspital in Bern.</p><br><p>Seit 2022 ist er Chefarzt für Chirurgie an der Universitätsklinik für Allgemein-, Viszeral- und Transplantationschirurgie in Graz.</p><br><p>Seine Patienten in der Schweiz behandelt er weiterhin, neu aber wohnortnah und unkompliziert auch hier im Praxiszentrum im Ring, wo er eine regelmässige Sprechstunde abhält.</p>`,
        partnerLogoComponent: 'SchemmerWorniLogo',
    },
    {
        id: 'rosenov',
        order: 3,
        title: "Prof. Dr. med.",
        name: "A. Rosenov",
        imageUrl: "/images/team/Dr.Rosenov.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt für Angiologie",
        qualifications: [],
        vita: `<p>Prof. Rosenov hat sich bereit erklärt, ab Mai 2024 die Patienten mit Krampfaderleiden im Praxiszentrum im Ring zu behandeln.</p><br><p>Er wird regelmässig, i.d.R. am Montagnachmittag, eine Sprechstunde im Praxiszentrum anbieten.</p><br><h4>Curriculum Vitae</h4><ul><li><span style="color: var(--color-tiptap-blue);">Seit 2004</span> Chefarzt Herzchirurgie, Spital Triemli, Zürich</li><li><span style="color: var(--color-tiptap-blue);">2002</span> Habilitation und Ernennung zum Privatdozenten an der Universität Ulm</li><li><span style="color: var(--color-tiptap-blue);">1997-2004</span> Oberarzt an der Klinik für Herz-, Thorax- und Gefässchirurgie, Ulm</li><li><span style="color: var(--color-tiptap-blue);">1991-1996</span> Facharztausbildung in der Herzchirurgie an der Medizinischen Hochschule Hannover</li><li><span style="color: var(--color-tiptap-blue);">1990</span> Promotion zum Dr. med.</li><li><span style="color: var(--color-tiptap-blue);">1882-1989</span> Studium der Humanmedizin an der Westfälischen Wilhelms-Universität in Münster</li></ul>`,
        partnerLogoComponent: 'VascAllianceLogo',
    },
    {
        id: 'herschel',
        order: 4,
        title: "Dr. med.",
        name: "R. Herschel",
        imageUrl: "/images/team/Dr.Herschel.jpg",
        imageHint: "man portrait",
        specialty: <span>Facharzt für <span className="whitespace-nowrap">Orthopädische Chirurgie</span> und <span className="whitespace-nowrap">Traumatologie des Bewegungsapparates</span></span>,
        qualifications: [],
        vita: `<p>Vita folgt in Kürze.</p>`,
        partnerLogoComponent: 'OrthozentrumLogo',
    },
    {
        id: 'slezak',
        order: 5,
        title: "Dr. med.",
        name: "A. Slezak",
        imageUrl: "/images/team/Dr.Slezak.jpg",
        imageHint: "woman portrait",
        specialty: "Fachärztin für Neurologie",
        qualifications: [],
        vita: `<p>Vita folgt in Kürze.</p>`,
        partnerLogoComponent: 'AgnieszkaSlezakLogo',
    }
];

const garcia = {
    name: 'S. Garcia',
    role: 'Leitende Medizinische Praxisassistentin',
    role2: 'Berufsbildnerin',
    imageUrl: '/images/team/Garcia.jpg',
    imageHint: 'woman portrait',
    backsideContent: (
    <>
        <p>
        Früher habe ich schon einmal für rund 10 Jahre in dieser Praxis gearbeitet,
        damals noch bei Dr. Segginger.
        </p>
        <br />
        <p>
        Inzwischen bin ich – jetzt in der Funktion der Leitenden MPA –
        zurückgekehrt an meine alte Wirkungsstätte.
        </p>
    </>
    ),
};

const otherTeamMembers = [
    {
      name: 'B. Aeschlimann',
      role: 'Medizinische Praxisassistentin',
      role2: 'Berufsbildnerin',
      imageUrl: '/images/team/Aeschlimann.jpg',
      imageHint: 'woman portrait',
      backsideContent: (
        <>
          <p>
          Ich blicke zurück auf eine lange Erfahrung im Beruf als MPA, bin aber neu im Praxiszentrum im Ring.
          </p>
          <br />
          <p>
          Als Berufsbildnerin bin ich für die Ausbildung der Lernenden zur MPA verantwortlich.
          </p>
        </>
      ),
    },
    {
        name: 'K. Huber',
        role: 'Medizinische Praxisassistentin',
        imageUrl: '/images/team/Huber.jpg',
        imageHint: 'woman portrait',
        backsideContent: (
          <>
            <p>
            Viele Jahre war ich in einer kleinen chirurgischen Praxis tätig. Inzwischen jetzt zusätzlich an meist einem Tag in der Woche auch hier im Praxiszentrum im Ring.
            </p>
          </>
        ),
      },
    {
      name: 'G. Öztürk',
      role: 'Praxishilfe',
      imageUrl: '/images/team/Oetztuerk.jpg',
      imageHint: 'man portrait',
      backsideContent: (
        <>
          <p>
            Eigentlich bin ich Arzt und stamme aus der Türkei, aber noch läuft das Anerkennungsverfahren für die Qualifikation als Hausarzt hier in der Schweiz.
          </p>
          <br />
          <p>
            Dass ich aktuell „nur“ als Praxishilfe tätig bin, ist eine Auflage der Schweizer Behörden für die Anerkennung meiner Qualifikation. Hoffentlich bin ich bald als weiterer Hausarzt hier im Praxiszentrum tätig.
          </p>
        </>
      ),
    },
    {
      name: 'E. Sommer',
      role: 'Medizinische Praxisassistentin',
      role2: 'in Ausbildung',
      imageUrl: '/images/team/Sommer.jpg',
      imageHint: 'woman portrait',
      backsideContent: (
        <>
          <p>
            Ganz neu im Berufsleben und auch im Praxiszentrum im Ring, werde ich hier in den nächsten Jahren den Beruf der MPA erlernen.
          </p>
          <br />
          <p>
            Aller Anfang ist bekanntlich schwer und ich bitte um Geduld, wenn noch nicht jeder Handgriff so schnell und sicher sitzt oder mir Fehler unterlaufen.
          </p>
        </>
      ),
    },
];

const VascAllianceLogo = (props: {className?: string}) => (
    <Image
        src="/images/VASC-Alliance-Logo.png"
        alt="VASC Alliance Logo"
        width={800}
        height={268}
        className={props.className}
        data-ai-hint="partner logo"
    />
);

const logoMap: { [key: string]: React.FC<{ className?: string }> } = {
    SchemmerWorniLogo,
    AgnieszkaSlezakLogo,
    OrthozentrumLogo,
    VascAllianceLogo,
};


export default function TeamPage() {
  const [doctors] = useState<Doctor[]>(doctorsData.sort((a, b) => a.order - b.order));
  
  const sortedDoctors = useMemo(() => doctors.sort((a, b) => a.order - b.order), [doctors]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-16">
            <div id="aerzte">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Ärzte</h2>
              <div className="mt-2 h-1 w-full bg-primary"></div>
            </div>
            {sortedDoctors.map((doctor) => {
              const LogoComponent = typeof doctor.partnerLogoComponent === 'string' ? logoMap[doctor.partnerLogoComponent] : doctor.partnerLogoComponent;
              
              return (
                <div key={doctor.id} id={doctor.id} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                  <DoctorCard 
                    {...doctor}
                    partnerLogoComponent={LogoComponent as React.FC<{ className?: string; }> | undefined}
                  />
                </div>
              )
            })}

            <div id="praxispersonal">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Praxispersonal</h2>
              <div className="mt-2 h-1 w-full bg-primary"></div>
              <p className="mt-4 text-center text-lg text-foreground/80">
                Die guten Geister, ohne die keine Arztpraxis funktioniert
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <TeamMemberCard 
                  name={garcia.name}
                  role={garcia.role}
                  role2={garcia.role2}
                  imageUrl={garcia.imageUrl}
                  imageHint={garcia.imageHint}
                  backsideContent={garcia.backsideContent}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {otherTeamMembers.map((member) => (
                <div key={member.name} className="mx-auto w-full max-w-sm">
                  <TeamMemberCard 
                    name={member.name}
                    role={member.role}
                    role2={member.role2}
                    imageUrl={member.imageUrl}
                    imageHint={member.imageHint}
                    backsideContent={member.backsideContent}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
