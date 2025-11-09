'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const managementSections = [
  {
    title: "Banner-Verwaltung",
    description: "Zentrale Steuerung aller Info- und Ferienbanner.",
    link: "/admin/dashboard/banner",
    status: "inaktiv"
  },
  {
    title: "Ferientermine verwalten",
    description: "Praxisferien eintragen und bearbeiten.",
    link: "/admin/dashboard/holidays",
    status: "inaktiv"
  },
  {
    title: "Team: Ärzte",
    description: "Profile der Ärztinnen und Ärzte anpassen.",
    link: "/admin/dashboard/team/doctors",
    status: "inaktiv"
  },
  {
    title: "Team: Praxispersonal",
    description: "Profile der MPA und anderer Mitarbeiter verwalten.",
    link: "/admin/dashboard/team/staff",
    status: "inaktiv"
  },
  {
    title: "Team: Externe Dienstleister",
    description: "Profile von externen Ärzten und Dienstleistern bearbeiten.",
    link: "/admin/dashboard/team/service-providers",
    status: "inaktiv"
  },
  {
    title: "Kooperationspartner: Medizin",
    description: "Logos und Links der medizinischen Kooperationspartner.",
    link: "/admin/dashboard/partners/medical",
    status: "inaktiv"
  },
  {
    title: "Kooperationspartner: Sonstige",
    description: "Logos und Links von weiteren Partnern.",
    link: "/admin/dashboard/partners/other",
    status: "inaktiv"
  },
  {
    title: "Visuelles Design",
    description: "Farbschema der Webseite anpassen.",
    link: "/admin/dashboard/visual-design",
    status: "inaktiv"
  }
];

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementSections.map(section => (
          <Card key={section.link}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${section.status === 'aktiv' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {section.status}
              </span>
              <Button asChild>
                <Link href={section.link}>Verwalten</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
