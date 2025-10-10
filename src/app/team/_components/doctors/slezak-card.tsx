'use client';

import { DoctorCard } from '../doctor-card';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';

export const slezakProps = {
    id: "slezak",
    order: 5,
    title: "Dr. med.",
    name: "A. Slezak",
    imageUrl: "/images/team/Dr.Slezak.jpg",
    imageHint: "woman portrait",
    specialty: "Fachärztin für Neurologie",
    qualifications: [],
    vita: `<p>Vita folgt in Kürze.</p>`,
    partnerLogoComponent: AgnieszkaSlezakLogo,
    languages: ['de'],
};

export function SlezakCard() {
    return <DoctorCard {...slezakProps} />;
}
