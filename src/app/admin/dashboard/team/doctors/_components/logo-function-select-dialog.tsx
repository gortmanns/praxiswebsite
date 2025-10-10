
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
import { Type, Image, Upload, Images } from 'lucide-react';

interface LogoFunctionSelectDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelectFunction: () => void;
  onSelectFromLibrary: () => void;
  onUploadNew: () => void;
}

export const LogoFunctionSelectDialog: React.FC<LogoFunctionSelectDialogProps> = ({
  isOpen,
  onOpenChange,
  onSelectFunction,
  onSelectFromLibrary,
  onUploadNew,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Typ auswählen</DialogTitle>
          <DialogDescription>
            Möchten Sie eine Funktion (Text) eingeben oder ein Logo hinzufügen?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={onSelectFunction} size="lg" className="justify-start">
            <Type className="mr-2 h-4 w-4" />
            Funktion eingeben
          </Button>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Logo hinzufügen:</p>
            <div className="grid grid-cols-2 gap-2">
                <Button onClick={onSelectFromLibrary} size="lg" variant="secondary" className="justify-start">
                    <Images className="mr-2 h-4 w-4" />
                    Bestehendes
                </Button>
                <Button onClick={onUploadNew} size="lg" variant="secondary" className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Neues
                </Button>
            </div>
          </div>
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
