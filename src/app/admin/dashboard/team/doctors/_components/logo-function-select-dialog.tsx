
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
import { Type, Image } from 'lucide-react';

interface LogoFunctionSelectDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelectFunction: () => void;
  onSelectLogo: () => void;
}

export const LogoFunctionSelectDialog: React.FC<LogoFunctionSelectDialogProps> = ({
  isOpen,
  onOpenChange,
  onSelectFunction,
  onSelectLogo,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Typ auswählen</DialogTitle>
          <DialogDescription>
            Möchten Sie eine Funktion (Text) eingeben oder ein Logo auswählen?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={onSelectFunction} size="lg" className="justify-start">
            <Type className="mr-2 h-4 w-4" />
            Funktion eingeben
          </Button>
          <Button onClick={onSelectLogo} size="lg" variant="secondary" className="justify-start">
            <Image className="mr-2 h-4 w-4" />
            Logo auswählen
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
