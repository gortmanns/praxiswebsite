// This is a script to seed the initial staff data into Firestore.
// To run it, use: npm run db:seed:staff

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: Download your service account key JSON file from
// Firebase console > Project settings > Service accounts
// and place it in your project root.
// Ensure this file is in your .gitignore to avoid committing it.
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

const staffData = [
    {
      order: 1,
      name: 'S. Garcia',
      role: 'Leitende Medizinische Praxisassistentin',
      role2: 'Berufsbildnerin',
      imageUrl: '/images/team/Garcia.jpg',
      backsideContent: "<p>Früher habe ich schon einmal für rund 10 Jahre in dieser Praxis gearbeitet, damals noch bei Dr. Segginger.</p><br /><p>Inzwischen bin ich – jetzt in der Funktion der Leitenden MPA – zurückgekehrt an meine alte Wirkungsstätte.</p>",
      hidden: false,
    },
    {
      order: 2,
      name: 'B. Aeschlimann',
      role: 'Medizinische Praxisassistentin',
      role2: 'Berufsbildnerin',
      imageUrl: '/images/team/Aeschlimann.jpg',
      backsideContent: "<p>Ich blicke zurück auf eine lange Erfahrung im Beruf als MPA, bin aber neu im Praxiszentrum im Ring.</p><br /><p>Als Berufsbildnerin bin ich für die Ausbildung der Lernenden zur MPA verantwortlich.</p>",
      hidden: false,
    },
    {
      order: 3,
      name: 'K. Huber',
      role: 'Medizinische Praxisassistentin',
      role2: '',
      imageUrl: '/images/team/Huber.jpg',
      backsideContent: "<p>Viele Jahre war ich in einer kleinen chirurgischen Praxis tätig. Inzwischen jetzt zusätzlich an meist einem Tag in der Woche auch hier im Praxiszentrum im Ring.</p>",
      hidden: false,
    },
    {
      order: 4,
      name: 'G. Öztürk',
      role: 'Praxishilfe',
      role2: '',
      imageUrl: '/images/team/Oetztuerk.jpg',
      backsideContent: "<p>Eigentlich bin ich Arzt und stamme aus der Türkei, aber noch läuft das Anerkennungsverfahren für die Qualifikation als Hausarzt hier in der Schweiz.</p><br /><p>Dass ich aktuell „nur“ als Praxishilfe tätig bin, ist eine Auflage der Schweizer Behörden für die Anerkennung meiner Qualifikation. Hoffentlich bin ich bald als weiterer Hausarzt hier im Praxiszentrum tätig.</p>",
      hidden: false,
    },
    {
      order: 5,
      name: 'E. Sommer',
      role: 'Medizinische Praxisassistentin',
      role2: 'in Ausbildung',
      imageUrl: '/images/team/Sommer.jpg',
      backsideContent: "<p>Ganz neu im Berufsleben und auch im Praxiszentrum im Ring, werde ich hier in den nächsten Jahren den Beruf der MPA erlernen.</p><br /><p>Aller Anfang ist bekanntlich schwer und ich bitte um Geduld, wenn noch nicht jeder Handgriff so schnell und sicher sitzt oder mir Fehler unterlaufen.</p>",
      hidden: false,
    },
];

console.log('Initializing Firebase Admin SDK...');
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const staffCollection = db.collection('staff');

async function seedDatabase() {
    console.log('Starting to seed staff data...');
    const batch = db.batch();

    for (const member of staffData) {
        const docRef = staffCollection.doc(); // Let Firestore generate the ID
        batch.set(docRef, {
            ...member,
            id: docRef.id, // Add the generated ID to the document data
            createdAt: new Date(),
        });
    }

    try {
        await batch.commit();
        console.log(`Successfully seeded ${staffData.length} staff members.`);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

async function main() {
    // Check if collection is empty before seeding
    const snapshot = await staffCollection.limit(1).get();
    if (!snapshot.empty) {
        console.log('The "staff" collection is not empty. Aborting seed process to prevent duplicates.');
        console.log('If you want to re-seed, please clear the collection in the Firebase Console first.');
        return;
    }
    await seedDatabase();
}

main().catch(error => {
  console.error("An unexpected error occurred:", error);
  process.exit(1);
});
