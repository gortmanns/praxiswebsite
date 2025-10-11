'use server';

import { 
    Firestore, 
    collection, 
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

// Create or OVERWRITE a doctor document in Firestore
export function addDoctor(firestore: Firestore, doctorData: DoctorData, docId: string) {
    const docRef = doc(firestore, 'doctors', docId);

    const finalDoctorData = {
        ...doctorData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    
    // Using setDoc with a specific ID will create or overwrite the document.
    // No await, chain .catch for non-blocking error handling
    setDoc(docRef, finalDoctorData)
        .catch(error => {
            const contextualError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'write',
                requestResourceData: finalDoctorData,
            });
            console.error("Firestore Error in addDoctor:", error, contextualError.message);
            errorEmitter.emit('permission-error', contextualError);
            // Re-throw or handle as needed for UI feedback
            throw contextualError; 
        });
}

// Update an existing doctor document
export function updateDoctor(firestore: Firestore, id: string, data: Partial<DoctorData>) {
    const doctorRef = doc(firestore, 'doctors', id);
    
    const updateData: { [key: string]: any } = { ...data, updatedAt: serverTimestamp() };

    // No await, chain .catch for non-blocking error handling
    return updateDoc(doctorRef, updateData)
        .catch(error => {
            const contextualError = new FirestorePermissionError({
                path: doctorRef.path,
                operation: 'update',
                requestResourceData: updateData,
            });
            console.error("Firestore Error in updateDoctor:", error, contextualError.message);
            errorEmitter.emit('permission-error', contextualError);
            throw contextualError;
        });
}
