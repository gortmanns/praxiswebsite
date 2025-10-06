
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const holidayFormSchema = z.object({
  start: z.date({
    required_error: 'Ein Startdatum ist erforderlich.',
  }),
  end: z.date({
    required_error: 'Ein Enddatum ist erforderlich.',
  }),
  name: z.string().min(2, {
    message: 'Der Name muss mindestens 2 Zeichen lang sein.',
  }),
}).refine((data) => data.end >= data.start, {
  message: 'Das Enddatum darf nicht vor dem Startdatum liegen.',
  path: ['end'],
});

type HolidayFormValues = z.infer<typeof holidayFormSchema>;

export default function HolidaysPage() {
  const form = useForm<HolidayFormValues>({
    resolver: zodResolver(holidayFormSchema),
  });

  function onSubmit(data: HolidayFormValues) {
    // Hier wird die Logik zum Speichern der Daten implementiert.
    // Vorerst geben wir die Daten nur in der Konsole aus.
    console.log({
      start: format(data.start, 'yyyy-MM-dd'),
      end: format(data.end, 'yyyy-MM-dd'),
      name: data.name,
    });
  }

  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ferientermine bearbeiten</CardTitle>
          <CardDescription>
            Hier können Sie die Daten für die Praxisferien verwalten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 border-b pb-8">
            <h3 className="mb-4 text-lg font-medium">Neuen Termin erfassen</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 items-end gap-6 sm:grid-cols-[1fr_1fr_2fr_auto]">
                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Erster Ferientag</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'dd.MM.yyyy', { locale: de })
                              ) : (
                                <span>Datum wählen</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
                            initialFocus
                            locale={de}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Letzter Ferientag</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'dd.MM.yyyy', { locale: de })
                              ) : (
                                <span>Datum wählen</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < (form.getValues('start') || new Date('1900-01-01'))}
                            initialFocus
                            locale={de}
                          />
                        </PopoverContent>
                      </Popover>
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
                        <Input placeholder="z.B. Weihnachtsferien" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit">Speichern</Button>
              </form>
            </Form>
          </div>

          <div className="mt-8">
             <h3 className="mb-4 text-lg font-medium">Bestehende Termine</h3>
             <p>Die Liste der bestehenden Termine wird hier in Kürze verfügbar sein.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
