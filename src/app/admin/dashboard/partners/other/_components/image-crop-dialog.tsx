
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

    // Get the canvas for the user-cropped section of the logo
    const croppedLogoCanvas = cropper.getCroppedCanvas();
    if (!croppedLogoCanvas) return;

    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;
    
    const background = new window.Image();
    background.crossOrigin = 'Anonymous';
    background.onload = () => {
      // Set final canvas to the size of the background card
      finalCanvas.width = background.width;
      finalCanvas.height = background.height;
      ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

      // 1. Draw the background card template
      ctx.drawImage(background, 0, 0);

      // 2. Define the maximum size for the logo on the card
      const targetWidth = finalCanvas.width * 0.8; 
      const targetHeight = finalCanvas.height * 0.8;

      // 3. Calculate scaling factor to fit the cropped logo within the target area
      let drawWidth = croppedLogoCanvas.width;
      let drawHeight = croppedLogoCanvas.height;
      const ratio = drawWidth / drawHeight;

      if (drawWidth > targetWidth) {
        drawWidth = targetWidth;
        drawHeight = drawWidth / ratio;
      }
      if (drawHeight > targetHeight) {
        drawHeight = targetHeight;
        drawWidth = drawHeight * ratio;
      }

      // 4. Calculate center position
      const centerX = (finalCanvas.width - drawWidth) / 2;
      const centerY = (finalCanvas.height - drawHeight) / 2;

      // 5. Draw the (scaled down if needed) cropped logo centered on the card
      ctx.drawImage(croppedLogoCanvas, centerX, centerY, drawWidth, drawHeight);
      
      const resultDataUrl = finalCanvas.toDataURL('image/jpeg', 0.9);
      onCropComplete(resultDataUrl);
      onClose();
    };
    background.onerror = (e) => {
        console.error("Failed to load background image for composition.", e);
        onCropComplete(croppedLogoCanvas.toDataURL('image/jpeg', 0.9));
        onClose();
    };

    background.src = backgroundImageUrl;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Logo zuschneiden und platzieren</DialogTitle>
          <DialogDescription>
            Skalieren (Mausrad) Sie das Logo und wählen Sie den gewünschten Ausschnitt. Das Ergebnis wird auf der Karte zentriert.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 flex-1 flex justify-center items-center bg-muted/30 p-4">
          <Cropper
            ref={cropperRef}
            src={imageUrl}
            style={{ height: '100%', width: '100%' }}
            // --- Settings for free scaling and cropping ---
            zoomable={true}
            viewMode={1} 
            dragMode="move"
            background={true}
            responsive={true}
            autoCrop={true}
            movable={true}
            cropBoxResizable={true}
            minCropBoxWidth={10}
            minCropBoxHeight={10}
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
