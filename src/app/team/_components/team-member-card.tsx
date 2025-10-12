
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LanguageFlags } from '@/app/admin/dashboard/team/doctors/_components/language-flags';

interface TeamMemberCardProps {
  name: string;
  role: string;
  role2?: string;
  imageUrl: string;
  imageHint: string;
  languages?: string[];
  backsideContent?: React.ReactNode;
}

export function TeamMemberCard({ name, role, role2, imageUrl, imageHint, languages, backsideContent }: TeamMemberCardProps) {
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-lg border bg-background text-card-foreground shadow-xl">
        <div className="flex h-full flex-col p-6">
            <div className={cn("relative w-full overflow-hidden rounded-md aspect-[2/3]")}>
                <Image
                    src={imageUrl}
                    alt={`Portrait von ${name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    data-ai-hint={imageHint}
                />
            </div>
            <div className="flex-grow pt-6 text-center">
                <h4 className="text-xl font-bold text-primary">{name}</h4>
                <p className="mt-2 text-base font-bold text-muted-foreground">{role}</p>
                {role2 && <p className="mt-1 text-base text-muted-foreground">{role2}</p>}
            </div>
            <div className="flex h-8 items-end justify-end pt-4">
               {languages && <LanguageFlags languages={languages} />}
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
