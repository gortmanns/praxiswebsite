import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp),
    auth: getAuth(firebaseApp),
  };
}

// This function is safe to call on the server
export function initializeFirebaseServer() {
  if (!getApps().length) {
    let firebaseApp;
    try {
      // This might be configured by environment variables in a server environment
      firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
      console.error("Server initialization failed:", e);
      // Fallback or re-throw as appropriate
      throw new Error("Could not initialize Firebase on the server.");
    }
    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}
