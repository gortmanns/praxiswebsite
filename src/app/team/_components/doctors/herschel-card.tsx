
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
                <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline border-2 border-green-500">
                    <div class="flex h-full w-full items-start">
                        <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md border-2 border-red-500">
                            <img src="/images/team/Dr.Herschel.jpg" alt="Portrait von R. Herschel" data-ai-hint="man portrait" class="h-full w-full object-contain" />
                        </div>
                        <div class="flex-grow flex flex-col justify-center ml-6 h-full relative border-2 border-yellow-400">
                             <div class="border-2 border-blue-500">
                                <p class="text-2xl font-bold text-primary">Dr. med.</p>
                                <h3 class="text-5xl font-bold text-primary my-2">R. Herschel</h3>
                                <div class="text-xl font-bold flex flex-col">
                                    <span>Facharzt Orthopädische Chirurgie und</span>
                                    <span>Traumatologie des Bewegungsapparates</span>
                                </div>
                                <div class="mt-6">
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
                            <div class="absolute bottom-0 right-0 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#ED2939" d="M0 0h3v2H0z"></path><path fill="#fff" d="M0 0h2v2H0z"></path><path fill="#002395" d="M0 0h1v2H0z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#008C45" d="M0 0h1v2H0z"></path><path fill="#F4F5F0" d="M1 0h1v2H1z"></path><path fill="#CD212A" d="M2 0h1v2H2z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a-herschel"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a-herschel)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#c60b1e" d="M0 0h3v2H0z"></path><path fill="#ffc400" d="M0 .5h3v1H0z"></path></svg>
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
