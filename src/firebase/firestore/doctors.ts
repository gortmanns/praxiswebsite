'use client';

import { 
    Firestore, 
    doc, 
    setDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';

export type DoctorData = {
    name: string;
    order: number;
    frontSideCode: string;
    backSideCode: string;
};

// Create or OVERWRITE a doctor document in Firestore.
// Returns the promise from setDoc so the caller can await its completion.
export function addDoctor(firestore: Firestore, doctorData: DoctorData, docId: string): Promise<void> {
    const docRef = doc(firestore, 'doctors', docId);

    const finalDoctorData = {
        ...doctorData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    
    // Return the promise directly. The caller is responsible for catching errors.
    return setDoc(docRef, finalDoctorData);
}

// Update an existing doctor document.
// Returns the promise from updateDoc.
export function updateDoctor(firestore: Firestore, id: string, data: Partial<DoctorData>): Promise<void> {
    const doctorRef = doc(firestore, 'doctors', id);
    
    const updateData: { [key: string]: any } = { ...data, updatedAt: serverTimestamp() };

    // Return the promise directly.
    return updateDoc(doctorRef, updateData);
}
