
'use client';

import React from 'react';
import { TeamMemberCard } from '@/app/team/_components/team-member-card';
import { Button } from '@/components/ui/button';
import { Pencil, EyeOff, Eye, Trash2, ArrowLeft, ArrowRight, Columns } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type { StaffMember as StaffMemberData } from './staff-editor';

interface AdminStaffCardProps extends StaffMemberData {
    isFirst: boolean;
    isLast: boolean;
    isHiddenCard?: boolean;
    isBeingEdited?: boolean;
    onMove: (id: string, direction: 'left' | 'right') => void;
    onEdit: (staffMember: StaffMemberData) => void;
    onToggleHidden: (staffMember: StaffMemberData) => void;
    onToggleFullWidth: (staffMember: StaffMemberData) => void;
    onDelete: (id: string, name: string) => void;
}

export const StaffCard: React.FC<AdminStaffCardProps> = (props) => {
    const { id, name, onMove, onEdit, onToggleHidden, onToggleFullWidth, onDelete, isFirst, isLast, isHiddenCard, isBeingEdited } = props;

    // The backside content is HTML, so we create a React element from it.
    const backsideElement = props.backsideContent ? (
        <div dangerouslySetInnerHTML={{ __html: props.backsideContent }} />
    ) : null;

    return (
        <div className="relative w-full max-w-sm">
            <div id={`buttons-${id}`} className="absolute left-0 top-1/2 z-10 w-40 -translate-x-full -translate-y-1/2 pr-4">
                 <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border bg-background/80 p-2 shadow-inner">
                    {!isHiddenCard && (
                        <div className="grid grid-cols-2 gap-1 w-full">
                            <Button size="icon" variant="ghost" className="h-9 w-full" onClick={() => onMove(id, 'left')} disabled={isFirst}><ArrowLeft /></Button>
                            <Button size="icon" variant="ghost" className="h-9 w-full" onClick={() => onMove(id, 'right')} disabled={isLast}><ArrowRight /></Button>
                        </div>
                    )}
                    <div className="flex-grow flex flex-col gap-1 w-full">
                        <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => onEdit(props)}>
                            <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => onToggleHidden(props)}>
                            {props.hidden ? <><Eye className="mr-2 h-4 w-4" /> Einblenden</> : <><EyeOff className="mr-2 h-4 w-4" /> Ausblenden</>}
                        </Button>
                        {!isHiddenCard && (
                            <div className="flex items-center justify-between w-full h-9 px-3 py-2 rounded-md border border-input bg-transparent text-sm">
                                <Label htmlFor={`fullwidth-switch-${id}`} className="flex items-center gap-2 cursor-pointer">
                                    <Columns className={cn("h-4 w-4", props.fullWidth && "text-primary")} />
                                    <span>Ganze Zeile</span>
                                </Label>
                                <Switch
                                    id={`fullwidth-switch-${id}`}
                                    checked={!!props.fullWidth}
                                    onCheckedChange={() => onToggleFullWidth(props)}
                                />
                            </div>
                        )}
                    </div>
                    {isHiddenCard && (
                        <Button variant="destructive" size="sm" className="w-full justify-start" onClick={() => onDelete(id, name)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Löschen
                        </Button>
                    )}
                </div>
            </div>

             <div className={cn(isBeingEdited && "opacity-50 pointer-events-none grayscale")}>
                <TeamMemberCard
                    name={props.name}
                    role={props.role}
                    role2={props.role2}
                    imageUrl={props.imageUrl}
                    imageHint="staff portrait"
                    languages={props.languages}
                    backsideContent={backsideElement}
                />
            </div>
        </div>
    );
};
