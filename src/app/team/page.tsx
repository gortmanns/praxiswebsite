
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { DoctorCardOrtmanns } from './_components/doctor-card-ortmanns';
import { DoctorCardSchemmer } from './_components/doctor-card-schemmer';

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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
