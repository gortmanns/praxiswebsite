'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ColorPaletteDemo } from '@/app/_components/color-palette-demo';
import { Slider } from '@/components/ui/slider';


interface Color {
  h: number;
  s: number;
  l: number;
}

const parseHsl = (hslString: string): Color | null => {
    if (!hslString) return null;
    const match = hslString.match(/(\d+(\.\d+)?)/g);
    if (!match || match.length < 3) return null;
    return {
        h: parseFloat(match[0]),
        s: parseFloat(match[1]),
        l: parseFloat(match[2]),
    };
};

const getCssVariableValue = (variable: string): string => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

export default function VisualDesignPage() {
    const { toast } = useToast();
    const [primaryColor, setPrimaryColor] = useState<Color>({ h: 197, s: 100, l: 47 });
    const [accentColor, setAccentColor] = useState<Color>({ h: 220, s: 9, l: 40 });
    const [isClient, setIsClient] = useState(false);

     useEffect(() => {
        setIsClient(true);
        const initialPrimary = parseHsl(getCssVariableValue('--primary'));
        const initialAccent = parseHsl(getCssVariableValue('--accent'));
        
        if (initialPrimary) setPrimaryColor(initialPrimary);
        if (initialAccent) setAccentColor(initialAccent);
    }, []);
    
    const handlePrimaryColorChange = (type: 'h' | 's' | 'l', value: number[]) => {
        setPrimaryColor(prev => ({...prev, [type]: value[0]}));
    };

    const handleAccentColorChange = (type: 'h' | 's' | 'l', value: number[]) => {
        setAccentColor(prev => ({...prev, [type]: value[0]}));
    };

    const applyColors = () => {
        const root = document.documentElement;
        
        // Primary
        root.style.setProperty('--primary', `${primaryColor.h} ${primaryColor.s}% ${primaryColor.l}%`);
        root.style.setProperty('--gradient-start', `${primaryColor.h} ${primaryColor.s}% ${primaryColor.l + 5}%`);
        root.style.setProperty('--gradient-end', `${primaryColor.h} ${primaryColor.s}% ${primaryColor.l - 5}%`);
        root.style.setProperty('--ring', `${primaryColor.h} ${primaryColor.s}% ${primaryColor.l}%`);
        
        // Accent
        root.style.setProperty('--accent', `${accentColor.h} ${accentColor.s}% ${accentColor.l}%`);
        root.style.setProperty('--accent-foreground', `${primaryColor.h} ${primaryColor.s}% ${primaryColor.l}%`);
        root.style.setProperty('--sidebar', `${accentColor.h} ${accentColor.s}% ${accentColor.l}%`);
        root.style.setProperty('--sidebar-border', `${accentColor.h} ${accentColor.s}% ${accentColor.l + 5}%`);
        root.style.setProperty('--sidebar-accent', `${accentColor.h} ${accentColor.s}% ${accentColor.l + 5}%`);
    };

    const handleSaveChanges = () => {
       applyColors();
       toast({
           title: 'Änderungen angewendet',
           description: 'Das neue Farbschema ist jetzt aktiv. Um die Änderungen dauerhaft zu speichern, müssen Sie den Build-Prozess neu starten.',
       });
    };

    if (!isClient) {
        return null; // or a loading skeleton
    }

    return (
         <div className="p-4 sm:p-8 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-primary">Visuelles Design anpassen</CardTitle>
                    <CardDescription>Ändern Sie hier die primären Farben der Webseite. Die Änderungen werden live übernommen. Damit die Änderungen dauerhaft gespeichert werden und einen erneuten Build überleben, muss die Datei `src/app/globals.css` manuell angepasst werden.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Primary Color Controls */}
                        <div className="space-y-4 p-4 rounded-lg border">
                             <h3 className="font-semibold text-lg">Primärfarbe (Primary)</h3>
                             <div className="space-y-2">
                                <Label>Farbton (Hue): {primaryColor.h}</Label>
                                <Slider defaultValue={[primaryColor.h]} max={360} step={1} onValueChange={(v) => handlePrimaryColorChange('h', v)} />
                             </div>
                             <div className="space-y-2">
                                <Label>Sättigung (Saturation): {primaryColor.s}%</Label>
                                <Slider defaultValue={[primaryColor.s]} max={100} step={1} onValueChange={(v) => handlePrimaryColorChange('s', v)} />
                             </div>
                             <div className="space-y-2">
                                <Label>Helligkeit (Lightness): {primaryColor.l}%</Label>
                                <Slider defaultValue={[primaryColor.l]} max={100} step={1} onValueChange={(v) => handlePrimaryColorChange('l', v)} />
                             </div>
                        </div>

                         {/* Accent Color Controls */}
                        <div className="space-y-4 p-4 rounded-lg border">
                             <h3 className="font-semibold text-lg">Akzentfarbe (Accent)</h3>
                             <div className="space-y-2">
                                <Label>Farbton (Hue): {accentColor.h}</Label>
                                <Slider defaultValue={[accentColor.h]} max={360} step={1} onValueChange={(v) => handleAccentColorChange('h', v)} />
                             </div>
                             <div className="space-y-2">
                                <Label>Sättigung (Saturation): {accentColor.s}%</Label>
                                <Slider defaultValue={[accentColor.s]} max={100} step={1} onValueChange={(v) => handleAccentColorChange('s', v)} />
                             </div>
                             <div className="space-y-2">
                                <Label>Helligkeit (Lightness): {accentColor.l}%</Label>
                                <Slider defaultValue={[accentColor.l]} max={100} step={1} onValueChange={(v) => handleAccentColorChange('l', v)} />
                             </div>
                        </div>
                    </div>
                     <Button onClick={handleSaveChanges}>
                        <Save className="mr-2 h-4 w-4" />
                        Änderungen anwenden
                    </Button>
                </CardContent>
            </Card>
            <ColorPaletteDemo />
        </div>
    );
}
