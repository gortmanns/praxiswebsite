
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SchemmerWorniLogo({ className }: { className?: string }) {
  return (
    <Image
        src="/images/schemmer-worni-logo.png"
        alt="Schemmer & Worni Logo"
        width={800}
        height={268}
        className={cn("h-auto w-full max-w-[400px] object-contain", className)}
        data-ai-hint="partner logo"
    />
  );
}
