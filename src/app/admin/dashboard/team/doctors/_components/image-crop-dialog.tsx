'use client';

import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropDialogProps {
  imageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onClose: () => void;
}

// Aspect ratio for the doctor's portrait
const ASPECT_RATIO = 2 / 3;
const MIN_DIMENSION = 150;

export const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  imageUrl,
  onCropComplete,
  onClose,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: 50, // Initial crop width
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleCrop = () => {
    if (!imgRef.current || !crop || !crop.width || !crop.height) {
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const pixelRatio = window.devicePixelRatio;
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    const base64Image = canvas.toDataURL('image/jpeg', 0.9); // High quality JPEG
    onCropComplete(base64Image);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Bild zuschneiden</DialogTitle>
        </DialogHeader>
        <div className="my-4 flex justify-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Vorschau zum Zuschneiden"
              style={{ maxHeight: '70vh' }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
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
