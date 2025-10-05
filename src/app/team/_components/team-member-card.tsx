import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
  imageHint: string;
}

export function TeamMemberCard({ name, role, imageUrl, imageHint }: TeamMemberCardProps) {
  return (
    <Card className="flex flex-col text-center transition-all hover:-translate-y-1 hover:shadow-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
          <Image
            src={imageUrl}
            alt={`Portrait von ${name}`}
            fill
            className="object-contain"
            data-ai-hint={imageHint}
          />
        </div>
      </CardContent>
      <div className="flex flex-col px-6 pb-6">
        <CardHeader className="p-0">
          <h4 className="text-xl font-bold text-primary">{name}</h4>
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <p className="text-muted-foreground">{role}</p>
        </CardContent>
      </div>
    </Card>
  );
}