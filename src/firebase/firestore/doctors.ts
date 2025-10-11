'use client';

import { 
    Firestore, 
    doc, 
    setDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type DoctorData = {
    name: string;
    order: number;
    frontSideCode: string;
    backSideCode: string;
};

// Create or OVERWRITE a doctor document in Firestore.
// This is a non-blocking UI operation.
export function addDoctor(firestore: Firestore, doctorData: DoctorData, docId: string): Promise<void> {
    const docRef = doc(firestore, 'doctors', docId);

    const finalDoctorData = {
        ...doctorData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    
    // No await, chain .catch for non-blocking error handling.
    // Return the promise so the caller can use Promise.all if needed, but the UI won't block.
    return setDoc(docRef, finalDoctorData).catch(error => {
        const contextualError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'write',
            requestResourceData: finalDoctorData,
        });
        // The error is emitted globally for a central listener to catch,
        // preventing an uncaught promise rejection.
        errorEmitter.emit('permission-error', contextualError);
    });
}

// Update an existing doctor document.
// This is a non-blocking UI operation.
export function updateDoctor(firestore: Firestore, id: string, data: Partial<DoctorData>): Promise<void> {
    const doctorRef = doc(firestore, 'doctors', id);
    
    const updateData: { [key: string]: any } = { ...data, updatedAt: serverTimestamp() };

    // No await, chain .catch for non-blocking error handling.
    return updateDoc(doctorRef, updateData).catch(error => {
        const contextualError = new FirestorePermissionError({
            path: doctorRef.path,
            operation: 'update',
            requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', contextualError);
    });
}
