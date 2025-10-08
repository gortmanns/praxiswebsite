import { Doctor } from './doctor-card';

export const doctors: Doctor[] = [
  {
    id: 'ortmanns',
    title: 'Dipl. med.',
    name: 'G. Ortmanns',
    imageUrl: '/images/team/Ortmanns.jpg',
    imageHint: 'doctor portrait',
    specialty: 'Praktischer Arzt',
    qualifications: ['Master of Public Health (UNSW)', 'Master of Health Management (UNSW)'],
    additionalInfo: '(Ärztliche und administrative Leitung) Praxiszentrum im Ring',
    backsideContent: `
        <p>Medizinstudium in Bonn und Hobart (Australien)</p>
        <p>Masterstudium Public Health und Health Management in Sydney (Australien)</p>
        <p>Projektmanagement im Gesundheitswesen in Europa und Australien</p>
        <div>
            <p>Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor</p>
            <ul style="color: rgba(255,255,255,0.8);">
                <li>Leiter Klinische Entwicklung und Analytik für DxCG Gesundheitsanalytik GmbH (Deutschland)</li>
                <li>Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</li>
                <li>Direktor der Memory-Strategie (elektronisches Medikamenten-Management und elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</li>
            </ul>
        </div>
        <br/>
        <div>
            <p>Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz:</p>
            <ul style="color: rgba(255,255,255,0.8);">
                <li>Universitätsspital Basel (USB)</li>
                <li>Kantonsspital Baselland (KSBL)</li>
                <li>Kantonsspital Winterthur (KSW)</li>
                <li>Kantonsspital Wil (SRFT)</li>
                <li>Hausarztpraxis in Winterthur</li>
            </ul>
        </div>
        <br/>
        <p>Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Klinik für Pneumologie)</p>
        <p>Leitung <span class="whitespace-nowrap">Praxiszentrum im Ring</span> (Ärztliche und administrative Leitung)</p>
        <p>Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)</p>
    `,
  },
  {
    id: 'schemmer',
    title: 'Prof. Dr. med. Dr. h. c.',
    name: 'P. Schemmer',
    imageUrl: '/images/team/Prof.Schemmer.jpg',
    imageHint: 'doctor portrait',
    specialty: 'Facharzt für Allgemein- und Viszeralchirurgie',
    partnerLogo: 'schemmer-worni',
    backsideContent: `
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">KLEINCHIRURGISCHE EINGRIFFE KÖNNEN DIREKT IM <span class="whitespace-nowrap">PRAXISZENTRUM IM RING</span> ERFOLGEN</h4>
        <br/>
        <div>
            <h4 style="color: hsl(var(--primary)); font-weight: bold;">GROSSE CHIRURGISCHE EINGRIFFE WERDEN IN ENGER KOOPERATION ZWISCHEN CHIRURG UND HAUSARZT DURCHGEFÜHRT</h4>
            <p style="color: white;">Vorbesprechung und Planung des Eingriffs erfolgen im <span class="whitespace-nowrap">PRAXISZENTRUM IM RING</span></p>
            <p style="color: white;">Allenfalls notwendige Abklärungen vor dem Eingriff finden ebenfalls im Praxiszentrum statt oder – falls nötig – per Überweisung an weitere Spezialisten</p>
            <p style="color: white;">Die Operation selbst findet in einer der Partnerkliniken in der Stadt Bern statt</p>
            <ul style="color: rgba(255,255,255,0.8);">
                <li>Hirslanden</li>
                <li>Lindenhof-Spital</li>
                <li>Siloah-Spital</li>
            </ul>
            <p style="color: white;">Die Nachbetreuung (z. B. Fadenentfernung und Schmerzbehandlung) findet wieder im <span class="whitespace-nowrap">PRAXISZENTRUM IM RING</span> statt</p>
        </div>
    `,
  },
  {
    id: 'rosenov',
    title: 'Dr. med.',
    name: 'A. Rosenov',
    imageUrl: '/images/team/Dr.Rosenov.jpg',
    imageHint: 'doctor portrait',
    specialty: 'Facharzt für Angiologie',
    partnerLogo: 'vasc-alliance',
    backsideContent: `
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">UNTERSUCHUNGEN DER VENEN, ARTERIEN UND LYMPHGEFÄSSE</h4>
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">ABKLÄRUNG VON EREKTIONSSTÖRUNGEN</h4>
        <br/>
        <p>Viele Untersuchungen und Abklärungen können direkt im <span class="whitespace-nowrap">PRAXISZENTRUM IM RING</span> durchgeführt werden.</p>
        <p>Sind zusätzliche Spezialuntersuchungen oder weiterführende Eingriffe nötig, die mit den Geräten im Praxiszentrum nicht durchführbar sind, wird ein Folgetermin in den Räumlichkeiten der VASC ALLIANCE am Beau-site Spital in Bern vereinbart.</p>
    `,
  },
  {
    id: 'herschel',
    title: 'Dr. med.',
    name: 'R. Herschel',
    imageUrl: '/images/team/Dr.Herschel.jpg',
    imageHint: 'doctor portrait',
    specialty: 'Facharzt für Orthopädische Chirurgie und Traumatologie des Bewegungsapparates',
    partnerLogo: 'orthozentrum',
    backsideContent: `
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">ALLGEMEINE ORTHOPÄDIE</h4>
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">SPEZIALGEBIET HÜFT- UND KNIEGELENKE</h4>
        <br/>
        <p>Röntgenuntersuchungen, Konsultationen und klinische Untersuchungen finden direkt vor Ort im <span class="whitespace-nowrap">PRAXISZENTRUM IM RING</span> statt.</p>
        <p>Auch Gelenkinfiltrationen, z. B. bei Schmerzen, können zum Teil direkt vor Ort durchgeführt werden.</p>
        <p>Allenfalls nötige Operationen werden im gut erreichbaren Lindenhof-Spital durchgeführt.</p>
    `,
  },
  {
    id: 'slezak',
    title: 'Dr. med.',
    name: 'A. Slezak',
    imageUrl: '/images/team/Dr.Slezak.jpg',
    imageHint: 'doctor portrait',
    specialty: 'Fachärztin für Neurologie',
    partnerLogo: 'slezak',
    backsideContent: `
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">ALLGEMEINE NEUROLOGIE</h4>
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">VASKULÄRE ERKRANKUNGEN</h4>
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">EPILEPSIE</h4>
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">BEWEGUNGSSTÖRUNGEN (Schwerpunkt Parkinsonsyndrome)</h4>
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">KOPFSCHMERZEN UND MIGRÄNE</h4>
        <h4 style="color: hsl(var(--primary)); font-weight: bold;">NEUROREHABILITATION</h4>
        <br/>
        <p>Viele Untersuchungen können direkt im <span class="whitespace-nowrap">PRAXISZENTRUM IM RING</span> durchgeführt werden.</p>
        <p>Wenn spezielle Untersuchungen wie z. B. die Bestimmung der Nervenleitgeschwindigkeit Geräte erfordern, die im <span class="whitespace-nowrap">PRAXISZENTRUM IM RING</span> nicht zur Verfügung stehen, dann finden diese in den Räumlichkeiten an der Thunstrasse 95 in Bern statt.</p>
    `,
  },
];
