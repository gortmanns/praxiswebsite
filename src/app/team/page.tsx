

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { DoctorCardOrtmanns } from './_components/doctor-card-ortmanns';
import { DoctorCardSchemmer } from './_components/doctor-card-schemmer';
import { DoctorCardRosenov } from './_components/doctor-card-rosenov';
import { DoctorCardHerschel } from './_components/doctor-card-herschel';
import { DoctorCardSlezak } from './_components/doctor-card-slezak';
import { TeamMemberCard } from './_components/team-member-card';

const doctorBacksides = {
  ortmanns: (
    <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary">
      <p className="mb-1">Medizinstudium in Bonn und Hobart (Australien)</p>
      <p className="mb-1">Masterstudium Public Health und Health Management in Sydney (Australien)</p>
      <p className="mb-1">Projektmanagement im Gesundheitswesen in Europa und Australien</p>
      <div className="mb-4">
          <p>Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor</p>
          <ul className="flex list-disc flex-col pl-5 pt-1 text-background/80" style={{ gap: '0.15rem' }}>
              <li>Leiter Klinische Entwicklung und Analytik für DxCG Gesundheitsanalytik GmbH (Deutschland)</li>
              <li>Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</li>
              <li>Direktor der Memory-Strategie (elektronisches Medikamenten-Management und elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</li>
          </ul>
      </div>
      <div className="mb-4">
          <p>Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz:</p>
          <ul className="flex list-disc flex-col pl-5 pt-1 text-background/80" style={{ gap: '0.15rem' }}>
              <li>Universitätsspital Basel (USB)</li>
              <li>Kantonsspital Baselland (KSBL)</li>
              <li>Kantonsspital Winterthur (KSW)</li>
              <li>Kantonsspital Wil (SRFT)</li>
              <li>Hausarztpraxis in Winterthur</li>
          </ul>
      </div>
       <p className="mb-1">Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Klinik für Pneumologie)</p>
       <p className="mb-1">Leitung <span className="whitespace-nowrap">Praxiszentrum im Ring</span> (Ärztliche und administrative Leitung)</p>
       <p>Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)</p>
    </div>
  ),
  schemmer: (
    <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col space-y-3">
        <p className="font-bold text-primary">KLEINCHIRURGISCHE EINGRIFFE KÖNNEN DIREKT IM <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> ERFOLGEN</p>
        <div>
            <p className="font-bold text-primary">GROSSE CHIRURGISCHE EINGRIFFE WERDEN IN ENGER KOOPERATION ZWISCHEN CHIRURG UND HAUSARZT DURCHGEFÜHRT</p>
            <ul className="flex flex-col space-y-1 pt-1 pl-5">
                <li className="text-background/80">Vorbesprechung und Planung des Eingriffs erfolgen im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span></li>
                <li className="text-background/80">Allenfalls notwendige Abklärungen vor dem Eingriff finden ebenfalls im Praxiszentrum statt oder – falls nötig – per Überweisung an weitere Spezialisten</li>
                <li className="text-background/80">
                    Die Operation selbst findet in einer der Partnerkliniken in der Stadt Bern statt
                    <ul className="flex list-disc flex-col pl-5 pt-1 text-sm text-background/80" style={{ gap: '0.15rem' }}>
                        <li>Hirslanden</li>
                        <li>Lindenhof-Spital</li>
                        <li>Siloah-Spital</li>
                    </ul>
                </li>
                <li className="text-background/80">Die Nachbetreuung (z. B. Fadenentfernung und Schmerzbehandlung) findet wieder im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> statt</li>
            </ul>
        </div>
    </div>
  ),
  rosenov: (
    <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col space-y-4">
        <p className="font-bold text-primary">UNTERSUCHUNGEN DER VENEN, ARTERIEN UND LYMPHGEFÄSSE</p>
        <p className="font-bold text-primary">ABKLÄRUNG VON EREKTIONSSTÖRUNGEN</p>
        <p>Viele Untersuchungen und Abklärungen können direkt im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> durchgeführt werden.</p>
        <p>Sind zusätzliche Spezialuntersuchungen oder weiterführende Eingriffe nötig, die mit den Geräten im Praxiszentrum nicht durchführbar sind, wird ein Folgetermin in den Räumlichkeiten der VASC ALLIANCE am Beau-site Spital in Bern vereinbart.</p>
    </div>
  ),
  herschel: (
     <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col space-y-4">
        <p className="font-bold text-primary">ALLGEMEINE ORTHOPÄDIE</p>
        <p className="font-bold text-primary">SPEZIALGEBIET HÜFT- UND KNIEGELENKE</p>
        <p>Röntgenuntersuchungen, Konsultationen und klinische Untersuchungen finden direkt vor Ort im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> statt.</p>
        <p>Auch Gelenkinfiltrationen, z. B. bei Schmerzen, können zum Teil direkt vor Ort durchgeführt werden.</p>
        <p>Allenfalls nötige Operationen werden im gut erreichbaren Lindenhof-Spital durchgeführt.</p>
    </div>
  ),
  slezak: (
    <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col space-y-4">
      <p className="font-bold text-primary">ALLGEMEINE NEUROLOGIE</p>
      <p className="font-bold text-primary">VASKULÄRE ERKRANKUNGEN</p>
      <p className="font-bold text-primary">EPILEPSIE</p>
      <p className="font-bold text-primary">BEWEGUNGSSTÖRUNGEN <span className="text-primary font-bold">(Schwerpunkt Parkinsonsyndrome)</span></p>
      <p className="font-bold text-primary">KOPFSCHMERZEN UND MIGRÄNE</p>
      <p className="font-bold text-primary">NEUROREHABILITATION</p>
      
      <div className="space-y-4 pt-4">
          <p>Viele Untersuchungen können direkt im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> durchgeführt werden.</p>
          <p>Wenn spezielle Untersuchungen wie z. B. die Bestimmung der Nervenleitgeschwindigkeit Geräte erfordern, die im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> nicht zur Verfügung stehen, dann finden diese in den Räumlichkeiten an der Thunstrasse 95 in Bern statt.</p>
      </div>
  </div>
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
            
            <div id="ortmanns" className="mx-auto max-w-[1000px] p-2">
                <DoctorCardOrtmanns backsideContent={doctorBacksides.ortmanns} />
            </div>

            <div id="schemmer" className="mx-auto max-w-[1000px] p-2">
                <DoctorCardSchemmer backsideContent={doctorBacksides.schemmer} />
            </div>

            <div id="rosenov" className="mx-auto max-w-[1000px] p-2">
                <DoctorCardRosenov backsideContent={doctorBacksides.rosenov} />
            </div>

            <div id="herschel" className="mx-auto max-w-[1000px] p-2">
                <DoctorCardHerschel backsideContent={doctorBacksides.herschel} />
            </div>

            <div id="slezak" className="mx-auto max-w-[1000px] p-2">
                <DoctorCardSlezak backsideContent={doctorBacksides.slezak} />
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
