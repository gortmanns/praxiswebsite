import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TeamMemberCardProps {
  name: string;
  role: string;
  role2?: string;
  imageUrl: string;
  imageHint: string;
}

export function TeamMemberCard({ name, role, role2, imageUrl, imageHint }: TeamMemberCardProps) {
  return (
    <Card className="flex flex-col text-center transition-all hover:-translate-y-1 hover:shadow-xl">
        <CardContent className="p-6">
            <div className="relative w-full overflow-hidden rounded-md aspect-[2/3]">
                <Image
                    src={imageUrl}
                    alt={`Portrait von ${name}`}
                    fill
                    className="object-contain"
                    data-ai-hint={imageHint}
                />
            </div>
        </CardContent>
        <div className="flex flex-col px-6 pb-6 pt-0">
            <CardHeader className="p-0 pt-4">
            <h4 className="text-xl font-bold text-primary">{name}</h4>
            </CardHeader>
            <CardContent className="p-0 pt-2">
                <p className="text-base text-muted-foreground font-bold">{role}</p>
                {role2 && <p className="text-base text-muted-foreground">{role2}</p>}
            </CardContent>
      </div>
    </Card>
  );
}
