
'use client';
import { ReactNode, useEffect, useState } from 'react';
import { FirebaseProvider } from './provider';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

type FirebaseInstances = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
};

// This function is for CLIENT-SIDE use only.
async function initializeFirebase(): Promise<FirebaseInstances> {
  let app;
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  const auth = getAuth(app);
  const db = getFirestore(app);

  try {
    // This is crucial for NextAuth working with Firebase auth in some server-ish environments
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    // This might fail in a pure SSR context, but it's fine for the client-side provider.
    // console.log("Failed to set persistence, might be in SSR:", error);
  }

  return { app, auth, db };
}

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  const [firebase, setFirebase] = useState<FirebaseInstances | null>(null);

  useEffect(() => {
    const init = async () => {
        const firebaseInstances = await initializeFirebase();
        setFirebase(firebaseInstances);
    };
    init();
  }, []);

  if (!firebase) {
    // You can show a loading indicator here if needed
    return null;
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
