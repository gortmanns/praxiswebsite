import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'luftbild');

  return (
    <section className="relative w-full border-2 border-orange-500">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
    </section>
  );
}
