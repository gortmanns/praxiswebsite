
'use client';

import { DoctorCard } from '../doctor-card';

export function SlezakCard() {
    return (
        <DoctorCard
            id="slezak"
            order={5}
            name="A. Slezak"
            frontSideCode={`
                <style>
                    .vita-content { color: hsl(var(--background)); }
                    .vita-content p { margin: 0; }
                </style>
                <div class="group relative font-headline w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground border-2 border-dashed border-red-500 p-6">
                    <div class="flex h-full w-full items-start">
                        <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md border-2 border-dashed border-green-500">
                            <img src="/images/team/Dr.Slezak.jpg" alt="Portrait von A. Slezak" data-ai-hint="woman portrait" class="w-full h-full object-contain border-2 border-dashed border-blue-500" />
                        </div>
                        <div class="flex-grow flex flex-col h-full ml-6 border-2 border-dashed border-yellow-500 justify-center">
                            <div>
                                <p class="text-2xl font-bold text-primary">Dr. med.</p>
                                <h3 class="text-5xl font-bold text-primary my-2">A. Slezak</h3>
                                <p class="text-xl font-bold">Fachärztin für Neurologie</p>
                            </div>
                            <div class="mt-6 flex-grow flex items-center">
                                <svg
                                    viewBox="0 0 170 35"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-[6.9rem] w-auto"
                                    aria-label="Dr. med. Agnieszka Slezak - Fachärztin für Neurologie"
                                    >
                                    <text
                                        x="50%"
                                        y="45%"
                                        dominant-baseline="middle"
                                        font-family="Open Sans, sans-serif"
                                        font-size="12"
                                        font-weight="bold"
                                        fill="#358392"
                                        text-anchor="middle"
                                    >
                                        Dr. med. Agnieszka Slezak
                                    </text>
                                    <text
                                        x="50%"
                                        y="80%"
                                        dominant-baseline="middle"
                                        font-family="Open Sans, sans-serif"
                                        font-size="8"
                                        fill="hsl(var(--muted-foreground))"
                                        text-anchor="middle"
                                    >
                                        Fachärztin für Neurologie
                                    </text>
                                </svg>
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
                    <p>Vita folgt in Kürze.</p>
                </div>
            `}
        />
    );
}
