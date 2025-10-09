
'use client';

import { DoctorCard } from '../doctor-card';

export function OrtmannsCard() {
  const doctorData = {
    title: 'Dipl. med.',
    name: 'G. Ortmanns',
    imageUrl: '/images/team/Ortmanns.jpg',
    imageHint: 'man portrait',
    specialty: 'Praktischer Arzt',
    qualifications: [
      'Master of Public Health (UNSW)',
      'Master of Health Management (UNSW)',
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
      <p className="mt-[2.5cqw] text-[clamp(0.6rem,1.6cqw,1rem)] italic">
        Ärztliche und administrative Leitung Praxiszentrum im Ring
      </p>
    </DoctorCard>
  );
}
