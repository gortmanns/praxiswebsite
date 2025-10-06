'use client';

import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import {
  ReactNode,
  createContext,
  useContext,
} from 'react';

export type FirebaseContextType = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

type FirebaseProviderProps = {
  children: ReactNode;
} & FirebaseContextType;


export function FirebaseProvider({ children, ...value }: FirebaseProviderProps) {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => useFirebase().app;
export const useFirestore = () => useFirebase();
export const useAuth = () => useFirebase().auth;
