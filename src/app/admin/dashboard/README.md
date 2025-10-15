# Anleitung zur Fehlerbehebung bei Firestore-Berechtigungen

Wenn der Fehler `FirebaseError: Missing or insufficient permissions` im Admin-Dashboard auftritt, liegt das Problem fast immer in einer von zwei Kategorien:

1.  **Falsche Firestore-Sicherheitsregeln:** Die Regeln in `firestore.rules` erlauben dem angemeldeten Administrator nicht die erforderliche Aktion (z. B. das Auflisten von Dokumenten `list` oder das Lesen eines Dokuments `get`).
2.  **Fehlerhafte Datenabfrage im Code:** Die Frontend-Komponente versucht, auf Firestore zuzugreifen, *bevor* die Datenbankverbindung vollständig initialisiert und der Benutzer authentifiziert ist.

## Korrektes Muster für Firestore-Datenabfragen im Admin-Dashboard

Um sicherzustellen, dass Datenabfragen nur dann erfolgen, wenn alles bereit ist, muss das folgende Muster strikt eingehalten werden. Dies ist das stabile Muster, das in funktionierenden Teilen des Dashboards (z. B. `doctors/page.tsx`) verwendet wird.

**Grundprinzip:** Die Datenbankabfrage (query) muss mit `useMemoFirebase` erstellt werden und `firestore` als Abhängigkeit haben. Der Hook, der die Daten abruft (`useCollection` oder `useDoc`), darf die Abfrage erst erhalten, wenn die `firestore`-Instanz verfügbar ist.

### Code-Beispiel

Hier ist ein Beispiel, wie man eine Sammlung (`infoBanners`) korrekt lädt:

```tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

// ... weitere Imports

// Definieren Sie den Typ für Ihre Daten
interface InfoBanner {
    id: string;
    text: string;
    // ... andere Felder
}

export default function YourComponent() {
    // 1. Holen Sie sich die firestore-Instanz.
    const firestore = useFirestore();

    // 2. Erstellen Sie die Datenbankabfrage mit `useMemoFirebase`.
    //    WICHTIG: Die Funktion gibt `null` zurück, wenn `firestore` noch nicht verfügbar ist.
    //    Fügen Sie `firestore` als Abhängigkeit im Array hinzu.
    const infoBannersQuery = useMemoFirebase(() => {
        if (!firestore) return null; // Schutzmaßnahme!
        return query(collection(firestore, 'infoBanners'), orderBy('start', 'desc'));
    }, [firestore]); // Abhängigkeit sicherstellen!

    // 3. Rufen Sie die Daten mit `useCollection` ab.
    //    Der Hook ist so konzipiert, dass er wartet, wenn die Abfrage `null` ist.
    const { data: infoBanners, isLoading, error } = useCollection<InfoBanner>(infoBannersQuery);

    // ... Rest Ihrer Komponentenlogik

    if (isLoading) {
        return <div>Lade Banner...</div>;
    }

    if (error) {
        // Der Fehler wird bereits durch den globalen Error-Handler angezeigt.
        // Hier können Sie eine benutzerfreundliche Fallback-UI rendern.
        return <div>Fehler beim Laden der Banner.</div>;
    }

    return (
        <div>
            {/* Rendern Sie Ihre Daten hier */}
            {infoBanners?.map(banner => (
                <div key={banner.id}>{banner.text}</div>
            ))}
        </div>
    );
}
```

Wenn Sie dieses Muster befolgen, stellen Sie sicher, dass die Datenabfrage immer mit den korrekten Berechtigungen des angemeldeten Benutzers ausgeführt wird und `Missing or insufficient permissions`-Fehler im Backend vermieden werden.
