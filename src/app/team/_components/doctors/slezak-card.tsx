
'use client';

import { DoctorCard } from '../doctor-card';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';

export function SlezakCard() {
    return (
        <DoctorCard
            id="slezak"
            title="Dr. med."
            name="A. Slezak"
            imageUrl="/images/team/Dr.Slezak.jpg"
            imageHint="woman portrait"
            specialty="Fachärztin für Neurologie"
            qualifications={[]}
            vita={`
                <p>Vita folgt in Kürze.</p>
            `}
        >
            <AgnieszkaSlezakLogo className="h-full w-full object-contain object-left" />
        </DoctorCard>
    );
}
