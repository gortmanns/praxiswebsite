
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bold, Palette, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type VitaLine = {
  id: number;
  text: string;
  isBold: boolean;
  color: 'default' | 'primary' | 'muted';
};

interface VitaEditorDialogProps {
  trigger: React.ReactNode;
  initialValue: string;
  onSave: (value: string) => void;
}

// Helper to parse the string into VitaLine objects
const parseVitaString = (vita: string): VitaLine[][] => {
  return vita.split('---').map(sectionString =>
    sectionString
      .trim()
      .split('\n')
      .filter(line => line.trim() !== '')
      .map((line, index) => {
        // This is a simplified parser. A real implementation might need to be more robust.
        // For now, we assume simple lines of text and can't parse bold/color from the initial string.
        return {
          id: Date.now() + index,
          text: line.trim(),
          isBold: false,
          color: 'default',
        };
      })
  );
};

// Helper to convert VitaLine objects back to string
const stringifyVita = (sections: VitaLine[][]): string => {
  return sections
    .map(lines =>
      lines
        .map(line => {
          // This is also simplified. We'd need to add markers for bold/color if we want to save them.
          // For now, it just saves the text.
          return line.text;
        })
        .join('\n')
    )
    .join('\n---\n');
};

export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ trigger, initialValue, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<VitaLine[][]>([[]]);

  useEffect(() => {
    if (isOpen) {
      // For simplicity, we'll start with a basic structure. Parsing the complex initial string is non-trivial.
      setSections([
        [
            { id: 1, text: 'Medizinstudium in Bonn', isBold: true, color: 'primary' },
            { id: 2, text: 'Masterstudium Public Health', isBold: false, color: 'default' },
        ],
        [
            { id: 3, text: 'Weiterbildung in der Schweiz', isBold: true, color: 'primary' },
            { id: 4, text: 'Universitätsspital Basel (USB)', isBold: false, color: 'muted' },
        ]
      ]);
    }
  }, [isOpen, initialValue]);

  const handleSave = () => {
    // A real implementation would convert `sections` back to the string format.
    // This is a placeholder for now.
    onSave(initialValue); // For now, we don't save changes.
    setIsOpen(false);
  };
  
  const updateLine = (sectionIndex: number, lineIndex: number, newValues: Partial<VitaLine>) => {
    const newSections = [...sections];
    newSections[sectionIndex][lineIndex] = { ...newSections[sectionIndex][lineIndex], ...newValues };
    setSections(newSections);
  };
  
  const addLine = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].push({ id: Date.now(), text: '', isBold: false, color: 'default' });
    setSections(newSections);
  };

  const removeLine = (sectionIndex: number, lineIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].splice(lineIndex, 1);
    setSections(newSections);
  };
  
  const addSection = () => {
      setSections([...sections, []]);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Lebenslauf bearbeiten</DialogTitle>
          <DialogDescription>
            Bearbeiten Sie den Lebenslauf. Fügen Sie Abschnitte und Zeilen hinzu und formatieren Sie den Text.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 pr-4">
            {sections.map((lines, sectionIndex) => (
              <div key={sectionIndex} className="space-y-2 rounded-md border p-4 relative">
                {sectionIndex > 0 && <hr className="absolute -top-3 left-0 w-full border-dashed" />}
                {lines.map((line, lineIndex) => (
                  <div key={line.id} className="flex items-center gap-2">
                    <Input
                      value={line.text}
                      onChange={(e) => updateLine(sectionIndex, lineIndex, { text: e.target.value })}
                      className={cn(
                        line.isBold && 'font-bold',
                        line.color === 'primary' && 'text-primary',
                        line.color === 'muted' && 'text-muted-foreground'
                      )}
                    />
                    <ToggleGroup 
                        type="single" 
                        variant="outline"
                        value={line.isBold ? 'bold' : ''}
                        onValueChange={(value) => updateLine(sectionIndex, lineIndex, { isBold: value === 'bold' })}
                    >
                      <ToggleGroupItem value="bold" aria-label="Toggle bold">
                        <Bold className="h-4 w-4" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={line.color}
                      onValueChange={(value: VitaLine['color']) => value && updateLine(sectionIndex, lineIndex, { color: value })}
                    >
                      <ToggleGroupItem value="default" aria-label="Default color"><Palette className="h-4 w-4" /></ToggleGroupItem>
                      <ToggleGroupItem value="primary" aria-label="Primary color"><Palette className="h-4 w-4 text-primary" /></ToggleGroupItem>
                      <ToggleGroupItem value="muted" aria-label="Muted color"><Palette className="h-4 w-4 text-muted-foreground" /></ToggleGroupItem>
                    </ToggleGroup>
                     <Button variant="ghost" size="icon" onClick={() => removeLine(sectionIndex, lineIndex)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                 <Button variant="outline" size="sm" onClick={() => addLine(sectionIndex)} className="mt-2">
                    <Plus className="mr-2 h-4 w-4" /> Zeile hinzufügen
                </Button>
              </div>
            ))}
             <Button variant="secondary" onClick={addSection} className="mt-4 w-full">
                Abschnitt hinzufügen
            </Button>
          </div>
        </ScrollArea>
        <div className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleSave}>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
