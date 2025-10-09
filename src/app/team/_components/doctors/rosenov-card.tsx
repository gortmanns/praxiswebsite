
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
          Herr Dr. Rosenov bietet als Spezialist für Gefässerkrankungen eine angiologische Sprechstunde bei uns in der Praxis an.
        </p>
        <br/>
        <p>
          Dabei führt er auch Duplex-Sonografien der hirnversorgenden Gefässe, der Extremitätenarterien und der tiefen und oberflächlichen Beinvenen durch.
        </p>
      </>
    ),
  };

  return (
    <DoctorCard {...doctorData}>
      <div className="relative w-[400px] h-32">
        <Image
          src="/images/VASC-Alliance-Logo.png"
          alt="VASC Alliance Logo"
          fill
          className="object-contain"
          data-ai-hint="partner logo"
        />
      </div>
    </DoctorCard>
  );
}
