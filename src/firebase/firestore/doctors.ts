
'use server';

import { 
    Firestore, 
    collection, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc,
    getDoc,
    serverTimestamp
} from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import type { Doctor } from '@/app/team/_components/doctor-card';

// Use Omit to create a type for new doctor data, excluding the 'id' and making specialty a string
export type DoctorData = Omit<Doctor, 'id' | 'specialty'> & { specialty: string };

// Function to upload an image if it's a data URL and return the storage URL
async function uploadImage(storage: any, imageUrl: string, doctorId: string): Promise<string> {
    if (imageUrl.startsWith('data:image')) {
        const storageRef = ref(storage, `doctors/${doctorId}/${Date.now()}.jpg`);
        const snapshot = await uploadString(storageRef, imageUrl, 'data_url');
        return await getDownloadURL(snapshot.ref);
    }
    // If it's already a URL, return it as is
    return imageUrl;
}


// Create a new doctor document in Firestore
export async function addDoctor(firestore: Firestore, doctorData: DoctorData) {
    const storage = getStorage(firestore.app);
    
    // Temporarily add a document to get an ID
    const tempDocRef = doc(collection(firestore, 'doctors'));
    const doctorId = tempDocRef.id;

    let finalImageUrl = doctorData.imageUrl;
    if (doctorData.imageUrl) {
        finalImageUrl = await uploadImage(storage, doctorData.imageUrl, doctorId);
    }

    let finalPartnerLogoUrl = doctorData.partnerLogoComponent;
    if (typeof finalPartnerLogoUrl === 'string' && finalPartnerLogoUrl.startsWith('data:image')) {
        finalPartnerLogoUrl = await uploadImage(storage, finalPartnerLogoUrl, `${doctorId}-logo`);
    }

    const finalDoctorData = {
        ...doctorData,
        imageUrl: finalImageUrl,
        partnerLogoComponent: finalPartnerLogoUrl,
        createdAt: serverTimestamp(),
    };
    
    // Use the ID to set the document, ensuring we know the ID from the start
    await addDoc(collection(firestore, 'doctors'), finalDoctorData);
}

// Update an existing doctor document
export async function updateDoctor(firestore: Firestore, id: string, data: Partial<DoctorData>) {
    const storage = getStorage(firestore.app);
    const doctorRef = doc(firestore, 'doctors', id);

    let updateData = { ...data, updatedAt: serverTimestamp() };
    const oldDocSnap = await getDoc(doctorRef);
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
        updateData.imageUrl = await uploadImage(storage, data.imageUrl, id);
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
        updateData.partnerLogoComponent = await uploadImage(storage, logoComp, `${id}-logo`);
    }

    return await updateDoc(doctorRef, updateData);
}


// Delete a doctor document and their image from storage
export async function deleteDoctor(firestore: Firestore, id: string) {
    const storage = getStorage(firestore.app);
    const doctorRef = doc(firestore, 'doctors', id);
    
    // Get doc to retrieve image URL
    const docSnap = await getDoc(doctorRef);
    if (docSnap.exists()) {
        const doctorData = docSnap.data() as Doctor;
        if (doctorData.imageUrl && doctorData.imageUrl.includes('firebasestorage')) {
            try {
                const imageRef = ref(storage, doctorData.imageUrl);
                await deleteObject(imageRef);
            } catch (error: any) {
                 if (error.code !== 'storage/object-not-found') {
                    console.error("Error deleting doctor image:", error);
                 }
            }
        }
        const logo = doctorData.partnerLogoComponent;
        if (typeof logo === 'string' && logo.includes('firebasestorage')) {
            try {
                const logoRef = ref(storage, logo);
                await deleteObject(logoRef);
            } catch (error: any) {
                 if (error.code !== 'storage/object-not-found') {
                    console.error("Error deleting logo image:", error);
                 }
            }
        }
    }

    return await deleteDoc(doctorRef);
}
