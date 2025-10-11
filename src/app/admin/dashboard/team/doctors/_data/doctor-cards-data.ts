export const DOCTOR_CARDS_INITIAL_DATA = [
    {
        id: "ortmanns",
        name: "G. Ortmanns",
        order: 1,
        frontSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline">
                <div class="flex h-full w-full items-start">
                    <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md">
                        <img src="/images/team/Ortmanns.jpg" alt="Portrait von G. Ortmanns" data-ai-hint="man portrait" class="h-full w-full object-contain" />
                    </div>
                    <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                        <div>
                            <p class="text-2xl font-bold text-primary">Dipl. med.</p>
                            <h3 class="text-5xl font-bold text-primary my-2">G. Ortmanns</h3>
                            <p class="text-xl font-bold">Praktischer Arzt</p>
                            <div class="mt-6 text-xl">
                                <p>Master of Public Health (UNSW)</p>
                                <p>Master of Health Management (UNSW)</p>
                            </div>
                            <div class="mt-6 text-base">
                                <p>Ärztliche und administrative Leitung Praxiszentrum im Ring</p>
                            </div>
                        </div>
                        <div class="absolute bottom-0 right-0 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a-ortmanns"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a-ortmanns)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        `,
        backSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="vita-content p-8 w-full max-w-[1000px]">
                <h4>Curriculum Vitae</h4>
                <ul>
                    <li><span style="color: var(--color-tiptap-blue);">2022</span> Niederlassung als Hausarzt im Praxiszentrum im Ring</li>
                    <li><span style="color: var(--color-tiptap-blue);">2021-22</span> Tätigkeit in der Hausarztpraxis Dr. G. Gyger, Thun</li>
                    <li><span style="color: var(--color-tiptap-blue);">2019-21</span> Oberarzt Innere Medizin, Spital STS AG Thun</li>
                    <li><span style="color: var(--color-tiptap-blue);">2018</span> Oberarzt Innere Medizin, Spital Interlaken</li>
                    <li><span style="color: var(--color-tiptap-blue);">2017</span> Assistenzarzt Kardiologie, Inselspital Bern</li>
                    <li><span style="color: var(--color-tiptap-blue);">2016-17</span> Assistenzarzt Pneumologie, Inselspital Bern</li>
                    <li><span style="color: var(--color-tiptap-blue);">2015-16</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li>
                    <li><span style="color: var(--color-tiptap-blue);">2015</span> Erlangung des Facharzttitels für Innere Medizin</li>
                    <li><span style="color: var(--color-tiptap-blue);">2014-15</span> Assistenzarzt Intensivmedizin, Spital STS AG Thun</li>
                    <li><span style="color: var(--color-tiptap-blue);">2013-14</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li>
                    <li><span style="color: var(--color-tiptap-blue);">2011-13</span> Assistenzarzt Innere Medizin, Spital Interlaken</li>
                    <li><span style="color: var(--color-tiptap-blue);">2011</span> Promotion zum Dr. med.</li>
                    <li><span style="color: var(--color-tiptap-blue);">2010-11</span> Assistenzarzt Chirurgie, Klinik für Viszerale Chirurgie und Medizin, Inselspital Bern</li>
                    <li><span style="color: var(--color-tiptap-blue);">2009</span> Staatsexamen</li>
                    <li><span style="color: var(--color-tiptap-blue);">2003-09</span> Studium der Humanmedizin an der Universität zu Köln</li>
                </ul>
                <br>
                <p class="is-small">Mitgliedschaften:<br>Verbindung der Schweizer Ärztinnen und Ärzte (FMH)<br>Ärztegesellschaft des Kantons Bern (BEKAG)<br>Schweizerische Gesellschaft für Ultraschall in der Medizin (SGUM)</p>
            </div>
        `,
    },
    {
        id: "schemmer",
        name: "P. Schemmer",
        order: 2,
        frontSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline">
                <div class="flex h-full w-full items-start">
                    <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md">
                        <img src="/images/team/Prof.Schemmer.jpg" alt="Portrait von P. Schemmer" data-ai-hint="man portrait" class="w-full h-full object-contain" />
                    </div>
                    <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                         <div>
                            <p class="text-2xl font-bold text-primary">Prof. Dr. med. Dr. h. c.</p>
                            <h3 class="text-5xl font-bold text-primary my-2">P. Schemmer</h3>
                            <p class="text-xl font-bold">Facharzt für Chirurgie</p>
                            <div class="mt-6">
                                <img src="/images/schemmer-worni-logo.png" alt="Schemmer & Worni Logo" class="h-auto w-full max-w-[400px] object-contain" data-ai-hint="partner logo" />
                            </div>
                        </div>
                        <div class="absolute bottom-0 right-0 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a-schemmer"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a-schemmer)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        `,
        backSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="vita-content p-8 w-full max-w-[1000px]">
                <p>
                    Prof. Schemmer war von 2013 bis 2022 Direktor der Universitätsklinik für Viszerale Transplantationschirurgie am Inselspital in Bern.
                </p>
                <br>
                <p>
                    Seit 2022 ist er Chefarzt für Chirurgie an der Universitätsklinik für Allgemein-, Viszeral- und Transplantationschirurgie in Graz.
                </p>
                <br>
                <p>
                    Seine Patienten in der Schweiz behandelt er weiterhin, neu aber wohnortnah und unkompliziert auch hier im Praxiszentrum im Ring, wo er eine regelmässige Sprechstunde abhält.
                </p>
            </div>
        `,
    },
    {
        id: "rosenov",
        name: "A. Rosenov",
        order: 3,
        frontSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline">
                <div class="flex h-full w-full items-start">
                    <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md">
                        <img src="/images/team/Dr.Rosenov.jpg" alt="Portrait von A. Rosenov" data-ai-hint="man portrait" class="w-full h-full object-contain" />
                    </div>
                    <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                       <div>
                            <p class="text-2xl font-bold text-primary">Dr. med.</p>
                            <h3 class="text-5xl font-bold text-primary my-2">A. Rosenov</h3>
                            <p class="text-xl font-bold">Facharzt für Angiologie</p>
                            <div class="mt-6">
                                <img src="/images/VASC-Alliance-Logo.png" alt="VASC Alliance Logo" class="h-auto w-full max-w-[400px] object-contain" data-ai-hint="partner logo" />
                            </div>
                        </div>
                        <div class="absolute bottom-0 right-0 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a-rosenov"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a-rosenov)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        `,
        backSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="vita-content p-8 w-full max-w-[1000px]">
                <p>
                    Prof. Rosenov hat sich bereit erklärt, ab Mai 2024 die Patienten mit Krampfaderleiden im Praxiszentrum im Ring zu behandeln.
                </p>
                <br>
                <p>
                    Er wird regelmässig, i.d.R. am Montagnachmittag, eine Sprechstunde im Praxiszentrum anbieten.
                </p>
                <br>
                <h4>Curriculum Vitae</h4>
                <ul>
                    <li><span style="color: var(--color-tiptap-blue);">Seit 2004</span> Chefarzt Herzchirurgie, Spital Triemli, Zürich</li>
                    <li><span style="color: var(--color-tiptap-blue);">2002</span> Habilitation und Ernennung zum Privatdozenten an der Universität Ulm</li>
                    <li><span style="color: var(--color-tiptap-blue);">1997-2004</span> Oberarzt an der Klinik für Herz-, Thorax- und Gefässchirurgie, Ulm</li>
                    <li><span style="color: var(--color-tiptap-blue);">1991-1996</span> Facharztausbildung in der Herzchirurgie an der Medizinischen Hochschule Hannover</li>
                    <li><span style="color: var(--color-tiptap-blue);">1990</span> Promotion zum Dr. med.</li>
                    <li><span style="color: var(--color-tiptap-blue);">1882-1989</span> Studium der Humanmedizin an der Westfälischen Wilhelms-Universität in Münster</li>
                </ul>
            </div>
        `,
    },
    {
        id: "herschel",
        name: "R. Herschel",
        order: 4,
        frontSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline">
                <div class="flex h-full w-full items-start">
                    <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md">
                        <img src="/images/team/Dr.Herschel.jpg" alt="Portrait von R. Herschel" data-ai-hint="man portrait" class="h-full w-full object-contain" />
                    </div>
                    <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                         <div>
                            <p class="text-2xl font-bold text-primary">Dr. med.</p>
                            <h3 class="text-5xl font-bold text-primary my-2">R. Herschel</h3>
                            <div class="text-xl font-bold flex flex-col">
                                <span>Facharzt für Orthopädische Chirurgie und</span>
                                <span>Traumatologie des Bewegungsapparates</span>
                            </div>
                            <div class="mt-6">
                                <svg
                                    viewBox="0 0 240 55.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-28 w-auto"
                                    aria-label="orthozentrum-bern Logo"
                                >
                                    <g>
                                        <path
                                        d="M46.7 7.8S44.5 3.9 40 3.9H20.8s-4.4 0-6.7 3.9L4.6 24.4s-2.2 3.9 0 7.7l9.6 16.6s2.2 3.9 6.7 3.9H40s4.4 0 6.7-3.9l9.6-16.6s2.2-3.9 0-7.7L46.7 7.8z"
                                        fill="none"
                                        stroke="#588791"
                                        stroke-width="1.639"
                                        ></path>
                                        <path
                                        d="M24 52.4c-1.1-3.4-3.1-8-5.1-11.1-.6-.9-1-1.9-1.2-2.9-.3-1.8.9-3.2 2.9-3.5 6.5-1 13-1 19.5 0 2.2.3 3.4 2 2.9 4-.2.7-.5 1.4-1 2.1-2 3.1-4.1 8-5.2 11.4"
                                        fill="none"
                                        stroke="#588791"
                                        stroke-width="1.639"
                                        ></path>
                                        <path
                                        d="M35.4 4.4c.4 3.8 1.7 8 4.1 11.3 1.8 2.4 3.1 2.6 3.7 5.6.5 2.5-.3 6.9-2.3 7.9-2.3 1.2-4.6 1-6.8-.4-1.4-1.2-2.4-1.4-3.6-1.3-1.3 0-2.3.2-3.6 1.3-2.2 1.5-4.4 1.6-6.8.4-2-1-2.8-5.3-2.3-7.9.6-3 1.9-3.2 3.7-5.6 2.4-3.2 3.7-7.4 4.1-11.3"
                                        fill="none"
                                        stroke="#5-88791"
                                        stroke-width="1.639"
                                        ></path>
                                    </g>
                                    <text
                                        x="70"
                                        y="32"
                                        font-family="Montserrat, sans-serif"
                                        font-size="16"
                                        font-weight="bold"
                                        fill="#588791"
                                        dominant-baseline="middle"
                                    >
                                        orthozentrum-bern
                                    </text>
                                </svg>
                            </div>
                        </div>
                        <div class="absolute bottom-0 right-0 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#ED2939" d="M0 0h3v2H0z"></path><path fill="#fff" d="M0 0h2v2H0z"></path><path fill="#002395" d="M0 0h1v2H0z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#008C45" d="M0 0h1v2H0z"></path><path fill="#F4F5F0" d="M1 0h1v2H1z"></path><path fill="#CD212A" d="M2 0h1v2H2z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a-herschel"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a-herschel)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#c60b1e" d="M0 0h3v2H0z"></path><path fill="#ffc400" d="M0 .5h3v1H0z"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        `,
        backSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="vita-content p-8 w-full max-w-[1000px]">
                <p>Vita folgt in Kürze.</p>
            </div>
        `,
    },
    {
        id: "slezak",
        name: "A. Slezak",
        order: 5,
        frontSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline">
                <div class="flex h-full w-full items-start">
                    <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md">
                        <img src="/images/team/Dr.Slezak.jpg" alt="Portrait von A. Slezak" data-ai-hint="woman portrait" class="w-full h-full object-contain" />
                    </div>
                    <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                        <div>
                            <p class="text-2xl font-bold text-primary">Dr. med.</p>
                            <h3 class="text-5xl font-bold text-primary my-2">A. Slezak</h3>
                            <p class="text-xl font-bold">Fachärztin für Neurologie</p>
                            <div class="mt-6 flex items-center justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 60" class="h-auto" style="height: 6.9rem;" aria-label="Dr. med. Agnieszka Slezak - Fachärztin für Neurologie Logo">
                                    <rect width="176" height="60" fill="#6E7F6C" rx="6"></rect>
                                    <text x="50%" y="24" dominant-baseline="middle" text-anchor="middle" style="font-family: Montserrat, sans-serif; font-size: 11px; font-weight: bold; fill: white;">
                                        Dr. med. Agnieszka Slezak
                                    </text>
                                    <text x="50%" y="42" dominant-baseline="middle" text-anchor="middle" style="font-family: Montserrat, sans-serif; font-size: 8.5px; fill: white;">
                                        Fachärztin für Neurologie
                                    </text>
                                </svg>
                            </div>
                        </div>
                        <div class="absolute bottom-0 right-0 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                        </div>
                    </div>
                </div>
            </div>
        `,
        backSideCode: `
            <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .vita-content li { margin-bottom: 0.5em; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            </style>
            <div class="vita-content p-8 w-full max-w-[1000px]">
                <p>Vita folgt in Kürze.</p>
            </div>
        `,
    }
];
