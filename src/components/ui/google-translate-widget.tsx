/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useEffect } from 'react';

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
    // and make our custom icon clickable
    const style = document.createElement('style');
    style.innerHTML = `
      body { top: 0 !important; }
      .skiptranslate { display: none !important; }
      #goog-gt-tt { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
      
      .goog-te-gadget-simple {
        background-color: transparent !important;
        border: none !important;
        font-size: 0px !important; /* Hide text */
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      .goog-te-gadget-simple .goog-te-menu-value * {
          display: none !important;
      }
      .goog-te-gadget-simple > img {
         display: none !important;
      }
      /* This makes the invisible select box cover our div */
      .goog-te-gadget-simple .goog-te-menu-value select {
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

  // This div is the ONLY thing that should be here. It's the target for Google's script.
  // It has no visuals itself.
  return <div id="google_translate_element" />;
}
