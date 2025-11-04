
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  hint: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return <p>Keine Bilder verfügbar.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {images.map((image, index) => {
        let animationClass = '';

        if (index === 0) {
          animationClass = 'animate-kenburns-zoom-in-focus-right';
        } else if (index === 1) {
          animationClass = 'animate-kenburns-pan-right';
        }

        return (
          <div
            key={index}
            className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              data-ai-hint={image.hint}
              fill
              className={cn(
                "h-full w-full object-cover",
                animationClass
              )}
              sizes="100vw"
            />
          </div>
        );
      })}
    </div>
  );
}
