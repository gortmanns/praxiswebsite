import { cn } from '@/lib/utils';

export function AgnieszkaSlezakLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 50"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Dr. med. Agnieszka Slezak - Fachärztin für Neurologie"
    >
      <text
        x="150"
        y="22"
        fontFamily="Open Sans, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="#358392"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Dr. med. Agnieszka Slezak
      </text>
      <text
        x="150"
        y="40"
        fontFamily="Open Sans, sans-serif"
        fontSize="10"
        fill="hsl(var(--muted-foreground))"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Fachärztin für Neurologie
      </text>
    </svg>
  );
}
