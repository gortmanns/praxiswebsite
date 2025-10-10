
'use client';

import { DoctorCard } from '../doctor-card';

export function RosenovCard() {
    return (
        <DoctorCard
            id="rosenov"
            order={3}
            name="A. Rosenov"
            frontSideCode={`
                <style>
                    .vita-content { color: hsl(var(--background)); }
                    .vita-content p { margin: 0; }
                    .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                    .vita-content li { margin-bottom: 0.5em; }
                    .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                    .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
                </style>
                <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline border-2 border-green-500">
                    <div class="flex h-full w-full items-start">
                        <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md border-2 border-red-500">
                            <img src="/images/team/Dr.Rosenov.jpg" alt="Portrait von A. Rosenov" data-ai-hint="man portrait" class="w-full h-full object-contain" />
                        </div>
                        <div class="flex-grow flex flex-col justify-center ml-6 h-full relative border-2 border-yellow-400">
                           <div class="border-2 border-blue-500">
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
            `}
            backSideCode={`
                <style>
                    .vita-content { color: hsl(var(--background)); }
                    .vita-content p { margin: 0; }
                    .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                    .vita-content li { margin-bottom: 0.5em; }
                    .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
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
            `}
        />
    );
}
