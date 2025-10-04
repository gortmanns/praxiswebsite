import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Fallback for safety, though it should always be found
    return {
      id: 'not-found',
      description: 'Image not found',
      imageUrl: 'https://picsum.photos/seed/notfound/400/400',
      imageHint: 'placeholder',
    }
  }
  return image;
};

export const doctors = [
  {
    name: 'Dr. med. Anna Meier',
    specialty: 'Allgemeine Innere Medizin FMH',
    bio: 'Dr. Meier hat langjährige Erfahrung in der Hausarztmedizin und legt Wert auf eine persönliche und umfassende Betreuung ihrer Patienten.',
    image: getImage('dr-anna-meier'),
  },
  {
    name: 'Dr. med. Lars Weber',
    specialty: 'Facharzt für Kardiologie FMH',
    bio: 'Dr. Weber ist spezialisiert auf Herzerkrankungen und bietet modernste diagnostische und therapeutische Verfahren an.',
    image: getImage('dr-lars-weber'),
  },
  {
    name: 'Dr. med. Sophie Huber',
    specialty: 'Fachärztin für Gynäkologie',
    bio: 'Dr. Huber begleitet Frauen in allen Lebensphasen mit Einfühlungsvermögen und hoher fachlicher Kompetenz.',
    image: getImage('dr-sophie-huber'),
  },
    {
    name: 'Dr. med. Agnieszka Slezak',
    specialty: 'Fachärztin für Neurologie',
    bio: '',
    image: getImage('dr-agnieszka-slezak'),
  },
];

export type Doctor = typeof doctors[0];
