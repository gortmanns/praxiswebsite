
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrtmannsCard } from '@/app/team/_components/doctors/ortmanns-card';
import { RosenovCard } from '@/app/team/_components/doctors/rosenov-card';
import { SchemmerCard } from '@/app/team/_components/doctors/schemmer-card';
import { SlezakCard } from '@/app/team/_components/doctors/slezak-card';
import { HerschelCard } from '@/app/team/_components/doctors/herschel-card';
import { DoctorCard, type Doctor } from '@/app/team/_components/doctor-card';
import { User, Info, ArrowUp, ArrowDown, EyeOff, Pencil } from 'lucide-react';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const sampleDoctor: Doctor = {
  id: 'sample',
  title: 'Titel',
  name: 'Name',
  specialty: 'Fachgebiet',
  qualifications: [
    'Sonstige Qualifikation 1',
    'Sonstige Qualifikation 2',
    'Sonstige Qualifikation 3',
    'Sonstige Qualifikation 4',
  ],
  additionalInfo: 'Spezielle Information (alternativ zum Logo)',
  vita: `<p>Vita hier bearbeiten...</p>
         <p>Dies ist die Rückseite der Karte. Der Inhalt hier kann gescrollt werden, wenn er zu lang wird.</p>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
        `,
  imageUrl: '',
  imageHint: 'placeholder',
  order: 0,
};

export default function DoctorsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);
  
  const ActionButtons = () => (
    <div className="flex flex-col gap-2">
        <Button variant="outline" size="icon" aria-label="Nach oben verschieben">
            <ArrowUp className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Nach unten verschieben">
            <ArrowDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Ausblenden">
            <EyeOff className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Bearbeiten">
            <Pencil className="h-4 w-4" />
        </Button>
    </div>
  );


  return (
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
                           <EditableDoctorCard doctor={sampleDoctor} />
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
                <div className="flex w-full items-center justify-center gap-8">
                    <ActionButtons />
                    <div className="w-full max-w-[1000px] flex-1">
                        <OrtmannsCard />
                    </div>
                </div>
                <div className="flex w-full items-center justify-center gap-8" id="schemmer">
                    <ActionButtons />
                    <div className="w-full max-w-[1000px] flex-1">
                        <SchemmerCard />
                    </div>
                </div>
                <div className="flex w-full items-center justify-center gap-8" id="rosenov">
                    <ActionButtons />
                    <div className="w-full max-w-[1000px] flex-1">
                        <RosenovCard />
                    </div>
                </div>
                <div className="flex w-full items-center justify-center gap-8" id="herschel">
                    <ActionButtons />
                    <div className="w-full max-w-[1000px] flex-1">
                        <HerschelCard />
                    </div>
                </div>
                 <div className="flex w-full items-center justify-center gap-8" id="slezak">
                    <ActionButtons />
                    <div className="w-full max-w-[1000px] flex-1">
                        <SlezakCard />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
