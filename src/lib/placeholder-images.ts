import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Replace the original http URLs with local paths for specific images
const updatedImages = data.placeholderImages.map(img => {
  if (img.id === 'luftbild') {
    return { ...img, imageUrl: '/images/luftbild.jpg' };
  } else if (img.id === 'rettungswagen') {
    return { ...img, imageUrl: '/images/notfall/rtw-bern.jpg' };
  } else if (img.id === 'medphone-logo') {
    return { ...img, imageUrl: '/images/notfall/medphone_logo.png' };
  }
  return img;
});


export const PlaceHolderImages: ImagePlaceholder[] = updatedImages;
