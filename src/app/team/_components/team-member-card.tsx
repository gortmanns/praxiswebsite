import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface TeamMemberCardProps {
  name: string;
  role: string;
  role2?: string;
  imageUrl: string;
  imageHint: string;
}

export function TeamMemberCard({ name, role, role2, imageUrl, imageHint }: TeamMemberCardProps) {
  return (
    <div className="w-full">
      <Card className="h-full">
          <CardContent className="flex h-full flex-col p-6">
              <div className="relative w-full aspect-[2/3]">
                  <Image
                      src={imageUrl}
                      alt={`Portrait von ${name}`}
                      fill
                      className="object-cover rounded-md"
                      data-ai-hint={imageHint}
                  />
              </div>
              <div className="pt-6 text-center">
                  <h4 className="text-xl font-bold text-primary">{name}</h4>
                  <p className="mt-2 text-base font-bold text-muted-foreground">{role}</p>
                  {role2 && <p className="text-base text-muted-foreground">{role2}</p>}
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
