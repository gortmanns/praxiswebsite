
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import {
    AgnieszkaSlezakLogo,
    OrthozentrumLogo,
    SchemmerWorniLogo,
    VascAllianceLogo
} from '@/components/logos';
import type { Doctor } from '@/app/team/_components/doctor-card';

const partnerLogos: { id: Doctor['partnerLogoComponent'], component: React.FC<{ className?: string }> }[] = [
  { id: 'AgnieszkaSlezakLogo', component: AgnieszkaSlezakLogo },
  { id: 'OrthozentrumLogo', component: OrthozentrumLogo },
  { id: 'SchemmerWorniLogo', component: SchemmerWorniLogo },
  { id: 'VascAllianceLogo', component: VascAllianceLogo },
];


interface PartnerLogoSelectDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (logoComponent: Doctor['partnerLogoComponent']) => void;
}

export const PartnerLogoSelectDialog: React.FC<PartnerLogoSelectDialogProps> = ({
  isOpen,
  onOpenChange,
  onSave,
}) => {

  const handleSelect = (id: Doctor['partnerLogoComponent']) => {
    onSave(id);
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Partner-Logo auswählen</DialogTitle>
          <DialogDescription>
            Wählen Sie ein Logo aus der Liste der verfügbaren Partner.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 w-full rounded-md border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {partnerLogos.map(({id, component: LogoComponent}) => (
                <Card
                    key={id}
                    className="flex h-32 items-center justify-center p-4 cursor-pointer transition-all hover:border-primary hover:scale-105"
                    onClick={() => handleSelect(id)}
                >
                    <LogoComponent className="max-h-full w-auto text-foreground" />
                </Card>
            ))}
            </div>
        </ScrollArea>
        <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
                Abbrechen
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
