import { cn } from '@/lib/utils';

export function AgnieszkaSlezakLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 170 35"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Dr. med. Agnieszka Slezak - Fachärztin für Neurologie"
    >
      <text
        x="50%"
        y="12"
        fontFamily="Open Sans, sans-serif"
        fontSize="12"
        fontWeight="bold"
        fill="#358392"
        textAnchor="middle"
      >
        Dr. med. Agnieszka Slezak
      </text>
      <text
        x="50%"
        y="28"
        fontFamily="Open Sans, sans-serif"
        fontSize="8"
        fill="hsl(var(--muted-foreground))"
        textAnchor="middle"
      >
        Fachärztin für Neurologie
      </text>
    </svg>
  );
}
