
'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener'
import { useRouter } from 'next/navigation';

interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  storage: FirebaseStorage;
  auth: Auth;
}

export interface FirebaseContextState {
  areServicesAvailable: boolean;
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  storage: FirebaseStorage | null;
  auth: Auth | null;
}

export interface FirebaseServices {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  storage: FirebaseStorage;
  auth: Auth;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  storage,
  auth,
}) => {

  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && storage && auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseApp : null,
      firestore: servicesAvailable ? firestore : null,
      storage: servicesAvailable ? storage : null,
      auth: servicesAvailable ? auth : null,
    };
  }, [firebaseApp, firestore, storage, auth]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseServices => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }

  if (!context.areServicesAvailable || !context.firebaseApp || !context.firestore || !context.storage || !context.auth) {
    throw new Error('Firebase core services not available. Check FirebaseProvider props.');
  }

  return {
    firebaseApp: context.firebaseApp,
    firestore: context.firestore,
    storage: context.storage,
    auth: context.auth,
  };
};

export const useFirestore = (): Firestore | null => {
  const context = useContext(FirebaseContext);
  return context?.firestore ?? null;
};

export const useStorage = (): FirebaseStorage | null => {
    const context = useContext(FirebaseContext);
    return context?.storage ?? null;
};

interface UseAuthOptions {
  redirectOn?: 'login' | 'logout';
  redirectTo?: string;
}

export const useAuth = (options: UseAuthOptions = {}) => {
  const context = useContext(FirebaseContext);
  const auth = context?.auth ?? null;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (options.redirectOn) {
        const shouldRedirect = (options.redirectOn === 'login' && user) || (options.redirectOn === 'logout' && !user);
        if (shouldRedirect && options.redirectTo) {
          router.push(options.redirectTo);
        }
      }

    }, (error) => {
      setError(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, options.redirectOn, options.redirectTo, router]);

  return { auth, user, loading, error };
}


export const useFirebaseApp = (): FirebaseApp | null => {
  const context = useContext(FirebaseContext);
  return context?.firebaseApp ?? null;
};

type MemoFirebase <T> = T & {__memo?: boolean};

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T | (MemoFirebase<T>) {
  const memoized = useMemo(factory, deps);
  
  if(typeof memoized !== 'object' || memoized === null) return memoized;
  (memoized as MemoFirebase<T>).__memo = true;
  
  return memoized;
}
