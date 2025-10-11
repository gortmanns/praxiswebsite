'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  let firebaseApp;
  if (!getApps().length) {
    // Immer explizit die Konfiguration übergeben, um Mehrdeutigkeiten zu vermeiden.
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }

  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  if (process.env.NODE_ENV === 'development') {
    try {
      // WICHTIG: Die Emulatoren werden hier verbunden.
      // Der try-catch-Block verhindert Abstürze, wenn die Emulatoren beim Hot-Reload nicht sofort verfügbar sind.
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    } catch (e) {
        // Dieser Fehler wird erwartet, wenn die Emulatoren nicht laufen. Die App wird die Produktions-DB verwenden.
        console.error("Fehler bei der Verbindung zu den Firebase-Emulatoren. Laufen sie? Die App wird versuchen, die Produktionsdatenbank zu verwenden.", e);
    }
  }

  return {
    firebaseApp,
    auth,
    firestore,
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';