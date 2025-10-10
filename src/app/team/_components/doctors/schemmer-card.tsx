
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
                <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6">
                    <div class="flex h-full w-full items-start">
                        <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md">
                            <img src="/images/team/Prof.Schemmer.jpg" alt="Portrait von P. Schemmer" data-ai-hint="man portrait" class="w-full h-full object-contain" />
                        </div>
                        <div class="flex-grow flex flex-col font-headline justify-center ml-6 h-full relative">
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
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
