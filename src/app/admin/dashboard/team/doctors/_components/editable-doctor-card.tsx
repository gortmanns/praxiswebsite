'use client';

import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { User, Upload, Pencil, Replace } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { VitaEditorDialog } from './vita-editor-dialog';
import { ImageCropDialog } from './image-crop-dialog';
import DOMPurify from 'dompurify';

const initialVita = `<p>Diesen Text können Sie frei anpassen</p>`;

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


interface EditDialogProps {
    trigger: React.ReactNode;
    dialogTitle: string;
    dialogDescription: string;
    initialValue: string;
    onSave: (value: string) => void;
    inputLabel: string;
}

const EditDialog: React.FC<EditDialogProps> = ({
    trigger,
    dialogTitle,
    dialogDescription,
    initialValue,
    onSave,
    inputLabel,
}) => {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = () => {
        onSave(currentValue);
        setIsDialogOpen(false);
    };
    
    React.useEffect(() => {
        if (isDialogOpen) {
            setCurrentValue(initialValue);
        }
    }, [initialValue, isDialogOpen]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-2">
                    <Label htmlFor="edit-input">{inputLabel}</Label>
                    <Input
                        id="edit-input"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                    />
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">Abbrechen</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Speichern</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const EditableDoctorCard: React.FC = () => {
    const [title, setTitle] = useState('Prof. Dr. med. Dr. h.c.');
    const [name, setName] = useState('Wilko. W. Schemmer');
    const [specialty, setSpecialty] = useState('Chirurgie FMH, Viszeralchirurgie');
    const [qualification1, setQualification1] = useState('Schwerpunkt spezielle Viszeralchirurgie (D)');
    const [qualification2, setQualification2] = useState('Fellow of the American College of Surgeons (FACS)');
    const [additionalInfo, setAdditionalInfo] = useState('Ärztliche Leitung');
    const [vita, setVita] = useState(initialVita);
    const [image, setImage] = useState<string | null>('/images/team/Prof.Schemmer.jpg');
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

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
    
    const triggerDiv = (children: React.ReactNode, className?: string) => (
        <div className={cn("group relative cursor-pointer", className)}>
            {children}
            <Pencil className="absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
    );
    
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
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div 
                            className="relative w-full bg-card"
                            style={{ 'containerType': 'inline-size', aspectRatio: '1000 / 495' } as React.CSSProperties}
                        >
                             <div className="grid h-full grid-cols-3 items-center gap-[4.5%] p-6">
                                <div
                                    className="group relative col-span-1 h-full w-full cursor-pointer overflow-hidden rounded-md bg-muted transition-colors hover:bg-muted/80"
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
                                <div className="col-span-2">
                                    <div className="flex h-full flex-col justify-center gap-1 text-left text-foreground/80">
                                       <EditDialog 
                                         dialogTitle="Titel bearbeiten"
                                         dialogDescription="Geben Sie den akademischen Titel des Arztes ein."
                                         initialValue={title}
                                         onSave={setTitle}
                                         inputLabel="Titel"
                                         trigger={triggerDiv(<p className="text-[2.2cqw] text-primary">{title || '[Titel]'}</p>)}
                                       />
                                       <EditDialog 
                                         dialogTitle="Name bearbeiten"
                                         dialogDescription="Geben Sie den Vor- und Nachnamen des Arztes ein."
                                         initialValue={name}
                                         onSave={setName}
                                         inputLabel="Name"
                                         trigger={triggerDiv(<h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">{name || '[Name]'}</h4>)}
                                       />
                                       <div className="mt-[1.5cqw] space-y-1 text-[2.2cqw] leading-tight">
                                           <EditDialog 
                                             dialogTitle="Spezialisierung bearbeiten"
                                             dialogDescription="Geben Sie die Spezialisierung des Arztes ein."
                                             initialValue={specialty}
                                             onSave={setSpecialty}
                                             inputLabel="Spezialisierung"
                                             trigger={triggerDiv(<p className="font-bold">{specialty || '[Spezialisierung]'}</p>)}
                                           />
                                            <EditDialog 
                                             dialogTitle="Zusatzqualifikation 1 bearbeiten"
                                             dialogDescription="Geben Sie eine optionale Zusatzqualifikation ein."
                                             initialValue={qualification1}
                                             onSave={setQualification1}
                                             inputLabel="Zusatzqualifikation 1"
                                             trigger={triggerDiv(<p>{qualification1 || '[Zusatzqualifikation 1]'}</p>)}
                                           />
                                            <EditDialog 
                                             dialogTitle="Zusatzqualifikation 2 bearbeiten"
                                             dialogDescription="Geben Sie eine weitere optionale Zusatzqualifikation ein."
                                             initialValue={qualification2}
                                             onSave={setQualification2}
                                             inputLabel="Zusatzqualifikation 2"
                                             trigger={triggerDiv(<p>{qualification2 || '[Zusatzqualifikation 2]'}</p>)}
                                           />
                                       </div>
                                       
                                        <EditDialog
                                            dialogTitle="Zusatzinformation bearbeiten"
                                            dialogDescription="Geben Sie eine optionale Zusatzinformation ein (z.B. 'Ärztliche Leitung')."
                                            initialValue={additionalInfo}
                                            onSave={setAdditionalInfo}
                                            inputLabel="Zusatzinformation"
                                            trigger={
                                                triggerDiv(
                                                    <p className="mt-[2.5cqw] text-[1.6cqw] italic">
                                                        {additionalInfo || '[Zusatzinfo]'}
                                                    </p>,
                                                    "w-fit"
                                                )
                                            }
                                        />

                                    </div>
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
        </>
    );
};
