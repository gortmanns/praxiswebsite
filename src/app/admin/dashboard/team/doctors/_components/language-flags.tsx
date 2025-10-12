
'use client';

import React from 'react';
import { DeFlag, EnFlag, EsFlag, FrFlag, ItFlag, PtFlag, RuFlag, SqFlag, ArFlag, BsFlag, ZhFlag, DaFlag, FiFlag, ElFlag, HeFlag, HiFlag, JaFlag, KoFlag, HrFlag, NlFlag, NoFlag, FaFlag, PlFlag, PaFlag, RoFlag, SvFlag, SrFlag, TaFlag, CsFlag, TrFlag, UkFlag, HuFlag, UrFlag } from '@/components/logos/flags';

interface LanguageFlagsProps {
  languages: string[] | undefined;
}

const flagComponents: { [key: string]: React.FC<{ className?: string }> } = {
  de: DeFlag,
  en: EnFlag,
  fr: FrFlag,
  it: ItFlag,
  es: EsFlag,
  pt: PtFlag,
  ru: RuFlag,
  sq: SqFlag,
  ar: ArFlag,
  bs: BsFlag,
  zh: ZhFlag,
  da: DaFlag,
  fi: FiFlag,
  el: ElFlag,
  he: HeFlag,
  hi: HiFlag,
  ja: JaFlag,
  ko: KoFlag,
  hr: HrFlag,
  nl: NlFlag,
  no: NoFlag,
  fa: FaFlag,
  pl: PlFlag,
  pa: PaFlag,
  ro: RoFlag,
  sv: SvFlag,
  sr: SrFlag,
  ta: TaFlag,
  cs: CsFlag,
  tr: TrFlag,
  uk: UkFlag,
  hu: HuFlag,
  ur: UrFlag,
};

const languageOrder = ['de', 'fr', 'it'];

export const LanguageFlags: React.FC<LanguageFlagsProps> = ({ languages }) => {
  if (!languages || languages.length === 0) {
    return null;
  }

  // Sort languages: official swiss languages first, then the rest alphabetically
  const sortedLanguages = [...languages].sort((a, b) => {
    const indexA = languageOrder.indexOf(a);
    const indexB = languageOrder.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB; // Both are official
    if (indexA !== -1) return -1; // a is official, b is not
    if (indexB !== -1) return 1;  // b is official, a is not
    return a.localeCompare(b); // Neither are official, sort alphabetically
  });

  return (
    <div className="flex items-center gap-2">
      {sortedLanguages.map((lang) => {
        const FlagComponent = flagComponents[lang];
        return FlagComponent ? <FlagComponent key={lang} className="h-5 w-auto rounded-sm shadow-md border border-border" /> : null;
      })}
    </div>
  );
};
