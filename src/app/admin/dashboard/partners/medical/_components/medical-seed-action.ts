'use server';

import { initializeApp, getApps, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { medicalPartnersData, slezakPartner } from './medical-partners-data';

export async function seedMedicalPartnersData(): Promise<{ success: boolean; message: string; error?: string; }> {
  const appName = `seed-medical-partners-${Date.now()}`;
  let adminApp;

  try {
    adminApp = initializeApp({}, appName);
    const db = getFirestore(adminApp);
    const collectionRef = db.collection('medicalPartners');

    const snapshot = await collectionRef.limit(1).get();
    if (!snapshot.empty) {
      return { success: true, message: 'Datenbank ist bereits befüllt.' };
    }

    const batch = db.batch();
    const allPartners = [...medicalPartnersData, slezakPartner];

    for (const partner of allPartners) {
      const docRef = collectionRef.doc();
      const dataWithTimestamp = {
        ...partner,
        id: docRef.id,
        createdAt: new Date(),
      };
      batch.set(docRef, dataWithTimestamp);
    }

    await batch.commit();

    return { success: true, message: `${allPartners.length} Partner-Einträge erfolgreich geschrieben.` };

  } catch (error: any) {
    console.error("Error during seeding:", error);
    return { 
      success: false, 
      message: 'Fehler beim Schreiben der Daten in die Datenbank.',
      error: error.message || 'Ein unbekannter Fehler ist aufgetreten.'
    };
  } finally {
    if (adminApp) {
      await deleteApp(adminApp);
    }
  }
}
