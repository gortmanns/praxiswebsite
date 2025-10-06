'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, Timestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// Robust Singleton-Pattern für die Client-seitige Firebase-Initialisierung.
function getDb() {
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
  return getFirestore(getApp());
};

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(Number);
    // new Date(year, monthIndex, day)
    return new Date(year, month - 1, day);
}

export type Holiday = {
  id: string;
  name: string;
  start: string;
  end: string;
};

type HolidayInput = Omit<Holiday, 'id'>;

export async function addHoliday(data: HolidayInput) {
  const { name, start, end } = data;
  const db = getDb();

  if (!name || !start || !end || !dateRegex.test(start) || !dateRegex.test(end)) {
    return { success: false, message: 'Ungültige Eingabe.' };
  }
  
  try {
    const startDate = parseDate(start);

    const docRef = await addDoc(collection(db, 'holidays'), {
      name,
      start,
      end,
      startDate: Timestamp.fromDate(startDate),
    });

    return { success: true, message: 'Ferientermin hinzugefügt.', id: docRef.id };
  } catch (error) {
    console.error('Error adding holiday: ', error);
    let message = 'Termin konnte nicht hinzugefügt werden.';
    if (error instanceof Error) {
        message = error.message;
    }
    return { success: false, message };
  }
}

export async function deleteHoliday(id: string) {
  const db = getDb();
  try {
    await deleteDoc(doc(db, 'holidays', id));
    return { success: true, message: 'Ferientermin gelöscht.' };
  } catch (error) {
    console.error('Error deleting holiday: ', error);
    let message = 'Termin konnte nicht gelöscht werden.';
    if (error instanceof Error) {
        message = error.message;
    }
     return { success: false, message };
  }
}

export async function getHolidays(): Promise<Holiday[]> {
    const db = getDb();
    try {
        const holidaysCollection = collection(db, 'holidays');
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
        // Depending on requirements, you might want to throw the error
        // or return an empty array to prevent the app from crashing.
        return [];
    }
}
