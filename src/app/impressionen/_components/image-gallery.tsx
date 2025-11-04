
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  hint: string;
  description?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return <p>Keine Bilder verfügbar.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {images.map((image, index) => {
        let animationClass = '';

        if (index === 0) {
          animationClass = 'animate-kenburns-zoom-in-focus-right';
        } else if (index === 1) {
          animationClass = 'animate-kenburns-pan-right';
        } else if (index === 2) {
          animationClass = 'animate-kenburns-pan-left';
        }

        return (
          <div
            key={index}
            className="relative w-full overflow-hidden rounded-lg shadow-2xl"
          >
            <div className={cn("relative overflow-hidden", animationClass)}>
              <Image
                src={image.src}
                alt={image.alt}
                data-ai-hint={image.hint}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
            {image.description && (
              <div className="absolute bottom-4 right-4 rounded-md bg-black/50 px-4 py-2 text-white shadow-lg">
                <p className="text-lg font-semibold">{image.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
