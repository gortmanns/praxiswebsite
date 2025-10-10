
'use client';

import { DoctorCard } from '../doctor-card';

export const ortmannsProps = {
    id: "ortmanns",
    order: 1,
    name: "G. Ortmanns",
    frontSideCode: `
<div class="relative w-full h-full bg-card" style="container-type: inline-size;">
    <div class="grid h-full grid-cols-3 items-stretch gap-[4.5%] p-6">
        <div class="relative col-span-1 w-full overflow-hidden rounded-md">
            <div class="relative h-full w-full aspect-[2/3] bg-muted">
                <img src="/images/team/Ortmanns.jpg" alt="Portrait von G. Ortmanns" data-ai-hint="man portrait" style="position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; color: transparent;">
            </div>
        </div>
        <div class="col-span-2 flex flex-col justify-center">
            <div class="text-left text-foreground/80">
                <p class="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">Dipl. med.</p>
                <h4 class="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                    G. Ortmanns
                </h4>
                <div class="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                    <p class="font-bold">Praktischer Arzt</p>
                    <p>Master of Public Health (UNSW)</p>
                    <p>Master of Health Management (UNSW)</p>
                </div>
                <div class="mt-[2.5cqw]">
                    <p class="text-[clamp(0.6rem,1.6cqw,1rem)] italic">
                        Ärztliche und administrative Leitung Praxiszentrum im Ring
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute bottom-6 right-6 flex items-center gap-2">
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>
        </div>
    </div>
</div>`,
    backSideCode: `
        <div class="p-6">
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
    `,
};

export function OrtmannsCard() {
    return <DoctorCard {...ortmannsProps} />;
}
