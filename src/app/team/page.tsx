

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { DoctorCardOrtmanns } from './_components/doctor-card-ortmanns';
import { DoctorCardSchemmer } from './_components/doctor-card-schemmer';
import { DoctorCardRosenov } from './_components/doctor-card-rosenov';
import { DoctorCardHerschel } from './_components/doctor-card-herschel';
import { DoctorCardSlezak } from './_components/doctor-card-slezak';
import { TeamMemberCard } from './_components/team-member-card';
import { Card, CardContent } from '@/components/ui/card';
import { doctorBacksides } from './_components/doctor-data';

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
            
            <div id="ortmanns" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-2">
              <div>
                <DoctorCardOrtmanns />
              </div>
              <div className="h-full">
                <Card className="h-full"><CardContent className="p-6">{doctorBacksides.ortmanns}</CardContent></Card>
              </div>
            </div>

            <div id="schemmer" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-2">
              <div>
                <DoctorCardSchemmer />
              </div>
              <div className="h-full">
                <Card className="h-full"><CardContent className="p-6">{doctorBacksides.schemmer}</CardContent></Card>
              </div>
            </div>

            <div id="rosenov" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-2">
              <div>
                <DoctorCardRosenov />
              </div>
              <div className="h-full">
                <Card className="h-full"><CardContent className="p-6">{doctorBacksides.rosenov}</CardContent></Card>
              </div>
            </div>

            <div id="herschel" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-2">
                <div>
                  <DoctorCardHerschel />
                </div>
                <div className="h-full">
                  <Card className="h-full"><CardContent className="p-6">{doctorBacksides.herschel}</CardContent></Card>
                </div>
            </div>

            <div id="slezak" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-2">
                <div>
                  <DoctorCardSlezak />
                </div>
                <div className="h-full">
                  <Card className="h-full"><CardContent className="p-6">{doctorBacksides.slezak}</CardContent></Card>
                </div>
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
