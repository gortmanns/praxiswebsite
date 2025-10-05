import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface TeamMemberCardProps {
  name: string;
  role: string;
  role2?: string;
  imageUrl: string;
  imageHint: string;
  backsideContent?: React.ReactNode;
}

export function TeamMemberCard({ name, role, role2, imageUrl, imageHint, backsideContent }: TeamMemberCardProps) {
  return (
    <div className="group relative w-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
                <Image
                    src={imageUrl}
                    alt={`Portrait von ${name}`}
                    fill
                    className="object-contain"
                    data-ai-hint={imageHint}
                />
            </div>
            <div className="pt-6 text-center">
                <h4 className="text-xl font-bold text-primary">{name}</h4>
                <p className="mt-2 text-base font-bold text-muted-foreground">{role}</p>
                {role2 && <p className="mt-1 text-base text-muted-foreground">{role2}</p>}
            </div>
        </div>
        {backsideContent && (
            <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-center overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                <div className="text-center text-lg">
                    {backsideContent}
                </div>
            </div>
        )}
    </div>
  );
}
