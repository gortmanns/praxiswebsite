
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
  backgroundImageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onClose: () => void;
}

export const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  imageUrl,
  backgroundImageUrl,
  onCropComplete,
  onClose,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const finalCanvas = finalCanvasRef.current;
    
    if (!cropper || !finalCanvas) return;

    const croppedLogoCanvas = cropper.getCroppedCanvas();
    if (!croppedLogoCanvas) return;

    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;
    
    const background = new window.Image();
    background.crossOrigin = 'Anonymous';
    background.onload = () => {
      finalCanvas.width = background.width;
      finalCanvas.height = background.height;
      ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

      ctx.drawImage(background, 0, 0);

      const centerX = (finalCanvas.width - croppedLogoCanvas.width) / 2;
      const centerY = (finalCanvas.height - croppedLogoCanvas.height) / 2;

      ctx.drawImage(croppedLogoCanvas, centerX, centerY);
      
      const resultDataUrl = finalCanvas.toDataURL('image/jpeg', 0.9);
      onCropComplete(resultDataUrl);
    };
    background.onerror = (e) => {
        console.error("Failed to load background image for composition.", e);
        onCropComplete(croppedLogoCanvas.toDataURL('image/jpeg', 0.9));
    };

    background.src = backgroundImageUrl;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Logo zuschneiden und platzieren</DialogTitle>
          <DialogDescription>
            Skalieren (Mausrad) und verschieben Sie das Logo. Wählen Sie den gewünschten Ausschnitt aus. Das Ergebnis wird auf der Karte zentriert.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 flex-1 flex justify-center items-center bg-muted/30 p-4">
          <Cropper
            ref={cropperRef}
            src={imageUrl}
            style={{ height: '100%', width: '100%' }}
            // Core settings for free cropping and scaling
            zoomable={true}
            viewMode={1} 
            dragMode="move"
            background={true}
            responsive={true}
            autoCrop={true}
            movable={true}
            cropBoxResizable={true}
            checkOrientation={false}
            guides={true}
          />
        </div>
        <canvas ref={finalCanvasRef} className="hidden" />
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
