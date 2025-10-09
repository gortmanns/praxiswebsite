
'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { OrtmannsCard } from './_components/doctors/ortmanns-card';
import { RosenovCard } from './_components/doctors/rosenov-card';
import { SchemmerCard as SchemerCard } from './_components/doctors/schemmer-card';
import { SlezakCard } from './_components/doctors/slezak-card';
import { HerschelCard } from './_components/doctors/herschel-card';
import { TeamMemberCard } from './_components/team-member-card';

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
            <div className="mx-auto mt-16 max-w-5xl space-y-16">
                 <div id="aerzte">
                    <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Ärzte</h2>
                    <div className="mt-2 h-1 w-full bg-primary"></div>
                </div>
                <div className="mx-auto w-full p-2">
                    <OrtmannsCard />
                </div>
                <div className="mx-auto w-full p-2" id="schemmer">
                    <SchemerCard />
                </div>
                <div className="mx-auto w-full p-2" id="rosenov">
                    <RosenovCard />
                </div>
                <div className="mx-auto w-full p-2" id="herschel">
                    <HerschelCard />
                </div>
                <div className="mx-auto w-full p-2" id="slezak">
                    <SlezakCard />
                </div>
          </div>
          
           <div className="mx-auto mt-16 max-w-5xl space-y-8">
             <div>
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
