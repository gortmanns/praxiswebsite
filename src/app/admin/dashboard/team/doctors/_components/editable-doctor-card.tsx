
'use client';

import React from 'react';
import type { Doctor } from '@/app/team/_components/doctor-card';
import Image from 'next/image';
import { User, Pencil } from 'lucide-react';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface EditableDoctorCardProps {
    doctor: Doctor;
    onImageClick: () => void;
    onVitaClick: () => void;
    onTextClick: (fieldKey: keyof Doctor, fieldLabel: string, index?: number) => void;
}

const VitaRenderer: React.FC<{ html: string }> = ({ html }) => {
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            return { __html: DOMPurify.sanitize(html) };
        }
        return { __html: '' };
    }, [html]);

    return (
        <div
            className="vita-content text-background"
            dangerouslySetInnerHTML={sanitizedHtml}
        />
    );
};

const FrontSide: React.FC<Pick<EditableDoctorCardProps, 'doctor' | 'onImageClick' | 'onTextClick'>> = ({ doctor, onImageClick, onTextClick }) => {
    const { title, name, imageUrl, imageHint, specialty, qualifications, additionalInfo, partnerLogoComponent } = doctor;

    return (
        <div 
            className="relative w-full h-full bg-card p-6"
            style={{ containerType: 'inline-size' } as React.CSSProperties}
        >
            <div className="grid h-full grid-cols-3 items-stretch gap-[4.5%]">
                <div 
                    className="relative col-span-1 w-full overflow-hidden rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={onImageClick}
                >
                    <div className="relative h-full w-full aspect-[2/3] bg-muted">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={`Portrait von ${name}`}
                                data-ai-hint={imageHint}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                                <User className="h-1/2 w-1/2" />
                                <span className="px-4 text-center text-lg">Klicken zum Ändern</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-2 flex flex-col justify-center">
                    <div className="text-left text-foreground/80">
                        <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary cursor-pointer hover:bg-primary/10 rounded-sm px-1 -mx-1" onClick={() => onTextClick('title', 'Titel')}>{title}</p>
                        <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary cursor-pointer hover:bg-primary/10 rounded-sm px-1 -mx-1" onClick={() => onTextClick('name', 'Name')}>
                            {name}
                        </h4>
                        <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                            <p className="font-bold cursor-pointer hover:bg-primary/10 rounded-sm px-1 -mx-1" onClick={() => onTextClick('specialty', 'Spezialisierung')}>{specialty}</p>
                            {qualifications?.map((q, i) => <p key={i} className="cursor-pointer hover:bg-primary/10 rounded-sm px-1 -mx-1" onClick={() => onTextClick('qualifications', `Qualifikation ${i + 1}`, i)}>{q}</p>)}
                        </div>
                        
                        <div className="mt-[2.5cqw] cursor-pointer hover:bg-primary/10 rounded-sm p-1 -m-1" onClick={() => onTextClick('additionalInfo', 'Funktion oder Logo')}>
                            {partnerLogoComponent ? (
                                <div className="relative flex w-fit justify-start max-w-[432px]">
                                     <Image
                                        src={partnerLogoComponent}
                                        alt="Partner Logo"
                                        width={800}
                                        height={268}
                                        className="h-auto w-full object-contain"
                                        data-ai-hint="partner logo"
                                    />
                                </div>
                            ) : additionalInfo ? (
                                <p className="text-[clamp(0.6rem,1.6cqw,1rem)] italic">
                                    {additionalInfo}
                                </p>
                            ) : (
                                <p className="text-[clamp(0.6rem,1.6cqw,1rem)] italic text-muted-foreground">
                                    Funktion oder Logo
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const BackSide: React.FC<{ vita: string; onVitaClick: () => void; }> = ({ vita, onVitaClick }) => {
    return (
        <div
            className="relative w-full h-full bg-accent/95 overflow-hidden p-6"
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 h-14 w-14 text-background hover:bg-background/20 hover:text-background"
                onClick={onVitaClick}
            >
                <Pencil className="h-10 w-10" />
            </Button>
            <div className="h-full overflow-y-auto flex w-full flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary">
                <VitaRenderer html={vita} />
            </div>
        </div>
    );
};

const ScalingCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
        const calculateScale = () => {
            if (wrapperRef.current) {
                const cardDesignWidth = 1000;
                const wrapperWidth = wrapperRef.current.offsetWidth;
                setScale(wrapperWidth / cardDesignWidth);
            }
        };

        calculateScale();

        const resizeObserver = new ResizeObserver(calculateScale);
        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }

        return () => {
            if (wrapperRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                resizeObserver.unobserve(wrapperRef.current);
            }
        };
    }, []);

    return (
        <div ref={wrapperRef} className={cn("w-full aspect-[1000/495] overflow-hidden rounded-lg shadow-sm", className)}>
            <div style={{
                width: '1000px',
                height: '495px',
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
            }}>
                {children}
            </div>
        </div>
    );
};

export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ doctor, onImageClick, onVitaClick, onTextClick }) => {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <ScalingCard>
                <FrontSide doctor={doctor} onImageClick={onImageClick} onTextClick={onTextClick} />
            </ScalingCard>
            <ScalingCard>
                <BackSide vita={doctor.vita || ''} onVitaClick={onVitaClick} />
            </ScalingCard>
        </div>
    );
};
