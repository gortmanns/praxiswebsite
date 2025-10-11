
'use server';

import { initializeApp, getApps, App, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const staffData = [
    {
      order: 1,
      name: 'S. Garcia',
      role: 'Leitende Medizinische Praxisassistentin',
      role2: 'Berufsbildnerin',
      imageUrl: '/images/team/Garcia.jpg',
      backsideContent: "<p>Früher habe ich schon einmal für rund 10 Jahre in dieser Praxis gearbeitet, damals noch bei Dr. Segginger.</p><br /><p>Inzwischen bin ich – jetzt in der Funktion der Leitenden MPA – zurückgekehrt an meine alte Wirkungsstätte.</p>",
      hidden: false,
    },
    {
      order: 2,
      name: 'B. Aeschlimann',
      role: 'Medizinische Praxisassistentin',
      role2: 'Berufsbildnerin',
      imageUrl: '/images/team/Aeschlimann.jpg',
      backsideContent: "<p>Ich blicke zurück auf eine lange Erfahrung im Beruf als MPA, bin aber neu im Praxiszentrum im Ring.</p><br /><p>Als Berufsbildnerin bin ich für die Ausbildung der Lernenden zur MPA verantwortlich.</p>",
      hidden: false,
    },
    {
      order: 3,
      name: 'K. Huber',
      role: 'Medizinische Praxisassistentin',
      role2: '',
      imageUrl: '/images/team/Huber.jpg',
      backsideContent: "<p>Viele Jahre war ich in einer kleinen chirurgischen Praxis tätig. Inzwischen jetzt zusätzlich an meist einem Tag in der Woche auch hier im Praxiszentrum im Ring.</p>",
      hidden: false,
    },
    {
      order: 4,
      name: 'G. Öztürk',
      role: 'Praxishilfe',
      role2: '',
      imageUrl: '/images/team/Oetztuerk.jpg',
      backsideContent: "<p>Eigentlich bin ich Arzt und stamme aus der Türkei, aber noch läuft das Anerkennungsverfahren für die Qualifikation als Hausarzt hier in der Schweiz.</p><br /><p>Dass ich aktuell „nur“ als Praxishilfe tätig bin, ist eine Auflage der Schweizer Behörden für die Anerkennung meiner Qualifikation. Hoffentlich bin ich bald als weiterer Hausarzt hier im Praxiszentrum tätig.</p>",
      hidden: false,
    },
    {
      order: 5,
      name: 'E. Sommer',
      role: 'Medizinische Praxisassistentin',
      role2: 'in Ausbildung',
      imageUrl: '/images/team/Sommer.jpg',
      backsideContent: "<p>Ganz neu im Berufsleben und auch im Praxiszentrum im Ring, werde ich hier in den nächsten Jahren den Beruf der MPA erlernen.</p><br /><p>Aller Anfang ist bekanntlich schwer und ich bitte um Geduld, wenn noch nicht jeder Handgriff so schnell und sicher sitzt oder mir Fehler unterlaufen.</p>",
      hidden: false,
    },
];


export async function seedStaffData() {
  let app: App | undefined;
  try {
    const appName = `firebase-admin-seed-${Date.now()}`;
    app = initializeApp({}, appName);
    
    const db = getFirestore(app);
    const staffCollection = db.collection('staff');

    const snapshot = await staffCollection.limit(1).get();
    if (!snapshot.empty) {
      return { success: true, count: 0, message: 'Die Sammlung ist nicht leer. Das Seeding wurde übersprungen.' };
    }

    const batch = db.batch();

    staffData.forEach(member => {
        const docRef = staffCollection.doc();
        batch.set(docRef, {
            ...member,
            id: docRef.id,
            createdAt: new Date(),
        });
    });

    await batch.commit();
    return { success: true, count: staffData.length };
  } catch (error: any) {
    console.error('Detaillierter Fehler beim Seeding:', JSON.stringify(error, null, 2));
    const errorMessage = `Fehlerdetails: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`;
    return { success: false, error: errorMessage };
  } finally {
    if (app) {
      await deleteApp(app);
    }
  }
}
