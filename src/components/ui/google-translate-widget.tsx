/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde neu erstellt und stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Globe } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FrFlag, ItFlag, EnFlag, EsFlag, PtFlag, TrFlag } from '@/components/logos/flags';

const disclaimerTranslations = [
    { lang: 'fr', Flag: FrFlag, text: 'Ceci est une traduction automatique. Seule la version originale allemande est juridiquement contraignante.' },
    { lang: 'it', Flag: ItFlag, text: 'Questa è una traduzione automatica. Solo la versione originale tedesca è legalmente vincolante.' },
    { lang: 'en', Flag: EnFlag, text: 'This is an automatic translation. Only the original German version is legally binding.' },
    { lang: 'es', Flag: EsFlag, text: 'Esta es una traducción automática. Solo la versión original en alemán es legalmente vinculante.' },
    { lang: 'pt', Flag: PtFlag, text: 'Esta é uma tradução automática. Apenas a versão original em alemão é legalmente vinculativa.' },
    { lang: 'tr', Flag: TrFlag, text: 'Bu otomatik bir çeviridir. Yalnızca orijinal Almanca versiyon yasal olarak bağlayıcıdır.' },
];

export function GoogleTranslateWidget() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isWarningDismissed, setIsWarningDismissed] = useState(true);

  // Check session storage only on the client side
  useEffect(() => {
    const dismissed = sessionStorage.getItem('googleTranslateWarningDismissed') === 'true';
    setIsWarningDismissed(dismissed);
  }, []);

  useEffect(() => {
    if (document.getElementById('google-translate-script')) {
      return;
    }

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'de',
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, 'google_translate_element');
    };

    const addScript = document.createElement('script');
    addScript.id = 'google-translate-script';
    addScript.type = 'text/javascript';
    addScript.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
    document.body.appendChild(addScript);

    const style = document.createElement('style');
    style.innerHTML = `
      body { top: 0 !important; }
      .skiptranslate { display: none !important; }
      #goog-gt-tt { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
    `;
    document.head.appendChild(style);

  }, []);

  const handleMouseEnter = () => {
    if (!isWarningDismissed) {
      setIsDialogOpen(true);
    }
  };

  const handleDialogConfirm = () => {
    sessionStorage.setItem('googleTranslateWarningDismissed', 'true');
    setIsWarningDismissed(true);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div 
        id="google_translate_element" 
        className="google-translate-widget group"
        onMouseEnter={handleMouseEnter}
      >
        <style>{`
          .google-translate-widget {
              position: relative;
              display: inline-block;
              width: 24px;
              height: 24px;
              cursor: pointer;
          }
          .google-translate-widget .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
            width: 100%;
            height: 100%;
          }
          .google-translate-widget .goog-te-gadget-icon,
          .google-translate-widget .goog-te-gadget-simple span,
          .google-translate-widget .goog-te-gadget-simple > a {
            display: none !important;
          }
          .google-translate-widget .goog-te-gadget-simple .goog-te-menu-value select {
              background: transparent;
              border: none;
              color: transparent;
              cursor: pointer;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
          }
        `}</style>
        <Globe className="pointer-events-none absolute top-0 left-0 h-6 w-6 text-primary-foreground group-hover:text-accent transition-colors" />
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="w-[90vw] md:w-[80vw] max-w-4xl max-h-[90vh] flex flex-col">
              <AlertDialogHeader>
                  <AlertDialogTitle>Hinweis zur automatischen Übersetzung</AlertDialogTitle>
                  <AlertDialogDescription>
                      Bitte beachten Sie die folgenden Informationen zur maschinellen Übersetzung.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-3 py-4 overflow-y-auto">
                  {disclaimerTranslations.map(({ lang, Flag, text }) => (
                      <div key={lang} className="flex items-center gap-3">
                          <Flag className="h-5 w-auto flex-shrink-0 rounded-sm" />
                          <p className="text-sm text-muted-foreground">{text}</p>
                      </div>
                  ))}
              </div>
              <AlertDialogFooter>
                  <AlertDialogAction onClick={handleDialogConfirm}>OK</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}