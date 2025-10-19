/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function GoogleTranslateWidget() {

  useEffect(() => {
    // Prevent script from being added multiple times
    if (document.getElementById('google-translate-script')) {
      return;
    }

    // Define the initialization function on the window object
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'de',
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, 'google_translate_element');
    };

    // Add the Google Translate script to the page
    const addScript = document.createElement('script');
    addScript.id = 'google-translate-script';
    addScript.type = 'text/javascript';
    addScript.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
    document.body.appendChild(addScript);

    // Add styles to hide the default Google Translate UI elements
    const style = document.createElement('style');
    style.innerHTML = `
      body { top: 0 !important; }
      .skiptranslate { display: none !important; }
      #goog-gt-tt { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
      .goog-te-gadget-simple {
        background-color: transparent !important;
        border: none !important;
        width: 100%;
        height: 100%;
      }
      .goog-te-gadget-icon,
      .goog-te-gadget-simple span,
      .goog-te-gadget-simple > a {
        display: none !important;
      }
      .goog-te-gadget-simple .goog-te-menu-value select {
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
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <TooltipProvider>
      <div className="relative h-6 w-6 cursor-pointer group">
        {/* The actual Google Translate widget, made invisible but clickable */}
        <div id="google_translate_element" className="absolute inset-0 z-10" />

        {/* The visual part: Tooltip with the Globe icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute inset-0 pointer-events-none">
              <Globe className="h-6 w-6 text-primary-foreground group-hover:text-accent transition-colors" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Automatische Übersetzung</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
