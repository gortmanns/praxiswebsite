
'use client';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { useAuth, useUser } from './auth/use-user';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import {
  FirebaseProvider,
  useFirebase,
  useFirebaseApp,
  useFirestore,
} from './provider';
import { FirebaseClientProvider } from './client-provider';

// This function is for CLIENT-SIDE use only.
function initializeFirebase() {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  } else {
    return getApp();
  }
}

// These hooks and providers are for CLIENT-SIDE use.
// For server-side logic, see src/firebase/server.ts
export {
  initializeFirebase,
  FirebaseProvider,
  FirebaseClientProvider,
  useCollection,
  useDoc,
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
};
