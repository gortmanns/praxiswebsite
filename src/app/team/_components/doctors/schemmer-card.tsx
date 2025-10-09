
'use client';

import Image from 'next/image';
import { DoctorCard } from '../doctor-card';

export function SchemmerCard() {
  const doctorData = {
    title: 'Prof. Dr. med. Dr. h.c.',
    name: 'P. Schemmer',
    imageUrl: '/images/team/Prof.Schemmer.jpg',
    imageHint: 'man portrait',
    specialty: 'Facharzt für Chirurgie',
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
      <Image
        src="/images/schemmer-worni-logo.png"
        alt="Schemmer & Worni Logo"
        width={300}
        height={100}
        className="h-auto w-full object-contain"
        data-ai-hint="partner logo"
      />
    </DoctorCard>
  );
}
