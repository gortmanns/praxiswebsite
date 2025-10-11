
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
  aspectRatio: number;
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
      const croppedCanvas = cropper.getCroppedCanvas({
        fillColor: '#fff' // Setzt den Hintergrund auf Weiss
      });
      if (croppedCanvas) {
        onCropComplete(croppedCanvas.toDataURL('image/jpeg', 0.9));
      }
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Bild zuschneiden</DialogTitle>
        </DialogHeader>
        <div 
          className="my-4 flex justify-center"
          style={{ height: '600px', maxHeight: '70vh' }}
        >
          <Cropper
            key={aspectRatio}
            ref={cropperRef}
            src={imageUrl}
            style={{ height: '100%', width: '100%' }}
            aspectRatio={aspectRatio}
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={true}
            responsive={true}
            checkOrientation={false}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleCrop}>Übernehmen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
