
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
          Prof. Dr. med. Mathias Worni ist ein international anerkannter Spezialist für die chirurgische Behandlung von Leber-, Gallenblasen- und Bauchspeicheldrüsenerkrankungen. Er hat seine Ausbildung in der Schweiz (u.a. Universitätsspital Bern) und an der Duke University (USA) absolviert. Er ist aktuell Chefarzt am Bürgerspital Solothurn, Konsiliararzt für Leber- und Bauchspeicheldrüsenchirurgie am Spitalzentrum Biel und Partner am Orthozentrum Bern.
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
