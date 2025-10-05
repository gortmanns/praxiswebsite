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
    <Card className="flex flex-col items-center p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-40 w-40 overflow-hidden rounded-full">
        <Image
          src={imageUrl}
          alt={`Portrait von ${name}`}
          fill
          className="object-cover"
          data-ai-hint={imageHint}
        />
      </div>
      <CardHeader className="p-4">
        <h4 className="text-xl font-bold text-primary">{name}</h4>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-muted-foreground">{role}</p>
      </CardContent>
    </Card>
  );
}
