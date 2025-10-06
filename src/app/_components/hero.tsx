import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full aspect-[1511/721]">
      <Image
        src="/images/luftbild.jpg"
        alt="Aerial view of the practice location."
        data-ai-hint="aerial clinic"
        fill
        className="h-auto w-full object-cover"
        priority
      />
    </section>
  );
}
