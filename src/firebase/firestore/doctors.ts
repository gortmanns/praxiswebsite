
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

// Use Omit to create a type for new doctor data, excluding the 'id'
export type DoctorData = Omit<Doctor, 'id'>;

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
    const newDoctorRef = doc(collection(firestore, 'doctors'));
    const doctorId = newDoctorRef.id;

    let finalImageUrl = doctorData.imageUrl;
    if (doctorData.imageUrl) {
        finalImageUrl = await uploadImage(storage, doctorData.imageUrl, doctorId);
    }

    const finalDoctorData = {
        ...doctorData,
        imageUrl: finalImageUrl,
    };
    
    await addDoc(collection(firestore, 'doctors'), finalDoctorData);
}

// Update an existing doctor document
export async function updateDoctor(firestore: Firestore, id: string, data: Partial<DoctorData>) {
    const storage = getStorage(firestore.app);
    const doctorRef = doc(firestore, 'doctors', id);

    let updateData = { ...data };

    // Handle image upload if a new image data URL is provided
    if (data.imageUrl && data.imageUrl.startsWith('data:image')) {
        const oldDoc = await getDoc(doctorRef);
        const oldData = oldDoc.data() as Doctor;
        
        // Delete old image if it exists
        if (oldData?.imageUrl) {
            try {
                const oldImageRef = ref(storage, oldData.imageUrl);
                await deleteObject(oldImageRef);
            } catch (error: any) {
                if (error.code !== 'storage/object-not-found') {
                    console.warn("Could not delete old image, may not exist:", error);
                }
            }
        }

        updateData.imageUrl = await uploadImage(storage, data.imageUrl, id);
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
        if (doctorData.imageUrl) {
            try {
                const imageRef = ref(storage, doctorData.imageUrl);
                await deleteObject(imageRef);
            } catch (error: any) {
                 if (error.code !== 'storage/object-not-found') {
                    console.error("Error deleting doctor image:", error);
                    // Decide if you want to proceed with deleting the document even if image deletion fails
                 }
            }
        }
    }

    return await deleteDoc(doctorRef);
}
