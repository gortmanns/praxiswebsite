
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextEditDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  label: string;
  initialValue: string;
  onSave: (newValue: string) => void;
  isTextArea?: boolean;
}

export const TextEditDialog: React.FC<TextEditDialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  label,
  initialValue,
  onSave,
  isTextArea = false,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
    }
  }, [isOpen, initialValue]);

  const handleSave = () => {
    onSave(value);
    onOpenChange(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !isTextArea && !event.shiftKey) {
      event.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Geben Sie den neuen Wert ein und klicken Sie auf Übernehmen.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className={isTextArea ? "grid gap-2" : "grid grid-cols-4 items-center gap-4"}>
            <Label htmlFor="field-value" className={isTextArea ? "" : "text-right whitespace-nowrap"}>
              {label}
            </Label>
            {isTextArea ? (
                 <Textarea
                    id="field-value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="col-span-3 min-h-[200px] font-mono text-xs"
                    autoFocus
                />
            ) : (
                <Input
                id="field-value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="col-span-3"
                autoFocus
                />
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleSave}>Übernehmen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
