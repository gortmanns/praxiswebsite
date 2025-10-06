
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AlertCircle, CheckCircle, TriangleAlert, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, query, orderBy, doc, updateDoc } from 'firebase/firestore';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';


const doctorSchema = z.object({
  title: z.string().optional(),
  name: z.string().min(2, { message: 'Der Name muss mindestens 2 Zeichen lang sein.' }),
  specialty: z.string().min(5, { message: 'Die Spezialität muss mindestens 5 Zeichen lang sein.' }),
  imageUrl: z.string().url({ message: "Bitte geben Sie eine gültige URL ein." }).optional().or(z.literal('')),
  vita: z.string().optional(),
  displayOrder: z.preprocess(
    (a) => (a ? parseInt(z.string().parse(a), 10) : undefined),
    z.number().min(1, "Die Anzeigereihenfolge ist erforderlich.")
  )
});

type DoctorFormValues = z.infer<typeof doctorSchema>;

interface Doctor extends DoctorFormValues {
  id: string;
}

export default function DoctorsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);

  const firestore = useFirestore();

  const doctorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'doctors'), orderBy('displayOrder', 'asc'));
  }, [firestore]);

  const { data: doctorDocs } = useCollection<Doctor>(doctorsQuery);

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      title: '',
      name: '',
      specialty: '',
      imageUrl: '',
      vita: '',
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
    const newDisplayOrder = doctorDocs ? doctorDocs.length + 1 : 1;
    form.reset({ title: '', name: '', specialty: '', imageUrl: '', vita: '', displayOrder: newDisplayOrder });
    setStatus(null);
    form.clearErrors();
  };

  useEffect(() => {
    if (!editMode && doctorDocs) {
        form.setValue('displayOrder', doctorDocs.length + 1);
    }
  }, [doctorDocs, editMode, form]);

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

    } catch (error) {
      console.error("Fehler beim Speichern: ", error);
      setStatus({ type: 'error', message: 'Die Ärzte-Informationen konnten nicht gespeichert werden.' });
    } finally {
      setIsSubmitting(false);
    }
  }

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
                          <Input type="number" {...field} disabled={isSubmitting} onChange={e => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-3">
                        <FormLabel>Bild-URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://beispiel.com/bild.jpg" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vita"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-4">
                        <FormLabel>Vita / Beschreibung</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Lebenslauf oder weitere Informationen..." {...field} disabled={isSubmitting} rows={10} />
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
        </CardContent>
      </Card>
    </div>
    </>
  );
}
