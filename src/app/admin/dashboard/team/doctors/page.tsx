
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DoctorCard, type Doctor } from '@/app/team/_components/doctor-card';
import { User, Info, ArrowUp, ArrowDown, Eye, EyeOff, Pencil } from 'lucide-react';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OrtmannsCard } from '@/app/team/_components/doctors/ortmanns-card';
import { RosenovCard } from '@/app/team/_components/doctors/rosenov-card';
import { SchemmerCard } from '@/app/team/_components/doctors/schemmer-card';
import { SlezakCard } from '@/app/team/_components/doctors/slezak-card';
import { HerschelCard } from '@/app/team/_components/doctors/herschel-card';


const doctorsData: Doctor[] = [
    {
      id: 'ortmanns',
      title: "Dipl. med.",
      name: "G. Ortmanns",
      imageUrl: "/images/team/Ortmanns.jpg",
      imageHint: "man portrait",
      specialty: "Praktischer Arzt",
      qualifications: [
          'Master of Public Health (UNSW)',
          'Master of Health Management (UNSW)',
      ],
      vita: `<h4>Curriculum Vitae</h4><ul><li><span style="color: var(--color-tiptap-blue);">2022</span> Niederlassung als Hausarzt im Praxiszentrum im Ring</li><li><span style="color: var(--color-tiptap-blue);">2021-22</span> Tätigkeit in der Hausarztpraxis Dr. G. Gyger, Thun</li><li><span style="color: var(--color-tiptap-blue);">2019-21</span> Oberarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2018</span> Oberarzt Innere Medizin, Spital Interlaken</li><li><span style="color: var(--color-tiptap-blue);">2017</span> Assistenzarzt Kardiologie, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2016-17</span> Assistenzarzt Pneumologie, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2015-16</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2015</span> Erlangung des Facharzttitels für Innere Medizin</li><li><span style="color: var(--color-tiptap-blue);">2014-15</span> Assistenzarzt Intensivmedizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2013-14</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2011-13</span> Assistenzarzt Innere Medizin, Spital Interlaken</li><li><span style="color: var(--color-tiptap-blue);">2011</span> Promotion zum Dr. med.</li><li><span style="color: var(--color-tiptap-blue);">2010-11</span> Assistenzarzt Chirurgie, Klinik für Viszerale Chirurgie und Medizin, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2009</span> Staatsexamen</li><li><span style="color: var(--color-tiptap-blue);">2003-09</span> Studium der Humanmedizin an der Universität zu Köln</li></ul><br><p class="is-small">Mitgliedschaften:<br>Verbindung der Schweizer Ärztinnen und Ärzte (FMH)<br>Ärztegesellschaft des Kantons Bern (BEKAG)<br>Schweizerische Gesellschaft für Ultraschall in der Medizin (SGUM)</p>`,
      additionalInfo: "Ärztliche und administrative Leitung Praxiszentrum im Ring",
      order: 1,
    },
    {
      id: 'schemmer',
      title: "Prof. Dr. med. Dr. h. c.",
      name: "P. Schemmer",
      imageUrl: "/images/team/Prof.Schemmer.jpg",
      imageHint: "man portrait",
      specialty: "Facharzt für Chirurgie",
      qualifications: [],
      vita: `<p>Prof. Schemmer war von 2013 bis 2022 Direktor der Universitätsklinik für Viszerale Transplantationschirurgie am Inselspital in Bern.</p><br><p>Seit 2022 ist er Chefarzt für Chirurgie an der Universitätsklinik für Allgemein-, Viszeral- und Transplantationschirurgie in Graz.</p><br><p>Seine Patienten in der Schweiz behandelt er weiterhin, neu aber wohnortnah und unkompliziert auch hier im Praxiszentrum im Ring, wo er eine regelmässige Sprechstunde abhält.</p>`,
      partnerLogoComponent: "SchemmerWorniLogo",
      order: 2,
    },
    {
      id: 'rosenov',
      title: "Prof. Dr. med.",
      name: "A. Rosenov",
      imageUrl: "/images/team/Dr.Rosenov.jpg",
      imageHint: "man portrait",
      specialty: "Facharzt für Angiologie",
      qualifications: [],
      vita: `<p>Prof. Rosenov hat sich bereit erklärt, ab Mai 2024 die Patienten mit Krampfaderleiden im Praxiszentrum im Ring zu behandeln.</p><br><p>Er wird regelmässig, i.d.R. am Montagnachmittag, eine Sprechstunde im Praxiszentrum anbieten.</p><br><h4>Curriculum Vitae</h4><ul><li><span style="color: var(--color-tiptap-blue);">Seit 2004</span> Chefarzt Herzchirurgie, Spital Triemli, Zürich</li><li><span style="color: var(--color-tiptap-blue);">2002</span> Habilitation und Ernennung zum Privatdozenten an der Universität Ulm</li><li><span style="color: var(--color-tiptap-blue);">1997-2004</span> Oberarzt an der Klinik für Herz-, Thorax- und Gefässchirurgie, Ulm</li><li><span style="color: var(--color-tiptap-blue);">1991-1996</span> Facharztausbildung in der Herzchirurgie an der Medizinischen Hochschule Hannover</li><li><span style="color: var(--color-tiptap-blue);">1990</span> Promotion zum Dr. med.</li><li><span style="color: var(--color-tiptap-blue);">1882-1989</span> Studium der Humanmedizin an der Westfälischen Wilhelms-Universität in Münster</li></ul>`,
      partnerLogoComponent: "VascAllianceLogo",
      order: 3,
    },
    {
        id: 'herschel',
        title: "Dr. med.",
        name: "R. Herschel",
        imageUrl: "/images/team/Dr.Herschel.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt Orthopädische Chirurgie und Traumatologie des Bewegungsapparates",
        qualifications: [],
        vita: `<p>Vita folgt in Kürze.</p>`,
        partnerLogoComponent: "OrthozentrumLogo",
        order: 4,
    },
    {
      id: 'slezak',
      title: "Dr. med.",
      name: "A. Slezak",
      imageUrl: "/images/team/Dr.Slezak.jpg",
      imageHint: "woman portrait",
      specialty: "Fachärztin für Neurologie",
      qualifications: [],
      vita: `<p>Vita folgt in Kürze.</p>`,
      partnerLogoComponent: "AgnieszkaSlezakLogo",
      order: 5,
    }
  ];
  
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
  const [hiddenCards, setHiddenCards] = useState<string[]>(['slezak']);
  const [doctorToEdit, setDoctorToEdit] = useState<Doctor>(sampleDoctor);

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
  
  const handleEditClick = (cardId: string) => {
    const doctorData = doctorsData.find(d => d.id === cardId);
    if (doctorData) {
        setDoctorToEdit(doctorData);
        setEditingCardId(cardId);
    }
  }

  const ActionButtons = ({ cardId }: { cardId: string }) => {
    const isHidden = hiddenCards.includes(cardId);
    return (
        <div className="flex flex-col gap-2">
            <Button variant="outline" size="icon" aria-label="Nach oben verschieben">
                <ArrowUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Nach unten verschieben">
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
  
  const doctorCards = doctorsData.map(doctor => ({
    id: doctor.id,
    component: (
        <DoctorCard 
            title={doctor.title}
            name={doctor.name}
            imageUrl={doctor.imageUrl}
            imageHint={doctor.imageHint}
            specialty={doctor.specialty}
            qualifications={doctor.qualifications}
            vita={doctor.vita}
            additionalInfo={doctor.additionalInfo}
            partnerLogoComponent={doctor.partnerLogoComponent}
        />
    )
  }));


  const visibleCards = doctorCards.filter(card => !hiddenCards.includes(card.id));
  const deactivatedCards = doctorCards.filter(card => hiddenCards.includes(card.id));

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
                           <EditableDoctorCard doctor={doctorToEdit} />
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
                {visibleCards.map(({ id, component: CardComponent }) => (
                     <div 
                        key={id} 
                        className={cn(
                            "flex w-full items-center justify-center gap-8 rounded-lg p-2 transition-all",
                            editingCardId === id && "ring-4 ring-primary ring-offset-4 ring-offset-background"
                        )}
                    >
                        <ActionButtons cardId={id} />
                        <div className="w-full max-w-[1000px] flex-1">
                            {CardComponent}
                        </div>
                    </div>
                ))}
            </div>

            {deactivatedCards.length > 0 && (
                <div className="mt-16">
                    <h3 className="font-headline text-2xl font-bold tracking-tight text-muted-foreground sm:text-3xl">
                        Ausgeblendete Ärzte
                    </h3>
                    <div className="mt-8 space-y-12">
                        {deactivatedCards.map(({ id, component: CardComponent }) => (
                           <div 
                                key={id} 
                                className={cn(
                                    "flex w-full items-center justify-center gap-8 rounded-lg p-2 transition-all grayscale opacity-60",
                                    editingCardId === id && "ring-4 ring-primary ring-offset-4 ring-offset-background"
                                )}
                            >
                                <ActionButtons cardId={id} />
                                <div className="w-full max-w-[1000px] flex-1">
                                    {CardComponent}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}

    