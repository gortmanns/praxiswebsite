/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde neu erstellt und stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useEffect, useState } from 'react';
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
import { DeFlag, FrFlag, ItFlag, EnFlag, EsFlag, PtFlag, TrFlag } from '@/components/logos/flags';
import { cn } from '@/lib/utils';

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

  useEffect(() => {
    // Check if the script already exists
    if (document.getElementById('google-translate-script')) {
      return;
    }

    // Define the callback function on the window object
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'de',
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, 'google_translate_element');
    };

    // Create and append the script tag
    const addScript = document.createElement('script');
    addScript.id = 'google-translate-script';
    addScript.type = 'text/javascript';
    addScript.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
    document.body.appendChild(addScript);

    // Style the Google Translate bar to be less intrusive
    const style = document.createElement('style');
    style.innerHTML = `
      body { top: 0 !important; }
      .skiptranslate { display: none !important; }
      #goog-gt-tt { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
    `;
    document.head.appendChild(style);

  }, []);

  const handleWidgetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const hasBeenWarned = sessionStorage.getItem('googleTranslateWarningDismissed');
    if (!hasBeenWarned) {
      // Prevent the Google Translate dropdown from opening immediately
      e.stopPropagation();
      e.preventDefault();
      setIsDialogOpen(true);
    }
    // If warned, do nothing and let the click propagate to the widget
  };

  const handleDialogConfirm = () => {
    sessionStorage.setItem('googleTranslateWarningDismissed', 'true');
    setIsDialogOpen(false);
    // Find the select element and manually trigger its dropdown
    const selectElement = document.querySelector('#google_translate_element select') as HTMLSelectElement | null;
    if (selectElement) {
        // This is a bit of a hack, but standard .click() doesn't work on <select>
        const event = new MouseEvent('mousedown');
        selectElement.dispatchEvent(event);
    }
  };


  return (
    <>
      <div 
        id="google_translate_element" 
        className="google-translate-widget"
        onClickCapture={handleWidgetClick}
      >
        <style>{`
          .google-translate-widget .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
            display: inline-block;
          }
          .google-translate-widget .goog-te-gadget-icon {
            display: none !important;
          }
          .google-translate-widget .goog-te-gadget-simple span {
            display: none;
          }
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
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
          }
          .google-translate-widget .goog-te-gadget-simple {
              position: relative;
              display: inline-block;
              width: 24px; /* Size of the icon */
              height: 24px; /* Size of the icon */
          }
        `}</style>
        <Globe className="h-6 w-6 text-primary-foreground cursor-pointer transition-colors hover:text-primary-foreground/80" />
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
