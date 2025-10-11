
'use client';

import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ImageUp } from 'lucide-react';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { OtherPartner as Partner } from '@/docs/backend-types';

const projectImages = [
    '/images/luftbild.jpg', '/images/VASC-Alliance-Logo.png', '/images/schemmer-worni-logo.png', '/images/go-medical-logo.png', '/images/mcl-labor-logo.png', '/images/doxnet-logo.jpg', '/images/logos/slezak-logo.png', '/images/praxiszentrum-logo.png', '/images/praxiszentrum-logo-icon.png', '/images/mehrfacharzt-logo.png', '/images/rtw-bern.jpg', '/images/medphone_logo.png', '/images/toxinfo-logo.svg', '/images/foto-medis.jpg', '/images/team/Ortmanns.jpg', '/images/team/Prof.Schemmer.jpg', '/images/team/Dr.Rosenov.jpg', '/images/team/Dr.Herschel.jpg', '/images/team/Dr.Slezak.jpg', '/images/team/Garcia.jpg', '/images/team/Aeschlimann.jpg', '/images/team/Huber.jpg', '/images/team/Oetztuerk.jpg', '/images/team/Sommer.jpg', '/images/leistungen/audiometrie.jpg', '/images/leistungen/ekg.jpg', '/images/leistungen/labor.jpg', '/images/leistungen/praxisapotheke.jpg', '/images/leistungen/roentgen.jpg', '/images/leistungen/spirometrie.jpg', '/images/leistungen/twint_logo.png', '/images/leistungen/VMU.png', '/images/leistungen/wundversorgung.jpg',
];


export const PartnerEditor: React.FC<{ cardData: Partner; onUpdate: (data: Partner) => void }> = ({ cardData, onUpdate }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dialogState, setDialogState] = useState<'imageSource' | 'imageLibrary' | null>(null);

    const handleInputChange = (field: keyof Partner, value: string | boolean | number) => {
        onUpdate({ ...cardData, [field]: value });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onUpdate({ ...cardData, logoUrl: event.target?.result as string });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = '';
        setDialogState(null);
    };

    return (
        <>
            <div className="flex flex-col gap-8 items-start">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Basic Settings */}
                    <div className="space-y-4 border p-4 rounded-lg">
                        <div>
                            <Label htmlFor="name" className="font-bold">Name (für interne Verwendung)</Label>
                            <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="websiteUrl" className="font-bold">URL für onClick</Label>
                            <Input id="websiteUrl" value={cardData.websiteUrl} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox 
                                id="openInNewTab" 
                                checked={cardData.openInNewTab} 
                                onCheckedChange={(checked) => handleInputChange('openInNewTab', !!checked)}
                            />
                            <Label htmlFor="openInNewTab">In neuer Seite öffnen</Label>
                        </div>
                    </div>

                    {/* Image Settings */}
                    <div className="space-y-4 border p-4 rounded-lg">
                         <p className="text-sm text-muted-foreground">
                            Tipp: Bereiten Sie Ihr Logo idealerweise in einem Bildbearbeitungsprogramm vor (ca. 400x130 Pixel), bevor Sie es hochladen.
                        </p>
                        <Button variant="outline" onClick={() => setDialogState('imageSource')} className="w-full">
                             <ImageUp className="mr-2 h-4 w-4" />
                             Logo wählen/hochladen
                        </Button>
                        <div className="space-y-2">
                            <Label htmlFor="logoScale">Grösse des Logos ({cardData.logoScale || 100}%)</Label>
                            <Slider
                                id="logoScale"
                                min={10}
                                max={200}
                                step={1}
                                value={[cardData.logoScale || 100]}
                                onValueChange={(value) => handleInputChange('logoScale', value[0])}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="logoX">Horizontale Position ({cardData.logoX || 0}px)</Label>
                            <Slider
                                id="logoX"
                                min={-100}
                                max={100}
                                step={1}
                                value={[cardData.logoX || 0]}
                                onValueChange={(value) => handleInputChange('logoX', value[0])}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="logoY">Vertikale Position ({cardData.logoY || 0}px)</Label>
                             <Slider
                                id="logoY"
                                min={-50}
                                max={50}
                                step={1}
                                value={[cardData.logoY || 0]}
                                onValueChange={(value) => handleInputChange('logoY', value[0])}
                            />
                        </div>
                    </div>
                </div>
                 
                 <section id="partners" className="w-full bg-primary">
                    <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24">
                        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                        Live-Vorschau
                        </h2>
                        <div className="mt-12 flex flex-wrap justify-center gap-8">
                            <div className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%]">
                                <Link
                                    href={cardData.websiteUrl || '#'}
                                    target={cardData.openInNewTab ? '_blank' : '_self'}
                                    rel="noopener noreferrer"
                                    className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Card className="flex h-full w-full items-center justify-center p-6">
                                        <CardContent className="relative flex w-full h-full items-center justify-center p-0 overflow-hidden">
                                           {cardData.logoUrl ? (
                                                <Image
                                                    src={cardData.logoUrl}
                                                    alt={`${cardData.name} Logo`}
                                                    fill
                                                    className="object-contain"
                                                    style={{
                                                        transform: `scale(${ (cardData.logoScale || 100) / 100}) translate(${cardData.logoX || 0}px, ${cardData.logoY || 0}px)`,
                                                        transformOrigin: 'center center',
                                                    }}
                                                />
                                           ) : (
                                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">Kein Logo</div>
                                           )}
                                        </CardContent>
                                    </Card>
                                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
            
            {dialogState === 'imageSource' && (
                <ImageSourceDialog isOpen={true} onOpenChange={() => setDialogState(null)} onUpload={() => fileInputRef.current?.click()} onSelect={() => setDialogState('imageLibrary')} />
            )}
            
            {dialogState === 'imageLibrary' && (
                <ImageLibraryDialog isOpen={true} onOpenChange={() => setDialogState(null)} images={projectImages} onImageSelect={(imageUrl) => {
                    onUpdate({ ...cardData, logoUrl: imageUrl });
                    setDialogState(null);
                }} />
            )}
        </>
    );
};
