
'use client';

import { DoctorCard } from '../doctor-card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export function HerschelCard() {
    return (
        <DoctorCard
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
        />
    );
}

    