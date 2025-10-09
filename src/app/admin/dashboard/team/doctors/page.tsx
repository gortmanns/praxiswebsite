'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DoctorsPage() {

  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader>
          <div>
            <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
            <CardDescription>
              Hier können Sie Ärzte hinzufügen, bearbeiten und deren Reihenfolge ändern.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
            <p>Der Inhalt für die Ärzte-Verwaltung wird hier in Kürze verfügbar sein.</p>
        </CardContent>
      </Card>
    </div>
  );
}
