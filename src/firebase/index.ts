'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  let firebaseApp: FirebaseApp;
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  // Connect to emulators in development.
  // The checks for existing emulator configs are removed,
  // and we rely on try-catch to handle cases where emulators are not running.
  // This is more robust in a hot-reloading environment.
  if (process.env.NODE_ENV === 'development') {
    try {
      // The connect*Emulator functions are designed to be called only once.
      // However, in a hot-reload environment they might be called again.
      // The try-catch block prevents the app from crashing if it tries to reconnect.
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    } catch (e) {
        // Errors are expected if the emulators are already connected.
        // We can safely ignore them.
        // console.log("Ignoring emulator connection error: ", e);
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