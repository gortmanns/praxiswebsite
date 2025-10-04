import { cn } from "@/lib/utils";

export function OrthozentrumLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 55.5"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-card-foreground", className)}
      aria-label="orthozentrum-bern Logo"
    >
      <g>
        <path
          d="M46.7 7.8S44.5 3.9 40 3.9H20.8s-4.4 0-6.7 3.9L4.6 24.4s-2.2 3.9 0 7.7l9.6 16.6s2.2 3.9 6.7 3.9H40s4.4 0 6.7-3.9l9.6-16.6s2.2-3.9 0-7.7L46.7 7.8z"
          fill="none"
          stroke="#588791"
          strokeWidth="1.639"
        ></path>
        <path
          d="M24 52.4c-1.1-3.4-3.1-8-5.1-11.1-.6-.9-1-1.9-1.2-2.9-.3-1.8.9-3.2 2.9-3.5 6.5-1 13-1 19.5 0 2.2.3 3.4 2 2.9 4-.2.7-.5 1.4-1 2.1-2 3.1-4.1 8-5.2 11.4"
          fill="none"
          stroke="#588791"
          strokeWidth="1.639"
        ></path>
        <path
          d="M35.4 4.4c.4 3.8 1.7 8 4.1 11.3 1.8 2.4 3.1 2.6 3.7 5.6.5 2.5-.3 6.9-2.3 7.9-2.3 1.2-4.6 1-6.8-.4-1.4-1.2-2.4-1.4-3.6-1.3-1.3 0-2.3.2-3.6 1.3-2.2 1.5-4.4 1.6-6.8.4-2-1-2.8-5.3-2.3-7.9.6-3 1.9-3.2 3.7-5.6 2.4-3.2 3.7-7.4 4.1-11.3"
          fill="none"
          stroke="#588791"
          strokeWidth="1.639"
        ></path>
      </g>
      <text
        x="70"
        y="32"
        fontFamily="Montserrat, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="#588791"
        dominantBaseline="middle"
      >
        orthozentrum-bern
      </text>
    </svg>
  );
}
