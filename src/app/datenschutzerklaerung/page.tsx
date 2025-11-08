
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '../page-layout';

export default function DatenschutzerklaerungPage() {
  return (
    <PageLayout>
      <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                  DATENSCHUTZERKLÄRUNG
              </h2>
          </div>
          <div className="mx-auto mt-16 max-w-4xl space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">Allgemein</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-base text-foreground/80">
                      <p>Gestützt auf Artikel 13 der Schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                      <p>In Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns, die Datenbanken so gut wie möglich vor unberechtigtem Zugriff, Verlust, Missbrauch oder Verfälschung zu schützen.</p>
                      <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
                      <p>Durch die Nutzung dieser Website erklären Sie sich mit der Erhebung, Verarbeitung und Nutzung von Daten gemäss der nachfolgenden Beschreibung einverstanden. Diese Website kann grundsätzlich ohne Registrierung besucht werden. Daten wie aufgerufene Seiten oder Namen von aufgerufenen Dateien, Datum und Uhrzeit werden zu statistischen Zwecken auf dem Server gespeichert, ohne dass diese Daten unmittelbar auf Ihre Person bezogen werden. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">Verarbeitung personenbezogener Daten</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-base text-foreground/80">
                      <p>Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen. Eine betroffene Person ist eine Person, über die personenbezogene Daten verarbeitet werden. Die Verarbeitung umfasst jeden Umgang mit personenbezogenen Daten, unabhängig von den verwendeten Mitteln und Verfahren, insbesondere die Speicherung, Weitergabe, Beschaffung, Löschung, Aufbewahrung, Veränderung, Vernichtung und Verwendung personenbezogener Daten.</p>
                      <p>Wir verarbeiten personenbezogene Daten in Übereinstimmung mit dem Schweizer Datenschutzrecht. Sofern und soweit die EU-DSGVO anwendbar ist, verarbeiten wir personenbezogene Daten darüber hinaus auf folgenden Rechtsgrundlagen in Verbindung mit Art. 6 (1) GDPR:</p>
                      <ul className="list-disc pl-6 space-y-2">
                          <li>lit. a) Verarbeitung personenbezogener Daten mit Einwilligung der betroffenen Person.</li>
                          <li>lit. b) Verarbeitung personenbezogener Daten zur Erfüllung eines Vertrages mit der betroffenen Person sowie zur Durchführung entsprechender vorvertraglicher Massnahmen.</li>
                          <li>lit. c) Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung, der wir nach geltendem Recht der EU oder nach geltendem Recht eines Landes, in dem die GDPR ganz oder teilweise anwendbar ist, unterliegen.</li>
                          <li>lit. d) Verarbeitung personenbezogener Daten zur Wahrung lebenswichtiger Interessen der betroffenen Person oder einer anderen natürlichen Person.</li>
                          <li>lit. f) Verarbeitung personenbezogener Daten zur Wahrung der berechtigten Interessen von uns oder von Dritten, sofern nicht die Grundfreiheiten und Rechte und Interessen der betroffenen Person überwiegen. Zu den berechtigten Interessen gehören insbesondere unser geschäftliches Interesse, unsere Website bereitstellen zu können, die Informationssicherheit, die Durchsetzung eigener Rechtsansprüche und die Einhaltung des schweizerischen Rechts.</li>
                      </ul>
                      <p>Wir verarbeiten personenbezogene Daten für die Dauer, die für den jeweiligen Zweck oder die jeweiligen Zwecke erforderlich ist. Bei längerfristigen Aufbewahrungspflichten aufgrund gesetzlicher und anderer Verpflichtungen, denen wir unterliegen, schränken wir die Bearbeitung entsprechend ein.</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">Rechte der betroffenen Person</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-base text-foreground/80">
                      <div>
                          <h3 className="font-bold">Recht auf Bestätigung</h3>
                          <p>Jede betroffene Person hat das Recht, vom Betreiber der Website eine Bestätigung darüber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. Wenn Sie dieses Bestätigungsrecht ausüben möchten, können Sie sich jederzeit an den Datenschutzbeauftragten wenden.</p>
                      </div>
                      <div>
                          <h3 className="font-bold">Auskunftsrecht</h3>
                          <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, vom Betreiber dieser Website jederzeit unentgeltlich Auskunft über die zu ihrer Person gespeicherten Daten und eine Kopie dieser Auskunft zu erhalten. Darüber hinaus kann ggf. Auskunft über Folgendes erteilt werden: Zwecke der Verarbeitung, Kategorien der verarbeiteten personenbezogenen Daten, Empfänger, an die die personenbezogenen Daten weitergegeben wurden oder werden, wenn möglich, die geplante Dauer der Speicherung der personenbezogenen Daten oder, falls dies nicht möglich ist, die Kriterien für die Festlegung dieser Dauer, das Bestehen eines Rechts auf Berichtigung oder Löschung der sie betreffenden personenbezogenen Daten oder auf Einschränkung der Verarbeitung durch den für die Verarbeitung Verantwortlichen oder ein Recht auf Widerspruch gegen eine solche Verarbeitung, das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde, wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: Alle verfügbaren Informationen über die Herkunft der Daten.</p>
                          <p className="mt-2">Ausserdem hat die betroffene Person das Recht, darüber informiert zu werden, ob personenbezogene Daten in ein Drittland oder an eine internationale Organisation übermittelt worden sind. Ist dies der Fall, so hat die betroffene Person ausserdem das Recht, Auskunft über die geeigneten Garantien im Zusammenhang mit der Übermittlung zu erhalten.</p>
                          <p className="mt-2">Wenn Sie von diesem Auskunftsrecht Gebrauch machen möchten, können Sie sich jederzeit an unseren Datenschutzbeauftragten wenden.</p>
                      </div>
                      <div>
                          <h3 className="font-bold">Recht auf Berichtigung</h3>
                          <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, die unverzügliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Darüber hinaus hat die betroffene Person das Recht, unter Berücksichtigung der Zwecke der Verarbeitung, die Vervollständigung unvollständiger personenbezogener Daten – auch mittels einer ergänzenden Erklärung – zu verlangen.</p>
                          <p className="mt-2">Wenn Sie dieses Recht auf Berichtigung ausüben möchten, können Sie sich jederzeit an unseren Datenschutzbeauftragten wenden.</p>
                      </div>
                      <div>
                          <h3 className="font-bold">Recht auf Löschung</h3>
                          <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, von dem für die Verarbeitung Verantwortlichen dieser Website die unverzügliche Löschung der sie betreffenden personenbezogenen Daten zu verlangen, sofern einer der folgenden Gründe zutrifft und die Verarbeitung nicht mehr erforderlich ist:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-2">
                              <li>Die personenbezogenen Daten wurden für Zwecke erhoben oder auf sonstige Weise verarbeitet, für die sie nicht mehr erforderlich sind.</li>
                              <li>Die betroffene Person widerruft die Einwilligung, auf der die Verarbeitung beruhte, und es gibt keine andere Rechtsgrundlage für die Verarbeitung.</li>
                              <li>Die betroffene Person legt aus Gründen, die sich aus ihrer besonderen Situation ergeben, Widerspruch gegen die Verarbeitung ein und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder die betroffene Person legt im Falle von Direktwerbung und damit verbundenem Profiling Widerspruch gegen die Verarbeitung ein.</li>
                              <li>Die personenbezogenen Daten wurden unrechtmässig verarbeitet.</li>
                              <li>Die Löschung der personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der für die Verarbeitung Verantwortliche unterliegt.</li>
                              <li>Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft erhoben, die direkt an ein Kind gerichtet sind.</li>
                          </ul>
                          <p className="mt-2">Wenn einer der oben genannten Gründe zutrifft und Sie die Löschung von personenbezogenen Daten, die beim Betreiber dieser Website gespeichert sind, veranlassen möchten, können Sie sich jederzeit an unseren Datenschutzbeauftragten wenden. Der Datenschutzbeauftragte dieser Website wird veranlassen, dass dem Löschverlangen unverzüglich nachgekommen wird.</p>
                      </div>
                      <div>
                          <h3 className="font-bold">Recht auf Einschränkung der Verarbeitung</h3>
                          <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, von dem für die Verarbeitung Verantwortlichen dieser Website die Einschränkäung der Verarbeitung zu verlangen, wenn eine der folgenden Bedingungen erfüllt ist: Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten, und zwar für einen Zeitraum, der es dem für die Verarbeitung Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen.</p>
                          <ul className="list-disc pl-6 mt-2 space-y-2">
                              <li>Die Verarbeitung ist unrechtmässig, die betroffene Person legt Widerspruch gegen die Löschung der personenbezogenen Daten ein und verlangt stattdessen die Einschränkung der Nutzung der personenbezogenen Daten.</li>
                              <li>Der für die Verarbeitung Verantwortliche benötigt die personenbezogenen Daten nicht mehr für die Zwecke der Verarbeitung, die betroffene Person benötigt sie jedoch für die Geltendmachung. Die betroffene Person hat aus Gründen, die sich aus ihrer besonderen Situation ergeben, Widerspruch gegen die Verarbeitung eingelegt und es steht noch nicht fest, ob die berechtigten Interessen des Verantwortlichen gegenüber denen der betroffenen Person überwiegen.</li>
                          </ul>
                          <p className="mt-2">Wenn eine der vorgenannten Voraussetzungen gegeben ist, können Sie sich jederzeit an unseren Datenschutzbeauftragten wenden, um die Einschränkung der Verarbeitung personenbezogener Daten beim Betreiber dieser Website zu verlangen. Der Datenschutzbeauftragte dieser Website wird die Einschränkung der Verarbeitung veranlassen.</p>
                      </div>
                      <div>
                          <h3 className="font-bold">Recht auf Datenübertragbarkeit</h3>
                          <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, die sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Darüber hinaus hat die betroffene Person das Recht, zu erwirken, dass die personenbezogenen Daten direkt von einem für die Verarbeitung Verantwortlichen an einen anderen für die Verarbeitung Verantwortlichen übermittelt werden, sofern dies technisch machbar ist und sofern dadurch nicht die Rechte und Freiheiten anderer Personen beeinträchtigt werden.</p>
                          <p className="mt-2">Um das Recht auf Datenübertragbarkeit geltend zu machen, können Sie sich jederzeit an den vom Betreiber dieser Website benannten Datenschutzbeauftragten wenden.</p>
                      </div>
                      <div>
                          <h3 className="font-bold">Ein Widerspruchsrecht</h3>
                          <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten Widerspruch einzulegen.</p>
                          <p className="mt-2">Der Betreiber dieser Website wird die personenbezogenen Daten im Falle des Widerspruchs nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die die Interessen, Rechte und Freiheiten der betroffenen Person überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</p>
                          <p className="mt-2">Um von Ihrem Widerspruchsrecht Gebrauch zu machen, können Sie sich direkt an den Datenschutzbeauftragten dieser Website wenden.</p>
                      </div>
                      <div>
                          <h3 className="font-bold">Recht auf Widerruf einer datenschutzrechtlichen Einwilligung</h3>
                          <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, eine erteilte Einwilligung in die Verarbeitung personenbezogener Daten jederzeit zu widerrufen.</p>
                          <p className="mt-2">Wenn Sie von Ihrem Recht auf Widerruf einer Einwilligung Gebrauch machen möchten, können Sie sich jederzeit an unseren Datenschutzbeauftragten wenden.</p>
                      </div>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">Cookies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-base text-foreground/80">
                      <p>Diese Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die es ermöglichen, spezifische, auf den Nutzer bezogene Informationen auf dem Endgerät des Nutzers zu speichern, während der Nutzer die Website nutzt. Cookies ermöglichen es insbesondere, die Nutzungshäufigkeit und die Anzahl der Nutzer der Seiten zu ermitteln, Verhaltensmuster der Seitennutzung zu analysieren, aber auch, unser Angebot kundenfreundlicher zu gestalten. Cookies bleiben über das Ende einer Browser-Sitzung hinaus gespeichert und können bei einem erneuten Besuch der Seite wieder abgerufen werden. Wenn Sie dies nicht wünschen, sollten Sie Ihren Internet-Browser so einstellen, dass er die Annahme von Cookies verweigert.</p>
                      <p>Ein genereller Widerspruch gegen die Verwendung von Cookies zu Online-Marketing-Zwecken kann für eine Vielzahl der Dienste, insbesondere beim Tracking, über die US-Seite <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.aboutads.info/choices/</a> oder die EU-Seite <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.youronlinechoices.com/</a> erklärt werden. Darüber hinaus kann die Speicherung von Cookies durch Deaktivierung in den Browsereinstellungen erreicht werden. Bitte beachten Sie, dass in diesem Fall nicht alle Funktionen dieses Online-Angebots genutzt werden können.</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">SSL/TLS-Verschlüsselung</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-base text-foreground/80">
                      <p>Diese Website verwendet aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie z. B. Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von «http://» auf «https://» wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
                      <p>Wenn die SSL- oder TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten gelesen werden.</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">Server-Log-Dateien</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-base text-foreground/80">
                      <p>Der Provider dieser Website erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
                      <ul className="list-disc space-y-2 pl-6">
                          <li>Browsertyp und Browserversion</li>
                          <li>Verwendetes Betriebssystem</li>
                          <li>Referrer URL</li>
                          <li>Hostname des zugreifenden Rechners</li>
                          <li>Zeitpunkt der Serveranfrage</li>
                      </ul>
                      <p>Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Wir behalten uns vor, diese Daten nachträglich zu prüfen, wenn uns konkrete Anhaltspunkte für eine rechtswidrige Nutzung bekannt werden.</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">Speicherung der IP-Adresse</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-base text-foreground/80">
                      <p>IP-Adressen werden serverseitig gespeichert, um die Sicherheit der Seite zu gewährleisten und Angriffe abzuwehren. Diese Daten werden nicht mit anderen personenbezogenen Daten zusammengeführt.</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">Kontakt per E-Mail und Fax</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-base text-foreground/80">
                      <p>Wenn Sie per E-Mail mit uns Kontakt aufnehmen, erfolgt die Datenübertragung unter Umständen unverschlüsselt. Unverschlüsselte E-Mails können von unbefugten Dritten eingesehen und verändert werden. Die Vertraulichkeit ist bei der Übermittlung via unverschlüsselter E-Mail nicht gewährleistet.</p>
                      <p>Für die Übermittlung von vertraulichen Informationen und medizinischen Daten bitten wir Sie dringend, ausschliesslich unsere sichere HIN-E-Mail-Adresse (`praxiszentrum-im-ring@hin.ch`) zu verwenden oder uns telefonisch oder per Fax zu kontaktieren. Wenn Sie uns über eine unverschlüsselte E-Mail kontaktieren, gehen wir davon aus, dass Sie die Risiken der elektronischen Kommunikation akzeptieren und uns gestatten, Ihnen ebenfalls auf diesem Weg zu antworten.</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">Google Maps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-base text-foreground/80">
                      <p>Diese Website nutzt das Angebot von Google Maps. Dies ermöglicht es uns, interaktive Karten direkt auf der Website darzustellen und Ihnen die komfortable Nutzung der Kartenfunktion zu ermöglichen. Durch den Besuch der Website erhält Google die Information, dass Sie die entsprechende Unterseite unserer Website aufgerufen haben. Dies geschieht unabhängig davon, ob Google ein Nutzerkonto bereitstellt, über das Sie eingeloggt sind, oder ob kein Nutzerkonto vorhanden ist.</p>
                      <p>Wenn Sie bei Google eingeloggt sind, werden Ihre Daten direkt Ihrem Konto zugeordnet. Wenn Sie die Zuordnung zu Ihrem Profil bei Google nicht wünschen, müssen Sie sich vor Aktivierung der Schaltfläche ausloggen. Google speichert Ihre Daten als Nutzungsprofile und nutzt sie für Zwecke der Werbung, Marktforschung und/oder bedarfsgerechten Gestaltung seiner Website.</p>
                      <p>Eine solche Auswertung erfolgt insbesondere (auch für nicht eingeloggte Nutzer) zur Erbringung bedarfsgerechter Werbung und um andere Nutzer des sozialen Netzwerks über Ihre Aktivitäten auf unserer Website zu informieren.</p>
                      <p>Sie haben das Recht, der Erstellung dieser Nutzerprofile zu widersprechen, wobei Sie sich zur Ausübung dieses Rechts an Google wenden müssen. Nähere Informationen zu Zweck und Umfang der Datenerhebung und -verarbeitung durch Google sowie weitere Informationen zu Ihren diesbezüglichen Rechten und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre finden Sie unter: www.google.de/intl/de/policies/privacy.</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl font-bold text-primary">YouTube</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-base text-foreground/80">
                      <p>Auf dieser Website können Funktionen des Dienstes «YouTube» integriert sein oder werden. «YouTube» ist Eigentum von Google Ireland Limited, einem nach irischem Recht gegründeten und betriebenen Unternehmen mit Sitz in Gordon House, Barrow Street, Dublin 4, Irland, das die Dienste im Europäischen Wirtschaftsraum und in der Schweiz betreibt.</p>
                      <p>Ihre rechtliche Vereinbarung mit «YouTube» besteht aus den Bedingungen, die Sie unter dem folgenden Link finden: <a href="https://www.youtube.com/static?gl=de&template=terms&hl=de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.youtube.com/static?gl=de&template=terms&hl=de</a>. Diese Bedingungen stellen eine rechtsverbindliche Vereinbarung zwischen Ihnen und «YouTube» bezüglich Ihrer Nutzung der Dienste dar. In den Datenschutzbestimmungen von Google wird erläutert, wie «YouTube» Ihre persönlichen Daten behandelt und schützt, wenn Sie den Dienst nutzen.</p>
                  </CardContent>
              </Card>
          </div>
      </div>
    </PageLayout>
  );
}
