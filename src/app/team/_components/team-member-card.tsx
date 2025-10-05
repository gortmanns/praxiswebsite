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
    <div className="group relative w-full">
        <Card className="h-full overflow-hidden">
            <CardContent className="flex h-full flex-col p-6 transition-opacity duration-300 group-hover:opacity-10">
                <div className="relative w-full aspect-[2/3] rounded-md overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={`Portrait von ${name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={imageHint}
                    />
                </div>
                <div className="pt-6 text-center">
                    <h4 className="text-xl font-bold text-primary">{name}</h4>
                    <p className="mt-2 text-base font-bold text-muted-foreground">{role}</p>
                    {role2 && <p className="mt-1 text-base text-muted-foreground">{role2}</p>}
                </div>
            </CardContent>
            {backsideContent && (
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-auto bg-accent p-6 text-left text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="text-center text-lg">
                        {backsideContent}
                    </div>
                </div>
            )}
        </Card>
    </div>
  );
}
