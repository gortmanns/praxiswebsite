
'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const availableLanguages = [
  { id: 'de', name: 'Deutsch' },
  { id: 'fr', name: 'Französisch' },
  { id: 'it', name: 'Italienisch' },
  { id: 'en', name: 'Englisch' },
  { id: 'es', name: 'Spanisch' },
  { id: 'pt', name: 'Portugiesisch' },
  { id: 'tr', name: 'Türkisch' },
];

// Sort main languages first, then alphabetically
const sortedLanguages = [...availableLanguages].sort((a, b) => {
    const mainLangs = ['de', 'fr', 'it'];
    const indexA = mainLangs.indexOf(a.id);
    const indexB = mainLangs.indexOf(b.id);
    if (indexA > -1 && indexB > -1) return indexA - indexB;
    if (indexA > -1) return -1;
    if (indexB > -1) return 1;
    return a.name.localeCompare(b.name);
});


interface LanguageSelectDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialLanguages: string[];
  onSave: (selectedLanguages: string[]) => void;
}

export const LanguageSelectDialog: React.FC<LanguageSelectDialogProps> = ({
  isOpen,
  onOpenChange,
  initialLanguages,
  onSave,
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(initialLanguages));

  useEffect(() => {
    if (isOpen) {
      setSelected(new Set(initialLanguages));
    }
  }, [isOpen, initialLanguages]);

  const handleCheckedChange = (langId: string, isChecked: boolean) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(langId);
      } else {
        newSet.delete(langId);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    onSave(Array.from(selected));
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sprachen auswählen</DialogTitle>
          <DialogDescription>
            Wählen Sie die Sprachen aus, die von diesem Arzt gesprochen werden.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {sortedLanguages.map((lang) => (
            <div key={lang.id} className="flex items-center space-x-2">
              <Checkbox
                id={`lang-${lang.id}`}
                checked={selected.has(lang.id)}
                onCheckedChange={(checked) => handleCheckedChange(lang.id, !!checked)}
              />
              <Label htmlFor={`lang-${lang.id}`} className="cursor-pointer">
                {lang.name}
              </Label>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleSave}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
