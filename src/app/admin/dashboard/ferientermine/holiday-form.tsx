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
import { addHoliday, deleteHoliday } from './actions';
import { useTransition } from 'react';

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

const holidaySchema = z.object({
  name: z.string().min(1, { message: 'Name ist erforderlich.' }),
  start: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
  end: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
});

type HolidayFormValues = z.infer<typeof holidaySchema>;

export function HolidayForm({ onHolidayAdded }: { onHolidayAdded: (holiday: any) => void }) {
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
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('start', data.start);
      formData.append('end', data.end);
      
      const result = await addHoliday(formData);
      if (result.success && result.id) {
        toast({ title: 'Erfolg', description: result.message });
        onHolidayAdded({ id: result.id, ...data });
        form.reset();
      } else {
        toast({ variant: 'destructive', title: 'Fehler', description: result.message });
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

export function HolidayDeleteButton({ id, onHolidayDeleted }: { id: string, onHolidayDeleted: (id: string) => void }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteHoliday(id);
      if (result.success) {
        toast({ title: 'Erfolg', description: result.message });
        onHolidayDeleted(id);
      } else {
        toast({ variant: 'destructive', title: 'Fehler', description: result.message });
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
