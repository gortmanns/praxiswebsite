
'use client';

import { DoctorCard } from '../doctor-card';

export function HerschelCard() {
    return (
        <DoctorCard
            id="herschel"
            title="Dr. med."
            name="R. Herschel"
            imageUrl="/images/team/Dr.Herschel.jpg"
            imageHint="man portrait"
            specialty="Facharzt Orthopädische Chirurgie und Traumatologie des Bewegungsapparates"
            qualifications={[]}
            vita={`
                <p>Vita folgt in Kürze.</p>
            `}
            partnerLogoComponent="OrthozentrumLogo"
            order={4}
        />
    );
}
