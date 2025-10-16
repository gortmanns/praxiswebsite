
'use client';

import 'cropperjs/dist/cropper.css';
import React, { useRef } from 'react';
import Cropper, { type ReactCropperElement } from 'react-cropper';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  aspectRatio = undefined,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const croppedCanvas = cropper.getCroppedCanvas();
    if (!croppedCanvas) return;

    const resultDataUrl = croppedCanvas.toDataURL('image/jpeg', 0.9);
    onCropComplete(resultDataUrl);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Bild zuschneiden und anpassen</DialogTitle>
          <DialogDescription>
            Wählen Sie den gewünschten Ausschnitt aus Ihrem Bild aus.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 flex-1 flex justify-center items-center bg-muted/30 p-4">
          <Cropper
            ref={cropperRef}
            src={imageUrl}
            style={{ height: '100%', width: '100%' }}
            aspectRatio={aspectRatio}
            viewMode={1}
            dragMode="move"
            background={true}
            responsive={true}
            autoCrop={true}
            movable={true}
            zoomable={true}
            cropBoxResizable={true}
            checkOrientation={false}
            guides={true}
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
