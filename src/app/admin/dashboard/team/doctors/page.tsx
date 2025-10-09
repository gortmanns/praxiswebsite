'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { addDoctor, updateDoctor, deleteDoctor, DoctorData } from '@/firebase/firestore/doctors';
import type { Doctor } from '@/app/team/_components/doctor-card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function DoctorsPage() {
  const firestore = useFirestore();
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);

  const doctorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: doctors, isLoading } = useCollection<Doctor>(doctorsQuery);

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingDoctorId(null);
  };

  const handleEdit = (id: string) => {
    setEditingDoctorId(id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingDoctorId(null);
    setIsAdding(false);
  };
  
  const handleSave = async (doctorData: DoctorData) => {
    if (!firestore) return;
    setIsSubmitting(true);
    try {
        if (editingDoctorId) {
            await updateDoctor(firestore, editingDoctorId, doctorData);
            toast({ title: "Erfolg", description: "Arztprofil wurde aktualisiert." });
        } else if (isAdding) {
            const finalData = { ...doctorData, order: doctors?.length || 0 };
            await addDoctor(firestore, finalData);
            toast({ title: "Erfolg", description: "Neuer Arzt wurde hinzugefügt." });
        }
        handleCancel();
    } catch (error) {
        console.error("Fehler beim Speichern des Arztes:", error);
        toast({ variant: "destructive", title: "Fehler", description: "Das Arztprofil konnte nicht gespeichert werden." });
    } finally {
        setIsSubmitting(false);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDoctorToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!firestore || !doctorToDelete) return;
    setIsDeleting(true);
    try {
        await deleteDoctor(firestore, doctorToDelete);
        toast({ title: "Erfolg", description: "Arztprofil wurde gelöscht." });
        // Re-order remaining doctors
        const remainingDoctors = doctors?.filter(d => d.id !== doctorToDelete) || [];
        for (let i = 0; i < remainingDoctors.length; i++) {
            if (remainingDoctors[i].order !== i) {
                await updateDoctor(firestore, remainingDoctors[i].id, { order: i });
            }
        }
    } catch (error) {
        console.error("Fehler beim Löschen:", error);
        toast({ variant: "destructive", title: "Fehler", description: "Das Profil konnte nicht gelöscht werden." });
    } finally {
        setIsDeleting(false);
        setDeleteDialogOpen(false);
        setDoctorToDelete(null);
    }
  };


  if (isAdding) {
    return (
        <div className="flex flex-1 items-start p-4 sm:p-6">
            <EditableDoctorCard onSave={handleSave} onCancel={handleCancel} isSubmitting={isSubmitting} />
        </div>
    );
  }

  if (editingDoctorId) {
    const doctorToEdit = doctors?.find(d => d.id === editingDoctorId);
    if (!doctorToEdit) return <p>Arzt nicht gefunden.</p>;
    return (
        <div className="flex flex-1 items-start p-4 sm:p-6">
            <EditableDoctorCard 
                doctor={doctorToEdit} 
                onSave={handleSave} 
                onCancel={handleCancel} 
                onDelete={openDeleteDialog}
                isSubmitting={isSubmitting}
            />
        </div>
    );
  }


  return (
    <>
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
            <CardDescription>
              Hier können Sie Ärzte hinzufügen, bearbeiten und deren Reihenfolge ändern.
            </CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Arzt hinzufügen
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
             </div>
          ) : (
            <div className="space-y-2">
                {doctors?.map(doctor => (
                    <div key={doctor.id} className="flex items-center gap-2 rounded-lg border bg-card p-3 pr-4 shadow-sm">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                            {doctor.imageUrl ? (
                                <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover" />
                            ): (
                                <div className="flex h-full w-full items-center justify-center bg-muted">
                                    <User className="h-6 w-6 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{doctor.name}</p>
                            <p className="text-sm text-muted-foreground">{doctor.title} - {doctor.specialty}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleEdit(doctor.id)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                             <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(doctor.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
     <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
                Möchten Sie dieses Arztprofil wirklich unwiderruflich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className={cn(buttonVariants({ variant: "destructive" }))}>
                {isDeleting ? 'Wird gelöscht...' : 'Löschen'}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
