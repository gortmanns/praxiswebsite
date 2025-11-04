
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  hint: string;
  description?: string;
  descriptionPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return <p>Keine Bilder verfügbar.</p>;
  }

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {images.map((image, index) => {
        let animationClass = '';

        if (index === 0) {
          animationClass = 'animate-kenburns-zoom-in-focus-right';
        } else if (index === 2) {
          animationClass = 'animate-kenburns-pan-left';
        } else if (index === 3) {
           animationClass = 'animate-kenburns-pan-left-zoom-bed';
        } else if (index === 4) {
           animationClass = 'animate-kenburns-pan-left-zoom-bed';
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
                width={800}
                height={600}
                className="h-auto w-full"
              />
            </div>
            {image.description && (
              <div className={cn(
                "absolute rounded-md bg-black/50 px-4 py-2 text-white shadow-lg",
                positionClasses[image.descriptionPosition || 'bottom-right']
              )}>
                <p className="text-lg font-semibold">{image.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
