
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PartnerCard } from './partner-card';

export interface Partner {
    id: string;
    order: number;
    name: string;
    websiteUrl?: string;
    logoHtml: string;
    openInNewTab?: boolean;
    hidden?: boolean;
    createdAt?: any;
    [key: string]: any;
}

interface PartnerEditorProps {
    cardData: Partner;
    onUpdate: (updatedData: Partner) => void;
}

export const PartnerEditor: React.FC<PartnerEditorProps> = ({ cardData, onUpdate }) => {

    const handleInputChange = (field: keyof Partner, value: string | boolean) => {
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
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input id="websiteUrl" value={cardData.websiteUrl || ''} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="logoHtml">Logo HTML</Label>
                    <Textarea
                        id="logoHtml"
                        value={cardData.logoHtml}
                        onChange={(e) => handleInputChange('logoHtml', e.target.value)}
                        placeholder="Geben Sie hier das HTML für das Logo ein..."
                        rows={8}
                        className="font-mono text-xs"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="openInNewTab"
                        checked={cardData.openInNewTab}
                        onCheckedChange={(checked) => handleInputChange('openInNewTab', !!checked)}
                    />
                    <Label htmlFor="openInNewTab" className="cursor-pointer">
                        Link in neuem Tab öffnen
                    </Label>
                </div>
            </div>

            <div className="relative">
                <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                <PartnerCard {...cardData} />
            </div>
        </div>
    );
};
