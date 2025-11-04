
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
  'animate-kenburns-zoom-in',
  'animate-kenburns-pan-right',
  'animate-kenburns-zoom-out',
  'animate-kenburns-pan-left',
];

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return <p>Keine Bilder verfügbar.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {images.map((image, index) => (
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
              animationClasses[index % animationClasses.length]
            )}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}
