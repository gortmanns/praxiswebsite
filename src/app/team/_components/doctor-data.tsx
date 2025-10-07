
import { Card, CardContent } from '@/components/ui/card';

export const doctorBacksides = {
  ortmanns: (
    <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col space-y-3">
      <p>Medizinstudium in Bonn und Hobart (Australien)</p>
      <p>Masterstudium Public Health und Health Management in Sydney (Australien)</p>
      <p>Projektmanagement im Gesundheitswesen in Europa und Australien</p>
      <div>
          <p>Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor</p>
          <ul className="flex list-disc flex-col pl-5 pt-1 text-sm text-foreground/80" style={{ gap: '0.15rem' }}>
              <li>Leiter Klinische Entwicklung und Analytik für DxCG Gesundheitsanalytik GmbH (Deutschland)</li>
              <li>Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</li>
              <li>Direktor der Memory-Strategie (elektronisches Medikamenten-Management und elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</li>
          </ul>
      </div>
      <div>
          <p>Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz:</p>
          <ul className="flex list-disc flex-col pl-5 pt-1 text-sm text-foreground/80" style={{ gap: '0.15rem' }}>
              <li>Universitätsspital Basel (USB)</li>
              <li>Kantonsspital Baselland (KSBL)</li>
              <li>Kantonsspital Winterthur (KSW)</li>
              <li>Kantonsspital Wil (SRFT)</li>
              <li>Hausarztpraxis in Winterthur</li>
          </ul>
      </div>
       <p>Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Klinik für Pneumologie)</p>
       <p>Leitung <span className="whitespace-nowrap">Praxiszentrum im Ring</span> (Ärztliche und administrative Leitung)</p>
       <p>Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)</p>
    </div>
  ),
  schemmer: (
    <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col space-y-3">
        <p className="font-bold text-primary">KLEINCHIRURGISCHE EINGRIFFE KÖNNEN DIREKT IM <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> ERFOLGEN</p>
        <div>
            <p className="font-bold text-primary">GROSSE CHIRURGISCHE EINGRIFFE WERDEN IN ENGER KOOPERATION ZWISCHEN CHIRURG UND HAUSARZT DURCHGEFÜHRT</p>
            <ul className="flex flex-col space-y-1 pt-1 pl-5">
                <li className="text-foreground">Vorbesprechung und Planung des Eingriffs erfolgen im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span></li>
                <li className="text-foreground">Allenfalls notwendige Abklärungen vor dem Eingriff finden ebenfalls im Praxiszentrum statt oder – falls nötig – per Überweisung an weitere Spezialisten</li>
                <li className="text-foreground">
                    Die Operation selbst findet in einer der Partnerkliniken in der Stadt Bern statt
                    <ul className="flex list-disc flex-col pl-5 pt-1 text-sm text-foreground/80" style={{ gap: '0.15rem' }}>
                        <li>Hirslanden</li>
                        <li>Lindenhof-Spital</li>
                        <li>Siloah-Spital</li>
                    </ul>
                </li>
                <li className="text-foreground">Die Nachbetreuung (z. B. Fadenentfernung und Schmerzbehandlung) findet wieder im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> statt</li>
            </ul>
        </div>
    </div>
  ),
  rosenov: (
    <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col space-y-4">
        <p className="font-bold text-primary">UNTERSUCHUNGEN DER VENEN, ARTERIEN UND LYMPHGEFÄSSE</p>
        <p className="font-bold text-primary">ABKLÄRUNG VON EREKTIONSSTÖRUNGEN</p>
        <p>Viele Untersuchungen und Abklärungen können direkt im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> durchgeführt werden.</p>
        <p>Sind zusätzliche Spezialuntersuchungen oder weiterführende Eingriffe nötig, die mit den Geräten im Praxiszentrum nicht durchführbar sind, wird ein Folgetermin in den Räumlichkeiten der VASC ALLIANCE am Beau-site Spital in Bern vereinbart.</p>
    </div>
  ),
  herschel: (
     <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col space-y-4">
        <p className="font-bold text-primary">ALLGEMEINE ORTHOPÄDIE</p>
        <p className="font-bold text-primary">SPEZIALGEBIET HÜFT- UND KNIEGELENKE</p>
        <p>Röntgenuntersuchungen, Konsultationen und klinische Untersuchungen finden direkt vor Ort im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> statt.</p>
        <p>Auch Gelenkinfiltrationen, z. B. bei Schmerzen, können zum Teil direkt vor Ort durchgeführt werden.</p>
        <p>Allenfalls nötige Operationen werden im gut erreichbaren Lindenhof-Spital durchgeführt.</p>
    </div>
  ),
  slezak: (
    <div className="h-full overflow-y-auto text-base leading-tight flex w-full flex-col space-y-4">
      <p className="font-bold text-primary">ALLGEMEINE NEUROLOGIE</p>
      <p className="font-bold text-primary">VASKULÄRE ERKRANKUNGEN</p>
      <p className="font-bold text-primary">EPILEPSIE</p>
      <p className="font-bold text-primary">BEWEGUNGSSTÖRUNGEN <span className="text-primary font-bold">(Schwerpunkt Parkinsonsyndrome)</span></p>
      <p className="font-bold text-primary">KOPFSCHMERZEN UND MIGRÄNE</p>
      <p className="font-bold text-primary">NEUROREHABILITATION</p>
      
      <div className="space-y-4 pt-4">
          <p>Viele Untersuchungen können direkt im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> durchgeführt werden.</p>
          <p>Wenn spezielle Untersuchungen wie z. B. die Bestimmung der Nervenleitgeschwindigkeit Geräte erfordern, die im <span className="whitespace-nowrap">PRAXISZENTRUM IM RING</span> nicht zur Verfügung stehen, dann finden diese in den Räumlichkeiten an der Thunstrasse 95 in Bern statt.</p>
      </div>
  </div>
  ),
};
