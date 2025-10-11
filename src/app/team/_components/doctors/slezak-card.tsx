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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" class="h-auto" style="height: 6.9rem;" aria-label="Dr. med. Agnieszka Slezak - Fachärztin für Neurologie Logo">
                                    <rect width="240" height="60" fill="#212529" rx="6"></rect>
                                    <text x="50%" y="24" dominant-baseline="middle" text-anchor="middle" style="font-family: Montserrat, sans-serif; font-size: 14px; font-weight: bold; fill: white;">
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#fff" d="M0 0h3v2H0z"></path><path d="M1 0h1v2H1z" fill="#0033a0"></path><path d="M0 1h3v1H0z" fill="#d52b1e"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a-slezak"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a-slezak)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
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
