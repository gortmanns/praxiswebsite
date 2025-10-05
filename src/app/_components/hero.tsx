import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative w-full h-[400px]">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt="Aerial view of the practice location."
          fill
          className="w-full h-auto object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
    </section>
  );
}
