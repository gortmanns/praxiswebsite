
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
                <div class="group relative font-headline w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground border-2 border-dashed border-red-500 p-6">
                    <div class="flex h-full w-full items-start">
                        <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md border-2 border-dashed border-green-500">
                            <img src="/images/team/Dr.Rosenov.jpg" alt="Portrait von A. Rosenov" data-ai-hint="man portrait" class="w-full h-full object-contain border-2 border-dashed border-blue-500" />
                        </div>
                        <div class="flex-grow flex flex-col h-full ml-6 border-2 border-dashed border-yellow-500 justify-center">
                             <div>
                                <p class="text-2xl font-bold text-primary">Dr. med.</p>
                                <h3 class="text-5xl font-bold text-primary my-2">A. Rosenov</h3>
                                <p class="text-xl font-bold">Facharzt für Angiologie</p>
                            </div>
                            <div class="mt-6 flex-grow flex items-center">
                                <img src="/images/VASC-Alliance-Logo.png" alt="VASC Alliance Logo" class="h-auto w-full max-w-[400px] object-contain" data-ai-hint="partner logo" />
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
