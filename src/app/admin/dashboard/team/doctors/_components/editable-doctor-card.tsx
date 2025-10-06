'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const EditableDoctorCard = () => (
    <div 
        className="mx-auto max-w-5xl" 
        style={{ 'containerType': 'inline-size' } as React.CSSProperties}
    >
        <div
            className="group relative w-full"
            style={{ aspectRatio: '1000 / 495' }}
        >
            <Card className="absolute inset-0 overflow-hidden">
                <CardContent className="h-full p-6 transition-opacity duration-300">
                    <div className="grid h-full grid-cols-3 items-center gap-[4.5%]">
                        <div className="relative col-span-1 h-full w-full bg-muted flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">Bild-Upload folgt</p>
                        </div>
                        <div className="col-span-2">
                            <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                <Input placeholder="Titel, z.B. Dipl. med." className="text-[2.2cqw] text-primary p-0 h-auto border-0 focus-visible:ring-0" />
                                <Input placeholder="Name" className="font-headline text-[4.8cqw] font-bold leading-tight text-primary p-0 h-auto border-0 focus-visible:ring-0" />

                                <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight space-y-1">
                                    <Input placeholder="Fachrichtung" className="font-bold p-0 h-auto border-0 focus-visible:ring-0" />
                                    <Input placeholder="Zusatztitel 1 (optional)" className="p-0 h-auto border-0 focus-visible:ring-0" />
                                    <Input placeholder="Zusatztitel 2 (optional)" className="p-0 h-auto border-0 focus-visible:ring-0" />
                                </div>
                                
                                <Input placeholder="Zusatzinfo (optional)" className="mt-[2.5cqw] text-[1.6cqw] italic p-0 h-auto border-0 focus-visible:ring-0" />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="absolute inset-0 flex translate-y-full flex-col items-start justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                    <Textarea 
                      placeholder="Geben Sie hier den Lebenslauf oder weitere Details ein. Dieser Text erscheint auf der Rückseite der Karte."
                      className="w-full h-full text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight bg-transparent text-background border-0 focus-visible:ring-0 resize-none placeholder:text-background/50"
                    />
                </div>
            </Card>
        </div>
    </div>
);
