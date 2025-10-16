/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde neu erstellt und stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use server';

import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function saveCroppedImage(base64Data: string): Promise<{ success: boolean; error?: string; filePath?: string }> {
    try {
        if (!base64Data.startsWith('data:image/')) {
            throw new Error('Ungültiges Datenformat. Es wird ein Base64-Daten-URL erwartet.');
        }

        // Extrahiert den reinen Base64-Teil
        const base64String = base64Data.split(';base64,').pop();
        if (!base64String) {
            throw new Error('Base64-Daten konnten nicht extrahiert werden.');
        }

        // Erstellt einen Buffer aus dem Base64-String
        const buffer = Buffer.from(base64String, 'base64');

        // Definiert den Speicherort und den Dateinamen
        const uploadsDir = path.join(process.cwd(), 'public/images/uploads');
        const fileName = `${uuidv4()}.jpg`;
        const filePath = path.join(uploadsDir, fileName);

        // Stellt sicher, dass das Verzeichnis existiert
        await fs.mkdir(uploadsDir, { recursive: true });

        // Schreibt die Datei
        await fs.writeFile(filePath, buffer);

        // Gibt den öffentlichen Pfad zurück, der im <img>-Tag verwendet werden kann
        const publicPath = `/images/uploads/${fileName}`;
        console.log(`Bild erfolgreich gespeichert unter: ${publicPath}`);

        return { success: true, filePath: publicPath };

    } catch (e: any) {
        console.error('Fehler beim Speichern des Bildes:', e);
        return { success: false, error: e.message || 'Ein unbekannter Fehler ist aufgetreten.' };
    }
}
