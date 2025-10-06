// IMPORTANT: This file is for SERVER-SIDE use only.
// It is crucial to not import this file in any client-side code.

import { initializeApp, getApps, getApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let app: App;
let auth: Auth;
let db: Firestore;

// This function is for SERVER-SIDE use only.
function initializeFirebase() {
    // The service account is injected by the App Hosting environment.
    if (getApps().length === 0) {
        app = initializeApp();
        auth = getAuth(app);
        db = getFirestore(app);
    } else {
        app = getApp();
        auth = getAuth(app);
        db = getFirestore(app);
    }
    return { app, auth, db };
}

export { initializeFirebase };
