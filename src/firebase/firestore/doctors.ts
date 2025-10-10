
'use server';

import { 
    Firestore, 
    collection, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc,
    getDoc,
    setDoc,
    serverTimestamp
} from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import type { Doctor } from '@/app/team/_components/doctor-card';

// Use Omit to create a type for new doctor data, excluding the 'id' and making specialty a string
export type DoctorData = Omit<Doctor, 'id' | 'specialty'> & { specialty: string };

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


// Create a new doctor document in Firestore
export async function addDoctor(firestore: Firestore, doctorData: DoctorData, docId?: string | null) {
    const storage = getStorage(firestore.app);
    
    // Use the provided docId or create a new one
    const docRef = docId ? doc(collection(firestore, 'doctors'), docId) : doc(collection(firestore, 'doctors'));
    const newDocId = docRef.id;

    let finalImageUrl = doctorData.imageUrl;
    if (doctorData.imageUrl) {
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
    };
    
    // Use setDoc to create the document with the specific ID
    await setDoc(docRef, finalDoctorData);
}

// Update an existing doctor document
export async function updateDoctor(firestore: Firestore, id: string, data: Partial<DoctorData>) {
    const storage = getStorage(firestore.app);
    const doctorRef = doc(firestore, 'doctors', id);

    const updateData: { [key: string]: any } = { ...data, updatedAt: serverTimestamp() };
    const oldDocSnap = await getDoc(doctorRef);

    if (!oldDocSnap.exists()) {
        throw new Error("Document does not exist, cannot update.");
    }
    const oldData = oldDocSnap.data() as Doctor;

    // Handle portrait image upload
    if (data.imageUrl && data.imageUrl.startsWith('data:image')) {
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
    if (typeof logoComp === 'string' && logoComp.startsWith('data:image')) {
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

    