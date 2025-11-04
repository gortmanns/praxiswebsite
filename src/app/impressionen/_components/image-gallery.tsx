
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

const animationClasses = [
  'animate-kenburns-pan-right', // used for index 1
  'animate-kenburns-pan-down', // used for index 4
  'animate-kenburns-pan-up', // used for index 5
];

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return <p>Keine Bilder verfügbar.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {images.map((image, index) => {
        let animationClass = '';

        if (index === 0) {
          // Special animation for the first image
          animationClass = 'animate-kenburns-zoom-in-focus-right';
        } else if (index === 2) {
          // Row 2, Left: New, stronger zoom animation
          animationClass = 'animate-kenburns-zoom-in-full';
        } else if (index === 3) {
          // Row 2, Right: Pan from left to right
          animationClass = 'animate-kenburns-pan-right';
        }
        else {
          // Cycle through the panning animations for the rest
          animationClass = animationClasses[index % animationClasses.length];
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
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        );
      })}
    </div>
  );
}
