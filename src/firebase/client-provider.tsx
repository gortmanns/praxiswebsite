
'use client';

import React, { useMemo, type ReactNode, useState, useEffect } from 'react';
import { FirebaseProvider, FirebaseServices } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [firebaseServices, setFirebaseServices] = useState<FirebaseServices | null>(null);

  useEffect(() => {
    // Initialize Firebase on the client side, once per component mount.
    // This ensures no server-side execution of Firebase initialization.
    if (typeof window !== 'undefined' && !firebaseServices) {
      setFirebaseServices(initializeFirebase());
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // While firebaseServices are being initialized, we can render a loading state or nothing.
  // This prevents children from trying to access a null context.
  if (!firebaseServices) {
    return null; 
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      firestore={firebaseServices.firestore}
      storage={firebaseServices.storage}
      auth={firebaseServices.auth}
    >
      {children}
    </FirebaseProvider>
  );
}
