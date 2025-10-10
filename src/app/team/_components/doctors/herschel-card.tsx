
'use client';

import { DoctorCard } from '../doctor-card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export function HerschelCard() {
    return (
        <DoctorCard
            id="herschel"
            order={4}
            title="Dr. med."
            name="R. Herschel"
            imageUrl="/images/team/Dr.Herschel.jpg"
            imageHint="man portrait"
            specialty={
             <div>
                <span>Facharzt Orthopädische Chirurgie und</span>
                <span>Traumatologie des Bewegungsapparates</span>
             </div>
            }
            qualifications={[]}
            vita={`
                <p>Vita folgt in Kürze.</p>
            `}
            partnerLogoComponent={OrthozentrumLogo}
        />
    );
}
