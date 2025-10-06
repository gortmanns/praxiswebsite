
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFirestore } from '@/firebase';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

const holidaySchema = z.object({
  name: z.string().min(1, { message: 'Name ist erforderlich.' }),
  start: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
  end: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
});

type HolidayFormValues = z.infer<typeof holidaySchema>;


export function HolidayForm() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<HolidayFormValues>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: '',
      start: '',
      end: '',
    },
  });

  const onSubmit = async (data: HolidayFormValues) => {
    if (!firestore) return;
    try {
      await addDoc(collection(firestore, 'holidays'), data);
      toast({
        title: "Erfolg!",
        description: "Der Ferientermin wurde hinzugefügt.",
      });
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Termin konnte nicht gespeichert werden.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end"
      >
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Erster Ferientag</FormLabel>
              <FormControl>
                <Input placeholder="dd.mm.yyyy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Letzter Ferientag</FormLabel>
              <FormControl>
                <Input placeholder="dd.mm.yyyy" {...field} />
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
              <FormLabel>Ferienname</FormLabel>
              <FormControl>
                <Input placeholder="z.B. Sommerferien" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Hinzufügen
        </Button>
      </form>
    </Form>
  );
}


interface HolidayDeleteButtonProps {
    id: string;
}

export function HolidayDeleteButton({ id }: HolidayDeleteButtonProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'holidays', id));
      toast({
        title: "Erfolg!",
        description: "Der Ferientermin wurde gelöscht.",
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Termin konnte nicht gelöscht werden.",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      aria-label="Termin löschen"
    >
      <X className="h-4 w-4 text-destructive" />
    </Button>
  );
}
