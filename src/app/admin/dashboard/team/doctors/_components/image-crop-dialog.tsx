
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
  aspectRatio: number; // Aspect ratio is now mandatory
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
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Bild zuschneiden</DialogTitle>
        </DialogHeader>
        <div 
          className="my-4 flex justify-center bg-muted"
          style={{ maxHeight: '600px' }}
        >
          <Cropper
            key={aspectRatio} // Force re-initialization when aspectRatio changes
            ref={cropperRef}
            src={imageUrl}
            style={{ height: '100%', width: '100%', maxWidth: '1000px' }}
            // Cropper.js options
            aspectRatio={aspectRatio}
            guides={false}
            viewMode={1} // Restrict crop box to be within the canvas
            autoCropArea={1} // Initialize crop box to 100% of the image
            background={false}
            responsive={true}
            checkOrientation={false}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleCrop}>Zuschneiden und übernehmen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
