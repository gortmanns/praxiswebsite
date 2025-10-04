'use server';

import { z } from 'zod';
import { checkSymptoms, type SymptomCheckerOutput } from '@/ai/flows/ai-symptom-checker';

const symptomSchema = z.object({
  symptoms: z.string().min(10, { message: 'Bitte beschreiben Sie Ihre Symptome ausführlicher.' }),
});

export type FormState = {
  message: string;
  data?: SymptomCheckerOutput;
  error?: boolean;
};

export async function getDiagnosis(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = symptomSchema.safeParse({
    symptoms: formData.get('symptoms'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.symptoms?.[0] || 'Validierung fehlgeschlagen.',
      error: true,
    };
  }

  try {
    const result = await checkSymptoms({ symptoms: validatedFields.data.symptoms });
    return {
      message: 'Diagnose erfolgreich erhalten.',
      data: result,
      error: false,
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'Bei der Überprüfung der Symptome ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
      error: true,
    };
  }
}
