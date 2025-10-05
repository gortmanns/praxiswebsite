import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full h-[400px]">
      <Image
        src="/images/luftbild.jpg"
        alt="Aerial view of the practice location."
        fill
        className="w-full h-auto object-cover"
        priority
      />
    </section>
  );
}
