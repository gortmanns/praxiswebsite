import PageLayout from '../page-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ObfuscatedLink } from '@/components/ui/obfuscated-link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function ImpressumEnPage() {
  return (
    <PageLayout>
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                  IMPRINT
              </h2>
          </div>
          <div className="mt-16 space-y-8">
            <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertTitle className="font-bold">Disclaimer</AlertTitle>
                <AlertDescription>
                    This is an English translation for informational purposes only. The legally binding version is the original German text.
                </AlertDescription>
            </Alert>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold text-primary">Responsible for the content of this page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-lg text-foreground/80">
                  <div className="space-y-1">
                      <p>PRAXISZENTRUM IM RING</p>
                      <p>Dipl. med. G. Ortmanns</p>
                      <p>Kappelenring 6</p>
                      <p>3032 Hinterkappelen</p>
                  </div>
                  <div className="space-y-1 pt-4">
                      <p>Phone: 031 316 26 00</p>
                      <p>Fax: 031 589 68 60</p>
                      <ObfuscatedLink
                          user="empfang"
                          domain="praxiszentrum-im-ring.ch"
                          className="text-primary hover:underline"
                      >
                          empfang@praxiszentrum-im-ring.ch
                      </ObfuscatedLink>
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold text-primary">Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base text-foreground/80">
                <p>The author assumes no liability for the correctness, accuracy, timeliness, reliability, and completeness of the information. Although we strive to keep the information current, correct, and complete, the occurrence of errors cannot be completely ruled out.</p>
                <p>Liability claims against the author for material or immaterial damage resulting from access to or use or non-use of the published information, from misuse of the connection, or from technical malfunctions are excluded. The use of this website or access to it is at the visitor's own risk.</p>
                <p>All offers are non-binding. The author expressly reserves the right to change, supplement, or delete parts of the pages or the entire offer without special notice, or to cease publication temporarily or permanently.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold text-primary">Copyright Statement</CardTitle>
              </CardHeader>
              <CardContent className="text-base text-foreground/80">
                <p>The copyrights and all other rights to content, images, photos, or other files on this website belong exclusively to the Praxiszentrum im Ring or the specifically named rights holders. The written consent of the copyright holder must be obtained in advance for the reproduction of any elements.</p>
              </CardContent>
            </Card>
          </div>
        </div>
    </PageLayout>
  );
}
