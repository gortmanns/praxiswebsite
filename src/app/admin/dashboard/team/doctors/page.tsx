
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type Doctor } from '@/app/team/_components/doctor-card';
import { Info, ArrowUp, ArrowDown, Eye, EyeOff, Pencil, CheckCircle } from 'lucide-react';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const sampleDoctor: Doctor = {
  id: 'sample',
  title: 'Titel',
  name: 'Name',
  specialty: 'Fachgebiet',
  qualifications: [
    'Sonstige Qualifikation 1',
    'Sonstige Qualifikation 2',
  ],
  additionalInfo: 'Spezielle Information (alternativ zum Logo)',
  vita: `<p>Vita hier bearbeiten...</p>
         <p>Dies ist die Rückseite der Karte. Der Inhalt hier kann gescrollt werden, wenn er zu lang wird.</p>
        `,
  imageUrl: '',
  imageHint: 'placeholder',
  order: 99,
};


export default function DoctorsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [doctorToEdit, setDoctorToEdit] = useState<Doctor>(sampleDoctor);

  const [isVitaEditorOpen, setIsVitaEditorOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const firestore = useFirestore();

  const doctorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'doctors'), orderBy('order'));
  }, [firestore]);

  const { data: doctorsData, isLoading: isLoadingDoctors } = useCollection<Doctor>(doctorsQuery);

  const [doctorsOrder, setDoctorsOrder] = useState<string[]>([]);
  const [hiddenCards, setHiddenCards] = useState<string[]>([]);
  
  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = 1000; // The fixed width of the card base
        const newScale = Math.min(1, containerWidth / cardWidth);
        setScale(newScale);
      }
    };

    calculateScale();
    const resizeObserver = new ResizeObserver(calculateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (doctorsData) {
      setDoctorsOrder(doctorsData.map(d => d.id));
    }
  }, [doctorsData]);
  
  const handleEditClick = (cardId: string) => {
    if (!doctorsData) return;
    const doctorData = doctorsData.find(d => d.id === cardId);
    if (doctorData) {
        setDoctorToEdit(doctorData);
        setEditingCardId(cardId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleVitaSave = (newVita: string) => {
    setDoctorToEdit(prev => ({ ...prev, vita: newVita }));
    setIsVitaEditorOpen(false);
  };
  
  const handleImageClick = () => {
      if (isSaving) return;
      fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              setImageToCrop(e.target?.result as string);
          };
          reader.readAsDataURL(file);
      }
      event.target.value = '';
  };
  
  const handleCropComplete = (croppedImageUrl: string) => {
    setDoctorToEdit(prev => ({ ...prev, imageUrl: croppedImageUrl }));
    setImageToCrop(null);
  };


  const ActionButtons = ({ cardId, index, total }: { cardId: string; index: number; total: number }) => {
    const isHidden = hiddenCards.includes(cardId);
    return (
        <div className="flex flex-col gap-2">
            <Button variant="outline" size="icon" aria-label="Nach oben verschieben" disabled={index === 0}>
                <ArrowUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Nach unten verschieben" disabled={index === total - 1}>
                <ArrowDown className="h-4 w-4" />
            </Button>
            <Button 
                variant="outline" 
                size="icon" 
                aria-label={isHidden ? "Einblenden" : "Ausblenden"}
                onClick={() => setHiddenCards(prev => isHidden ? prev.filter(id => id !== cardId) : [...prev, cardId])}
            >
                {isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Button 
                variant="outline" 
                size="icon" 
                aria-label="Bearbeiten"
                onClick={() => handleEditClick(cardId)}
            >
                <Pencil className="h-4 w-4" />
            </Button>
        </div>
    );
  };

  const getSortedCards = (sourceData: Doctor[] | null, order: string[]) => {
    if (!sourceData) return [];
    const dataMap = new Map(sourceData.map(d => [d.id, d]));
    return order.map(id => dataMap.get(id)).filter((d): d is Doctor => !!d);
  };

  const sortedDoctors = getSortedCards(doctorsData, doctorsOrder);
  const visibleCards = sortedDoctors.filter(card => !hiddenCards.includes(card.id));
  const deactivatedCards = sortedDoctors.filter(card => hiddenCards.includes(card.id));

  return (
    <>
      <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <div>
                    <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                    <CardDescription>
                    Hier können Sie Ärzte hinzufügen, bearbeiten und deren Reihenfolge ändern.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                 <div ref={containerRef} className="mx-auto w-full max-w-[1000px] p-2">
                    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                        <div className="w-[1000px]">
                           <EditableDoctorCard 
                              doctor={doctorToEdit}
                              onImageClick={handleImageClick}
                              onVitaClick={() => setIsVitaEditorOpen(true)}
                           />
                        </div>
                    </div>
                 </div>

                 <Alert variant="info" className="mx-auto mt-8 max-w-[1000px] border-2 border-blue-500 text-blue-800 bg-blue-50">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Hinweis zur Bearbeitung</AlertTitle>
                    <AlertDescription>
                        Klicken Sie auf die verschiedenen Bereiche der Vorschaukarte, um die Inhalte direkt zu bearbeiten. Textfelder wie Name und Titel werden im untenstehenden Formular angepasst. Das Bild und der Text auf der Kartenrückseite öffnen separate Dialogfenster.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>

        <div className="w-full space-y-8">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Aktuelle Vorschau
            </h3>
            <div className="space-y-12">
                {isLoadingDoctors ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex w-full items-center justify-center gap-8">
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                      </div>
                      <Skeleton className="h-[495px] w-full max-w-[1000px]" />
                    </div>
                  ))
                ) : (
                  visibleCards.map((doctor, index) => (
                      <div 
                        key={doctor.id} 
                        className="flex w-full items-center justify-center gap-8"
                      >
                        <ActionButtons cardId={doctor.id} index={index} total={visibleCards.length} />
                        <div className="relative w-full max-w-[1000px] flex-1">
                          <EditableDoctorCard doctor={doctor} onImageClick={() => {}} onVitaClick={() => {}} />
                          {editingCardId === doctor.id && (
                             <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary/40">
                                <span className="rounded-md bg-background px-4 py-2 text-lg font-bold text-primary shadow-lg">In Bearbeitung</span>
                            </div>
                          )}
                        </div>
                      </div>
                  ))
                )}
            </div>

            {deactivatedCards.length > 0 && (
                <div className="mt-16">
                    <h3 className="font-headline text-2xl font-bold tracking-tight text-muted-foreground sm:text-3xl">
                        Ausgeblendete Ärzte
                    </h3>
                    <div className="mt-8 space-y-12">
                        {deactivatedCards.map((doctor, index) => (
                           <div 
                                key={doctor.id} 
                                className="flex w-full items-center justify-center gap-8"
                            >
                                <ActionButtons cardId={doctor.id} index={index} total={deactivatedCards.length} />
                                <div className="relative w-full max-w-[1000px] flex-1">
                                  <div className="grayscale opacity-60">
                                    <EditableDoctorCard doctor={doctor} onImageClick={() => {}} onVitaClick={() => {}} />
                                  </div>
                                  {editingCardId === doctor.id && (
                                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary/40">
                                        <span className="rounded-md bg-background px-4 py-2 text-lg font-bold text-primary shadow-lg">In Bearbeitung</span>
                                    </div>
                                  )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
    
    <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        disabled={isSaving}
    />

    <VitaEditorDialog
      isOpen={isVitaEditorOpen}
      onOpenChange={setIsVitaEditorOpen}
      initialValue={doctorToEdit.vita}
      onSave={handleVitaSave}
    />

    {imageToCrop && (
        <ImageCropDialog
            imageUrl={imageToCrop}
            onCropComplete={handleCropComplete}
            onClose={() => setImageToCrop(null)}
        />
    )}
  </>
  );
}

    