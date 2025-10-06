
'use server';

import { getApp, getApps, initializeApp, deleteApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, Timestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { firebaseConfig } from '@/firebase/config';

// Helper function to initialize Firebase on the server.
// It ensures a single instance is created and reused.
function getDb() {
  const appName = 'server-actions-app';
  const existingApp = getApps().find(app => app.name === appName);
  if (existingApp) {
    return getFirestore(existingApp);
  }
  const newApp = initializeApp(firebaseConfig, appName);
  return getFirestore(newApp);
}

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(Number);
    // new Date(year, monthIndex, day)
    return new Date(year, month - 1, day);
}

export async function addHoliday(formData: FormData) {
  const db = getDb();
  const name = formData.get('name') as string;
  const start = formData.get('start') as string;
  const end = formData.get('end') as string;

  if (!name || !start || !end || !dateRegex.test(start) || !dateRegex.test(end)) {
    return { success: false, message: 'Ungültige Eingabe.' };
  }
  
  try {
    const startDate = parseDate(start);

    await addDoc(collection(db, 'holidays'), {
      name,
      start,
      end,
      startDate: Timestamp.fromDate(startDate),
    });

    revalidatePath('/admin/dashboard/ferientermine');
    return { success: true, message: 'Ferientermin hinzugefügt.' };
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
    revalidatePath('/admin/dashboard/ferientermine');
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

export async function getHolidays() {
    const db = getDb();
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
}
