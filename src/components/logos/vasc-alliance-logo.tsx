
import { cn } from "@/lib/utils";
import Image from "next/image";

export function VascAllianceLogo({ className }: { className?: string }) {
  return (
    <Image
        src="/images/VASC-Alliance-Logo.png"
        alt="VASC Alliance Logo"
        width={495}
        height={165}
        className={cn("h-auto w-full object-contain object-left", className)}
        data-ai-hint="partner logo"
    />
  );
}
