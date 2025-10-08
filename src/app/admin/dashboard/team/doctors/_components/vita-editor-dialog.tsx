'use client';

import 'react-quill/dist/quill.snow.css';
import React, 'useState, useEffect, useMemo } from 'react';
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
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

interface VitaEditorDialogProps {
  trigger: React.ReactNode;
  initialValue: string;
  onSave: (value: string) => void;
}

export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ trigger, initialValue, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [vitaContent, setVitaContent] = useState('');

  // Dynamically import Quill to avoid SSR issues, as it needs the `document` object.
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  useEffect(() => {
    if (isOpen) {
      setVitaContent(initialValue);
    }
  }, [isOpen, initialValue]);

  const handleSave = () => {
    onSave(vitaContent);
    setIsOpen(false);
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Text der Kartenrückseite bearbeiten</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden py-4">
            <ReactQuill
                theme="snow"
                value={vitaContent}
                onChange={setVitaContent}
                modules={modules}
                formats={formats}
                className="h-full w-full"
                style={{'--ql-snow-bg': 'transparent'} as React.CSSProperties}
            />
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
