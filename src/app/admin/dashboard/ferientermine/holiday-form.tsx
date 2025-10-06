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

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

const holidaySchema = z.object({
  name: z.string().min(1, { message: 'Name ist erforderlich.' }),
  start: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
  end: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
});

type HolidayFormValues = z.infer<typeof holidaySchema>;

interface HolidayFormProps {
    setOptimistic: (action: { action: 'add' | 'delete'; holiday: Holiday | {id: string} }) => void;
    onHolidayAdded: (holiday: Holiday) => void;
}

export function HolidayForm({ setOptimistic, onHolidayAdded }: HolidayFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

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
      const optimisticHoliday: Holiday = { ...data, id: `optimistic-${Date.now()}` };
      setOptimistic({ action: 'add', holiday: optimisticHoliday });

      try {
        const result = await addHoliday(data);
        if (result.success && result.id) {
          toast({ title: 'Erfolg', description: result.message });
          // Replace optimistic holiday with real one
          onHolidayAdded({ id: result.id, ...data });
          form.reset();
        } else {
          toast({ variant: 'destructive', title: 'Fehler', description: result.message });
          // Rollback optimistic update
           onHolidayAdded(optimisticHoliday); 
        }
      } catch (error) {
         toast({ variant: 'destructive', title: 'Fehler', description: 'Ein unerwarteter Fehler ist aufgetreten.' });
         // Rollback optimistic update
         onHolidayAdded(optimisticHoliday);
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
    onHolidayDeleted: (id: string) => void;
}

export function HolidayDeleteButton({ id, setOptimistic, onHolidayDeleted }: HolidayDeleteButtonProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
        setOptimistic({ action: 'delete', holiday: { id } });

        const result = await deleteHoliday(id);
        if (result.success) {
            toast({ title: 'Erfolg', description: result.message });
            onHolidayDeleted(id);
        } else {
            toast({ variant: 'destructive', title: 'Fehler', description: result.message });
            // Here you might want to re-fetch to rollback, or add the item back
        }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Termin löschen"
    >
      <X className="h-4 w-4 text-destructive" />
    </Button>
  );
}
