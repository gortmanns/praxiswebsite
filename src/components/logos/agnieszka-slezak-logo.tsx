
import { cn } from "@/lib/utils";

export function AgnieszkaSlezakLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 150"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-special-green", className)}
      aria-label="Agnieszka Slezak Logo"
    >
      <text
        x="5"
        y="70"
        fontFamily="Montserrat, sans-serif"
        fontSize="36"
        fontWeight="bold"
        fill="currentColor"
      >
        Dr. med. Agnieszka Slezak
      </text>
      <text
        x="250"
        y="110"
        fontFamily="Montserrat, sans-serif"
        fontSize="24"
        fontWeight="normal"
        fill="hsl(var(--foreground))"
        textAnchor="middle"
      >
        Fachärztin für Neurologie
      </text>
    </svg>
  );
}
