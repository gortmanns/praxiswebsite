import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getHolidays } from './actions';
import { HolidayForm, HolidayDeleteButton } from './holiday-form';

export const dynamic = 'force-dynamic';

export default async function FerienterminePage() {
  const holidays = await getHolidays();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Ferientermine anpassen
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Neuen Ferientermin hinzufügen</CardTitle>
        </CardHeader>
        <CardContent>
          <HolidayForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Geplante Ferientermine</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Erster Ferientag</TableHead>
                <TableHead>Letzter Ferientag</TableHead>
                <TableHead>Ferienname</TableHead>
                <TableHead className="w-[50px] text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Keine Ferientermine gefunden.
                  </TableCell>
                </TableRow>
              ) : (
                holidays.map((holiday) => (
                  <TableRow key={holiday.id}>
                    <TableCell>{holiday.start}</TableCell>
                    <TableCell>{holiday.end}</TableCell>
                    <TableCell>{holiday.name}</TableCell>
                    <TableCell className="text-right">
                      <HolidayDeleteButton id={holiday.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
