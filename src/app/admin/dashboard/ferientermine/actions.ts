import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, Timestamp, getDocs, query, orderBy, Firestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// This is now a parameter-based function to ensure we use the correct db instance.
function getDb(db?: Firestore) {
  if (db) return db;
  
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
  return getFirestore(getApp());
};

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
}

export type Holiday = {
  id: string;
  name: string;
  start: string;
  end: string;
};

export type HolidayInput = Omit<Holiday, 'id'>;

export async function addHoliday(data: HolidayInput, db?: Firestore) {
  const { name, start, end } = data;
  const firestore = getDb(db);

  if (!name || !start || !end || !dateRegex.test(start) || !dateRegex.test(end)) {
    return { success: false, message: 'Ungültige Eingabe.' };
  }
  
  try {
    const startDate = parseDate(start);

    const docRef = await addDoc(collection(firestore, 'holidays'), {
      name,
      start,
      end,
      startDate: Timestamp.fromDate(startDate),
    });

    return { success: true, message: 'Ferientermin hinzugefügt.', id: docRef.id };
  } catch (error) {
    console.error('Error adding holiday: ', error);
    let message = 'Termin konnte nicht hinzugefügt werden. Grund: Berechtigung verweigert oder Server nicht erreichbar.';
    if (error instanceof Error) {
        message = error.message;
    }
    return { success: false, message };
  }
}

export async function deleteHoliday(id: string, db?: Firestore) {
  const firestore = getDb(db);
  try {
    if (id.startsWith('optimistic-')) {
      return { success: false, message: 'Cannot delete an entry that is still being saved.'};
    }
    await deleteDoc(doc(firestore, 'holidays', id));
    return { success: true, message: 'Ferientermin gelöscht.' };
  } catch (error) {
    console.error('Error deleting holiday: ', error);
    let message = 'Termin konnte nicht gelöscht werden. Grund: Berechtigung verweigert oder Server nicht erreichbar.';
    if (error instanceof Error) {
        message = error.message;
    }
     return { success: false, message };
  }
}

export async function getHolidays(db?: Firestore): Promise<Holiday[]> {
    const firestore = getDb(db);
    try {
        const holidaysCollection = collection(firestore, 'holidays');
        const holidaysQuery = query(holidaysCollection, orderBy('startDate', 'asc'));
        const snapshot = await getDocs(holidaysQuery);
        
        if (snapshot.empty) {
            return [];
        }

        const holidays = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                start: data.start,
                end: data.end,
            };
        });

        return holidays;
    } catch (error) {
        console.error("Error fetching holidays:", error);
        // Re-throw the error to be caught by the calling component
        throw new Error('Fehler beim Abrufen der Ferientermine. Prüfen Sie Ihre Internetverbindung und Berechtigungen.');
    }
}
