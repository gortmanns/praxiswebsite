
'use client';

import 'cropperjs/dist/cropper.css';
import React, { useRef } from 'react';
import Cropper, { type ReactCropperElement } from 'react-cropper';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageCropDialogProps {
  imageUrl: string; // The logo or image to be placed
  onCropComplete: (croppedImageUrl: string) => void;
  onClose: () => void;
  aspectRatio: number; // Aspect ratio of the final output (the card)
  backgroundImageUrl?: string; // The card template background
}

export const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  imageUrl,
  onCropComplete,
  onClose,
  aspectRatio,
  backgroundImageUrl,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const finalCanvas = finalCanvasRef.current;

    if (!cropper || !finalCanvas) return;

    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;

    const background = new Image();
    background.crossOrigin = "Anonymous";
    background.onload = () => {
      // Set canvas to a fixed high-resolution size based on aspect ratio
      const canvasWidth = 1000;
      const canvasHeight = canvasWidth / aspectRatio;
      finalCanvas.width = canvasWidth;
      finalCanvas.height = canvasHeight;

      // Draw the background (the card template)
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);

      // Get the cropped version of the logo
      const cropData = cropper.getData(true);
      const canvasData = cropper.getCanvasData();
      
      // We need to translate the cropper's internal canvas coordinates to our final canvas
      // This is a simplified calculation and might need tweaking for perfect alignment
      const sourceImage = cropper.getImageData();
      
      const targetX = cropData.x - canvasData.left;
      const targetY = cropData.y - canvasData.top;

      // Draw the cropped logo on top of the background card
      ctx.drawImage(
          cropper.getCroppedCanvas(),
          targetX,
          targetY,
          cropData.width,
          cropData.height
      );

      // Export the final composite image and call the callback
      onCropComplete(finalCanvas.toDataURL('image/jpeg', 0.9));
      onClose();
    };
    background.onerror = (e) => {
      console.error("Failed to load background image.", e);
      onClose();
    };
    // Use the provided card background image
    background.src = backgroundImageUrl || '';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Logo auf Karte platzieren</DialogTitle>
        </DialogHeader>
        <div 
          className="my-4 flex-1 flex justify-center items-center relative bg-muted/50 rounded-md"
        >
          {/* The Cropper now works on the LOGO, with the CARD as its container background */}
          <div 
            className="absolute inset-0 bg-no-repeat bg-contain bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          ></div>
          <Cropper
            ref={cropperRef}
            src={imageUrl} // The logo to be placed
            style={{ height: '100%', width: '100%' }}
            // Cropper options
            viewMode={2} // Allows moving the image freely
            dragMode="move" // Default to move mode
            background={false} // Transparent background to see the card underneath
            responsive={true}
            autoCrop={true} // Enable cropping
            checkOrientation={false}
            guides={true}
            movable={true}
            zoomable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
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
