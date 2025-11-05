'use client';

import Script from 'next/script';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              if (document.getElementById('google_translate_element')) {
                new google.translate.TranslateElement({
                  pageLanguage: 'de',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            }
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
    </>
  );
}
