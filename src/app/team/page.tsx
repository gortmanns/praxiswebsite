
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { DoctorCard } from './_components/doctor-card';

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background debug-outline">
      <Header />
      <main className="flex-1 debug-outline">
        <div className="container py-16 sm:py-24 debug-outline">
          <DoctorCard />
          <div className="mx-auto mt-16 max-w-5xl text-center debug-outline">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
              UNSER TEAM
            </h2>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
