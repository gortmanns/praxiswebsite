
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { DoctorCard } from './_components/doctor-card';

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background debug-outline">
      <Header />
      <main className="flex-1 debug-outline">
        <div className="container py-16 sm:py-24 debug-outline">
          <div className="mx-auto max-w-5xl text-center debug-outline">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
              UNSER TEAM
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-5xl debug-outline">
            <h3 className="mb-8 border-b-2 border-primary pb-2 font-headline text-2xl font-bold text-primary">
              Ärzte
            </h3>

            <div className="flex flex-col space-y-12 debug-outline">
                <DoctorCard />
                <DoctorCard />
                <DoctorCard />
                <DoctorCard />
                <DoctorCard />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
