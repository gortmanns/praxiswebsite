import { cn } from "@/lib/utils";
import Image from "next/image";

export function SchemmerWorniLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-auto aspect-[300/100]", className)}>
        <Image 
            src="/images/schemmer-worni-logo.png"
            alt="Schemmer & Worni Logo"
            fill
            className="object-contain"
        />
    </div>
  );
}
