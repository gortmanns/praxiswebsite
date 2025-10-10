
'use client';

import { DoctorCard } from '../doctor-card';

export function OrtmannsCard() {
    return (
        <DoctorCard
            title="Dipl. med."
            name="G. Ortmanns"
            imageUrl="/images/team/Ortmanns.jpg"
            imageHint="man portrait"
            specialty="Praktischer Arzt"
            qualifications={[
                'Master of Public Health (UNSW)',
                'Master of Health Management (UNSW)',
            ]}
            vita={`
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
            `}
            additionalInfo="Ärztliche und administrative Leitung Praxiszentrum im Ring"
        />
    );
}
