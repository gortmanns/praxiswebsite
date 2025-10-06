
'use client';
import { ReactNode, useEffect, useState } from 'react';
import { FirebaseProvider, FirebaseContextType } from './provider';
import { initializeFirebase } from '.';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  const [firebase, setFirebase] = useState<FirebaseContextType | null>(null);

  useEffect(() => {
    const firebaseInstances = initializeFirebase();
    setFirebase(firebaseInstances);
  }, []);

  if (!firebase) {
    // You can show a loading indicator here if needed
    return null;
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
