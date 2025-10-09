'use client';

import { DoctorCard } from '../doctor-card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export function HerschelCard() {
    return (
        <DoctorCard
            title="Dr. med."
            name="Ralf Herschel"
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
        >
            <OrthozentrumLogo className="h-28 w-auto" />
        </DoctorCard>
    );
}
