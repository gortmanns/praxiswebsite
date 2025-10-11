
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
  imageUrl: string; // The logo to be cropped
  backgroundImageUrl: string; // The card template background
  onCropComplete: (croppedImageUrl: string) => void;
  onClose: () => void;
  aspectRatio?: number; // Optional, to keep flexibility but allow free cropping by default
}

export const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  imageUrl,
  backgroundImageUrl,
  onCropComplete,
  onClose,
  aspectRatio = undefined, // Default to free aspect ratio
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

      // 2. Calculate the center position to draw the cropped logo
      const centerX = (finalCanvas.width - croppedLogoCanvas.width) / 2;
      const centerY = (finalCanvas.height - croppedLogoCanvas.height) / 2;

      // 3. Draw the cropped logo centered on top of the card
      ctx.drawImage(croppedLogoCanvas, centerX, centerY);
      
      // 4. Export the combined canvas and call the completion callback
      const resultDataUrl = finalCanvas.toDataURL('image/jpeg', 0.9);
      onCropComplete(resultDataUrl);
      onClose();
    };
    background.onerror = (e) => {
        console.error("Failed to load background image for composition.", e);
        // Fallback: If background fails, just return the cropped logo itself
        onCropComplete(croppedLogoCanvas.toDataURL('image/jpeg', 0.9));
        onClose();
    };

    background.src = backgroundImageUrl;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Logo zuschneiden</DialogTitle>
          <DialogDescription>
            Wählen Sie den gewünschten Ausschnitt aus Ihrem Logo. Dieser wird automatisch auf der Karte zentriert.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 flex-1 flex justify-center items-center bg-muted/30 p-4">
          <Cropper
            ref={cropperRef}
            src={imageUrl}
            style={{ height: '100%', width: '100%' }}
            // --- Cropper Settings for free selection ---
            aspectRatio={aspectRatio} // Let it be free
            viewMode={1} // Restrict crop box to be within the canvas
            dragMode="move" // Allows moving the image underneath
            background={true} // Show the checkered background for transparency
            responsive={true}
            autoCrop={true}
            movable={true}
            zoomable={true}
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
