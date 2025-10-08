'use client';

import 'quill/dist/quill.snow.css';
import React, { useState, useEffect } from 'react';
import { useQuill }s from 'react-quilljs';

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

interface VitaEditorDialogProps {
  trigger: React.ReactNode;
  initialValue: string;
  onSave: (value: string) => void;
}

export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ trigger, initialValue, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
  ];

  const { quill, quillRef } = useQuill({ modules, formats });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (quill && isOpen) {
      quill.clipboard.dangerouslyPasteHTML(initialValue);
    }
  }, [quill, isOpen, initialValue]);

  const handleSave = () => {
    if (quill) {
      onSave(quill.root.innerHTML);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Text der Kartenrückseite bearbeiten</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden py-4">
           {isClient && (
             <div style={{ width: '100%', height: '95%' }}>
                <div ref={quillRef} />
             </div>
           )}
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleSave}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
