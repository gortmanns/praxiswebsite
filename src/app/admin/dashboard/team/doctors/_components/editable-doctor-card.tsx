
'use client';

import React from 'react';
import type { Doctor } from '@/app/team/_components/doctor-card';
import { DoctorCard } from '@/app/team/_components/doctor-card';

interface EditableDoctorCardProps {
    doctor: Doctor;
    onImageClick: () => void;
    onVitaClick: () => void;
}

// This component uses the original DoctorCard but forces the "back" view for the Vita.
// It wraps the card in a div that fakes the hover state.
const BackSide: React.FC<EditableDoctorCardProps> = ({ doctor, onVitaClick }) => {
    return (
        <div className="group/back" onClick={onVitaClick}>
            <DoctorCard
                id={doctor.id}
                title={doctor.title}
                name={doctor.name}
                imageUrl={doctor.imageUrl}
                imageHint={doctor.imageHint}
                specialty={doctor.specialty}
                qualifications={doctor.qualifications}
                vita={doctor.vita}
                additionalInfo={doctor.additionalInfo}
                partnerLogoComponent={doctor.partnerLogoComponent}
                order={doctor.order}
            />
        </div>
    );
};


export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor, onImageClick, onVitaClick }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
           <div className="w-full aspect-[1000/495] cursor-pointer" onClick={onImageClick}>
                <DoctorCard
                    id={doctor.id}
                    title={doctor.title}
                    name={doctor.name}
                    imageUrl={doctor.imageUrl}
                    imageHint={doctor.imageHint}
                    specialty={doctor.specialty}
                    qualifications={doctor.qualifications}
                    vita={doctor.vita}
                    additionalInfo={doctor.additionalInfo}
                    partnerLogoComponent={doctor.partnerLogoComponent}
                    order={doctor.order}
                />
           </div>
            <style jsx>{`
                .group\\/back:hover .group,
                .group\\/back .group {
                    cursor: pointer;
                }
                .group\\/back :global(.flip-card-back) {
                    transform: translateY(0%);
                }
            `}</style>
           <div className="w-full aspect-[1000/495] cursor-pointer">
                <BackSide doctor={doctor} onVitaClick={onVitaClick} onImageClick={onImageClick} />
           </div>
        </div>
    );
};
