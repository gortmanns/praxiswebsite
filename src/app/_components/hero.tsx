import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full h-[400px]">
      <Image
        src="https://picsum.photos/seed/hero/1200/400"
        alt="Aerial view of the practice location."
        data-ai-hint="aerial clinic"
        fill
        className="w-full h-auto object-cover"
        priority
      />
    </section>
  );
}
