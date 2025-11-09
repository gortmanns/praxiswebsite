'use client';

import { ImageGallery } from '../impressionen/_components/image-gallery';
import { practiceImages } from '../impressionen/images';

export default function ImpressionenEnPage() {
  return (
    <div className="container py-16 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                IMPRESSIONS
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
                A small glimpse into our modern and friendly practice rooms.
            </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
            <ImageGallery images={practiceImages} />
        </div>
    </div>
  );
}
