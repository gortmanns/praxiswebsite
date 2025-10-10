
'use client';

import { DoctorCard } from '../doctor-card';

export function SchemmerCard() {
    return (
        <DoctorCard
            id="schemmer"
            order={2}
            name="P. Schemmer"
            frontSideCode={`
                <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm">
                    <div class="absolute inset-0 flex items-center justify-start bg-card text-card-foreground p-12">
                        <div class="relative w-[330px] h-full overflow-hidden rounded-md aspect-[2/3]">
                            <img src="/images/team/Prof.Schemmer.jpg" alt="Portrait von P. Schemmer" data-ai-hint="man portrait" class="w-full h-full object-cover" />
                        </div>
                        <div class="ml-12 flex flex-col justify-start text-left h-full">
                            <p class="text-3xl font-bold">Prof. Dr. med. Dr. h. c.</p>
                            <h3 class="text-6xl font-bold text-primary my-2">P. Schemmer</h3>
                            <p class="text-3xl font-bold">Facharzt für Chirurgie</p>
                            <div class="mt-auto pt-8">
                                <img src="/images/schemmer-worni-logo.png" alt="Schemmer & Worni Logo" class="h-auto w-full max-w-[400px] object-contain" data-ai-hint="partner logo" />
                            </div>
                        </div>
                    </div>
                </div>
            `}
            backSideCode={`
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
