'use client';

import 'cropperjs/dist/cropper.css';
import React, { useState, useRef } from 'react';
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
}

// Aspect ratio for the doctor's portrait
const ASPECT_RATIO = 2 / 3;

export const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  imageUrl,
  onCropComplete,
  onClose,
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
            aspectRatio={ASPECT_RATIO}
            guides={false}
            viewMode={1}
            autoCropArea={0.8}
            background={false}
            responsive={true}
            checkOrientation={false} // Recommended to disable this for better performance
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
