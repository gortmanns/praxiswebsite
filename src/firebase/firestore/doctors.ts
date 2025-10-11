
'use server';

import { 
    Firestore, 
    collection, 
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

// Create or OVERWRITE a doctor document in Firestore
export async function addDoctor(firestore: Firestore, doctorData: DoctorData, docId: string) {
    const docRef = doc(firestore, 'doctors', docId);

    const finalDoctorData = {
        ...doctorData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    
    // Using setDoc with a specific ID will create or overwrite the document.
    await setDoc(docRef, finalDoctorData);
}

// Update an existing doctor document
export async function updateDoctor(firestore: Firestore, id: string, data: Partial<DoctorData>) {
    const doctorRef = doc(firestore, 'doctors', id);
    
    const updateData: { [key: string]: any } = { ...data, updatedAt: serverTimestamp() };

    return await updateDoc(doctorRef, updateData);
}
