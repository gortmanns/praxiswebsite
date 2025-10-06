// IMPORTANT: This file is for SERVER-SIDE use only.
// It is crucial to not import this file in any client-side code.

import { initializeApp, getApps, getApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let app: App;
let auth: Auth;
let db: Firestore;

function initializeFirebase() {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        throw new Error("The FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set. It is required for server-side Firebase operations.");
    }

    if (getApps().length === 0) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
        app = initializeApp({
            credential: cert(serviceAccount)
        });
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
