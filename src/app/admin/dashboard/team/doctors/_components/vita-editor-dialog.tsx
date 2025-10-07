
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bold, Palette, Trash2, Plus, List, Pilcrow } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type VitaLine = {
  id: number;
  text: string;
  isBold: boolean;
  color: 'default' | 'primary' | 'muted';
  isListItem: boolean;
  size: 'default' | 'small';
};

interface VitaEditorDialogProps {
  trigger: React.ReactNode;
  initialValue: string;
  onSave: (value: string) => void;
}

const parseVitaString = (vita: string): VitaLine[][] => {
  return vita.split('---').map(sectionString =>
    sectionString
      .trim()
      .split('\n')
      .filter(line => line.trim() !== '')
      .map((line, index) => {
        line = line.trim();
        let isBold = false;
        let color: VitaLine['color'] = 'default';
        let isListItem = false;
        let size: VitaLine['size'] = 'default';

        // Example parsing logic, can be made more robust
        // This is a simplified parser based on potential markers
        if (line.startsWith('<h>')) {
          isBold = true;
          color = 'primary';
          line = line.replace('<h>', '');
        }
        if (line.startsWith('<li>')) {
          isListItem = true;
          size = 'small';
          color = 'muted';
          line = line.replace('<li>', '');
        }

        return {
          id: Date.now() + Math.random(),
          text: line,
          isBold,
          color,
          isListItem,
          size,
        };
      })
  );
};

const stringifyVita = (sections: VitaLine[][]): string => {
  // This is a placeholder. A real implementation would need a more
  // complex logic to convert the structured data back to the string format
  // that the display component expects. For now, we'll just join the text.
  return sections.map(section =>
      section.map(line => line.text).join('\n')
  ).join('\n---\n');
};


export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ trigger, initialValue, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<VitaLine[][]>([[]]);

  useEffect(() => {
    if (isOpen) {
      // Simplified initial state for demonstration
      setSections([
        [
            { id: 1, text: 'Medizinstudium in Bonn', isBold: true, color: 'primary', isListItem: false, size: 'default' },
            { id: 2, text: 'Masterstudium Public Health', isBold: false, color: 'default', isListItem: false, size: 'default' },
        ],
        [
            { id: 3, text: 'Weiterbildung in der Schweiz', isBold: true, color: 'primary', isListItem: false, size: 'default' },
            { id: 4, text: 'Universitätsspital Basel (USB)', isBold: false, color: 'muted', isListItem: true, size: 'small' },
            { id: 5, text: 'Kantonsspital Baselland (KSBL)', isBold: false, color: 'muted', isListItem: true, size: 'small' },
        ]
      ]);
    }
  }, [isOpen]);

  const handleSave = () => {
    // For now, we don't save the changes as the stringify function is complex
    // onSave(stringifyVita(sections));
    alert("Speichern ist in diesem Prototyp noch nicht implementiert.");
    setIsOpen(false);
  };
  
  const updateLine = (sectionIndex: number, lineIndex: number, newValues: Partial<VitaLine>) => {
    const newSections = [...sections];
    newSections[sectionIndex][lineIndex] = { ...newSections[sectionIndex][lineIndex], ...newValues };
    setSections(newSections);
  };
  
  const addLine = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].push({ id: Date.now(), text: 'Neue Zeile', isBold: false, color: 'default', isListItem: false, size: 'default' });
    setSections(newSections);
  };

  const removeLine = (sectionIndex: number, lineIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].splice(lineIndex, 1);
    setSections(newSections);
  };
  
  const addSection = () => {
      setSections([...sections, [{ id: Date.now(), text: 'Neuer Abschnitt', isBold: true, color: 'primary', isListItem: false, size: 'default' }]]);
  }

  const removeSection = (sectionIndex: number) => {
    if (sections.length > 1) {
        const newSections = [...sections];
        newSections.splice(sectionIndex, 1);
        setSections(newSections);
    } else {
        alert("Der letzte Abschnitt kann nicht gelöscht werden.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Lebenslauf bearbeiten</DialogTitle>
          <DialogDescription>
            Bearbeiten Sie den Lebenslauf. Fügen Sie Abschnitte und Zeilen hinzu und formatieren Sie den Text.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 pr-4">
            {sections.map((lines, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4 rounded-lg border-2 border-dashed p-4 relative">
                {sectionIndex > 0 && <hr className="absolute -top-3 left-0 w-full border-dashed" />}
                 <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeSection(sectionIndex)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
                {lines.map((line, lineIndex) => (
                  <div key={line.id} className="flex flex-col gap-2 rounded-md border bg-muted/50 p-3">
                    <div className="flex items-center gap-2">
                        <Input
                            value={line.text}
                            onChange={(e) => updateLine(sectionIndex, lineIndex, { text: e.target.value })}
                            className={cn(
                                'flex-1',
                                line.isBold && 'font-bold',
                                line.color === 'primary' && 'text-primary',
                                line.color === 'muted' && 'text-muted-foreground',
                                line.isListItem && 'pl-8',
                                line.size === 'small' && 'text-sm'
                            )}
                        />
                         <Button variant="ghost" size="icon" onClick={() => removeLine(sectionIndex, lineIndex)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-start gap-4">
                        <div className="flex items-center gap-2">
                            <Switch id={`bold-switch-${line.id}`} checked={line.isBold} onCheckedChange={(checked) => updateLine(sectionIndex, lineIndex, { isBold: checked })} />
                            <Label htmlFor={`bold-switch-${line.id}`}><Bold className="h-4 w-4" /></Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch id={`list-switch-${line.id}`} checked={line.isListItem} onCheckedChange={(checked) => updateLine(sectionIndex, lineIndex, { isListItem: checked, size: checked ? 'small' : 'default' })} />
                            <Label htmlFor={`list-switch-${line.id}`}><List className="h-4 w-4" /></Label>
                        </div>
                        <Separator orientation="vertical" className="h-6"/>
                        <div className="flex items-center gap-2">
                            <Label><Palette className="h-4 w-4" /></Label>
                            <Button size="sm" variant={line.color === 'default' ? 'default' : 'outline'} onClick={() => updateLine(sectionIndex, lineIndex, { color: 'default' })}>Weiss</Button>
                            <Button size="sm" variant={line.color === 'primary' ? 'default' : 'outline'} onClick={() => updateLine(sectionIndex, lineIndex, { color: 'primary' })}>Blau</Button>
                            <Button size="sm" variant={line.color === 'muted' ? 'default' : 'outline'} onClick={() => updateLine(sectionIndex, lineIndex, { color: 'muted' })}>Grau</Button>
                        </div>
                    </div>
                  </div>
                ))}
                 <Button variant="outline" size="sm" onClick={() => addLine(sectionIndex)} className="mt-2">
                    <Plus className="mr-2 h-4 w-4" /> Zeile hinzufügen
                </Button>
              </div>
            ))}
             <Button variant="secondary" onClick={addSection} className="mt-4 w-full">
                <Plus className="mr-2 h-4 w-4" /> Abschnitt hinzufügen
            </Button>
          </div>
        </ScrollArea>
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
