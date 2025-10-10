
'use client';

import { DoctorCard } from '../doctor-card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export function HerschelCard() {
    return (
        <DoctorCard
            id="herschel"
            title="Dr. med."
            name="R. Herschel"
            imageUrl="/images/team/Dr.Herschel.jpg"
            imageHint="man portrait"
            specialty={
                <span>
                    Facharzt für <span className="whitespace-nowrap">Orthopädische Chirurgie</span> und <span className="whitespace-nowrap">Traumatologie des Bewegungsapparates</span>
                </span>
            }
            qualifications={[]}
            vita={`
                <p>Vita folgt in Kürze.</p>
            `}
        >
            <OrthozentrumLogo className="h-full w-full object-contain object-left" />
        </DoctorCard>
    );
}
