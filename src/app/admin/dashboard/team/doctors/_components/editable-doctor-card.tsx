'use client';

import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { User, Upload, Pencil, Replace, GripVertical, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { VitaEditorDialog } from './vita-editor-dialog';
import { ImageCropDialog } from './image-crop-dialog';
import DOMPurify from 'dompurify';
import type { Doctor } from '@/app/team/_components/doctor-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';

const VitaRenderer: React.FC<{ text: string }> = ({ text }) => {
  const sanitizedHtml = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return { __html: DOMPurify.sanitize(text) };
    }
    return { __html: '' };
  }, [text]);

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={sanitizedHtml}
    />
  );
};

interface EditableDoctorCardProps {
    doctor?: Doctor;
    onSave: (doctorData: Omit<Doctor, 'id'>) => Promise<void>;
    onCancel: () => void;
    onDelete?: (id: string) => void;
    isSubmitting?: boolean;
}

export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ 
    doctor, 
    onSave,
    onCancel, 
    onDelete,
    isSubmitting,
}) => {
    const [name, setName] = useState(doctor?.name || '');
    const [title, setTitle] = useState(doctor?.title || '');
    const [specialty, setSpecialty] = useState(doctor?.specialty || '');
    const [qualifications, setQualifications] = useState(doctor?.qualifications?.join('\n') || '');
    const [additionalInfo, setAdditionalInfo] = useState(doctor?.additionalInfo || '');
    const [vita, setVita] = useState(doctor?.vita || '<p>Vita hier einfügen...</p>');
    const [image, setImage] = useState<string | null>(doctor?.imageUrl || null);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [partnerLogoComponent, setPartnerLogoComponent] = useState(doctor?.partnerLogoComponent || 'none');
    const [order, setOrder] = useState(doctor?.order || 0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToCrop(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleCroppedImage = (croppedImage: string) => {
        setImage(croppedImage);
        setImageToCrop(null); // Close the crop dialog
    };

    const handleSaveClick = () => {
        if (!name || !title) {
            // Basic validation
            alert("Name und Titel sind erforderlich.");
            return;
        }
        const doctorData = {
            name,
            title,
            specialty,
            qualifications: qualifications.split('\n').filter(q => q.trim() !== ''),
            additionalInfo,
            vita,
            imageUrl: image || '',
            imageHint: 'doctor portrait',
            partnerLogoComponent: partnerLogoComponent === 'none' ? undefined : partnerLogoComponent as Doctor['partnerLogoComponent'],
            order,
        };
        onSave(doctorData);
    };
    
    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
            />
             {imageToCrop && (
                <ImageCropDialog
                    imageUrl={imageToCrop}
                    onCropComplete={handleCroppedImage}
                    onClose={() => setImageToCrop(null)}
                />
            )}
            <Card className="overflow-hidden border-2 border-primary shadow-lg">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative w-full bg-card p-6" style={{ 'containerType': 'inline-size' } as React.CSSProperties}>
                            <div className="grid grid-cols-3 items-center gap-[4.5%]">
                                <div
                                    className="group relative col-span-1 aspect-[2/3] w-full cursor-pointer overflow-hidden rounded-md bg-muted transition-colors hover:bg-muted/80"
                                    onClick={handleImageUploadClick}
                                >
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt="Vorschau des Arztportraits"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <User className="h-1/2 w-1/2 text-muted-foreground" />
                                        </div>
                                    )}
                                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                        {image ? <Replace className="h-10 w-10 text-white" /> : <Upload className="h-10 w-10 text-white" />}
                                     </div>
                                </div>
                                <div className="col-span-2 space-y-2">
                                     <div>
                                        <Label htmlFor="title" className="text-xs">Titel</Label>
                                        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Prof. Dr. med." />
                                    </div>
                                    <div>
                                        <Label htmlFor="name" className="text-xs">Name</Label>
                                        <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Max Mustermann" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div>
                                    <Label htmlFor="specialty" className="text-xs">Spezialisierung</Label>
                                    <Input id="specialty" value={specialty} onChange={e => setSpecialty(e.target.value)} placeholder="Facharzt für..." />
                                </div>
                                <div>
                                    <Label htmlFor="qualifications" className="text-xs">Zusatzqualifikationen (eine pro Zeile)</Label>
                                    <Textarea id="qualifications" value={qualifications} onChange={e => setQualifications(e.target.value)} placeholder="Qualifikation 1&#10;Qualifikation 2" />
                                </div>
                                <div>
                                    <Label htmlFor="additionalInfo" className="text-xs">Zusatzinformation (kursiv)</Label>
                                    <Input id="additionalInfo" value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} placeholder="z.B. Ärztliche Leitung" />
                                </div>
                                <div>
                                     <Label htmlFor="partnerLogo" className="text-xs">Partner-Logo</Label>
                                    <Select value={partnerLogoComponent} onValueChange={setPartnerLogoComponent}>
                                        <SelectTrigger id="partnerLogo">
                                            <SelectValue placeholder="Logo auswählen" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Kein Logo</SelectItem>
                                            <SelectItem value="OrthozentrumLogo">Orthozentrum Bern</SelectItem>
                                            <SelectItem value="AgnieszkaSlezakLogo">Agnieszka Slezak</SelectItem>
                                            <SelectItem value="VascAllianceLogo">VASC Alliance</SelectItem>
                                            <SelectItem value="SchemmerWorniLogo">Schemmer & Worni</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="relative bg-accent/95 p-6 text-left text-background">
                            <VitaEditorDialog
                                initialValue={vita}
                                onSave={setVita}
                                trigger={<Pencil className="absolute top-4 right-4 h-5 w-5 cursor-pointer text-background hover:text-background/80 z-10" />}
                            />
                            <div className="h-full overflow-y-auto text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                                <VitaRenderer text={vita} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="mt-4 flex justify-between">
                <div className="flex gap-2">
                    {doctor && onDelete && (
                         <Button variant="destructive" onClick={() => onDelete(doctor.id)} disabled={isSubmitting}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Löschen
                        </Button>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>Abbrechen</Button>
                    <Button onClick={handleSaveClick} disabled={isSubmitting}>
                        {isSubmitting ? 'Wird gespeichert...' : 'Speichern'}
                    </Button>
                </div>
            </div>
        </>
    );
};
