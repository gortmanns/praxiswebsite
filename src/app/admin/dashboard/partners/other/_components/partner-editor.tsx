
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PartnerCard, type Partner } from './partner-card';

interface PartnerEditorProps {
    cardData: Partner;
    onUpdate: (updatedData: Partner) => void;
}

export const PartnerEditor: React.FC<PartnerEditorProps> = ({ cardData, onUpdate }) => {

    const handleInputChange = (field: keyof Partner, value: string | number) => {
        onUpdate({ ...cardData, [field]: value });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 rounded-lg border p-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input id="logoUrl" value={cardData.logoUrl} onChange={(e) => handleInputChange('logoUrl', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input id="websiteUrl" value={cardData.websiteUrl} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="width">Logo-Breite (px)</Label>
                        <Input id="width" type="number" value={cardData.width || ''} onChange={(e) => handleInputChange('width', parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="height">Logo-Höhe (px)</Label>
                        <Input id="height" type="number" value={cardData.height || ''} onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="hint">AI Hint (für Bildersuche)</Label>
                    <Input id="hint" value={cardData.hint || ''} onChange={(e) => handleInputChange('hint', e.target.value)} />
                </div>
            </div>

            <div className="relative">
                <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                <PartnerCard {...cardData} />
            </div>
        </div>
    );
};
