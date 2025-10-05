
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { DoctorCardOrtmanns } from './_components/doctor-card-ortmanns';
import { DoctorCardSchemmer } from './_components/doctor-card-schemmer';
import { DoctorCardRosenov } from './_components/doctor-card-rosenov';
import { DoctorCardHerschel } from './_components/doctor-card-herschel';
import { DoctorCardSlezak } from './_components/doctor-card-slezak';
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
        Inzwischen bin ich - jetzt in der Funktion der Leitenden MPA –
        zurückgekehrt an meine alte Wirkungsstätte.
        </p>
    </>
    ),
};

/* BEGINN VORHERIGER CODE
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
          Ich blicke zurück auf eine lange Erfahrung im Beruf als MPA aber bin neu im Praxiszentrum im Ring.
          </p>
          <br />
          <p>
          Als Berufsbildnerin bin ich für die Ausbildung der Lernenden zur MPA verantwortlich.
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
            Daher aktuell "nur" als Praxishilfe tätig, jedoch hoffentlich bald als weiterer Hausarzt hier im Praxiszentrum.
          </p>
        </>
      ),
    },
];
   ENDE VORHERIGER CODE */

// BEGINN NEUER CODE
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
          Ich blicke zurück auf eine lange Erfahrung im Beruf als MPA aber bin neu im Praxiszentrum im Ring.
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
            Daher aktuell "nur" als Praxishilfe tätig, jedoch hoffentlich bald als weiterer Hausarzt hier im Praxiszentrum.
          </p>
        </>
      ),
    },
];
// ENDE NEUER CODE

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
          <div className="mx-auto mt-8 max-w-5xl space-y-8">
            <div>
              <h3 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                  Ärzte
              </h3>
              <div className="mt-2 h-1 w-full bg-primary"></div>
            </div>
            <DoctorCardOrtmanns />
            <DoctorCardSchemmer />
            <DoctorCardRosenov />
            <DoctorCardHerschel />
            <DoctorCardSlezak />
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
            
            {/* Leitende MPA - Centered */}
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

            {/* Restliches Personal - 2 Spalten Grid */}
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
