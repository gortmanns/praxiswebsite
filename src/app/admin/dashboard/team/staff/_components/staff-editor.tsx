
'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TeamMemberCard } from '@/app/team/_components/team-member-card';
import { Button } from '@/components/ui/button';
import { ImageUp, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface StaffMember {
    id: string;
    order: number;
    name: string;
    role: string;
    role2?: string;
    imageUrl: string;
    backsideContent?: string;
    hidden?: boolean;
    createdAt?: any;
    [key: string]: any;
}

interface StaffEditorProps {
    cardData: StaffMember;
    onUpdate: (updatedData: StaffMember) => void;
}

export const StaffEditor: React.FC<StaffEditorProps> = ({ cardData, onUpdate }) => {
    const { toast } = useToast();

    const handleInputChange = (field: keyof StaffMember, value: string) => {
        onUpdate({ ...cardData, [field]: value });
    };

    const handleImageChange = async () => {
        const newImageUrl = prompt("Bitte geben Sie die neue Bild-URL ein:", cardData.imageUrl);
        if (newImageUrl) {
            // Basic URL validation
            try {
                new URL(newImageUrl);
                handleInputChange('imageUrl', newImageUrl);
            } catch (e) {
                toast({
                    variant: 'destructive',
                    title: 'Ungültige URL',
                    description: 'Bitte geben Sie eine gültige URL ein.',
                });
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left side: Editor Form */}
            <div className="space-y-6 rounded-lg border p-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Rolle</Label>
                    <Input id="role" value={cardData.role} onChange={(e) => handleInputChange('role', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role2">Rolle 2 (optional)</Label>
                    <Input id="role2" value={cardData.role2 || ''} onChange={(e) => handleInputChange('role2', e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="imageUrl">Bild-URL</Label>
                    <div className="flex gap-2">
                         <Input id="imageUrl" value={cardData.imageUrl} onChange={(e) => handleInputChange('imageUrl', e.target.value)} />
                         <Button variant="outline" size="icon" onClick={handleImageChange} aria-label="Bild-URL ändern">
                            <Pencil className="h-4 w-4"/>
                         </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="backsideContent">Text für Kartenrückseite</Label>
                    <Textarea
                        id="backsideContent"
                        value={cardData.backsideContent || ''}
                        onChange={(e) => handleInputChange('backsideContent', e.target.value)}
                        placeholder="Geben Sie hier den Text für die Rückseite ein (einfaches HTML ist erlaubt)..."
                        rows={6}
                    />
                </div>
            </div>

            {/* Right side: Live Preview */}
            <div className="relative">
                <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                <TeamMemberCard
                    name={cardData.name}
                    role={cardData.role}
                    role2={cardData.role2}
                    imageUrl={cardData.imageUrl}
                    imageHint="staff portrait preview"
                    backsideContent={
                        cardData.backsideContent ? (
                            <div dangerouslySetInnerHTML={{ __html: cardData.backsideContent }} />
                        ) : null
                    }
                />
            </div>
        </div>
    );
};
