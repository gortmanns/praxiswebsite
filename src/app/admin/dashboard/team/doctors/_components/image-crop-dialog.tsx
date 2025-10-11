
'use client';

import 'cropperjs/dist/cropper.css';
import React, { useRef, useState, useEffect } from 'react';
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
  backgroundImageUrl?: string; // The card background
}

export const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  imageUrl, // This is now the LOGO URL
  onCropComplete,
  onClose,
  aspectRatio, // This is the aspect ratio of the BACKGROUND
  backgroundImageUrl, // The card background
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement>(null);
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 });
  const [logoSize, setLogoSize] = useState({ width: 200, height: 100 });

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const finalCanvas = finalCanvasRef.current;

    if (!finalCanvas || !cropper) return;

    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;

    const background = new Image();
    background.crossOrigin = "Anonymous";
    background.onload = () => {
      // Set canvas to background dimensions
      finalCanvas.width = background.naturalWidth;
      finalCanvas.height = background.naturalHeight;

      // Draw the background (the card)
      ctx.drawImage(background, 0, 0, finalCanvas.width, finalCanvas.height);
      
      // Get the cropped version of the logo
      const croppedLogoCanvas = cropper.getCroppedCanvas();

      if (croppedLogoCanvas) {
        // Draw the cropped logo on top of the background
        // The position and size are taken from the cropper's box data
        const cropBoxData = cropper.getCropBoxData();
        ctx.drawImage(
            croppedLogoCanvas,
            cropBoxData.left,
            cropBoxData.top,
            cropBoxData.width,
            cropBoxData.height
        );
      }
      
      // Export the final composite image
      onCropComplete(finalCanvas.toDataURL('image/jpeg', 0.9));
      onClose();
    };
    background.onerror = () => {
        console.error("Failed to load background image.");
        onClose();
    }
    background.src = backgroundImageUrl || ''; // Use the card background
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Logo auf Karte platzieren</DialogTitle>
        </DialogHeader>
        <div 
          className="my-4 flex justify-center relative"
          style={{ height: '600px', maxHeight: '70vh' }}
        >
          {/* The Cropper now works on the LOGO, with the CARD as its container background */}
          <Cropper
            ref={cropperRef}
            src={imageUrl} // The logo to be placed
            style={{ height: '100%', width: '100%' }}
            // Cropper options
            aspectRatio={NaN} // Free aspect ratio for the logo itself
            viewMode={2} // Allows moving the logo outside the bounds of the card
            dragMode="move"
            background={true}
            responsive={true}
            autoCrop={false} // Don't auto-crop, let user define the logo area
            checkOrientation={false}
            guides={true}
            // Set the container background to be the card image
            preview=".img-preview" // Necessary for background image to show
            ready={() => {
              const cropper = cropperRef.current?.cropper;
              if (cropper) {
                // Set the background of the cropper's container
                const dragBox = cropper.getDragBox();
                (dragBox.parentNode as HTMLElement).style.backgroundImage = `url(${backgroundImageUrl})`;
                (dragBox.parentNode as HTMLElement).style.backgroundSize = 'contain';
                (dragBox.parentNode as HTMLElement).style.backgroundRepeat = 'no-repeat';
                (dragBox.parentNode as HTMLElement).style.backgroundPosition = 'center';
              }
            }}
          />
        </div>
        <canvas ref={finalCanvasRef} style={{ display: 'none' }} />
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
