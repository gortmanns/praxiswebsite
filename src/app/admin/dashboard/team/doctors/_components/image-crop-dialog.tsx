
'use client';

import 'cropperjs/dist/cropper.css';
import React, { useRef, useEffect, useState } from 'react';
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
import Image from 'next/image';

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
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [workspaceSize, setWorkspaceSize] = useState({ width: 0, height: 0 });

  // Update workspace size for responsive rendering
  useEffect(() => {
    const updateSize = () => {
      if (workspaceRef.current) {
        const { width } = workspaceRef.current.getBoundingClientRect();
        setWorkspaceSize({ width, height: width / aspectRatio });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [aspectRatio]);


  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const finalCanvas = finalCanvasRef.current;
    
    if (!cropper || !finalCanvas) return;

    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;

    // Use a higher resolution for the final output canvas
    const outputWidth = 1000;
    const outputHeight = outputWidth / aspectRatio;
    finalCanvas.width = outputWidth;
    finalCanvas.height = outputHeight;

    ctx.clearRect(0, 0, outputWidth, outputHeight);

    const background = new window.Image();
    background.crossOrigin = 'Anonymous';
    background.onload = () => {
      // 1. Draw the background card template first
      if (backgroundImageUrl) {
          ctx.drawImage(background, 0, 0, outputWidth, outputHeight);
      }

      // 2. Draw the cropped foreground image (logo) on top
      const croppedCanvas = cropper.getCroppedCanvas({
        // You can set output dimensions for the cropped part if needed
      });
      if (croppedCanvas) {
         // Get data on where the crop box is relative to the cropper's container
        const cropBoxData = cropper.getCropBoxData();
        const containerData = cropper.getContainerData();

        // Calculate the position and size of the cropped image on the final canvas
        // This scales the position and size from the on-screen workspace to the high-res output canvas
        const scaleX = outputWidth / containerData.width;
        const scaleY = outputHeight / containerData.height;
        
        const drawX = cropBoxData.left * scaleX;
        const drawY = cropBoxData.top * scaleY;
        const drawWidth = cropBoxData.width * scaleX;
        const drawHeight = cropBoxData.height * scaleY;

        ctx.drawImage(croppedCanvas, drawX, drawY, drawWidth, drawHeight);
      }
      
      // 3. Export the combined canvas and call the completion callback
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
        // If no background is specified, trigger the drawing logic anyway
        background.onload(new Event('load'));
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Logo auf Karte platzieren</DialogTitle>
        </DialogHeader>
        <div ref={workspaceRef} className="my-4 flex-1 flex justify-center items-center bg-muted/30 p-4 relative">
            {/* The actual workspace with the correct aspect ratio */}
            <div 
                className="relative"
                style={{
                    width: `${workspaceSize.width}px`,
                    height: `${workspaceSize.height}px`
                }}
            >
                {/* Layer 1: Background Card Template (Visible) */}
                {backgroundImageUrl && (
                    <Image
                        src={backgroundImageUrl}
                        alt="Kartenvorlage"
                        layout="fill"
                        objectFit="contain"
                        className="absolute inset-0 z-10 pointer-events-none"
                    />
                )}
                
                {/* Layer 2: Cropper for the logo */}
                <div className="absolute inset-0 z-20">
                    <Cropper
                        ref={cropperRef}
                        src={imageUrl}
                        // --- Critical Cropper Settings ---
                        style={{ height: '100%', width: '100%' }}
                        viewMode={2} // Allows cropping area to extend beyond the image
                        dragMode="move" // Allows moving the image underneath the crop box
                        background={false} // Makes the cropper area transparent to see the card behind it
                        responsive={true}
                        autoCrop={true}
                        movable={true}
                        zoomable={true} // Allow scaling the image
                        cropBoxMovable={true}
                        cropBoxResizable={true}
                        checkOrientation={false}
                        guides={true}
                    />
                </div>
            </div>
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
