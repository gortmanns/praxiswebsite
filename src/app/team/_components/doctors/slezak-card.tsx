'use client';

import { DoctorCard } from '../doctor-card';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';

export function SlezakCard() {
    return (
        <DoctorCard
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
            <div className="mt-6 bg-special-green p-4 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 60" className="h-auto" style={{ height: '6.9rem' }} aria-label="Dr. med. Agnieszka Slezak - Fachärztin für Neurologie Logo">
                    <text x="50%" y="15" dominant-baseline="middle" text-anchor="middle" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fill: 'white' }}>
                        Dr. med.
                    </text>
                    <text x="50%" y="33" dominant-baseline="middle" text-anchor="middle" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 'bold', fill: 'white' }}>
                        Agnieszka Slezak
                    </text>
                    <text x="50%" y="51" dominant-baseline="middle" text-anchor="middle" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8.5px', fill: 'white' }}>
                        Fachärztin für Neurologie
                    </text>
                </svg>
            </div>
        </DoctorCard>
    );
}
