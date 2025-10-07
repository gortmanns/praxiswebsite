'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Minus, List, Palette, Info, Eye, Pilcrow, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { VitaRenderer } from './vita-renderer';

interface VitaEditorDialogProps {
  trigger: React.ReactNode;
  initialValue: string;
  onSave: (value: string) => void;
}

const DialogClose: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = (Dialog as any).__private_getContext();
    const handleClose = () => context.onOpenChange(false);
    return <div onClick={handleClose}>{children}</div>;
};

export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ trigger, initialValue, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [vitaContent, setVitaContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setVitaContent(initialValue);
      setPreviewContent(initialValue); // Initial preview
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

  const ToolbarButton = ({ tooltip, onClick, children }: { tooltip: string; onClick: (e: React.MouseEvent) => void; children: React.ReactNode }) => (
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
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col bg-muted">
        <DialogHeader>
          <DialogTitle>Text der Kartenrückseite bearbeiten</DialogTitle>
        </DialogHeader>

        <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
          {/* Editor Column */}
          <div className="flex flex-col gap-4">
            <div className="flex h-14 items-center gap-2 p-2 rounded-md border bg-primary flex-wrap">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" type="button" className="h-8 w-8">
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-1">
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm" onClick={() => applyMarkup('[blau]', '[/blau]')} className="justify-start">
                      <div className="h-4 w-4 rounded-full bg-primary mr-2"></div> Blau
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => applyMarkup('[grau]', '[/grau]')} className="justify-start">
                      <div className="h-4 w-4 rounded-full bg-background/80 border mr-2"></div> Grau
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <ToolbarButton tooltip="Fett" onClick={() => applyMarkup('[fett]', '[/fett]')}>
                <Bold className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton tooltip="Kleine Schrift" onClick={() => applyMarkup('[klein]', '[/klein]')}>
                <span className="font-serif text-sm font-bold">k</span>
              </ToolbarButton>
              <ToolbarButton tooltip="Listenpunkt" onClick={() => applyMarkup('[liste]', '[/liste]')}>
                <List className="h-4 w-4" />
              </ToolbarButton>
               <ToolbarButton tooltip="Kleiner Abstand" onClick={() => applyMarkup('\n[break]\n', '')}>
                <Pilcrow className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton tooltip="Abschnitts-Trennlinie" onClick={() => applyMarkup('\n[linie]\n', '')}>
                <Minus className="h-4 w-4" />
              </ToolbarButton>
            </div>

            <Textarea
              ref={textareaRef}
              value={vitaContent}
              onChange={(e) => setVitaContent(e.target.value)}
              className="flex-1 mt-0 text-sm font-mono whitespace-pre-wrap bg-white text-black"
              placeholder="Geben Sie hier den Text für die Kartenrückseite ein..."
            />
          </div>

          {/* Preview Column */}
          <div className="flex flex-col gap-4">
             <div className="flex h-14 items-center justify-end p-2 rounded-md border bg-primary">
                <Button variant="secondary" size="sm" type="button" onClick={() => setPreviewContent(vitaContent)} className="h-8">
                    <Eye className="mr-2 h-4 w-4" /> Zeige Vorschau
                </Button>
             </div>
             <div className="flex-1 overflow-auto bg-accent/95 p-6 text-left text-background rounded-md border border-accent">
                <div className="w-full text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                    <VitaRenderer text={previewContent} />
                </div>
            </div>
          </div>
        </div>

        <Alert variant="info" className="mt-4 bg-white text-black">
          <Info className="h-4 w-4" />
          <AlertTitle>Formatierungs-Hilfe</AlertTitle>
          <AlertDescription>
            <p>Formatieren Sie Text, indem Sie ihn mit den entsprechenden Tags umschliessen. Benutzen Sie die Werkzeugleiste für eine schnellere Eingabe.</p>
            <ul className="list-disc pl-4 space-y-1 mt-2">
              <li><strong>[blau]...[/blau]</strong>: Text in Blau.</li>
              <li><strong>[grau]...[/grau]</strong>: Leicht abgetönter Text (grau).</li>
              <li><strong>[fett]...[/fett]</strong>: Fetter Text.</li>
              <li><strong>[klein]...[/klein]</strong>: Etwas kleinere Schriftgrösse.</li>
              <li><strong>[liste]...[/liste]</strong>: Formatiert eine Zeile als Aufzählungspunkt.</li>
              <li><strong>[break]</strong>: Fügt einen kleinen vertikalen Abstand ein.</li>
              <li><strong>[linie]</strong>: Fügt eine horizontale Trennlinie ein.</li>
            </ul>
             <p className="mt-2">Die Formatierungen können kombiniert werden, z.B. <code>[blau][fett]Blauer, fetter Text[/fett][/blau]</code>.</p>
          </AlertDescription>
        </Alert>

        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <DialogClose>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleSave}>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
