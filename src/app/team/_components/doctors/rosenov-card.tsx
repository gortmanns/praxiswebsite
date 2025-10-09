
'use client';

import Image from 'next/image';
import { DoctorCard } from '../doctor-card';

export function RosenovCard() {
  const doctorData = {
    title: 'Dr. med.',
    name: 'A. Rosenov',
    imageUrl: '/images/team/Dr.Rosenov.jpg',
    imageHint: 'man portrait',
    specialty: 'Facharzt für Angiologie',
    qualifications: [],
    vita: (
       <>
        <p>
          [Platzhalter: Vita-Text für Dr. Rosenov hier einfügen.]
        </p>
      </>
    ),
  };

  return (
    <DoctorCard {...doctorData}>
      <Image
        src="/images/VASC-Alliance-Logo.png"
        alt="VASC Alliance Logo"
        width={381}
        height={127}
        className="h-auto w-full object-contain"
        data-ai-hint="partner logo"
      />
    </DoctorCard>
  );
}
