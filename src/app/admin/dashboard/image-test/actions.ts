/**********************************************************************************
 * WICHTIGER HINWEIS: DIESE DATEI IST VERALTET (DEPRECATED)
 * 
 * Diese Datei enthält eine serverseitige Funktion ('use server') zum Speichern
 * von Bildern auf dem Dateisystem des Servers. Diese Methode ist nicht mehr
 * mit der aktuellen Architektur der Anwendung kompatibel, die auf einem 
 * statischen Export für Firebase Hosting basiert und keine serverseitige
 * Laufzeitumgebung für solche Aktionen bereitstellt.
 *
 * Die Bild-Upload-Funktionalität wurde vollständig auf eine client-seitige
 * Lösung umgestellt, die Bilder direkt von dem Browser des Benutzers auf
 * Firebase Storage hochlädt.
 *
 * DIESE DATEI SOLLTE NICHT MEHR VERWENDET UND IN ZUKUNFT ENTFERNT WERDEN.
 **********************************************************************************/
'use server';

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function saveCroppedImage(dataUrl: string): Promise<{ success: boolean; filePath?: string; error?: string }> {
  try {
    const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Generate a unique filename
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;
    
    // Define the path relative to the `public` directory
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    const filePath = path.join(uploadDir, filename);

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write the file
    await writeFile(filePath, buffer);

    // Return the public path for the client to use
    const publicPath = `/images/uploads/${filename}`;
    
    return { success: true, filePath: publicPath };
  } catch (error: any) {
    console.error('Error saving image:', error);
    return { success: false, error: error.message };
  }
}
