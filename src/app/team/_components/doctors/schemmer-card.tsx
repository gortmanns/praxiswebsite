
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
          Herr Prof. Schemmer hat in Heidelberg und den USA studiert und sich anschliessend zum Facharzt für Allgemein-, Viszeral- und Transplantationschirurgie weitergebildet.
        </p>
        <br/>
        <p>
          Nach einer Karriere an den Universitätskliniken in Heidelberg und Innsbruck und mehr als 10 Jahren als Chefarzt der Allgemein- und Viszeralchirurgie am Landeskrankenhaus in Graz hat er sich mit einer eigenen Praxis in Bern niedergelassen.
        </p>
        <br/>
        <p>
          Er bietet mehrmals pro Monat eine Sprechstunde für viszeralchirurgische Fragestellungen bei uns im Praxiszentrum an.
        </p>
      </>
    ),
  };

  return (
    <DoctorCard {...doctorData}>
      <Image
        src="/images/schemmer-worni-logo.png"
        alt="Schemmer & Worni Logo"
        width={390}
        height={130}
        className="h-auto w-full object-contain"
        data-ai-hint="partner logo"
      />
    </DoctorCard>
  );
}
