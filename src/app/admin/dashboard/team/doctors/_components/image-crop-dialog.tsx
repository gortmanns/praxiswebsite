'use client';

import 'cropperjs/dist/cropper.css';
import React, { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ImageCropDialogProps {
  imageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onClose: () => void;
  aspectRatio?: number;
}

export const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  imageUrl,
  onCropComplete,
  onClose,
  aspectRatio,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (typeof cropper !== 'undefined') {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        onCropComplete(croppedCanvas.toDataURL('image/jpeg', 0.9));
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Bild zuschneiden</DialogTitle>
        </DialogHeader>
        <div className="my-4 flex justify-center bg-muted">
          <Cropper
            ref={cropperRef}
            src={imageUrl}
            style={{ height: 400, width: '100%' }}
            // Cropper.js options
            aspectRatio={aspectRatio}
            guides={false}
            viewMode={1}
            autoCropArea={1} // Hier war der Fehler: von 0.8 auf 1 geändert
            background={false}
            responsive={true}
            checkOrientation={false} // Empfohlen, um Performance zu verbessern
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleCrop}>Zuschneiden und Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
