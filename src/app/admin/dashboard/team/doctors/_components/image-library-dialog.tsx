'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

interface ImageLibraryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  images: string[];
  onImageSelect: (imageUrl: string) => void;
}

export const ImageLibraryDialog: React.FC<ImageLibraryDialogProps> = ({
  isOpen,
  onOpenChange,
  images,
  onImageSelect,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Bild aus Bibliothek auswählen</DialogTitle>
          <DialogDescription>
            Wählen Sie eines der bereits verwendeten Bilder aus.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh] w-full rounded-md border">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
            {images.map((img, index) => (
                <div
                    key={index}
                    className="relative aspect-[2/3] cursor-pointer overflow-hidden rounded-md border-2 border-transparent transition-all hover:border-primary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => onImageSelect(img)}
                    onKeyDown={(e) => e.key === 'Enter' && onImageSelect(img)}
                    tabIndex={0}
                >
                    <Image
                        src={img}
                        alt={`Bibliotheksbild ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />
                </div>
            ))}
            </div>
        </ScrollArea>
        <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
                Abbrechen
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
