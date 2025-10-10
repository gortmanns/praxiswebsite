
'use client';

import React from 'react';
import type { Doctor } from '@/app/team/_components/doctor-card';
import { Card } from '@/components/ui/card';

interface EditableDoctorCardProps {
    doctor: Doctor;
    onImageClick: () => void;
    onVitaClick: () => void;
}

export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor, onImageClick, onVitaClick }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
           <div className="w-full aspect-[1000/495] bg-muted rounded-lg border border-dashed flex items-center justify-center">
                <span className="text-muted-foreground">Vorderseite</span>
           </div>
           <div className="w-full aspect-[1000/495] bg-muted rounded-lg border border-dashed flex items-center justify-center">
                <span className="text-muted-foreground">Rückseite</span>
           </div>
        </div>
    );
};
