
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import DOMPurify from 'dompurify';
import React from 'react';

const VitaRenderer: React.FC<{ html: string }> = ({ html }) => {
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
        return { __html: DOMPurify.sanitize(html) };
        }
        return { __html: '' };
    }, [html]);

    return (
        <div
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={sanitizedHtml}
        />
    );
};

export function RosenovCard() {
    const vita = `
        <p>
            Prof. Rosenov hat sich bereit erklärt, ab Mai 2024 die Patienten mit Krampfaderleiden im Praxiszentrum im Ring zu behandeln.
        </p>
        <br>
        <p>
            Er wird regelmässig, i.d.R. am Montagnachmittag, eine Sprechstunde im Praxiszentrum anbieten.
        </p>
        <br>
        <h4>Curriculum Vitae</h4>
        <ul>
            <li><span style="color: var(--color-tiptap-blue);">Seit 2004</span> Chefarzt Herzchirurgie, Spital Triemli, Zürich</li>
            <li><span style="color: var(--color-tiptap-blue);">2002</span> Habilitation und Ernennung zum Privatdozenten an der Universität Ulm</li>
            <li><span style="color: var(--color-tiptap-blue);">1997-2004</span> Oberarzt an der Klinik für Herz-, Thorax- und Gefässchirurgie, Ulm</li>
            <li><span style="color: var(--color-tiptap-blue);">1991-1996</span> Facharztausbildung in der Herzchirurgie an der Medizinischen Hochschule Hannover</li>
            <li><span style="color: var(--color-tiptap-blue);">1990</span> Promotion zum Dr. med.</li>
            <li><span style="color: var(--color-tiptap-blue);">1882-1989</span> Studium der Humanmedizin an der Westfälischen Wilhelms-Universität in Münster</li>
        </ul>
    `;

    return (
        <div className="group relative w-full max-w-[1000px] overflow-hidden rounded-lg shadow-sm">
            <Card className="w-full overflow-hidden">
                <CardContent className="p-0">
                    <div 
                        className="relative w-full bg-card aspect-[1000/495]"
                        style={{ 'containerType': 'inline-size' } as React.CSSProperties}
                    >
                        <div className="grid h-full grid-cols-3 items-stretch gap-[4.5%] p-6">
                            <div className="relative col-span-1 w-full overflow-hidden rounded-md">
                                <div className="relative h-full w-full aspect-[2/3]">
                                    <Image
                                        src="/images/team/Dr.Rosenov.jpg"
                                        alt="Portrait von Prof. Dr. med. A. Rosenov"
                                        data-ai-hint="man portrait"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <div className="text-left text-foreground/80">
                                    <p className="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary">Prof. Dr. med.</p>
                                    <h4 className="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary">
                                      A. Rosenov
                                    </h4>
                                    <div className="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                                        <div className="font-bold">Facharzt für Angiologie</div>
                                    </div>
                                    
                                    <div className="relative mt-[2.5cqw] flex h-28 w-full max-w-[400px] items-center justify-start">
                                        <Image
                                            src="/images/VASC-Alliance-Logo.png"
                                            alt="VASC Alliance Logo"
                                            width={495}
                                            height={165}
                                            className="h-full w-full object-contain object-left"
                                            data-ai-hint="partner logo"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flip-card-back absolute inset-0 flex translate-y-full flex-col items-center justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                 <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary">
                    <VitaRenderer html={vita} />
                 </div>
            </div>
        </div>
    );
}
