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
    <div className="w-full" style={{ 'containerType': 'inline-size' } as React.CSSProperties}>
      <Card className="flex flex-col overflow-hidden text-center transition-all">
          <div className="relative w-full" style={{ aspectRatio: '2 / 3' }}>
              <Image
                  src={imageUrl}
                  alt={`Portrait von ${name}`}
                  fill
                  className="object-cover"
                  data-ai-hint={imageHint}
              />
          </div>
          <div className="p-4">
              <h4 className="text-xl font-bold text-primary">{name}</h4>
              <p className="mt-2 text-base font-bold text-muted-foreground">{role}</p>
              {role2 && <p className="text-base text-muted-foreground">{role2}</p>}
          </div>
      </Card>
    </div>
  );
}
