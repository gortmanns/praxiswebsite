'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Heading2, List, Minus, Type } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';


interface VitaEditorDialogProps {
  trigger: React.ReactNode;
  initialValue: string;
  onSave: (value: string) => void;
}

export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ trigger, initialValue, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [vitaContent, setVitaContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setVitaContent(initialValue);
    }
  }, [isOpen, initialValue]);
  
  const applyMarkup = (markupStart: string, markupEnd: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = vitaContent.substring(start, end);
    
    let newText;
    if (selectedText) {
        newText = `${vitaContent.substring(0, start)}${markupStart}${selectedText}${markupEnd}${vitaContent.substring(end)}`;
    } else {
        newText = `${vitaContent.substring(0, start)}${markupStart}${markupEnd}${vitaContent.substring(start)}`;
    }

    setVitaContent(newText);
    
    // Set focus back to textarea and adjust cursor position
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start + markupStart.length, end + markupStart.length);
      } else {
        textarea.setSelectionRange(start + markupStart.length, start + markupStart.length);
      }
    }, 0);
  };


  const handleSave = () => {
    onSave(vitaContent);
    setIsOpen(false);
  };

  const ToolbarButton = ({ tooltip, onClick, children }: { tooltip: string, onClick: () => void, children: React.ReactNode}) => (
     <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline" size="icon" type="button" onClick={onClick} className="h-8 w-8">
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Lebenslauf bearbeiten</DialogTitle>
          <DialogDescription>
            Bearbeiten Sie den Lebenslauf mit der Werkzeugleiste oder indem Sie die Markdown-Syntax direkt eingeben.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 p-2 rounded-md border bg-muted">
            <ToolbarButton tooltip="Überschrift (blau)" onClick={() => applyMarkup('### ', '')}>
                <Heading2 className="h-4 w-4 text-primary" />
            </ToolbarButton>
            <ToolbarButton tooltip="Fetter Text (weiss)" onClick={() => applyMarkup('**', '**')}>
                <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton tooltip="Aufzählung (grau, klein)" onClick={() => applyMarkup('<Meilensteine>\n', '\n</Meilenstealen>')}>
                <List className="h-4 w-4 text-muted-foreground" />
            </ToolbarButton>
             <ToolbarButton tooltip="Abschnitts-Trennlinie" onClick={() => applyMarkup('\n---\n', '')}>
                <Minus className="h-4 w-4" />
            </ToolbarButton>
        </div>

        <Textarea
          ref={textareaRef}
          value={vitaContent}
          onChange={(e) => setVitaContent(e.target.value)}
          className="flex-1 mt-4 text-sm font-mono whitespace-pre-wrap"
          placeholder="Geben Sie hier den Lebenslauf ein..."
        />

        <Alert variant="info" className="mt-4 text-xs">
          <Type className="h-4 w-4" />
          <AlertTitle>Formatierungs-Hilfe</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4 space-y-1">
                <li><code className="font-bold">### Titel</code> für eine blaue, fette Überschrift.</li>
                <li><code className="font-bold">**Text**</code> für fetten, weissen Text.</li>
                <li>Umschliessen Sie eine Liste von Meilensteinen mit <code className="font-bold">&lt;Meilensteine&gt;</code> und <code className="font-bold">&lt;/Meilenstealen&gt;</code>, um sie als graue, kleinere Aufzählung darzustellen. Jede Zeile dazwischen wird zu einem Listenpunkt. Die erste Zeile innerhalb des Blocks wird zur Überschrift der Liste.</li>
                <li><code className="font-bold">---</code> auf einer eigenen Zeile, um Abschnitte zu trennen.</li>
            </ul>
          </AlertDescription>
        </Alert>


        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleSave}>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
