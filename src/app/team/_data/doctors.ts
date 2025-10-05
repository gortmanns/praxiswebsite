export type Doctor = {
  name: string;
  title: string;
  specialties: string[];
  position?: string;
  imageUrl: string;
  cv: {
    point: string;
    isList?: boolean;
    subPointsTitle?: string;
    subPoints?: string[];
  }[];
};

export const doctors: Doctor[] = [
  {
    name: 'G. Ortmanns',
    title: 'Dipl. med.',
    specialties: [
      'Praktischer Arzt',
      'Master of Public Health (UNSW)',
      'Master of Health Management (UNSW)',
    ],
    position: 'Medizinische und Administrative Leitung\nPraxiszentrum im Ring',
    imageUrl: '/images/team/Ortmanns.jpg',
    cv: [
      {
        point: 'Medizinstudium in Bonn (Deutschland) und Hobart (Australien)',
      },
      {
        point: 'Masterstudium Public Health und Health Management in Sydney (Australien)',
      },
      {
        point: 'Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor',
      },
      {
        point: 'Projektmanagement im Gesundheitswesen in Europa und Australien',
        isList: true,
        subPointsTitle: 'Meilensteine',
        subPoints: [
            'Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)',
            'Verantwortlicher Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien',
            'Direktor der Memory-Strategie (Elektronisches Medikamenten-Management und Elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien',
        ],
      },
      {
        point: 'Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz',
        isList: true,
        subPoints: [
            'Universitätsspital Basel (USB)',
            'Kantonsspital Baselland (KSBL)',
            'Kantonsspital Winterthur (KSW)',
            'Kantonsspital Wil (SRFT)',
            'Hausarztpraxis in Winterthur',
        ],
      },
      {
        point: 'Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)',
      },
      {
        point: 'Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)',
      },
    ],
  },
  {
    name: 'P. Schemmer',
    title: 'Prof. Dr. med. Dr. h. c.',
    specialties: [
        'Facharzt für Allgemein- und Viszeralchirurgie',
    ],
    position: 'Schemmer • Worni\nKlinik für Allgemein- und Viszeralchirurgie',
    imageUrl: '/images/team/Ortmanns.jpg',
    cv: [
        {
            point: 'Facharzt für Allgemein- und Viszeralchirurgie mit umfassender Erfahrung in leitenden Positionen.',
        },
        {
            point: 'Spezialisiert auf komplexe chirurgische Eingriffe und Lebertransplantationen.',
        },
        {
            point: 'Umfangreiche wissenschaftliche Tätigkeit und zahlreiche Publikationen.',
        },
        {
            point: 'Ordinarius für Allgemein-, Viszeral- und Transplantationschirurgie an der Medizinischen Fakultät der Universität Bern (2016-2020).',
        },
        {
            point: 'Direktor der Universitätsklinik für Viszerale Chirurgie und Medizin, Inselspital Bern (2016-2020).',
        }
    ],
  },
];
