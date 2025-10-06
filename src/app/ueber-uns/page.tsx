

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UeberUnsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                    ÜBER UNS
                </h2>
            </div>
            <div className="mx-auto mt-16 max-w-4xl space-y-8 text-lg text-foreground/80">
                <Card>
                    <CardContent className="space-y-6 p-8">
                        <p>Als die Überbauung im Kappelenring in den 1970er-Jahren noch ganz frisch war, eröffnete Dr. Segginger hier im Erdgeschoss des Hauses Kappelenring 6 eine Hausarztpraxis. Nebenan gab es bereits die Zahnarztpraxis von Dr. Debrunner.</p>
                        <p>Nach vielen Jahren ist Dr. Segginger zum Jahresende 2022 in den wohlverdienten Ruhestand gegangen, und ich habe die Praxis von ihm übernommen. Da auch Dr. Debrunner kurz darauf in den Ruhestand gegangen ist, ohne einen Nachfolger für seine Praxis zu haben, bot sich die einmalige Gelegenheit, diese Räumlichkeiten zu übernehmen, miteinander zu verbinden und die Hausarztpraxis zu einem neuen, modernen Praxiszentrum weiterzuentwickeln.</p>
                        
                        <h3 className="pt-4 font-headline text-2xl font-bold text-primary">Was ist seither passiert?</h3>
                        <ul className="list-disc space-y-4 pl-6">
                            <li>Die alten Räumlichkeiten der Zahnarztpraxis wurden komplett erneuert und durch einen Mauerdurchbruch mit der Hausarztpraxis verbunden.</li>
                            <li>Der Wartebereich wurde in die neuen Räumlichkeiten verlegt und komplett neu, offen und freundlich gestaltet.</li>
                            <li>Ein Monitor im Wartebereich liefert nun aktuelle Informationen zu gesundheitsrelevanten Themen und verkürzt die gefühlte Wartezeit.</li>
                            <li>Ein separater, kleinerer Wartebereich für infektiöse Patienten wurde geschaffen, damit Ansteckungen im Wartebereich nach Möglichkeit vermieden werden.</li>
                            <li>Der alte Wartebereich wurde zu einem Interventionsraum für kleinchirurgische Eingriffe und Wundversorgung umgestaltet.</li>
                            <li>Alle Fenster der Praxis erhielten einen neuen, modernen Sichtschutz in Form von Folierung, so dass auf die alten, unhygienischen Gardinen verzichtet werden kann.</li>
                            <li>Der ehemalige kleine Arbeitsplatz der MPAs im Labor wurde durch einen kompletten Büroplatz im neuen Praxisteil ersetzt.</li>
                            <li>Zugleich ist dort auch ein Aufenthaltsbereich für die Mitarbeiter entstanden.</li>
                            <li>Die alte Einrichtung des Sprechzimmers von Dr. Segginger wurde erneuert und heller, moderner und freundlicher gestaltet.</li>
                            <li>Die Laborgeräte wurden weitgehend erneuert und wieder dem aktuellen Stand der Technik angepasst.</li>
                            <li>Die gesamte Praxis-IT inklusive der Telefonanlage wurde komplett erneuert und auf den neuesten Stand der Technik gebracht.</li>
                            <li>Im neuen Praxisbereich sind zwei neue Sprechzimmer entstanden und ein neuer Empfangsbereich wurde gestaltet. Der alte Empfang dient dann nur noch der Medikamentenabgabe.</li>
                            <li>Die Röntgenanlage wurde aufwendig erneuert und arbeitet nun komplett digital. Röntgenbilder können nun von jedem PC in der Praxis aus betrachtet werden.</li>
                            <li>Damit sich der ganze Aufwand auch lohnt und der Umbau zu einem Praxiszentrum auch diesen Namen rechtfertigt, wurden Kooperationen mit diversen Fachspezialisten geschlossen, die jetzt regelmässig Termine bei uns im Praxiszentrum anbieten, sodass wir unseren Patienten den Weg in die Stadt Bern vielfach ersparen können.</li>
                            <li>Eine Ernährungsberaterin führt regelmässig Termine bei uns in den Räumlichkeiten durch, sodass auch hierfür die Wege für unsere Patienten nun kurz sind.</li>
                            <li>Um die Behandlung der Fachspezialisten zu ermöglichen, wurde zusätzlich ein Ultraschall-Untersuchungsgerät angeschafft.</li>
                        </ul>

                        <h3 className="pt-4 font-headline text-2xl font-bold text-primary">Was bleibt zu tun?</h3>
                        <ul className="list-disc space-y-4 pl-6">
                            <li>Der Ausbau des letzten Sprechzimmers im neuen Praxisteil ist noch nicht ganz abgeschlossen.</li>
                            <li>Wir suchen ständig nach weiteren Spezialisten, die gerne zur Verbesserung der medizinischen Versorgung in Hinterkappelen beitragen möchten und Termine bei uns im PRAXISZENTRUM IM RING anbieten.</li>
                            <li>Wir suchen noch nach weiteren Hausärztinnen und Hausärzten, die in Voll- oder Teilzeit hier arbeiten möchten.</li>
                            <li>Sobald dies von der dann grösser werdenden Personaldecke aus möglich ist, werden wir den neu geschaffenen Empfangsbereich in Betrieb nehmen.</li>
                        </ul>

                        <h3 className="pt-4 font-headline text-2xl font-bold text-primary">Was ist unsere Vision?</h3>
                        <ul className="list-disc space-y-4 pl-6">
                            <li>Langfristig möchten wir so viele Hausärzte für die Arbeit hier im Praxiszentrum gewinnen, dass wir Montag bis Samstag von 8 bis 20 Uhr durchgehend öffnen können.</li>
                            <li>Wir möchten eine einfache Notfall-Versorgung für die kleinen Dinge, die im Alltag schiefgehen, innerhalb der Öffnungszeiten jederzeit ohne Voranmeldung anbieten können, sodass unsere Patienten nur für schwerere Notfälle noch in die Stadt Bern müssen.</li>
                            <li>Wir möchten weitere Spezialisten gewinnen, die Ihre Sprechstunden bei uns im Praxiszentrum anbieten. Idealerweise decken wir irgendwann fast das ganze medizinische Spektrum ab, soweit es jedenfalls die technischen Möglichkeiten und Räumlichkeiten bei uns zulassen.</li>
                        </ul>
                        <div className="pt-8 space-y-4">
                            <p>An dieser Stelle möchte ich mich für das entgegengebrachte Vertrauen bedanken. Mir ist bewusst, dass die Gewöhnung an einen neuen Hausarzt schwierig ist, zumal wenn der alte Hausarzt über Jahrzehnte hinweg an dieser Stelle tätig war und der «Neue» vieles anders macht.</p>
                            <p className="text-3xl italic">Gernot Ortmanns</p>
                            <p className="pt-8 text-base text-foreground/70">(Im Oktober 2025)</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
