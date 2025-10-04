import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'luftbild');

  return (
    <section className="relative h-[60vh] min-h-[500px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover md:object-center"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
        <div className='bg-black/40 p-8 rounded-lg backdrop-blur-sm'>
            <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Praxiszentrum im Ring
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            Ihr Gesundheitszentrum im Herzen der Stadt.
            </p>
            <Button asChild size="lg" className="mt-8">
            <Link href="#contact">Termin Buchen</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
