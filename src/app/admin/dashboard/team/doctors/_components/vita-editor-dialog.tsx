
'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamischer Import des Quill-Editors nur auf der Client-Seite
const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
);

interface VitaEditorDialogProps {
  trigger: React.ReactNode;
  initialValue: string;
  onSave: (value: string) => void;
}

export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ trigger, initialValue, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [vitaContent, setVitaContent] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Stellt sicher, dass Code, der auf dem Client laufen muss, erst nach dem Mount ausgeführt wird.
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setVitaContent(initialValue);
    }
  }, [isOpen, initialValue]);

  const handleSave = () => {
    onSave(vitaContent);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Text der Kartenrückseite bearbeiten</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex-1 min-h-0">
          <Label htmlFor="vita-content" className="mb-2 block">Editor</Label>
          {isClient ? (
            <ReactQuill
              theme="snow"
              value={vitaContent}
              onChange={setVitaContent}
              style={{ height: 'calc(100% - 50px)' }} // Füllt den verfügbaren Platz aus
            />
          ) : (
            <div className="h-full w-full bg-muted rounded-md animate-pulse"></div>
          )}
        </div>
        <Alert variant="info" className="mt-4 flex-shrink-0">
          <Info className="h-4 w-4" />
          <AlertTitle>Hinweis zur Formatierung</AlertTitle>
          <AlertDescription>
            Sie können hier HTML-Tags wie `&lt;h3&gt;`, `&lt;p&gt;`, `&lt;strong&gt;` oder `&lt;ul&gt;` verwenden, um den Text zu strukturieren.
          </AlertDescription>
        </Alert>
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
