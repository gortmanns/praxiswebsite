
'use client';

import { DoctorCard } from '../doctor-card';

export function SlezakCard() {
    return (
        <DoctorCard
            id="slezak"
            order={5}
            name="A. Slezak"
            frontSideCode={`
                <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm">
                    <div class="absolute inset-0 flex items-center justify-start bg-card text-card-foreground p-12">
                        <div class="relative w-[330px] h-full overflow-hidden rounded-md aspect-[2/3]">
                            <img src="/images/team/Dr.Slezak.jpg" alt="Portrait von A. Slezak" data-ai-hint="woman portrait" class="w-full h-full object-cover" />
                        </div>
                        <div class="ml-12 flex flex-col justify-start text-left h-full">
                            <p class="text-3xl font-bold">Dr. med.</p>
                            <h3 class="text-6xl font-bold text-primary my-2">A. Slezak</h3>
                            <p class="text-3xl font-bold">Fachärztin für Neurologie</p>
                            <div class="mt-auto pt-8">
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
                <div class="vita-content p-8 w-full max-w-[1000px]">
                    <p>Vita folgt in Kürze.</p>
                </div>
            `}
        />
    );
}
