'use server';

import { 
    Firestore, 
    collection, 
    doc, 
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import type { Doctor } from '@/app/team/_components/doctor-card';
import { firebaseConfig } from '../config';
import { initializeApp, getApps, getApp } from 'firebase/app';

// Use Omit to create a type for new doctor data, excluding the 'id' and making specialty a string
export type DoctorData = Omit<Doctor, 'id' | 'specialty'> & { specialty: string };

// Helper function to ensure Firebase app is initialized
function getFirebaseApp() {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    }
    return getApp();
}

// Function to upload an image if it's a data URL and return the storage URL
async function uploadImage(storage: any, imageUrl: string, path: string): Promise<string> {
    if (imageUrl.startsWith('data:image')) {
        const storageRef = ref(storage, path);
        const snapshot = await uploadString(storageRef, imageUrl, 'data_url');
        return await getDownloadURL(snapshot.ref);
    }
    // If it's already a URL, return it as is
    return imageUrl;
}


// Create or OVERWRITE a doctor document in Firestore
export async function addDoctor(firestore: Firestore, doctorData: DoctorData, docId?: string | null) {
    const app = getFirebaseApp();
    const storage = getStorage(app);
    
    // Use the provided docId or create a new one if not provided
    const docRef = docId ? doc(collection(firestore, 'doctors'), docId) : doc(collection(firestore, 'doctors'));
    const newDocId = docRef.id;

    let finalImageUrl = doctorData.imageUrl;
    if (doctorData.imageUrl && doctorData.imageUrl.startsWith('data:image')) {
        finalImageUrl = await uploadImage(storage, doctorData.imageUrl, `doctors/${newDocId}/portrait.jpg`);
    }

    let finalPartnerLogoUrl = doctorData.partnerLogoComponent;
    if (typeof finalPartnerLogoUrl === 'string' && finalPartnerLogoUrl.startsWith('data:image')) {
        finalPartnerLogoUrl = await uploadImage(storage, finalPartnerLogoUrl, `doctors/${newDocId}/logo.jpg`);
    }

    const finalDoctorData = {
        ...doctorData,
        imageUrl: finalImageUrl,
        partnerLogoComponent: finalPartnerLogoUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    
    // Use setDoc to create or completely overwrite the document with the specific ID
    await setDoc(docRef, finalDoctorData);
}

// Update an existing doctor document
export async function updateDoctor(firestore: Firestore, id: string, data: Partial<DoctorData>) {
    const app = getFirebaseApp();
    const storage = getStorage(app);
    const doctorRef = doc(firestore, 'doctors', id);

    const oldDocSnap = await getDoc(doctorRef);

    if (!oldDocSnap.exists()) {
        throw new Error(`Dokument mit ID ${id} existiert nicht und kann nicht aktualisiert werden.`);
    }
    
    const updateData: { [key: string]: any } = { ...data, updatedAt: serverTimestamp() };
    const oldData = oldDocSnap.data() as Doctor;

    // Handle portrait image upload
    if (data.imageUrl && data.imageUrl !== oldData.imageUrl && data.imageUrl.startsWith('data:image')) {
        if (oldData?.imageUrl && oldData.imageUrl.includes('firebasestorage')) {
            try {
                const oldImageRef = ref(storage, oldData.imageUrl);
                await deleteObject(oldImageRef);
            } catch (error: any) {
                if (error.code !== 'storage/object-not-found') console.warn("Old portrait not found:", error);
            }
        }
        updateData.imageUrl = await uploadImage(storage, data.imageUrl, `doctors/${id}/portrait.jpg`);
    }

    // Handle logo image upload
    const logoComp = data.partnerLogoComponent;
    if (typeof logoComp === 'string' && logoComp !== oldData.partnerLogoComponent && logoComp.startsWith('data:image')) {
        const oldLogo = oldData?.partnerLogoComponent;
        if (typeof oldLogo === 'string' && oldLogo.includes('firebasestorage')) {
             try {
                const oldLogoRef = ref(storage, oldLogo);
                await deleteObject(oldLogoRef);
            } catch (error: any) {
                if (error.code !== 'storage/object-not-found') console.warn("Old logo not found:", error);
            }
        }
        updateData.partnerLogoComponent = await uploadImage(storage, logoComp, `doctors/${id}/logo.jpg`);
    }

    return await updateDoc(doctorRef, updateData);
}
