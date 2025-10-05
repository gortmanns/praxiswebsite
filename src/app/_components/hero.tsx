import Image from 'next/image';

export function Hero() {

  return (
    <section className="relative w-full">
        <Image
          src="/images/luftbild.jpg"
          alt="Aerial view of the practice location."
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          priority
          data-ai-hint="aerial clinic"
        />
    </section>
  );
}
