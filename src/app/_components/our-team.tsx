import { doctors, type Doctor } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const fallbackInitials = doctor.name.split(' ').map(n => n[0]).join('');
  return (
    <Card className="flex flex-col text-center transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex-grow">
        <Avatar className="mx-auto h-24 w-24 border-4 border-primary/20">
          <AvatarImage src={doctor.image.imageUrl} alt={doctor.name} data-ai-hint={doctor.image.imageHint} />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </Avatar>
        <CardTitle className="pt-4">{doctor.name}</CardTitle>
        <CardDescription className="text-primary">{doctor.specialty}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{doctor.bio}</p>
      </CardContent>
    </Card>
  );
}

export function OurTeam() {
  return (
    <section id="team" className="py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Spezialisten im Praxiszentrum
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Unser engagiertes Team von erfahrenen Ärzten ist hier, um Ihnen die beste Betreuung zu bieten.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}
