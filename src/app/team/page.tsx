'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { TeamMemberCard } from './_components/team-member-card';
import { DoctorCard, Doctor } from './_components/doctor-card';
import Link from 'next/link';

const doctors: Doctor[] = [
    {
      id: 'ortmanns',
      title: 'Dipl. med.',
      name: 'G. Ortmanns',
      imageUrl: '/images/team/Ortmanns.jpg',
      imageHint: 'man portrait',
      specialty: 'Allgemeine Innere Medizin FMH',
      qualifications: ['Fähigkeitsausweis Praxislabor (KHM)'],
      additionalInfo: '(Ärztliche und administrative Leitung)',
      vita: (
        <>
            <p>Schon während meines Medizinstudiums in Deutschland war mir klar, dass ich Hausarzt werden möchte. Und nachdem ich meine Frau (eine Schweizerin) kennengelernt habe, war auch klar, wo: nämlich hier in der Schweiz.</p><br />
            <p>Nach vielen Jahren der Ausbildung in verschiedenen Spitälern und Praxen in der Schweiz (und einem kurzen Abstecher zurück nach Deutschland) habe ich mich dann nach einer Praxis umgeschaut, die ich übernehmen und nach meinen Vorstellungen weiterentwickeln kann. Fündig geworden bin ich hier in Hinterkappelen, wo ich zum Jahreswechsel 2022/2023 die Praxis von Dr. Segginger übernommen habe.</p><br />
            <p>Zusammen mit meiner Frau und unseren beiden kleinen Kindern lebe ich in der Nähe von Bern und geniesse die vielfältigen Möglichkeiten, welche die Schweiz zu bieten hat. Dass ich nun auch hier arbeiten darf, macht mich glücklich und dankbar.</p>
        </>
      )
    },
    {
        id: 'herschel',
        title: 'Dr. med.',
        name: 'Heike Herschel',
        imageUrl: '/images/team/Dr.Herschel.jpg',
        imageHint: 'woman portrait',
        specialty: 'Allgemeine Innere Medizin FMH',
        qualifications: [],
        additionalInfo: '(angestellte Ärztin)',
        vita: (
          <>
            <p>Nach vielen Jahren in eigener Praxis im Kanton Solothurn wollte ich mich eigentlich zur Ruhe setzen. Aber so ganz ohne ärztliche Tätigkeit fehlte mir dann doch etwas. Insofern bin ich froh, dass ich hier im Praxiszentrum im Ring in einem Teilzeitpensum weiter für meine Patientinnen und Patienten da sein kann.</p>
          </>
        )
      },
    {
      id: 'slezak',
      title: 'Dr. med.',
      name: 'Agnieszka Slezak',
      imageUrl: '/images/team/Dr.Slezak.jpg',
      imageHint: 'woman portrait',
      specialty: 'Fachärztin für Neurologie FMH',
      qualifications: ['Zertifikat für Elektroneuromyographie (EMG)'],
      additionalInfo: '',
      partnerLogo: 'slezak',
      vita: (
        <>
          <p>Als selbstständige Neurologin mit eigener Praxis in Bern bin ich froh, durch die Kooperation mit dem Praxiszentrum im Ring nun auch eine Sprechstunde in Hinterkappelen anbieten zu können.</p>
          <br />
          <p>
            Mein Angebot umfasst das gesamte Spektrum neurologischer Abklärungen
            und Behandlungen, unter anderem bei Kopfschmerzen, Schwindel,
            Gedächtnisstörungen, Parkinson, Epilepsie, multipler Sklerose und
            Schlaganfallfolgen.
          </p>
          <br />
          <p>Weitere Informationen zu meiner Person und meiner Tätigkeit finden Sie auf meiner Webseite unter <Link href="https://neurologie-plus.ch/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">www.neurologie-plus.ch</Link></p>
        </>
      ),
    },
    {
        id: 'schemmer',
        title: 'Prof. Dr. med. Dr. h.c.',
        name: 'Wilko. W. Schemmer',
        imageUrl: '/images/team/Prof.Schemmer.jpg',
        imageHint: 'man portrait',
        specialty: 'Chirurgie FMH, Viszeralchirurgie',
        qualifications: [
          'Schwerpunkt spezielle Viszeralchirurgie (D)',
          'Fellow of the American College of Surgeons (FACS)',
        ],
        additionalInfo: '',
        vita: (
          <>
            <p>Seit 2017 bin ich als Chefarzt der Klinik für Allgemein-, Viszeral- und Transplantationschirurgie am Kantonsspital St. Gallen tätig. Davor war ich fast 15 Jahre an der Universität Heidelberg in leitender Position beschäftigt. Neben meiner Tätigkeit in St. Gallen habe ich eine Privatpraxis in Zürich und biete nun auch regelmässig eine Sprechstunde hier im Praxiszentrum im Ring an.</p>
            <br />
            <p>Einen besonderen Schwerpunkt meiner Tätigkeit stellt die minimalinvasive Chirurgie dar. Viele Operationen, die früher einen grossen Bauchschnitt erforderten, können heute mit der sogenannten «Schlüsselloch-Technik» durchgeführt werden. Dies führt zu deutlich weniger Schmerzen und einer schnelleren Erholung nach dem Eingriff.</p>
            <br />
            <p>Für weitere Informationen zu meiner Person und meinem Werdegang verweise ich auf meine Webseite unter <Link href="https://schemmer-worni.ch/de/ueber-uns-prof-dr-med-schemmer" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">www.schemmer-worni.ch</Link></p>
          </>
        ),
      },
      {
        id: 'rosenov',
        title: 'Dr. med.',
        name: 'Wassil Rosenov',
        imageUrl: '/images/team/Dr.Rosenov.jpg',
        imageHint: 'man portrait',
        specialty: 'Orthopädische Chirurgie und Traumatologie des Bewegungsapparates FMH',
        qualifications: ['Fähigkeitsausweis für interventionelle Schmerztherapie (SSIPM)'],
        additionalInfo: '',
        partnerLogo: 'orthozentrum',
        vita: (
          <>
            <p>Durch meine langjährige Tätigkeit als Oberarzt und Co-Chefarzt an der orthopädischen Klinik des Lindenhofspitals in Bern bin ich mit allen Problemen des Bewegungsapparates bestens vertraut.</p>
            <br />
            <p>Seit mehreren Jahren bin ich nun im <Link href="https://www.orthozentrum-bern.ch/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">orthozentrum-bern</Link> tätig und freue mich, meine orthopädische Sprechstunde nun auch im Praxiszentrum im Ring anbieten zu können.</p>
          </>
        )
      },
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
            {doctors.map(doctor => (
                 <div key={doctor.id} id={doctor.id} className="mx-auto max-w-[1000px] p-2">
                    <DoctorCard {...doctor} />
                </div>
            ))}
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
