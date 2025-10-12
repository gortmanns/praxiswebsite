
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
import { Separator } from '@/components/ui/separator';
import { DeFlag, EnFlag, EsFlag, FrFlag, ItFlag, PtFlag, RuFlag, SqFlag, ArFlag, BsFlag, ZhFlag, DaFlag, FiFlag, ElFlag, HeFlag, HiFlag, JaFlag, KoFlag, HrFlag, NlFlag, NoFlag, FaFlag, PlFlag, PaFlag, RoFlag, SvFlag, SrFlag, TaFlag, CsFlag, TrFlag, UkFlag, HuFlag, UrFlag } from '@/components/logos/flags';

const flagComponents: { [key: string]: React.FC<{ className?: string }> } = {
  de: DeFlag, en: EnFlag, fr: FrFlag, it: ItFlag, es: EsFlag, pt: PtFlag, ru: RuFlag, sq: SqFlag, ar: ArFlag, bs: BsFlag, zh: ZhFlag, da: DaFlag, fi: FiFlag, el: ElFlag, he: HeFlag, hi: HiFlag, ja: JaFlag, ko: KoFlag, hr: HrFlag, nl: NlFlag, no: NoFlag, fa: FaFlag, pl: PlFlag, pa: PaFlag, ro: RoFlag, sv: SvFlag, sr: SrFlag, ta: TaFlag, cs: CsFlag, tr: TrFlag, uk: UkFlag, hu: HuFlag, ur: UrFlag,
};

const mainLanguages = [
  { id: 'de', name: 'Deutsch' },
  { id: 'fr', name: 'Französisch' },
  { id: 'it', name: 'Italienisch' },
  { id: 'en', name: 'Englisch' },
];

const otherLanguages = [
  { id: 'sq', name: 'Albanisch' },
  { id: 'ar', name: 'Arabisch' },
  { id: 'bs', name: 'Bosnisch' },
  { id: 'zh', name: 'Chinesisch (Mandarin)' },
  { id: 'da', name: 'Dänisch' },
  { id: 'fi', name: 'Finnisch' },
  { id: 'el', name: 'Griechisch' },
  { id: 'he', name: 'Hebräisch' },
  { id: 'hi', name: 'Hindi' },
  { id: 'ja', name: 'Japanisch' },
  { id: 'ko', name: 'Koreanisch' },
  { id: 'hr', name: 'Kroatisch' },
  { id: 'nl', name: 'Niederländisch' },
  { id: 'no', name: 'Norwegisch' },
  { id: 'fa', name: 'Persisch (Farsi)' },
  { id: 'pl', name: 'Polnisch' },
  { id: 'pt', name: 'Portugiesisch' },
  { id: 'pa', name: 'Punjabi' },
  { id: 'ro', name: 'Rumänisch' },
  { id: 'ru', name: 'Russisch' },
  { id: 'sv', name: 'Schwedisch' },
  { id: 'sr', name: 'Serbisch' },
  { id: 'es', name: 'Spanisch' },
  { id: 'ta', name: 'Tamil' },
  { id: 'cs', name: 'Tschechisch' },
  { id: 'tr', name: 'Türkisch' },
  { id: 'uk', name: 'Ukrainisch' },
  { id: 'hu', name: 'Ungarisch' },
  { id: 'ur', name: 'Urdu' },
].sort((a, b) => a.name.localeCompare(b.name));


interface LanguageSelectDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialLanguages: string[];
  onSave: (selectedLanguages: string[]) => void;
}

const LanguageCheckboxItem: React.FC<{ lang: {id: string, name: string}, selected: Set<string>, onCheckedChange: (id: string, checked: boolean) => void }> = ({ lang, selected, onCheckedChange }) => {
    const FlagComponent = flagComponents[lang.id];
    return (
        <div className="flex items-center space-x-3">
            <Checkbox
                id={`lang-${lang.id}`}
                checked={selected.has(lang.id)}
                onCheckedChange={(checked) => onCheckedChange(lang.id, !!checked)}
            />
            {FlagComponent && <FlagComponent className="h-4 w-6 rounded-sm border border-border" />}
            <Label htmlFor={`lang-${lang.id}`} className="cursor-pointer">
                {lang.name}
            </Label>
        </div>
    );
};


export const LanguageSelectDialog: React.FC<LanguageSelectDialogProps> = ({
  isOpen,
  onOpenChange,
  initialLanguages,
  onSave,
}) => {
  // If initialLanguages is empty, it's a new card, so default to German.
  const isNewCard = initialLanguages.length === 0;
  const [selected, setSelected] = useState<Set<string>>(new Set(isNewCard ? ['de'] : initialLanguages));

  useEffect(() => {
    if (isOpen) {
      const isNew = initialLanguages.length === 0;
      setSelected(new Set(isNew ? ['de'] : initialLanguages));
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Sprachen auswählen</DialogTitle>
          <DialogDescription>
            Wählen Sie die Sprachen aus, die von diesem Arzt gesprochen werden.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto py-4 pr-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {mainLanguages.map((lang) => (
                <LanguageCheckboxItem
                    key={lang.id}
                    lang={lang}
                    selected={selected}
                    onCheckedChange={handleCheckedChange}
                />
            ))}
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {otherLanguages.map((lang) => (
                   <LanguageCheckboxItem
                        key={lang.id}
                        lang={lang}
                        selected={selected}
                        onCheckedChange={handleCheckedChange}
                    />
                ))}
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
