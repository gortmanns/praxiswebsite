
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { ImageGallery } from './_components/image-gallery';
import { practiceImages } from './images';

export default function ImpressionenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                    IMPRESSIONEN
                </h2>
                 <p className="mt-4 text-lg text-foreground/80">
                    Ein kleiner Einblick in unsere modernen und freundlichen Praxisräumlichkeiten.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-7xl">
                <ImageGallery images={practiceImages} />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
