'use client';

import { DoctorCard } from '../doctor-card';
import Image from 'next/image';

export function SchemmerCard() {
    return (
        <DoctorCard
            title="Prof. Dr. med. Dr. h. c."
            name="Patrick Schemmer"
            imageUrl="/images/team/Schemmer.jpg"
            imageHint="man portrait"
            specialty="Facharzt für Chirurgie"
            qualifications={[
                'Viszeralchirurgie',
                'Transplantationschirurgie',
            ]}
            vita={`
                <p>
                    Prof. Schemmer war von 2013 bis 2022 Direktor der Universitätsklinik für Viszerale Transplantationschirurgie am Inselspital in Bern.
                </p>
                <br>
                <p>
                    Seit 2022 ist er Chefarzt für Chirurgie an der Universitätsklinik für Allgemein-, Viszeral- und Transplantationschirurgie in Graz.
                </p>
                <br>
                <p>
                    Seine Patienten in der Schweiz behandelt er weiterhin, neu aber wohnortnah und unkompliziert auch hier im Praxiszentrum im Ring, wo er eine regelmässige Sprechstunde abhält.
                </p>
            `}
        >
             <Image
                src="/images/schemmer-worni-logo.png"
                alt="Schemmer & Worni Logo"
                width={390}
                height={130}
                className="h-auto w-full max-w-[390px] object-contain"
                data-ai-hint="partner logo"
            />
        </DoctorCard>
    );
}
