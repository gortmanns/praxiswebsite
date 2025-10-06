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
import { useToast } from '@/hooks/use-toast';
import { addHoliday, deleteHoliday, Holiday } from './actions';
import React, { useTransition } from 'react';
import { useFirestore } from '@/firebase';

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

const holidaySchema = z.object({
  name: z.string().min(1, { message: 'Name ist erforderlich.' }),
  start: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
  end: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
});

type HolidayFormValues = z.infer<typeof holidaySchema>;

interface HolidayFormProps {
    setOptimistic: (action: { action: 'add' | 'delete'; holiday: Holiday | {id: string} }) => void;
    holidays: Holiday[];
}

export function HolidayForm({ setOptimistic, holidays }: HolidayFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { db } = useFirestore();

  const form = useForm<HolidayFormValues>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: '',
      start: '',
      end: '',
    },
  });

  const onSubmit = (data: HolidayFormValues) => {
    startTransition(async () => {
      const optimisticId = `optimistic-${Date.now()}`;
      const optimisticHoliday: Holiday = { ...data, id: optimisticId };
      
      setOptimistic({ action: 'add', holiday: optimisticHoliday });
      form.reset();

      const result = await addHoliday(data, db);

      if (result.success && result.id) {
        toast({ title: 'Erfolg', description: result.message });
        // Replace optimistic holiday with real one
        setOptimistic({ action: 'delete', holiday: { id: optimisticId } });
        setOptimistic({ action: 'add', holiday: { ...data, id: result.id } });
      } else {
        toast({ variant: 'destructive', title: 'Fehler', description: result.message });
        // Rollback optimistic update
        setOptimistic({ action: 'delete', holiday: { id: optimisticId } });
      }
    });
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
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Wird hinzugefügt...' : 'Hinzufügen'}
        </Button>
      </form>
    </Form>
  );
}


interface HolidayDeleteButtonProps {
    id: string;
    setOptimistic: (action: { action: 'add' | 'delete'; holiday: Holiday | {id: string} }) => void;
}

export function HolidayDeleteButton({ id, setOptimistic }: HolidayDeleteButtonProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { db } = useFirestore();


  const handleDelete = () => {
    startTransition(async () => {
        const originalHoliday = holidays.find(h => h.id === id);
        setOptimistic({ action: 'delete', holiday: { id } });

        const result = await deleteHoliday(id, db);
        if (result.success) {
            toast({ title: 'Erfolg', description: result.message });
        } else {
            toast({ variant: 'destructive', title: 'Fehler', description: result.message });
            if (originalHoliday) {
              setOptimistic({ action: 'add', holiday: originalHoliday });
            }
        }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending || id.startsWith('optimistic-')}
      aria-label="Termin löschen"
    >
      <X className="h-4 w-4 text-destructive" />
    </Button>
  );
}
