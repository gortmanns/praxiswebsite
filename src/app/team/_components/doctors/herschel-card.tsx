
'use client';

import { DoctorCard } from '../doctor-card';

export function HerschelCard() {
    return (
        <DoctorCard
            id="herschel"
            order={4}
            name="R. Herschel"
            frontSideCode={`
                <style>
                    .vita-content { color: hsl(var(--background)); }
                    .vita-content p { margin: 0; }
                </style>
                <div class="group relative font-headline w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground border-2 border-dashed border-red-500 p-6">
                    <div class="flex h-full w-full items-start">
                        <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md border-2 border-dashed border-green-500">
                            <img src="/images/team/Dr.Herschel.jpg" alt="Portrait von R. Herschel" data-ai-hint="man portrait" class="h-full w-full object-contain border-2 border-dashed border-blue-500" />
                        </div>
                        <div class="flex-grow flex flex-col h-full ml-6 border-2 border-dashed border-yellow-500 justify-center">
                             <div>
                                <p class="text-2xl font-bold text-primary">Dr. med.</p>
                                <h3 class="text-5xl font-bold text-primary my-2">R. Herschel</h3>
                                <div class="text-xl font-bold flex flex-col">
                                    <span>Facharzt Orthopädische Chirurgie und</span>
                                    <span>Traumatologie des Bewegungsapparates</span>
                                </div>
                            </div>
                            <div class="mt-6 flex-grow flex items-center">
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
