
'use client';

import { DoctorCard } from '../doctor-card';

export function RosenovCard() {
    return (
        <DoctorCard
            id="rosenov"
            order={3}
            name="A. Rosenov"
            frontSideCode={`
                <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm">
                    <div class="absolute inset-0 flex items-center justify-start bg-card text-card-foreground p-12">
                        <div class="relative w-[330px] h-full overflow-hidden rounded-md">
                            <img src="/images/team/Dr.Rosenov.jpg" alt="Portrait von A. Rosenov" data-ai-hint="man portrait" class="w-full h-full object-cover" />
                        </div>
                        <div class="ml-12 flex flex-col justify-start text-left h-full">
                            <p class="text-3xl font-bold">Prof. Dr. med.</p>
                            <h3 class="text-6xl font-bold text-primary my-2">A. Rosenov</h3>
                            <p class="text-3xl font-bold">Facharzt für Angiologie</p>
                             <div class="mt-auto pt-8">
                                <img src="/images/VASC-Alliance-Logo.png" alt="VASC Alliance Logo" class="h-auto w-full max-w-[400px] object-contain" data-ai-hint="partner logo" />
                            </div>
                        </div>
                    </div>
                </div>
            `}
            backSideCode={`
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
