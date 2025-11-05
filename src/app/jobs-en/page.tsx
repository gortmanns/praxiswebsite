import PageLayout from '../page-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ObfuscatedLink } from '@/components/ui/obfuscated-link';

export default function JobsEnPage() {
  return (
    <PageLayout>
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                    JOBS & CAREER
                </h2>
            </div>
            <div className="mx-auto mt-16 max-w-4xl space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl font-bold text-primary">Shape the future of medical care with us</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-lg text-foreground/80">
                        <p>Our vision is to develop the Praxiszentrum im Ring into a comprehensive health center that offers our patients integrated and local care at the highest level. A central component of this vision is close cooperation with qualified specialists from various fields.</p>

                        <div className="space-y-4 rounded-md border border-border bg-card p-6">
                            <h4 className="font-headline text-xl font-bold text-primary">Cooperation offer for specialists</h4>
                            <p className="text-base">Are you a specialist physician looking to expand your patient base or seeking a flexible way to offer your expertise in a modern and collegial environment? We cordially invite you to become part of our growing network.</p>
                            <p className="text-base">We offer you the opportunity to use our fully equipped and modern practice facilities for your own consultation hours. The cooperation possibilities are extremely flexible and adapt to your needs – from a single consultation per month to several appointments per week, everything is conceivable.</p>
                        </div>
                        
                        <div className="space-y-4">
                            <h4 className="font-headline text-xl font-bold text-primary">Interested in a collaboration?</h4>
                            <p>If you are interested in improving medical care in the region together with us and enriching our range of services, we look forward to hearing from you. Let's explore the possibilities of a partnership in a non-binding conversation.</p>
                            <p className="pt-2">Contact us for more information via e-mail:</p>
                            <ObfuscatedLink
                                user="empfang"
                                domain="praxiszentrum-im-ring.ch"
                                className="font-bold text-primary hover:underline"
                            >
                                empfang@praxiszentrum-im-ring.ch
                            </ObfuscatedLink>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl font-bold text-primary">Open Positions & Unsolicited Applications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-lg text-foreground/80">
                        <div className="space-y-4 rounded-md border border-border bg-card p-6">
                            <h4 className="font-headline text-xl font-bold text-primary">General Practitioner (10-100%)</h4>
                            <p className="text-base">To strengthen our core team, we are looking for flexible general practitioners who value self-determined work. We offer you the freedom to design your workload according to your wishes – whether you want to work just a few hours or full-time. Our model is ideal for re-entering the workforce after a break for children or for optimally balancing work and family.</p>
                        </div>

                         <div className="space-y-4">
                            <p>As we gain new medical staff and cooperation partners, the need for qualified medical practice assistants also increases. Unsolicited applications are therefore always welcome.</p>
                            
                            <p className="pt-2">If you are interested, we look forward to receiving your unsolicited application at:</p>
                             <ObfuscatedLink
                                user="empfang"
                                domain="praxiszentrum-im-ring.ch"
                                className="font-bold text-primary hover:underline"
                            >
                                empfang@praxiszentrum-im-ring.ch
                            </ObfuscatedLink>
                        </div>

                        <p className="pt-4">We treat all applications with strict confidentiality.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </PageLayout>
  );
}
