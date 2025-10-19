/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde neu erstellt und stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GoogleTranslateWidget() {
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

  return (
    <div id="google_translate_element" className="google-translate-widget">
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
  );
}
