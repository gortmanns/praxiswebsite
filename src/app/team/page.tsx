import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { OurTeam } from '../_components/our-team';

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <OurTeam />
      </main>
      <Footer />
    </div>
  );
}
