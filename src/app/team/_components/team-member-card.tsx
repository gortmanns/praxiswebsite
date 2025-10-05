import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
    <div className="group relative w-full" style={{ aspectRatio: '2 / 3' }}>
        <Card className="absolute inset-0 flex flex-col overflow-hidden text-center transition-all">
            <div className="relative h-full w-full transition-opacity duration-300 group-hover:opacity-10">
                <CardContent className="flex h-full flex-col p-6">
                    <div className="relative flex-grow overflow-hidden rounded-md">
                        <Image
                            src={imageUrl}
                            alt={`Portrait von ${name}`}
                            fill
                            className="object-contain"
                            data-ai-hint={imageHint}
                        />
                    </div>
                    <CardHeader className="p-0 pt-4">
                        <h4 className="text-xl font-bold text-primary">{name}</h4>
                    </CardHeader>
                    <CardContent className="flex-grow-0 p-0 pt-2">
                        <p className="text-base font-bold text-muted-foreground">{role}</p>
                        {role2 && <p className="text-base text-muted-foreground">{role2}</p>}
                    </CardContent>
                </CardContent>
            </div>
            {backsideContent && (
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-auto bg-accent p-6 text-left text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {backsideContent}
                </div>
            )}
        </Card>
    </div>
  );
}