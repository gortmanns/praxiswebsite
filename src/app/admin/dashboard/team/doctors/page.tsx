'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';
import { Info, Plus, Trash2, Pencil, RefreshCw, X } from 'lucide-react';
import { EditableDoctorCard, DoctorData } from './_components/editable-doctor-card';
import { DoctorCard } from '@/app/team/_components/doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import { WithId } from '@/firebase/firestore/use-collection';

export default function DoctorsPage() {
  const [editMode, setEditMode] = useState<'new' | string>('new'); // 'new' or doctor ID
  const [currentDoctorData, setCurrentDoctorData] = useState<DoctorData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<WithId<DoctorData> | null>(null);

  const firestore = useFirestore();
  const doctorsQuery = useMemoFirebase(
      () => firestore ? query(collection(firestore, 'doctors'), orderBy('displayOrder', 'asc')) : null,
      [firestore]
  );
  const { data: doctors, isLoading, error } = useCollection<DoctorData>(doctorsQuery);

  const handleSave = async (data: DoctorData) => {
    if (!firestore) return;

    setIsSubmitting(true);
    try {
        if (editMode === 'new') {
            const lastDisplayOrder = doctors && doctors.length > 0 ? doctors[doctors.length - 1].displayOrder : 0;
            await addDoc(collection(firestore, 'doctors'), { ...data, displayOrder: (lastDisplayOrder || 0) + 1 });
            toast({ title: "Erfolg", description: "Neuer Arzt wurde erfolgreich gespeichert." });
        } else {
            const docRef = doc(firestore, 'doctors', editMode);
            await updateDoc(docRef, data);
            toast({ title: "Erfolg", description: "Arztprofil wurde erfolgreich aktualisiert." });
        }
        handleCancelEdit();
    } catch (e) {
        console.error("Fehler beim Speichern des Arztes:", e);
        toast({ variant: "destructive", title: "Fehler", description: "Das Arztprofil konnte nicht gespeichert werden." });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (doctor: WithId<DoctorData>) => {
    setDoctorToDelete(doctor);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!firestore || !doctorToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(firestore, 'doctors', doctorToDelete.id));
      toast({ title: "Erfolg", description: `Dr. ${doctorToDelete.name} wurde gelöscht.` });
    } catch (e) {
      console.error("Fehler beim Löschen:", e);
      toast({ variant: "destructive", title: "Fehler", description: "Arztprofil konnte nicht gelöscht werden." });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setDoctorToDelete(null);
      handleCancelEdit();
    }
  };

  const handleEditClick = (doctor: WithId<DoctorData>) => {
    setEditMode(doctor.id);
    setCurrentDoctorData(doctor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditMode('new');
    setCurrentDoctorData(null);
  };

  const title = editMode === 'new' ? 'Neuen Arzt erfassen' : `Arztprofil bearbeiten: ${currentDoctorData?.name || ''}`;
  const description = editMode === 'new' ? 'Füllen Sie die Felder aus, um einen neuen Arzt hinzuzufügen.' : 'Ändern Sie die Felder, um das Profil zu aktualisieren.';


  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
          <CardDescription>
            Hier können Sie Ärzte hinzufügen, bearbeiten und eine Vorschau der Profile auf der Team-Seite sehen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-lg border bg-muted p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight text-primary">{title}</h3>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                     {editMode !== 'new' && (
                        <Button variant="outline" onClick={handleCancelEdit} className="mt-4 sm:mt-0">
                           <X className="mr-2 h-4 w-4" /> Bearbeitung abbrechen
                        </Button>
                    )}
                </div>
                
                <div className="mt-6">
                 <EditableDoctorCard 
                    key={editMode}
                    onSave={handleSave} 
                    initialData={currentDoctorData}
                    isSubmitting={isSubmitting}
                 />
                </div>
            </div>

            <Separator className="my-8" />
            
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-2xl font-bold tracking-tight text-primary">Bestehende Ärzte</h3>
                <p className="text-muted-foreground mt-2 sm:mt-0">So erscheinen die Ärzte auf der Team-Seite. Die Reihenfolge kann per Drag-and-Drop geändert werden.</p>
              </div>
              <div className="mt-6 space-y-8">
                {isLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 w-full max-w-[1000px] mx-auto" />)}
                {error && <Alert variant="destructive"><AlertTitle>Fehler</AlertTitle><AlertDescription>Ärzte konnten nicht geladen werden.</AlertDescription></Alert>}
                {doctors?.map((doctor) => (
                   <div key={doctor.id} className="mx-auto max-w-[1000px] p-2 relative group">
                        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="outline" onClick={() => handleEditClick(doctor)}>
                                <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(doctor)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Löschen
                            </Button>
                        </div>
                       <DoctorCard {...doctor} />
                   </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
                Möchten Sie das Profil von <strong>{doctorToDelete?.name}</strong> wirklich unwiderruflich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                {isDeleting ? 'Wird gelöscht...' : 'Löschen'}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </div>
  );
}
