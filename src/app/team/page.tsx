




import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { DoctorCardOrtmanns } from './_components/doctor-card-ortmanns';
import { DoctorCardSchemmer } from './_components/doctor-card-schemmer';
import { DoctorCardRosenov } from './_components/doctor-card-rosenov';
import { DoctorCardHerschel } from './_components/doctor-card-herschel';
import { DoctorCardSlezak } from './_components/doctor-card-slezak';
import { TeamMemberCard } from './_components/team-member-card';

const teamMembers = [
    {
      name: 'S. Garcia',
      role: 'Leitende Medizinische Praxisassistentin',
      imageUrl: '/images/team/Garcia.jpg',
      imageHint: 'woman portrait',
    },
    {
      name: 'Max Mustermann',
      role: 'Med. Praxisassistent',
      imageUrl: 'https://picsum.photos/seed/mann1/400/400',
      imageHint: 'man portrait',
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
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-1"></div>
                <TeamMemberCard 
                    key={teamMembers[0].name}
                    name={teamMembers[0].name}
                    role={teamMembers[0].role}
                    imageUrl={teamMembers[0].imageUrl}
                    imageHint={teamMembers[0].imageHint}
                />
                <div className="lg:col-span-1"></div>
                <TeamMemberCard 
                    key={teamMembers[1].name}
                    name={teamMembers[1].name}
                    role={teamMembers[1].role}
                    imageUrl={teamMembers[1].imageUrl}
                    imageHint={teamMembers[1].imageHint}
                />
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
