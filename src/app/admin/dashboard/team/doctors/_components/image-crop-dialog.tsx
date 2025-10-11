
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
    if (!cropper) return;

    // The final canvas where we compose everything
    const finalCanvas = finalCanvasRef.current;
    if (!finalCanvas) return;
    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;

    // High resolution for the final image
    const canvasWidth = 1000;
    const canvasHeight = canvasWidth / aspectRatio;
    finalCanvas.width = canvasWidth;
    finalCanvas.height = canvasHeight;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);


    const background = new Image();
    background.crossOrigin = 'Anonymous';
    background.onload = () => {
      // 1. Draw the background card template
      if (backgroundImageUrl) {
        ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
      }

      // 2. Draw the cropped logo on top
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
         // Get data on where the crop box is relative to the container
        const cropBoxData = cropper.getCropBoxData();
        const containerData = cropper.getContainerData();

        // Calculate position based on the visible cropper area
        const left = cropBoxData.left - containerData.left;
        const top = cropBoxData.top - containerData.top;

        // Scale the position to our high-res canvas
        const scaleX = canvasWidth / containerData.width;
        const scaleY = canvasHeight / containerData.height;

        ctx.drawImage(
          croppedCanvas,
          left * scaleX,
          top * scaleY,
          cropBoxData.width * scaleX,
          cropBoxData.height * scaleY,
        );
      }
      
      // 3. Export and call the completion callback
      const resultDataUrl = finalCanvas.toDataURL('image/jpeg', 0.9);
      onCropComplete(resultDataUrl);
      onClose();
    };
    background.onerror = (e) => {
        console.error("Failed to load background image.", e);
        // Fallback: just crop the logo if background fails
        const croppedCanvas = cropper.getCroppedCanvas();
        if (croppedCanvas) {
            onCropComplete(croppedCanvas.toDataURL('image/jpeg', 0.9));
        }
        onClose();
    };

    if (backgroundImageUrl) {
        background.src = backgroundImageUrl;
    } else {
        // If no background, just run the composition logic which will only draw the logo
        background.onload(new Event('load'));
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Logo auf Karte platzieren</DialogTitle>
        </DialogHeader>
        <div 
          className="my-4 flex-1 flex justify-center items-center relative bg-muted/50 rounded-md bg-no-repeat bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'contain',
            aspectRatio: aspectRatio
          }}
        >
          <Cropper
            ref={cropperRef}
            src={imageUrl}
            style={{ height: '100%', width: '100%' }}
            // Cropper options
            viewMode={2}
            dragMode="move"
            background={false} // CRITICAL: This makes the cropper background transparent
            responsive={true}
            autoCrop={true}
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
