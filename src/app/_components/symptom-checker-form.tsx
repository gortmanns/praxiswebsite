'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { getDiagnosis } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, HeartPulse, Loader2, ShieldCheck, Siren, ArrowRightCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Analyse Starten
    </Button>
  );
}

export function SymptomCheckerForm() {
  const [state, formAction] = useFormState(getDiagnosis, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error && state.message && !state.data) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Symptom-Check</CardTitle>
          <CardDescription>
          Beschreiben Sie unten Ihre Symptome und unser KI-Assistent wird eine vorläufige Analyse erstellen. Dies ist kein Ersatz für eine professionelle medizinische Beratung.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            <Textarea
              name="symptoms"
              placeholder="z.B. Ich habe Kopfschmerzen, Fieber und Halsschmerzen..."
              className="min-h-[150px] text-base"
              required
            />
             {state.error && state.message && !state.data && (
                <p className="mt-2 text-sm text-destructive">{state.message}</p>
              )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <Card className="flex min-h-full flex-col items-center justify-center">
        {!state.data && (
           <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground pt-6">
            <Bot size={48} className="mx-auto mb-4" />
            <p className="font-semibold">Ihre Analyse wird hier angezeigt.</p>
          </CardContent>
        )}
        {state.data && (
          <div className="w-full animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="text-primary" />
                KI-Analyse
              </CardTitle>
              <CardDescription>
                Basierend auf den von Ihnen angegebenen Symptomen, hier eine mögliche Analyse.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Mögliche Diagnose</h3>
                <p className="text-muted-foreground">{state.data.diagnosis}</p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldCheck className="text-primary" />
                  Konfidenzniveau
                </h3>
                <p className="text-muted-foreground">{state.data.confidenceLevel}</p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <ArrowRightCircle className="text-primary" />
                  Empfohlene Nächste Schritte
                </h3>
                <p className="text-muted-foreground">{state.data.nextSteps}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Alert variant="destructive">
                <Siren className="h-4 w-4" />
                <AlertTitle>Haftungsausschluss</AlertTitle>
                <AlertDescription>
                  Diese KI-Analyse dient nur zu Informationszwecken und ist keine medizinische Diagnose. Bitte konsultieren Sie bei gesundheitlichen Bedenken einen Arzt.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
