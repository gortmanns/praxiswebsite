
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const EditableDoctorCard = () => (
    <div 
        className="mx-auto max-w-5xl" 
        style={{ 'containerType': 'inline-size' } as React.CSSProperties}
    >
        <div
            className="group relative w-full"
            style={{ aspectRatio: '1000 / 495' }}
        >
            <Card className="absolute inset-0 overflow-hidden">
                <CardContent className="h-full p-6 transition-opacity duration-300">
                    <div className="grid h-full grid-cols-3 items-center gap-[4.5%]">
                        <div className="relative col-span-1 h-full w-full">
                            <Image
                                src="/images/team/Ortmanns.jpg"
                                alt="Portrait von G. Ortmanns"
                                data-ai-hint="doctor portrait"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                                <p className="text-[2.2cqw] text-primary">Dipl. med.</p>
                                <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                                G. Ortmanns
                                </h4>
                                <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                                    <p className="font-bold">Praktischer Arzt</p>
                                    <p>Master of Public Health (UNSW)</p>
                                    <p>Master of Health Management (UNSW)</p>
                                </div>
                                <p className="mt-[2.5cqw] text-[1.6cqw] italic">
                                    <span className="whitespace-nowrap">Medizinische und Administrative Leitung</span>{' '}
                                    <span className="whitespace-nowrap">Praxiszentrum im Ring</span>{' '}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="absolute inset-0 flex translate-y-full flex-col items-start justify-start overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                    <ul className="space-y-1.5 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                        <li>Medizinstudium in Bonn (Deutschland) und Hobart (Australien)</li>
                        <li>Masterstudium Public Health und Health Management in Sydney (Australien)</li>
                        <li>Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor</li>
                        <li className="font-bold text-primary mt-6 mb-4">
                            Projektmanagement im Gesundheitswesen in Europa und Australien
                            <div className="mt-1 pl-9 text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug text-background/80">
                                <h5 className="mb-1 tracking-wide text-background/90">Meilensteine</h5>
                                <ul className="list-disc space-y-px pl-5 font-normal">
                                    <li>Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)</li>
                                    <li>Verantwortlicher Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</li>
                                    <li>Direktor der Memory-Strategie (Elektronisches Medikamenten-Management und Elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</li>
                                </ul>
                            </div>
                        </li>
                        <li className="font-bold text-primary mt-6 mb-4">
                            Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz
                            <div className="mt-1 pl-9 text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug text-background/80">
                                <ul className="list-disc space-y-px pl-5 font-normal">
                                    <li>Universitätsspital Basel (USB)</li>
                                    <li>Kantonsspital Baselland (KSBL)</li>
                                    <li>Kantonsspital Winterthur (KSW)</li>
                                    <li>Kantonsspital Wil (SRFT)</li>
                                    <li>Hausarztpraxis in Winterthur</li>
                                </ul>
                            </div>
                        </li>
                        <li className='mt-6 mb-4'>Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)</li>
                        <li className='mt-6 mb-4'>Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)</li>
                    </ul>
                </div>
            </Card>
        </div>
    </div>
);
