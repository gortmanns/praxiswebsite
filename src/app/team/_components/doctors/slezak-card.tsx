
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
          [Platzhalter: Der ursprüngliche Vita-Text wurde durch einen Fehler des Assistenten gelöscht und muss hier neu eingefügt werden.]
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
