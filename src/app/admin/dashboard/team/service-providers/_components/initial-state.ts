/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
import type { ServiceProvider } from '../page';

export const initialServiceProviderState: Omit<ServiceProvider, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Dienstleister",
    languages: ['de'],
    hidden: false,
    websiteUrl: "https://",
    openInNewTab: true,
    frontSideCode: `
        <style>
            .template-card button, .template-card div[id^="edit-"] { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; display: block; }
            .template-card .image-button:hover { background-color: rgba(0,0,0,0.1); }
            .template-card .image-button-background { background-color: white; }
            .template-card p, .template-card h3, .template-card span { margin:0; }
            .template-card .font-headline { font-family: var(--font-headline); }
            .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
            .template-card .bg-background { background-color: hsl(var(--background)); }
            .template-card .p-6 { padding: 1.5rem; }
            .template-card .flex { display: flex; }
            .template-card .h-full { height: 100%; }
            .template-card .w-full { width: 100%; }
            .template-card .items-start { align-items: flex-start; }
            .template-card .relative { position: relative; }
            .template-card .aspect-\\[2\\/3\\] { aspect-ratio: 2 / 3; }
            .template-card .overflow-hidden { overflow: hidden; }
            .template-card .rounded-md { border-radius: 0.375rem; }
            .template-card .flex-grow { flex-grow: 1; }
            .template-card .flex-col { flex-direction: column; }
            .template-card .justify-center { justify-content: center; }
            .template-card .ml-6 { margin-left: 1.5rem; }
            .template-card .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .template-card .font-bold { font-weight: 700; }
            .template-card .text-primary { color: hsl(var(--primary)); }
            .template-card .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
            .template-card .text-5xl { font-size: 3rem; line-height: 1; }
            .template-card .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .template-card .mt-6 { margin-top: 1.5rem; }
            .template-card .text-base { font-size: 1rem; line-height: 1.5rem; }
            .template-card .text-left { text-align: left; }
            .template-card .absolute { position: absolute; }
            .template-card .bottom-0 { bottom: 0; }
            .template-card .right-0 { right: 0; }
            .template-card .items-center { align-items: center; }
            .template-card .gap-2 { gap: 0.5rem; }
            .template-card .object-contain { object-fit: contain; }
            .template-card .object-cover { object-fit: cover; }
            .template-card .text-muted-foreground { color: hsl(var(--muted-foreground)); }
            .template-card .bg-muted { background-color: hsl(var(--muted)); }
            .template-card .text-center { text-align: center; }
            .template-card .mt-2 { margin-top: 0.5rem; }
            .template-card .font-extrabold { font-weight: 800; }
            .template-card .bg-white { background-color: white; }
            .template-card .shrink-0 { flex-shrink: 0; }
        </style>
         <div id="card-root" class="template-card w-full h-full bg-background text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div id="image-container" class="relative h-full aspect-[2/3] overflow-hidden rounded-md shrink-0 bg-muted">
                    <div id="edit-image" class="image-button w-full h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="font-extrabold"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span class="mt-2 text-sm font-bold">Zum Ändern klicken</span>
                    </div>
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <div id="edit-title" class="w-full text-left">
                            <p class="text-2xl font-bold text-primary">Titel</p>
                        </div>
                        <div id="edit-name" class="w-full text-left">
                            <h3 class="text-5xl font-bold text-primary my-2">Name</h3>
                        </div>
                        <div id="edit-specialty" class="w-full text-left">
                            <p class="text-xl font-bold">Spezialisierung</p>
                        </div>
                        <div id="position-container" class="mt-6">
                            <div id="edit-position"><div class="w-full text-left"><p class="text-base">Position oder Logo</p></div></div>
                        </div>
                    </div>
                    <div id="language-container" class="absolute bottom-0 right-0 flex items-center gap-2">
                    </div>
                </div>
            </div>
        </div>
    `,
    backSideCode: ``,
};

export const extractFromHtml = (html: string | undefined, id: string): { text: string; image: string } => {
    if (typeof window === 'undefined' || !html) return { text: '', image: '' };
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const element = doc.querySelector(`[id="${id}"]`);
    if (!element) return { text: '', image: '' };
    
    const textContent = element.querySelector('p')?.textContent || element.querySelector('h3')?.textContent || '';
    const imageSrc = element.querySelector('img')?.getAttribute('src') || '';

    if (imageSrc) return { text: '', image: imageSrc };
    return { text: textContent, image: '' };
};

export const createPopulatedFrontSideCode = (cardData: Partial<ServiceProvider>): string => {
    if (typeof window === 'undefined') return '';
    let template = initialServiceProviderState.frontSideCode;
    const parser = new DOMParser();
    const doc = parser.parseFromString(template, 'text/html');

    const updateElement = (elementId: string, content: { text?: string | null, image?: string | null }, objectFit: 'contain' | 'cover' = 'cover') => {
        const element = doc.getElementById(elementId);
        if (element) {
            if (content.image) {
                element.innerHTML = `<img src="${content.image}" alt="Logo" class="h-full w-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} relative" />`;
            } else if (content.text) {
                const pOrH3 = element.querySelector('p') || element.querySelector('h3');
                if (pOrH3) pOrH3.textContent = content.text;
            }
        }
    };
    
    const existingCode = cardData.frontSideCode || '';

    const titleInfo = extractFromHtml(existingCode, 'edit-title');
    const nameInfo = extractFromHtml(existingCode, 'edit-name');
    const specialtyInfo = extractFromHtml(existingCode, 'edit-specialty');
    const positionInfo = extractFromHtml(existingCode, 'edit-position');
    const imageInfo = extractFromHtml(existingCode, 'edit-image');
    
    updateElement('edit-title', { text: titleInfo.text || 'Titel' });
    updateElement('edit-name', { text: nameInfo.text || cardData.name });
    updateElement('edit-specialty', { text: specialtyInfo.text || 'Spezialisierung' });
    updateElement('edit-position', { text: positionInfo.text, image: positionInfo.image }, 'contain');
    updateElement('edit-image', { image: imageInfo.image }, 'cover');

    return doc.body.innerHTML;
};
