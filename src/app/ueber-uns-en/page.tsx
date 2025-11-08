
'use client';

import { Card, CardContent } from '@/components/ui/card';
import ClientLayout from '../_components/ClientLayout';

export default function UeberUnsEnPage() {
  return (
    <ClientLayout>
      <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                  ABOUT US
              </h2>
          </div>
          <div className="mx-auto mt-16 max-w-4xl space-y-8 text-lg text-foreground/80">
              <Card>
                  <CardContent className="space-y-6 p-8">
                      <p>When the Kappelenring development was brand new in the 1970s, Dr. Segginger opened a general practice here on the ground floor of Kappelenring 6. Next door, Dr. Debrunner's dental practice already existed.</p>
                      <p>After many years, Dr. Segginger entered a well-deserved retirement at the end of 2022, and I took over the practice from him. Since Dr. Debrunner also retired shortly thereafter without a successor for his practice, a unique opportunity arose to take over these premises, connect them, and further develop the general practice into a new, modern medical center.</p>
                      
                      <h3 className="pt-4 font-headline text-2xl font-bold text-primary">What has happened since then?</h3>
                      <ul className="list-disc space-y-4 pl-6">
                          <li>The old premises of the dental practice were completely renovated and connected to the general practice through a wall opening.</li>
                          <li>The waiting area was moved to the new premises and completely redesigned to be open and friendly.</li>
                          <li>A monitor in the waiting area now provides current information on health-related topics and shortens the perceived waiting time.</li>
                          <li>A separate, smaller waiting area for infectious patients was created to prevent infections in the waiting area as much as possible.</li>
                          <li>The old waiting area was converted into an intervention room for minor surgical procedures and wound care.</li>
                          <li>All practice windows received a new, modern privacy screen in the form of foil, so the old, unhygienic curtains could be removed.</li>
                          <li>The former small workplace for medical practice assistants in the laboratory was replaced by a complete office space in the new part of the practice.</li>
                          <li>At the same time, a lounge area for the staff was created there.</li>
                          <li>The old furnishing of Dr. Segginger's consultation room was renewed and made brighter, more modern, and friendlier.</li>
                          <li>The laboratory equipment was largely renewed and brought up to the latest state of the art.</li>
                          <li>The entire practice IT, including the telephone system, was completely renewed and updated to the latest technology.</li>
                          <li>In the new practice area, two new consultation rooms have been created and a new reception area has been designed. The old reception will then only be used for dispensing medication.</li>
                          <li>The X-ray system was extensively renewed and now operates completely digitally. X-ray images can now be viewed from any PC in the practice.</li>
                          <li>To make the whole effort worthwhile and to justify the name of a medical center, collaborations have been established with various specialists who now regularly offer appointments at our medical center, saving our patients many trips to the city of Bern.</li>
                          <li>A nutritionist regularly holds appointments in our premises, so the journeys for our patients are now short for this service as well.</li>
                      </ul>

                      <h3 className="pt-4 font-headline text-2xl font-bold text-primary">What remains to be done?</h3>
                      <ul className="list-disc space-y-4 pl-6">
                          <li>The expansion of the last consultation room in the new practice area is not yet complete.</li>
                          <li>We are constantly looking for more specialists who would like to contribute to improving medical care in Hinterkappelen and offer appointments at our PRAXISZENTRUM IM RING.</li>
                          <li>We are still looking for more general practitioners who would like to work here full-time or part-time.</li>
                          <li>Once the larger staff size allows, we will put the newly created reception area into operation.</li>
                      </ul>

                      <h3 className="pt-4 font-headline text-2xl font-bold text-primary">What is our vision?</h3>
                      <ul className="list-disc space-y-4 pl-6">
                          <li>In the long term, we want to attract so many general practitioners to work here at the medical center that we can be open continuously from Monday to Saturday from 8 a.m. to 8 p.m.</li>
                          <li>We want to be able to offer simple emergency care for the small things that go wrong in everyday life at any time during opening hours without an appointment, so that our patients only have to go to the city of Bern for more serious emergencies.</li>
                          <li>We want to attract more specialists to offer their consultations at our medical center. Ideally, we will eventually cover almost the entire medical spectrum, at least as far as the technical possibilities and space at our facility allow.</li>
                      </ul>
                  </CardContent>
              </Card>
          </div>
      </div>
    </ClientLayout>
  );
}
