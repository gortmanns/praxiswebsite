'use server';

import { initializeApp, getApps, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { staffData } from './staff-data';

// Important: This function establishes its own Firebase connection and tears it down.
// This is crucial for reliability in a serverless environment like Next.js Server Actions.
export async function seedStaffData(): Promise<{ success: boolean; message: string; error?: string; }> {
  // Use a unique app name to avoid conflicts
  const appName = `seed-staff-${Date.now()}`;
  let adminApp;

  try {
    // Initialize the Firebase Admin SDK
    adminApp = initializeApp({
      // The SDK will automatically use Google Application Default Credentials
      // which are available in the Firebase/Google Cloud environment.
    }, appName);

    const db = getFirestore(adminApp);
    const collectionRef = db.collection('staff');

    // Check if the collection is already seeded
    const snapshot = await collectionRef.limit(1).get();
    if (!snapshot.empty) {
      return { success: true, message: 'Datenbank ist bereits befüllt.' };
    }

    // Use a batch to write all documents at once for atomicity
    const batch = db.batch();

    for (const member of staffData) {
      const docRef = collectionRef.doc(); // Let Firestore generate a new ID
      const dataWithTimestamp = {
        ...member,
        id: docRef.id, // Add the generated ID to the document data
        createdAt: new Date(), // Using a standard Date object for Admin SDK
      };
      batch.set(docRef, dataWithTimestamp);
    }

    // Commit the batch
    await batch.commit();

    return { success: true, message: `${staffData.length} Mitarbeiter-Einträge erfolgreich geschrieben.` };

  } catch (error: any) {
    console.error("Error during seeding:", error);
    return { 
      success: false, 
      message: 'Fehler beim Schreiben der Daten in die Datenbank.',
      error: error.message || 'Ein unbekannter Fehler ist aufgetreten.'
    };
  } finally {
    // IMPORTANT: Clean up the Firebase app instance to prevent resource leaks
    if (adminApp) {
      await deleteApp(adminApp);
    }
  }
}
