
'use client';

import { DoctorCard } from '../doctor-card';

export function SchemmerCard() {
    return (
        <DoctorCard
            id="schemmer"
            order={2}
            name="P. Schemmer"
            frontSideCode={`
                <style>
                    .vita-content { color: hsl(var(--background)); }
                    .vita-content p { margin: 0; }
                </style>
                <div class="group relative font-headline w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground border-2 border-dashed border-red-500 p-6">
                    <div class="flex h-full w-full items-start">
                        <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md border-2 border-dashed border-green-500">
                            <img src="/images/team/Prof.Schemmer.jpg" alt="Portrait von P. Schemmer" data-ai-hint="man portrait" class="w-full h-full object-contain border-2 border-dashed border-blue-500" />
                        </div>
                        <div class="flex-grow flex flex-col h-full ml-6 border-2 border-dashed border-yellow-500 justify-center">
                            <div>
                                <p class="text-2xl font-bold text-primary">Prof. Dr. med. Dr. h. c.</p>
                                <h3 class="text-5xl font-bold text-primary my-2">P. Schemmer</h3>
                                <p class="text-xl font-bold">Facharzt für Chirurgie</p>
                            </div>
                            <div class="mt-6 flex-grow flex items-center">
                                <img src="/images/schemmer-worni-logo.png" alt="Schemmer & Worni Logo" class="h-auto w-full max-w-[400px] object-contain" data-ai-hint="partner logo" />
                            </div>
                        </div>
                    </div>
                </div>
            `}
            backSideCode={`
                <style>
                    .vita-content { color: hsl(var(--background)); }
                    .vita-content p { margin: 0; }
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
            `}
        />
    );
}
