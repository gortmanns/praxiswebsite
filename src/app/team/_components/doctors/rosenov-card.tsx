
'use client';

import { DoctorCard } from '../doctor-card';
import Image from 'next/image';

export function RosenovCard() {
    return (
        <DoctorCard
            title="Prof. Dr. med."
            name="J. Rosenov"
            imageUrl="/images/team/Rosenov.jpg"
            imageHint="man portrait"
            specialty="Facharzt für Angiologie"
            qualifications={[
                'speziell für die Varizenchirurgie',
            ]}
            vita={`
                <p>
                    Prof. Rosenov hat sich bereit erklärt, ab Mai 2024 die Patienten mit Krampfaderleiden im Praxiszentrum im Ring zu behandeln.
                </p>
                <br>
                <p>
                    Er wird regelmässig, i.d.R. am Montagnachmittag, eine Sprechstunde im Praxiszentrum anbieten.
                </p>
                <br>
                <h4>Curriculum Vitae</h4>
                <ul>
                    <li><span style="color: var(--color-tiptap-blue);">Seit 2004</span> Chefarzt Herzchirurgie, Spital Triemli, Zürich</li>
                    <li><span style="color: var(--color-tiptap-blue);">2002</span> Habilitation und Ernennung zum Privatdozenten an der Universität Ulm</li>
                    <li><span style="color: var(--color-tiptap-blue);">1997-2004</span> Oberarzt an der Klinik für Herz-, Thorax- und Gefässchirurgie, Ulm</li>
                    <li><span style="color: var(--color-tiptap-blue);">1991-1996</span> Facharztausbildung in der Herzchirurgie an der Medizinischen Hochschule Hannover</li>
                    <li><span style="color: var(--color-tiptap-blue);">1990</span> Promotion zum Dr. med.</li>
                    <li><span style="color: var(--color-tiptap-blue);">1882-1989</span> Studium der Humanmedizin an der Westfälischen Wilhelms-Universität in Münster</li>
                </ul>
            `}
        >
            <div className="relative w-full h-auto">
                 <Image
                    src="/images/VASC-Alliance-Logo.png"
                    alt="VASC Alliance Logo"
                    width={495}
                    height={165}
                    className="h-auto w-full object-contain object-left"
                    data-ai-hint="partner logo"
                />
            </div>
        </DoctorCard>
    );
}
