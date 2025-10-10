
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Images } from 'lucide-react';

interface ImageSourceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUpload: () => void;
  onSelect: () => void;
}

export const ImageSourceDialog: React.FC<ImageSourceDialogProps> = ({
  isOpen,
  onOpenChange,
  onUpload,
  onSelect,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bildquelle auswählen</DialogTitle>
          <DialogDescription>
            Wählen Sie, ob Sie ein neues Bild hochladen oder ein vorhandenes aus der Bibliothek auswählen möchten.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={onUpload} size="lg" className="justify-start">
            <Upload className="mr-2 h-4 w-4" />
            Neues Bild hochladen
          </Button>
          <Button onClick={onSelect} size="lg" variant="secondary" className="justify-start" disabled>
            <Images className="mr-2 h-4 w-4" />
            Aus Bibliothek wählen (bald verfügbar)
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
