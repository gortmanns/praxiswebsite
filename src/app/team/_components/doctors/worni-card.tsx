
'use client';

import { DoctorCard } from '../doctor-card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export function WorniCard() {
  const doctorData = {
    title: '[Titel]',
    name: '[Name des Arztes]',
    imageUrl: '/images/team/placeholder.jpg',
    imageHint: 'portrait',
    specialty: '[Spezialisierung]',
    qualifications: [
      '[Qualifikation 1]',
    ],
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
