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

// Create or OVERWRITE a doctor document in Firestore
export async function addDoctor(firestore: Firestore, doctorData: DoctorData, docId: string): Promise<void> {
    const docRef = doc(firestore, 'doctors', docId);

    const finalDoctorData = {
        ...doctorData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    
    try {
        await setDoc(docRef, finalDoctorData);
    } catch (error) {
        const contextualError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'write',
            requestResourceData: finalDoctorData,
        });
        console.error("Firestore Error in addDoctor:", error, contextualError.message);
        errorEmitter.emit('permission-error', contextualError);
        // Re-throw the original error if you want the caller to handle it
        throw error;
    }
}

// Update an existing doctor document
export async function updateDoctor(firestore: Firestore, id: string, data: Partial<DoctorData>): Promise<void> {
    const doctorRef = doc(firestore, 'doctors', id);
    
    const updateData: { [key: string]: any } = { ...data, updatedAt: serverTimestamp() };

    try {
        await updateDoc(doctorRef, updateData);
    } catch (error) {
        const contextualError = new FirestorePermissionError({
            path: doctorRef.path,
            operation: 'update',
            requestResourceData: updateData,
        });
        console.error("Firestore Error in updateDoctor:", error, contextualError.message);
        errorEmitter.emit('permission-error', contextualError);
        // Re-throw the original error if you want the caller to handle it
        throw error;
    }
}
