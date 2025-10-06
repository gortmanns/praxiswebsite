
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Trash2, AlertCircle, CheckCircle, Pencil, TriangleAlert, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const doctorSchema = z.object({
  title: z.string().optional(),
  name: z.string().min(2, { message: 'Der Name muss mindestens 2 Zeichen lang sein.' }),
  specialty: z.string().min(5, { message: 'Die Spezialität muss mindestens 5 Zeichen lang sein.' }),
  displayOrder: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(1, "Die Anzeigereihenfolge ist erforderlich.")
  )
});

type DoctorFormValues = z.infer<typeof doctorSchema>;

interface Doctor extends DoctorFormValues {
  id: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);

  const firestore = useFirestore();

  const doctorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'doctors'), orderBy('displayOrder', 'asc'));
  }, [firestore]);

  const { data: doctorDocs, isLoading: isLoadingCollection } = useCollection<Doctor>(doctorsQuery);

  useEffect(() => {
      setIsLoading(isLoadingCollection);
      if (doctorDocs) {
        setDoctors(doctorDocs);
      }
  }, [doctorDocs, isLoadingCollection]);


  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      title: '',
      name: '',
      specialty: '',
      displayOrder: 1,
    },
  });

  useEffect(() => {
    if (status && status.type !== 'info') {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [status]);


  const handleCancel = () => {
    setEditMode(null);
    form.reset({ title: '', name: '', specialty: '', displayOrder: (doctors.length + 1) });
    setStatus(null);
    form.clearErrors();
  };

  useEffect(() => {
    if (!editMode && doctors.length > 0) {
        form.setValue('displayOrder', doctors.length + 1);
    }
  }, [doctors, editMode, form]);

  async function onSubmit(data: DoctorFormValues) {
    if (!firestore) return;
    setIsSubmitting(true);
    setStatus(null);
    form.clearErrors('root');

    try {
      if (editMode) {
        const doctorDoc = doc(firestore, 'doctors', editMode);
        await updateDoc(doctorDoc, data);
        setStatus({ type: 'success', message: 'Die Ärzte-Informationen wurden erfolgreich aktualisiert.' });
      } else {
        await addDoc(collection(firestore, 'doctors'), data);
        setStatus({ type: 'success', message: 'Der neue Arzt wurde erfolgreich hinzugefügt.' });
      }
      
      handleCancel();
      // Data will be refetched by useCollection hook

    } catch (error) {
      console.error("Fehler beim Speichern: ", error);
      setStatus({ type: 'error', message: 'Die Ärzte-Informationen konnten nicht gespeichert werden.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDelete = async () => {
    if (!firestore || !doctorToDelete) return;
    setIsDeleting(true);
    setStatus(null);
    try {
      await deleteDoc(doc(firestore, 'doctors', doctorToDelete));
      setStatus({ type: 'success', message: 'Der Arzt wurde erfolgreich entfernt.' });
      // Data will be refetched by useCollection hook
    } catch (error) {
      console.error("Fehler beim Löschen: ", error);
      setStatus({ type: 'error', message: 'Der Arzt konnte nicht gelöscht werden.' });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setDoctorToDelete(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDoctorToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleEdit = (doctor: Doctor) => {
    setEditMode(doctor.id);
    form.setValue('title', doctor.title);
    form.setValue('name', doctor.name);
    form.setValue('specialty', doctor.specialty);
    form.setValue('displayOrder', doctor.displayOrder);
    setStatus({ type: 'info', message: 'Sie können nun den markierten Eintrag bearbeiten.' });
    form.clearErrors();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const getStatusAlert = () => {
    if (!status) return null;

    let variant: 'default' | 'destructive' | 'warning' | 'info' = 'default';
    let icon = <CheckCircle className="h-4 w-4" />;
    let title = "Erfolg";

    switch(status.type) {
        case 'error':
            variant = 'destructive';
            icon = <AlertCircle className="h-4 w-4" />;
            title = "Fehler";
            break;
        case 'warning':
            variant = 'warning';
            icon = <TriangleAlert className="h-4 w-4" />;
            title = "Warnung";
            break;
        case 'info':
            variant = 'info';
            icon = <Info className="h-4 w-4" />;
            title = "Information";
            break;
    }
    
    return (
        <Alert variant={variant} className="border-2">
            {icon}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {status.message}
            </AlertDescription>
        </Alert>
    );
};
  
  return (
    <>
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
          <CardDescription>
            Hier können Sie die Ärzte-Profile verwalten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 rounded-lg border bg-muted p-6 pb-8 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">{editMode ? 'Eintrag bearbeiten' : 'Neuen Arzt erfassen'}</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titel</FormLabel>
                        <FormControl>
                          <Input placeholder="z.B. Dr. med." {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Max Mustermann" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-2">
                        <FormLabel>Spezialität</FormLabel>
                        <FormControl>
                          <Input placeholder="Facharzt für..." {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="displayOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reihenfolge</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-end gap-2 justify-end">
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? 'Wird gespeichert...' : 'Speichern'}
                    </Button>
                    {editMode && (
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                            Abbrechen
                        </Button>
                    )}
                </div>
                <div className="mt-6 min-h-[76px]">
                  {getStatusAlert()}
                </div>
              </form>
            </Form>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Bestehende Ärzte</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-0 bg-primary hover:bg-primary/90">
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary-foreground">Titel</TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary-foreground">Name</TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary-foreground">Spezialität</TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary-foreground w-[100px]">Reihenfolge</TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary-foreground w-[220px]">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="py-4 px-4"><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell className="py-4 px-4"><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell className="py-4 px-4"><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell className="py-4 px-4"><Skeleton className="h-5 w-12" /></TableCell>
                        <TableCell className="py-4 px-4 text-left space-x-2"><Skeleton className="h-9 w-24 inline-block" /><Skeleton className="h-9 w-24 inline-block" /></TableCell>
                      </TableRow>
                    ))
                  ) : doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <TableRow key={doctor.id} className={cn(editMode === doctor.id && "bg-blue-100/70")}>
                        <TableCell className="py-3 px-4 font-medium">{doctor.title}</TableCell>
                        <TableCell className="py-3 px-4 font-bold">{doctor.name}</TableCell>
                        <TableCell className="py-3 px-4">{doctor.specialty}</TableCell>
                        <TableCell className="py-3 px-4 text-center">{doctor.displayOrder}</TableCell>
                        <TableCell className="py-3 px-4 text-left space-x-2">
                           <Button variant="outline" size="sm" onClick={() => handleEdit(doctor)} disabled={isSubmitting || isDeleting}>
                                <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                           </Button>
                           <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(doctor.id)} disabled={isSubmitting || isDeleting}>
                                <Trash2 className="mr-2 h-4 w-4" /> Löschen
                           </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 px-4 text-center text-muted-foreground">
                        Keine Ärzte gefunden.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
                Möchten Sie diesen Eintrag wirklich unwiderruflich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
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
