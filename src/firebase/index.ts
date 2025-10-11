'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

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
  // The try-catch is important for hot-reloading environments where this
  // function may be called multiple times.
  if (process.env.NODE_ENV === 'development') {
    try {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    } catch (e) {
      // console.log("Ignoring auth emulator connection error: ", e);
    }
    try {
      connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    } catch (e) {
      // console.log("Ignoring firestore emulator connection error: ", e);
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