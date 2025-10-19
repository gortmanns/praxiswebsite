
'use client';

import React, { useEffect } from 'react';

export function GoogleTranslateWidget() {

  useEffect(() => {
    const scriptId = 'google-translate-script';
    
    // Check if the script already exists
    if (document.getElementById(scriptId)) {
        // If it exists, ensure the widget is initialized
        if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement({
                pageLanguage: 'de',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
            }, 'google_translate_element');
        }
        return;
    }

    // Define the initialization function on the window object
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'de',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, 'google_translate_element');
    };

    // Add the Google Translate script to the page
    const addScript = document.createElement('script');
    addScript.id = scriptId;
    addScript.type = 'text/javascript';
    addScript.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
    document.body.appendChild(addScript);

  }, []);
  
  // This is the placeholder div that Google's script will populate.
  return <div id="google_translate_element" />;
}
