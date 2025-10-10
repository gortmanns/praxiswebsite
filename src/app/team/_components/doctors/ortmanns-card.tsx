
'use client';

import { DoctorCard } from '../doctor-card';

export function OrtmannsCard() {
    return (
        <DoctorCard
            id="ortmanns"
            order={1}
            name="G. Ortmanns"
            frontSideCode={`
                <style>
                    .vita-content { color: hsl(var(--background)); }
                    .vita-content p { margin: 0; }
                    .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                    .vita-content li { margin-bottom: 0.5em; }
                    .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                    .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                    .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
                </style>
                <div class="group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline">
                    <div class="flex h-full w-full items-start">
                        <div class="relative h-full aspect-[2/3] overflow-hidden rounded-md">
                            <img src="/images/team/Ortmanns.jpg" alt="Portrait von G. Ortmanns" data-ai-hint="man portrait" class="h-full w-full object-contain" />
                        </div>
                        <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                            <div>
                                <p class="text-2xl font-bold text-primary">Dipl. med.</p>
                                <h3 class="text-5xl font-bold text-primary my-2">G. Ortmanns</h3>
                                <p class="text-xl font-bold">Praktischer Arzt</p>
                                <div class="mt-6 text-xl">
                                    <p>Master of Public Health (UNSW)</p>
                                    <p>Master of Health Management (UNSW)</p>
                                </div>
                                <div class="mt-6 text-base">
                                    <p>Ärztliche und administrative Leitung Praxiszentrum im Ring</p>
                                </div>
                            </div>
                            <div class="absolute bottom-0 right-0 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a-ortmanns"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a-ortmanns)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
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
                    .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
                    .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
                </style>
                <div class="vita-content p-8 w-full max-w-[1000px]">
                    <h4>Curriculum Vitae</h4>
                    <ul>
                        <li><span style="color: var(--color-tiptap-blue);">2022</span> Niederlassung als Hausarzt im Praxiszentrum im Ring</li>
                        <li><span style="color: var(--color-tiptap-blue);">2021-22</span> Tätigkeit in der Hausarztpraxis Dr. G. Gyger, Thun</li>
                        <li><span style="color: var(--color-tiptap-blue);">2019-21</span> Oberarzt Innere Medizin, Spital STS AG Thun</li>
                        <li><span style="color: var(--color-tiptap-blue);">2018</span> Oberarzt Innere Medizin, Spital Interlaken</li>
                        <li><span style="color: var(--color-tiptap-blue);">2017</span> Assistenzarzt Kardiologie, Inselspital Bern</li>
                        <li><span style="color: var(--color-tiptap-blue);">2016-17</span> Assistenzarzt Pneumologie, Inselspital Bern</li>
                        <li><span style="color: var(--color-tiptap-blue);">2015-16</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li>
                        <li><span style="color: var(--color-tiptap-blue);">2015</span> Erlangung des Facharzttitels für Innere Medizin</li>
                        <li><span style="color: var(--color-tiptap-blue);">2014-15</span> Assistenzarzt Intensivmedizin, Spital STS AG Thun</li>
                        <li><span style="color: var(--color-tiptap-blue);">2013-14</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li>
                        <li><span style="color: var(--color-tiptap-blue);">2011-13</span> Assistenzarzt Innere Medizin, Spital Interlaken</li>
                        <li><span style="color: var(--color-tiptap-blue);">2011</span> Promotion zum Dr. med.</li>
                        <li><span style="color: var(--color-tiptap-blue);">2010-11</span> Assistenzarzt Chirurgie, Klinik für Viszerale Chirurgie und Medizin, Inselspital Bern</li>
                        <li><span style="color: var(--color-tiptap-blue);">2009</span> Staatsexamen</li>
                        <li><span style="color: var(--color-tiptap-blue);">2003-09</span> Studium der Humanmedizin an der Universität zu Köln</li>
                    </ul>
                    <br>
                    <p class="is-small">Mitgliedschaften:<br>Verbindung der Schweizer Ärztinnen und Ärzte (FMH)<br>Ärztegesellschaft des Kantons Bern (BEKAG)<br>Schweizerische Gesellschaft für Ultraschall in der Medizin (SGUM)</p>
                </div>
            `}
        />
    );
}
