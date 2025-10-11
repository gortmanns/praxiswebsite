
'use server';

import { initializeApp, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { otherPartnersData } from './other-partners-data';
import { firebaseConfig } from '@/firebase/config';

export async function seedOtherPartnersData(): Promise<{ success: boolean; message: string; error?: string; }> {
  const appName = `seed-other-partners-${Date.now()}`;
  let adminApp;

  const projectId = firebaseConfig.projectId;
  if (!projectId) {
    return {
      success: false,
      message: 'Fehler: Google Cloud Projekt-ID nicht konfiguriert.',
      error: 'Firebase Project ID not found in firebaseConfig.'
    };
  }

  try {
    adminApp = initializeApp({
      projectId: projectId,
    }, appName);

    const db = getFirestore(adminApp);
    const collectionRef = db.collection('otherPartners');

    const snapshot = await collectionRef.limit(1).get();
    if (!snapshot.empty) {
      await deleteApp(adminApp);
      return { success: true, message: 'Datenbank ist bereits befüllt.' };
    }

    const batch = db.batch();
    
    for (const partner of otherPartnersData) {
      const docRef = collectionRef.doc();
      const dataWithTimestamp = {
        ...partner,
        id: docRef.id,
        createdAt: new Date(),
      };
      batch.set(docRef, dataWithTimestamp);
    }

    await batch.commit();

    return { success: true, message: `${otherPartnersData.length} Partner-Einträge erfolgreich geschrieben.` };

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
