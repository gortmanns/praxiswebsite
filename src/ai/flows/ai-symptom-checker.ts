'use server';
/**
 * @fileOverview This file defines a Genkit flow for an AI-powered symptom checker.
 *
 * It allows users to input their symptoms and receive a possible diagnosis.
 * @file
 * - `checkSymptoms`: The main function to initiate the symptom check and return a diagnosis.
 * - `SymptomCheckerInput`: The input type for the `checkSymptoms` function, defining the expected symptom description.
 * - `SymptomCheckerOutput`: The output type for the `checkSymptoms` function, providing a possible diagnosis.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  symptoms: z.string().describe('A detailed description of the symptoms experienced by the patient.'),
});

export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  diagnosis: z.string().describe('A possible diagnosis based on the symptoms provided.'),
  confidenceLevel: z.string().describe('The confidence level of the diagnosis, e.g., high, medium, or low.'),
  nextSteps: z.string().describe('Recommended next steps, such as consulting a doctor or further tests.'),
});

export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function checkSymptoms(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const symptomCheckerPrompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {schema: SymptomCheckerInputSchema},
  output: {schema: SymptomCheckerOutputSchema},
  prompt: `You are an AI-powered symptom checker that provides possible diagnoses based on user-provided symptoms.

  Symptoms: {{{symptoms}}}

  Please provide a possible diagnosis, a confidence level for the diagnosis, and recommended next steps.
  Format your response as a JSON object matching this schema:
  ${JSON.stringify(SymptomCheckerOutputSchema.shape, null, 2)}`,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await symptomCheckerPrompt(input);
    return output!;
  }
);
