
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrtmannsCard } from '@/app/team/_components/doctors/ortmanns-card';
import { SchemmerCard } from '@/app/team/_components/doctors/schemmer-card';
import { RosenovCard } from '@/app/team/_components/doctors/rosenov-card';
import { HerschelCard } from '@/app/team/_components/doctors/herschel-card';
import { SlezakCard } from '@/app/team/_components/doctors/slezak-card';
import { Button } from '@/components/ui/button';
import { EyeOff, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Statische Definition der Ärzte für die Anzeige
const doctors = [
    { id: 'ortmanns', name: 'G. Ortmanns', Component: OrtmannsCard },
    { id: 'schemmer', name: 'P. Schemmer', Component: SchemmerCard },
    { id: 'rosenov', name: 'A. Rosenov', Component: RosenovCard },
    { id: 'herschel', name: 'R. Herschel', Component: HerschelCard },
    { id: 'slezak', name: 'A. Slezak', Component: SlezakCard },
];

export default function DoctorsPage() {
    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
    const [status, setStatus] = useState<{ type: 'info', message: string } | null>(null);

    const handleEditClick = (doctorId: string, doctorName: string) => {
        setEditingDoctorId(doctorId);
        setStatus({ type: 'info', message: `Sie bearbeiten nun das Profil von ${doctorName}. Alle Änderungen werden in der Vorschau angezeigt.` });
    };
    
    const handleCancel = () => {
        setEditingDoctorId(null);
        setStatus(null);
    };

    const editingDoctor = doctors.find(d => d.id === editingDoctorId);

    const getStatusAlert = () => {
        if (!status) return null;
        
        return (
            <Alert variant="info" className="border-2 border-blue-500 text-blue-800 bg-blue-50">
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                    {status.message}
                </AlertDescription>
            </Alert>
        );
    };

    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                    <CardDescription>
                        Hier können Sie die Profile der Ärzte bearbeiten.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                         <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Live-Vorschau & Bearbeitung</h3>
                            {editingDoctorId && (
                                <div className="flex gap-2">
                                    <Button onClick={() => alert('Speichern noch nicht implementiert.')}>
                                        Änderungen speichern
                                    </Button>
                                    <Button variant="outline" onClick={handleCancel}>
                                        Abbrechen
                                    </Button>
                                </div>
                            )}
                        </div>
                        {editingDoctor ? (
                            <div className="rounded-lg bg-muted p-4 md:p-6 border-2 border-dashed border-red-500">
                                <div className="mx-auto w-full max-w-[1000px] p-2">
                                   <editingDoctor.Component />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted p-12 text-center">
                                <h4 className="text-lg font-semibold text-muted-foreground">Wählen Sie unten eine Karte zur Bearbeitung aus.</h4>
                            </div>
                        )}
                         <div className="mt-4 min-h-[76px]">
                            {getStatusAlert()}
                         </div>
                    </div>

                    <Separator className="my-12" />

                    <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Vorhandene Ärztekarten</h3>
                    </div>

                    <div className="mt-8 space-y-12">
                        {doctors.map((doctor) => {
                            const isEditing = editingDoctorId === doctor.id;
                            return (
                                <div key={doctor.id} className="flex w-full items-center justify-center gap-4">
                                    <div className="flex w-36 flex-col gap-2">
                                        <Button variant="outline" size="sm" onClick={() => {}} disabled={isEditing} className="justify-start">
                                            <ArrowUp className="mr-2 h-4 w-4" /> Nach oben
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => {}} disabled={isEditing} className="justify-start">
                                            <ArrowDown className="mr-2 h-4 w-4" /> Nach unten
                                        </Button>
                                        <Separator className="my-2" />
                                        <Button variant="outline" size="sm" onClick={() => {}} disabled={isEditing} className="justify-start">
                                            <EyeOff className="mr-2 h-4 w-4" /> Ausblenden
                                        </Button>
                                        <Button variant="default" size="sm" onClick={() => handleEditClick(doctor.id, doctor.name)} disabled={isEditing || !!editingDoctorId} className="justify-start">
                                            <Info className="mr-2 h-4 w-4" /> Bearbeiten
                                        </Button>
                                    </div>

                                    <div className={cn("relative flex-1 w-full max-w-[1000px] p-2 border-2 border-dashed border-red-500")}>
                                        <doctor.Component />
                                        {isEditing && (
                                            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-primary/90">
                                                <span className="text-2xl font-bold text-primary-foreground">Wird bearbeitet</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
