import { cn } from "@/lib/utils";

export function MedphoneLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-[#00395a] fill-current", className)}
      aria-label="Medphone Logo"
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="60"
      >
        <tspan fontWeight="normal">MED</tspan>
        <tspan fontWeight="bold">PHONE</tspan>
      </text>
    </svg>
  );
}
