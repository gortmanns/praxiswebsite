'use client';

import { DoctorCard } from '../doctor-card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export function HerschelCard() {
  const doctorData = {
    title: 'Dr. med.',
    name: 'R. Herschel',
    imageUrl: '/images/team/R.Herschel.jpg',
    imageHint: 'man portrait',
    specialty: 'Facharzt Orthopädische Chirurgie und Traumatologie des Bewegungsapparates',
    qualifications: [],
    vita: (
       <>
        <p>
          [Bitte geben Sie hier den Vita-Text ein.]
        </p>
      </>
    ),
  };

  return (
    <DoctorCard {...doctorData}>
      <OrthozentrumLogo />
    </DoctorCard>
  );
}
