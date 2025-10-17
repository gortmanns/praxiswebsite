
export const doctorsData = [
  {
    "id": "ortmanns",
    "order": 1,
    "name": "Gernot Ortmanns",
    "frontSideCode": `
        <style>
            .template-card button, .template-card div[id^="edit-"] { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; display: block; }
            .template-card .image-button:hover { background-color: rgba(0,0,0,0.1); }
            .template-card p, .template-card h3, .template-card span { margin:0; }
            .template-card .font-headline { font-family: var(--font-headline); }
            .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
            .template-card .bg-background { background-color: hsl(var(--background)); }
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
            .template-card .text-base { font-size: 1rem; line-height: 1.5rem; }
            .template-card .text-left { text-align: left; }
            .template-card .absolute { position: absolute; }
            .template-card .bottom-0 { bottom: 0; }
            .template-card .right-0 { right: 0; }
            .template-card .items-center { align-items: center; }
            .template-card .gap-2 { gap: 0.5rem; }
            .template-card .object-contain { object-fit: contain; }
            .template-card .object-cover { object-fit: cover; }
            .template-card .text-muted-foreground { color: hsl(var(--muted-foreground)); }
            .template-card .bg-muted { background-color: hsl(var(--muted)); }
            .template-card .text-center { text-align: center; }
            .template-card .mt-2 { margin-top: 0.5rem; }
            .template-card .shrink-0 { flex-shrink: 0; }
        </style>
         <div id="card-root" class="template-card w-full h-full bg-background text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md shrink-0">
                    <div class="w-full h-full relative"><img src="/images/team/Ortmanns.jpg" alt="Portrait von Gernot Ortmanns" class="h-full w-full object-cover relative"></div>
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <div class="w-full text-left">
                            <p class="text-2xl font-bold text-primary">Dipl. med.</p>
                        </div>
                        <div class="w-full text-left">
                            <h3 class="text-5xl font-bold text-primary my-2">Gernot Ortmanns</h3>
                        </div>
                        <div class="w-full text-left">
                            <p class="text-xl font-bold">Facharzt für Allgemeinmedizin (D)</p>
                        </div>
                        <div class="mt-6 text-xl">
                            <div class="w-full text-left"><p>Fähigkeitsausweis Praxislabor (KHM)</p></div>
                            <div class="w-full text-left"><p>Sachkunde für dosisintensives Röntgen (CH)</p></div>
                            <div class="w-full text-left"><p>Verkehrsmedizinische Untersuchung Stufe 1</p></div>
                        </div>
                    </div>
                    <div class="absolute bottom-0 right-0 flex items-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md border border-border"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md border border-border"><clipPath id="a"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    `,
    "backSideCode": `
        <style>
            .vita-content { color: hsl(var(--background)); }
            .vita-content p { margin: 0; }
            .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
            .vita-content li { margin-bottom: 0.5em; }
            .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
            .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
        </style>
        <div class="w-full h-full text-left">
            <div id="edit-vita" class="w-full h-full text-left p-8">
                <div class="vita-content w-full h-full">
                    <h4>Curriculum Vitae</h4>
                    <ul>
                      <li>Medizinstudium an der LMU München</li>
                      <li>Weiterbildung zum Facharzt für Allgemeinmedizin</li>
                      <li>Langjährige Tätigkeit in eigener Praxis in Deutschland</li>
                      <li>Seit 2023 Inhaber des Praxiszentrums im Ring</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    "languages": ["de", "en"],
  },
  {
    "id": "schemmer",
    "order": 2,
    "name": "Prof. Dr. med. Dr. h. c. Peter Schemmer",
    "frontSideCode": `
       <style>
            .template-card button, .template-card div[id^="edit-"] { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; display: block; }
            .template-card .image-button:hover { background-color: rgba(0,0,0,0.1); }
            .template-card p, .template-card h3, .template-card span { margin:0; }
            .template-card .font-headline { font-family: var(--font-headline); }
            .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
            .template-card .bg-background { background-color: hsl(var(--background)); }
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
            .template-card .text-base { font-size: 1rem; line-height: 1.5rem; }
            .template-card .text-left { text-align: left; }
            .template-card .absolute { position: absolute; }
            .template-card .bottom-0 { bottom: 0; }
            .template-card .right-0 { right: 0; }
            .template-card .items-center { align-items: center; }
            .template-card .gap-2 { gap: 0.5rem; }
            .template-card .object-contain { object-fit: contain; }
            .template-card .object-cover { object-fit: cover; }
            .template-card .text-muted-foreground { color: hsl(var(--muted-foreground)); }
            .template-card .bg-muted { background-color: hsl(var(--muted)); }
            .template-card .text-center { text-align: center; }
            .template-card .mt-2 { margin-top: 0.5rem; }
            .template-card .shrink-0 { flex-shrink: 0; }
        </style>
        <div id="card-root" class="template-card w-full h-full bg-background text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md shrink-0">
                    <div class="w-full h-full relative"><img src="/images/team/Prof.Schemmer.jpg" alt="Portrait von Prof. Dr. med. Dr. h. c. Peter Schemmer" class="h-full w-full object-cover relative"></div>
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <div class="w-full text-left">
                            <p class="text-2xl font-bold text-primary">Prof. Dr. med. Dr. h. c.</p>
                        </div>
                        <div class="w-full text-left">
                            <h3 class="text-5xl font-bold text-primary my-2">Peter Schemmer</h3>
                        </div>
                        <div class="w-full text-left">
                            <p class="text-xl font-bold">Facharzt für Chirurgie, Viszeralchirurgie und Transplantationschirurgie</p>
                        </div>
                        <div class="mt-6 w-full text-left">
                          <img src="/images/schemmer-worni-logo.png" alt="Schemmer & Worni Logo" class="h-auto w-64 object-contain">
                        </div>
                    </div>
                    <div class="absolute bottom-0 right-0 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md border border-border"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md border border-border"><clipPath id="a"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    `,
    "backSideCode": `
        <style>
            .vita-content { color: hsl(var(--background)); }
            .vita-content p { margin: 0; }
            .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
            .vita-content li { margin-bottom: 0.5em; }
            .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
            .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
        </style>
        <div class="w-full h-full text-left">
            <div id="edit-vita" class="w-full h-full text-left p-8">
                <div class="vita-content w-full h-full">
                    <h4>Curriculum Vitae</h4>
                    <ul>
                      <li>Umfangreiche internationale Erfahrung in der chirurgischen Onkologie und Transplantationschirurgie</li>
                      <li>Spezialisiert auf Leber-, Gallen- und Bauchspeicheldrüsenchirurgie</li>
                      <li>bietet Sprechstunden und ambulante Operationen im Praxiszentrum an</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    "languages": ["de", "en"],
  }
];

export const staffData = [
    {
        "id": "aeschlimann",
        "order": 1,
        "name": "Jeannine Aeschlimann",
        "role": "MPA",
        "imageUrl": "/images/team/Aeschlimann.jpg",
        "languages": ["de", "fr", "it", "en"],
        "fullWidth": false,
    },
    {
        "id": "huber",
        "order": 2,
        "name": "Natascha Huber",
        "role": "MPA",
        "imageUrl": "/images/team/Huber.jpg",
        "languages": ["de", "en"],
        "fullWidth": false,
    },
    {
        "id": "oetztuerk",
        "order": 3,
        "name": "Selina Oetztürk",
        "role": "MPA in Ausbildung",
        "imageUrl": "/images/team/Oetztuerk.jpg",
        "languages": ["de", "tr"],
        "fullWidth": false,
    },
    {
        "id": "sommer",
        "order": 4,
        "name": "Sarin Sommer",
        "role": "Ernährungsberaterin SVDE",
        "imageUrl": "/images/team/Sommer.jpg",
        "languages": ["de", "en", "fr"],
        "fullWidth": false,
        "backsideContent": "<p>Sarin Sommer ist eine anerkannte Ernährungsberaterin und bietet spezialisierte Beratungen direkt im Praxiszentrum an, um Sie bei Ihren Gesundheits- und Ernährungszielen zu unterstützen.</p>"
    }
];
