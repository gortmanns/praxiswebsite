
'use client';

import { DoctorCard } from '../doctor-card';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';

export function SlezakCard() {
  const doctorData = {
    title: 'Dr. med.',
    name: 'Agnieszka Slezak',
    imageUrl: '/images/team/Fr.Dr.Slezak.jpg',
    imageHint: 'woman portrait',
    specialty: 'Neurologie',
    qualifications: [],
    vita: (
      <>
        <p>
          Frau Dr. Slezak bietet als Spezialistin für Neurologie eine neurologische Sprechstunde bei uns in der Praxis an. 
        </p>
        <br/>
        <p>
          Sie führt auch Elektroneuromyographien (ENMG) und Messungen der Nervenleitgeschwindigkeit (NLG) durch.
        </p>
      </>
    ),
  };

  return (
    <DoctorCard {...doctorData}>
      <AgnieszkaSlezakLogo />
    </DoctorCard>
  );
}
