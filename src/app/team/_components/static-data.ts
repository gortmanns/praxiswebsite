
export const doctors = [
    {
      id: "dr-med-g-ortmanns",
      order: 1,
      name: "Dr. med. G. Ortmanns",
      frontSideCode: `
        <style>
            .template-card p, .template-card h3, .template-card span { margin:0; }
            .template-card .font-headline { font-family: var(--font-headline); }
            .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
            .template-card .bg-card { background-color: hsl(var(--card)); }
            .template-card .p-6 { padding: 1.5rem; }
            .template-card .flex { display: flex; }
            .template-card .h-full { height: 100%; }
            .template-card .w-full { width: 100%; }
            .template-card .items-start { align-items: flex-start; }
            .template-card .relative { position: relative; }
            .template-card .aspect-\\[2\\/3\\] { aspect-ratio: 2 / 3; }
            .template-card .overflow-hidden { overflow: hidden; }
            .template-card .rounded-md { border-radius: 0.375rem; }
            .template-card .flex-grow { flex-grow: 1; }
            .template-card .flex-col { flex-direction: column; }
            .template-card .justify-center { justify-content: center; }
            .template-card .ml-6 { margin-left: 1.5rem; }
            .template-card .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .template-card .font-bold { font-weight: 700; }
            .template-card .text-primary { color: hsl(var(--primary)); }
            .template-card .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
            .template-card .text-5xl { font-size: 3rem; line-height: 1; }
            .template-card .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .template-card .mt-6 { margin-top: 1.5rem; }
            .template-card .absolute { position: absolute; }
            .template-card .bottom-0 { bottom: 0; }
            .template-card .right-0 { right: 0; }
            .template-card .items-center { align-items: center; }
            .template-card .gap-2 { gap: 0.5rem; }
            .template-card .object-cover { object-fit: cover; }
            .template-card .bg-muted { background-color: hsl(var(--muted)); }
        </style>
        <div class="template-card w-full h-full bg-card text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md bg-muted">
                    <img src="/images/team/Ortmanns.jpg" alt="Portrait von Dr. med. G. Ortmanns" class="h-full w-full object-cover relative" />
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <p class="text-2xl font-bold text-primary">Inhaber</p>
                        <h3 class="text-5xl font-bold text-primary my-2">Dr. med. G. Ortmanns</h3>
                        <p class="text-xl font-bold">Facharzt für Allgemeinmedizin (D)</p>
                        <div class="mt-6 text-xl">
                            <p>Fähigkeitsausweis für Praxislabor (KHM)</p>
                            <p>Fähigkeitsausweis für dosisintensives Röntgen (KHM)</p>
                        </div>
                    </div>
                    <div class="absolute bottom-0 right-0 flex items-center gap-2">
                        <img src="https://flag.pk/flags/iso/de.svg" class="h-5 w-auto rounded-sm" />
                        <img src="https://flag.pk/flags/iso/gb.svg" class="h-5 w-auto rounded-sm" />
                    </div>
                </div>
            </div>
        </div>
      `,
      backSideCode: `
        <div class="w-full h-full text-left p-8 text-white">
            <div class="prose prose-invert text-white">
                <h4>Curriculum Vitae</h4>
                <ul>
                    <li>Studium der Humanmedizin in Aachen</li>
                    <li>Facharztausbildung im Spital Heinsberg (D) und Geilenkirchen (D)</li>
                    <li>Anerkennung als Facharzt für Allgemeinmedizin</li>
                    <li>Übernahme der Praxis von Dr. med. A. Keller in Mützenich (D)</li>
                    <li>Weiterbildung im Bereich der speziellen Schmerztherapie und der Palliativmedizin</li>
                    <li>Umzug in die Schweiz und Tätigkeit als leitender Arzt in der Medaxo Praxengruppe</li>
                    <li>Tätigkeit als Vertretungsarzt in diversen Hausarztpraxen</li>
                    <li>Übernahme der Praxis von Dr. med. J. Segginger zum 01.01.2023</li>
                </ul>
            </div>
        </div>`,
      hidden: false,
    },
    {
      id: "prof-dr-med-dr-h-c-peter-schemmer",
      order: 2,
      name: "Prof. Dr. med. Dr. h. c. P. Schemmer",
      frontSideCode: `
       <style>
            .template-card p, .template-card h3, .template-card span { margin:0; }
            .template-card .font-headline { font-family: var(--font-headline); }
            .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
            .template-card .bg-card { background-color: hsl(var(--card)); }
            .template-card .p-6 { padding: 1.5rem; }
            .template-card .flex { display: flex; }
            .template-card .h-full { height: 100%; }
            .template-card .w-full { width: 100%; }
            .template-card .items-start { align-items: flex-start; }
            .template-card .relative { position: relative; }
            .template-card .aspect-\\[2\\/3\\] { aspect-ratio: 2 / 3; }
            .template-card .overflow-hidden { overflow: hidden; }
            .template-card .rounded-md { border-radius: 0.375rem; }
            .template-card .flex-grow { flex-grow: 1; }
            .template-card .flex-col { flex-direction: column; }
            .template-card .justify-center { justify-content: center; }
            .template-card .ml-6 { margin-left: 1.5rem; }
            .template-card .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .template-card .font-bold { font-weight: 700; }
            .template-card .text-primary { color: hsl(var(--primary)); }
            .template-card .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
            .template-card .text-5xl { font-size: 3rem; line-height: 1; }
            .template-card .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .template-card .mt-6 { margin-top: 1.5rem; }
            .template-card .absolute { position: absolute; }
            .template-card .bottom-0 { bottom: 0; }
            .template-card .right-0 { right: 0; }
            .template-card .items-center { align-items: center; }
            .template-card .gap-2 { gap: 0.5rem; }
            .template-card .object-cover { object-fit: cover; }
            .template-card .bg-muted { background-color: hsl(var(--muted)); }
        </style>
        <div class="template-card w-full h-full bg-card text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md bg-muted">
                    <img src="/images/team/Prof.Schemmer.jpg" alt="Portrait von Prof. Dr. med. Dr. h. c. P. Schemmer" class="h-full w-full object-cover relative" />
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <p class="text-2xl font-bold text-primary">Konsiliararzt</p>
                        <h3 class="text-5xl font-bold text-primary my-2">Prof. Dr. med. Dr. h. c. P. Schemmer</h3>
                        <p class="text-xl font-bold">Facharzt für Viszeralchirurgie</p>
                    </div>
                </div>
            </div>
        </div>
      `,
      backSideCode: ``,
      hidden: false,
    }
  ];

export const staff = [
    { id: 'garcia', order: 1, name: 'Fr. Garcia', role: 'Leitende MPA', imageUrl: '/images/team/Garcia.jpg', languages: ['de', 'es'] },
    { id: 'aeschlimann', order: 2, name: 'Fr. Aeschlimann', role: 'MPA', imageUrl: '/images/team/Aeschlimann.jpg', languages: ['de', 'en', 'fr'] },
    { id: 'huber', order: 3, name: 'Fr. Huber', role: 'MPA', imageUrl: '/images/team/Huber.jpg', languages: ['de', 'en'] },
    { id: 'oetztuerk', order: 4, name: 'Fr. Öztürk', role: 'MPA i.A.', imageUrl: '/images/team/Oetztuerk.jpg', languages: ['de', 'tr'] },
    { id: 'sommer', order: 5, name: 'Fr. Sommer', role: 'MPA i.A.', imageUrl: '/images/team/Sommer.jpg', languages: ['de', 'en'] },
];

export const serviceProviders = [
    {
      id: "dr-med-m-rosenov",
      order: 1,
      name: "Dr. med. M. Rosenov",
      frontSideCode: `
        <style>
            .template-card p, .template-card h3, .template-card span { margin:0; }
            .template-card .font-headline { font-family: var(--font-headline); }
            .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
            .template-card .bg-card { background-color: hsl(var(--card)); }
            .template-card .p-6 { padding: 1.5rem; }
            .template-card .flex { display: flex; }
            .template-card .h-full { height: 100%; }
            .template-card .w-full { width: 100%; }
            .template-card .items-start { align-items: flex-start; }
            .template-card .relative { position: relative; }
            .template-card .aspect-\\[2\\/3\\] { aspect-ratio: 2 / 3; }
            .template-card .overflow-hidden { overflow: hidden; }
            .template-card .rounded-md { border-radius: 0.375rem; }
            .template-card .flex-grow { flex-grow: 1; }
            .template-card .flex-col { flex-direction: column; }
            .template-card .justify-center { justify-content: center; }
            .template-card .ml-6 { margin-left: 1.5rem; }
            .template-card .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .template-card .font-bold { font-weight: 700; }
            .template-card .text-primary { color: hsl(var(--primary)); }
            .template-card .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
            .template-card .text-5xl { font-size: 3rem; line-height: 1; }
            .template-card .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .template-card .mt-6 { margin-top: 1.5rem; }
            .template-card .absolute { position: absolute; }
            .template-card .bottom-0 { bottom: 0; }
            .template-card .right-0 { right: 0; }
            .template-card .items-center { align-items: center; }
            .template-card .gap-2 { gap: 0.5rem; }
            .template-card .object-cover { object-fit: cover; }
            .template-card .object-contain { object-fit: contain; }
            .template-card .bg-muted { background-color: hsl(var(--muted)); }
        </style>
        <div class="template-card w-full h-full bg-card text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md bg-muted">
                    <img src="/images/team/Dr.Rosenov.jpg" alt="Portrait von Dr. med. M. Rosenov" class="h-full w-full object-cover relative" />
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <h3 class="text-5xl font-bold text-primary my-2">Dr. med. M. Rosenov</h3>
                        <p class="text-xl font-bold">Facharzt für Orthopädie</p>
                        <div class="mt-6">
                            <img src="https://orthozentrum-bern.ch/wp-content/themes/blankslate-child/img/logo_orthozentrum.svg" alt="Orthozentrum Bern Logo" class="h-auto w-48 object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `,
      backSideCode: ``,
      hidden: false,
    },
    {
      id: "dr-med-s-herschel",
      order: 2,
      name: "Dr. med. S. Herschel",
      frontSideCode: `
        <style>
            /* Stile hier kopieren */
        </style>
        <div class="template-card w-full h-full bg-card text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md bg-muted">
                    <img src="/images/team/Dr.Herschel.jpg" alt="Portrait von Dr. med. S. Herschel" class="h-full w-full object-cover relative" />
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <h3 class="text-5xl font-bold text-primary my-2">Dr. med. S. Herschel</h3>
                        <p class="text-xl font-bold">Fachärztin für Angiologie</p>
                         <div class="mt-6">
                            <img src="/images/VASC-Alliance-Logo.png" alt="VASC Alliance Logo" class="h-auto w-48 object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `,
      backSideCode: ``,
      hidden: false,
    },
     {
      id: "dr-med-a-slezak",
      order: 3,
      name: "Dr. med. A. Slezak",
      frontSideCode: `
        <style>
            /* Stile hier kopieren */
        </style>
        <div class="template-card w-full h-full bg-card text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md bg-muted">
                    <img src="/images/team/Dr.Slezak.jpg" alt="Portrait von Dr. med. A. Slezak" class="h-full w-full object-cover relative" />
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <h3 class="text-5xl font-bold text-primary my-2">Dr. med. A. Slezak</h3>
                        <p class="text-xl font-bold">Fachärztin für Neurologie</p>
                    </div>
                </div>
            </div>
        </div>
      `,
      backSideCode: ``,
      hidden: false,
    }
  ];
