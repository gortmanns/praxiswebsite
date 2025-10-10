
'use client';

import React from 'react';
import { DeFlag, EnFlag, EsFlag, FrFlag, ItFlag } from '@/components/logos/flags';

interface LanguageFlagsProps {
  languages: string[] | undefined;
}

const flagComponents: { [key: string]: React.FC<{ className?: string }> } = {
  de: DeFlag,
  en: EnFlag,
  fr: FrFlag,
  it: ItFlag,
  es: EsFlag,
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
        return FlagComponent ? <FlagComponent key={lang} className="h-5 w-auto rounded-sm shadow-md" /> : null;
      })}
    </div>
  );
};
