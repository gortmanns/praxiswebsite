
'use client';

import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUp } from 'lucide-react';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from './image-crop-dialog';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { OtherPartner as Partner } from '@/docs/backend-types';


const projectImages = [
    '/images/luftbild.jpg', '/images/VASC-Alliance-Logo.png', '/images/schemmer-worni-logo.png', '/images/go-medical-logo.png', '/images/mcl-labor-logo.png', '/images/doxnet-logo.jpg', '/images/logos/slezak-logo.png', '/images/praxiszentrum-logo.png', '/images/praxiszentrum-logo-icon.png', '/images/mehrfacharzt-logo.png', '/images/rtw-bern.jpg', '/images/medphone_logo.png', '/images/toxinfo-logo.svg', '/images/foto-medis.jpg', '/images/team/Ortmanns.jpg', '/images/team/Prof.Schemmer.jpg', '/images/team/Dr.Rosenov.jpg', '/images/team/Dr.Herschel.jpg', '/images/team/Dr.Slezak.jpg', '/images/team/Garcia.jpg', '/images/team/Aeschlimann.jpg', '/images/team/Huber.jpg', '/images/team/Oetztuerk.jpg', '/images/team/Sommer.jpg', '/images/leistungen/audiometrie.jpg', '/images/leistungen/ekg.jpg', '/images/leistungen/labor.jpg', '/images/leistungen/praxisapotheke.jpg', '/images/leistungen/roentgen.jpg', '/images/leistungen/spirometrie.jpg', '/images/leistungen/twint_logo.png', '/images/leistungen/VMU.png', '/images/leistungen/wundversorgung.jpg',
];

// A static path to a generic card background image.
const CARD_BACKGROUND_IMAGE = '/images/partner-card-background.png';

export const PartnerEditor: React.FC<{ cardData: Partner; onUpdate: (data: Partner) => void }> = ({ cardData, onUpdate }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dialogState, setDialogState] = useState<'imageSource' | 'imageLibrary' | 'imageCrop' | null>(null);
    const [logoToCrop, setLogoToCrop] = useState<string | null>(null);


    const handleInputChange = (field: keyof Partner, value: string | boolean) => {
        onUpdate({ ...cardData, [field]: value });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogoToCrop(event.target?.result as string);
                setDialogState('imageCrop');
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = '';
    };

    const handleCropComplete = (composedImage: string) => {
        onUpdate({ ...cardData, logoUrl: composedImage });
        setDialogState(null);
        setLogoToCrop(null);
    };

     const renderPartnerLogo = (partner: Partner) => {
        if (!partner.logoUrl) {
            return <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">Kein Logo</div>;
        }
        if (partner.name === 'orthozentrum-bern') {
          return <OrthozentrumLogo className="h-full w-full object-contain" />;
        }
        if (partner.name === 'Agnieszka Slezak') {
          return <AgnieszkaSlezakLogo className="h-full w-full object-contain" />;
        }
        return (
            <Image
              src={partner.logoUrl}
              alt={`${partner.name} Logo`}
              width={partner.width || 200}
              height={partner.height || 60}
              className="object-contain"
            />
        );
    };

    return (
        <>
            <div className="flex flex-col gap-8 items-start">
                 <div className="w-full space-y-2">
                    <table className="w-full border-separate" style={{ borderSpacing: '0 0.5rem' }}>
                        <thead>
                            <tr>
                                <th className="w-1/3 text-left align-bottom pr-4">
                                    <Label htmlFor="name" className="font-bold">Name (für interne Verwendung)</Label>
                                </th>
                                <th className="w-auto text-left align-bottom px-4">
                                    {/* Empty header for button */}
                                </th>
                                <th className="w-1/3 text-left align-bottom px-4">
                                    <Label htmlFor="websiteUrl" className="font-bold">URL für onClick</Label>
                                </th>
                                <th className="w-auto text-left align-bottom pl-4 text-center">
                                    <Label htmlFor="openInNewTab" className="font-bold whitespace-nowrap">In neuer Seite öffnen</Label>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="pr-4">
                                    <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                                </td>
                                <td className="px-4">
                                    <Button variant="default" onClick={() => setDialogState('imageSource')}>
                                         <ImageUp className="mr-2 h-4 w-4" />
                                         Logo wählen
                                    </Button>
                                </td>
                                <td className="px-4">
                                    <Input id="websiteUrl" value={cardData.websiteUrl} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
                                </td>
                                <td className="pl-4 text-center">
                                    <div className="flex justify-center items-center h-full">
                                        <Checkbox 
                                            id="openInNewTab" 
                                            checked={cardData.openInNewTab} 
                                            onCheckedChange={(checked) => handleInputChange('openInNewTab', !!checked)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                                    <Card className="flex h-full w-full items-center p-6">
                                    <CardContent className="flex w-full items-center justify-center p-0">
                                        <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                                            {renderPartnerLogo(cardData)}
                                        </div>
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
                    setLogoToCrop(imageUrl);
                    setDialogState('imageCrop');
                }} />
            )}

            {dialogState === 'imageCrop' && logoToCrop && (
                <ImageCropDialog 
                  imageUrl={logoToCrop} 
                  backgroundImageUrl={CARD_BACKGROUND_IMAGE}
                  onCropComplete={handleCropComplete} 
                  onClose={() => setDialogState(null)} 
                />
            )}
        </>
    );
};
