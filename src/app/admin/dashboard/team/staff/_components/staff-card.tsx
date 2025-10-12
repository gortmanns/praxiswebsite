
'use client';

import React from 'react';
import { TeamMemberCard } from '@/app/team/_components/team-member-card';

// This is the type that comes from Firestore
interface StaffMember {
    id: string;
    order: number;
    name: string;
    role: string;
    role2?: string;
    imageUrl: string;
    backsideContent?: string;
    languages?: string[];
    hidden?: boolean;
}

export const StaffCard: React.FC<StaffMember> = (props) => {
    
    // The backside content is HTML, so we create a React element from it.
    const backsideElement = props.backsideContent ? (
        <div dangerouslySetInnerHTML={{ __html: props.backsideContent }} />
    ) : null;

    return (
        <TeamMemberCard
            name={props.name}
            role={props.role}
            role2={props.role2}
            imageUrl={props.imageUrl}
            imageHint="staff portrait"
            languages={props.languages}
            backsideContent={backsideElement}
        />
    );
};
