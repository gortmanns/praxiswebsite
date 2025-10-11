'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  let firebaseApp;
  if (!getApps().length) {
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
    // Check if the emulators are already connected to prevent errors on hot-reloads
    // @ts-ignore - _client is not publicly typed but allows checking emulator connection.
    if (!auth.emulatorConfig) {
      try {
        connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      } catch (e) {
        console.error("Failed to connect to Auth Emulator.", e);
      }
    }
    // @ts-ignore
    if (!firestore.emulatorConfig) {
      try {
        connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      } catch (e) {
        console.error("Failed to connect to Firestore Emulator.", e);
      }
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
export * from './auth/use-user';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';