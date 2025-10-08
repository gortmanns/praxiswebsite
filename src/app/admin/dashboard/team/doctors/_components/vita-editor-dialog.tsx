'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface VitaEditorDialogProps {
  trigger: React.ReactNode;
  initialValue: string;
  onSave: (value: string) => void;
}

export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ trigger, initialValue, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEditorContent(initialValue);
    }
  }, [isOpen, initialValue]);

  const handleSave = () => {
    onSave(editorContent);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Text der Kartenrückseite bearbeiten</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-2 text-sm text-muted-foreground">
            Sie können einfachen HTML-Code verwenden, z.B. `<h3>Titel</h3>`, `<p>Absatz</p>`, `<strong>fett</strong>`, `<em>kursiv</em>` und `<ul><li>Punkt</li></ul>`.
          </p>
          <Textarea
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            className="h-64 min-h-[200px] font-mono text-sm"
            placeholder="Geben Sie hier den HTML-Inhalt ein..."
          />
        </div>
        <DialogFooter className="mt-4 flex-shrink-0">
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleSave}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
