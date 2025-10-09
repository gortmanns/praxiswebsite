
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
          Nach dem Studium in Düsseldorf und Sydney habe ich zunächst in verschiedenen Fächern in Spitälern in Deutschland und der Schweiz gearbeitet. Im Anschluss an diese breite Ausbildung habe ich mich im Bereich der Notfallmedizin weitergebildet und über viele Jahre als Notarzt auf dem Notarztwagen und Rettungshubschrauber gearbeitet. Seit inzwischen mehr als 10 Jahren bin ich als Hausarzt niedergelassen und habe über die Jahre die Zusatzqualifikationen Praxislabor und dosisintensives Röntgen erworben.
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
