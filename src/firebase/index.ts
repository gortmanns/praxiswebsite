
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const auth = getAuth(firebaseApp);

  return { firebaseApp, firestore, storage, auth };
}


// Client-side hooks and providers are no longer exported from here
// to maintain a clean separation between server and client concerns.
// They are now exported from provider.tsx and client-provider.tsx.
