
'use client';

import { DoctorCard } from '../doctor-card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';

export function WorniCard() {
  const doctorData = {
    title: 'Prof. Dr. med.',
    name: 'Mathias Worni',
    imageUrl: '/images/team/Prof.Worni.jpg',
    imageHint: 'man portrait',
    specialty: 'Chirurgie FMH, Viszeralchirurgie',
    qualifications: [
      'Schwerpunkt spezielle Viszeralchirurgie (D)',
      'Fellow of the American College of Surgeons (FACS)',
    ],
    vita: (
       <>
        <p>
          [Platzhalter: Der ursprüngliche Vita-Text wurde durch einen Fehler des Assistenten gelöscht und muss hier neu eingefügt werden.]
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
