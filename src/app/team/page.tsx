
'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { TeamMemberCard } from './_components/team-member-card';
import { DoctorCard, Doctor } from './_components/doctor-card';
import Link from 'next/link';
import Image from 'next/image';

const ortmannsData: Doctor = {
    id: 'ortmanns',
    title: 'Dipl. med.',
    name: 'G. Ortmanns',
    imageUrl: '/images/team/Ortmanns.jpg',
    imageHint: 'man portrait',
    specialty: 'Praktischer Arzt',
    qualifications: [
      'Master of Public Health (UNSW)',
      'Master of Health Management (UNSW)',
    ],
    additionalInfo: 'Ärztliche und administrative Leitung Praxiszentrum im Ring',
    vita: (
      <>
        <p>
          [Platzhalter: Der ursprüngliche Vita-Text wurde durch einen Fehler des Assistenten gelöscht und muss hier neu eingefügt werden.]
        </p>
      </>
    ),
};

const schemmerData: Doctor = {
    id: 'schemmer',
    title: 'Prof. Dr. med. Dr. h.c.',
    name: 'P. Schemmer',
    imageUrl: '/images/team/Prof.Schemmer.jpg',
    imageHint: 'man portrait',
    specialty: 'Facharzt für Chirurgie',
    qualifications: [],
    additionalInfo: '',
    vita: (
      <>
        <p>
          [Platzhalter: Der ursprüngliche Vita-Text wurde durch einen Fehler des Assistenten gelöscht und muss hier neu eingefügt werden.]
        </p>
      </>
    ),
};

const rosenovData: Doctor = {
    id: 'rosenov',
    title: 'Dr. med.',
    name: 'A. Rosenov',
    imageUrl: '/images/team/Dr.Rosenov.jpg',
    imageHint: 'man portrait',
    specialty: 'Facharzt für Angiologie',
    qualifications: [],
    additionalInfo: '',
    vita: (
       <>
        <p>
          [Platzhalter: Vita-Text für Dr. Rosenov hier einfügen.]
        </p>
      </>
    ),
};

const worniData: Doctor = {
    id: 'worni',
    title: 'Prof. Dr. med.',
    name: 'Mathias Worni',
    imageUrl: '/images/team/Prof.Worni.jpg',
    imageHint: 'man portrait',
    specialty: 'Chirurgie FMH, Viszeralchirurgie',
    qualifications: [
      'Schwerpunkt spezielle Viszeralchirurgie (D)',
      'Fellow of the American College of Surgeons (FACS)',
    ],
    additionalInfo: '',
    partnerLogo: 'orthozentrum',
    vita: (
       <>
        <p>
          [Platzhalter: Der ursprüngliche Vita-Text wurde durch einen Fehler des Assistenten gelöscht und muss hier neu eingefügt werden.]
        </p>
      </>
    ),
};

const slezakData: Doctor = {
    id: 'slezak',
    title: 'Dr. med.',
    name: 'Agnieszka Slezak',
    imageUrl: '/images/team/Fr.Dr.Slezak.jpg',
    imageHint: 'woman portrait',
    specialty: 'Neurologie',
    qualifications: [],
    additionalInfo: 'Konsiliarärztin',
    partnerLogo: 'slezak',
    vita: (
      <>
        <p>
          [Platzhalter: Der ursprüngliche Vita-Text wurde durch einen Fehler des Assistenten gelöscht und muss hier neu eingefügt werden.]
        </p>
      </>
    ),
};

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

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto mt-16 max-w-5xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
              UNSER TEAM
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-7xl space-y-16">
            <div>
              <h3 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                  Ärzte
              </h3>
              <div className="mt-2 h-1 w-full bg-primary"></div>
            </div>
            
            <div id={ortmannsData.id} className="mx-auto max-w-[1000px] p-2">
                <DoctorCard {...ortmannsData} />
            </div>
            
            <div id={schemmerData.id} className="mx-auto max-w-[1000px] p-2">
                <DoctorCard {...schemmerData}>
                    <div className="relative mt-[2.5cqw] w-[30cqw]">
                        <Image
                            src="/images/schemmer-worni-logo.png"
                            alt="Schemmer & Worni Logo"
                            width={300}
                            height={100}
                            className="h-auto w-full object-contain"
                            data-ai-hint="partner logo"
                        />
                    </div>
                </DoctorCard>
            </div>
            
            <div id={rosenovData.id} className="mx-auto max-w-[1000px] p-2">
                <DoctorCard {...rosenovData}>
                    <div className="relative mt-[2.5cqw] w-[30cqw]">
                        <Image
                            src="/images/VASC-Alliance-Logo.png"
                            alt="VASC Alliance Logo"
                            width={381}
                            height={127}
                            className="h-auto w-full object-contain"
                            data-ai-hint="partner logo"
                        />
                    </div>
                </DoctorCard>
            </div>

            <div id={worniData.id} className="mx-auto max-w-[1000px] p-2">
                <DoctorCard {...worniData} />
            </div>

            <div id={slezakData.id} className="mx-auto max-w-[1000px] p-2">
                <DoctorCard {...slezakData} />
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl space-y-8">
            <div>
              <h3 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                  Praxispersonal
              </h3>
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
