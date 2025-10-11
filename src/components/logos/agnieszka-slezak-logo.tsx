
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
        y="60"
        fontFamily="Montserrat, sans-serif"
        fontSize="38"
        fontWeight="bold"
        fill="currentColor"
      >
        Dr. med. Agnieszka Slezak
      </text>
      <text
        x="5"
        y="95"
        fontFamily="Montserrat, sans-serif"
        fontSize="24"
        fontWeight="normal"
        fill="hsl(var(--foreground))"
      >
        FMH Neurologie
      </text>
      <text
        x="5"
        y="120"
        fontFamily="Montserrat, sans-serif"
        fontSize="18"
        fontWeight="normal"
        fill="hsl(var(--muted-foreground))"
      >
        Praxis für Neurologie und Schmerztherapie
      </text>
    </svg>
  );
}
