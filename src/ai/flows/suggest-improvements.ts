'use server';

/**
 * @fileOverview AI-powered resume content improvement suggestions.
 *
 * - suggestImprovements - A function that suggests improvements to resume content based on industry standards and job description.
 * - SuggestImprovementsInput - The input type for the suggestImprovements function.
 * - SuggestImprovementsOutput - The return type for the suggestImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImprovementsInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The current content of the resume.'),
  jobDescription: z
    .string()
    .describe('The job description for the position being applied for.'),
});
export type SuggestImprovementsInput = z.infer<typeof SuggestImprovementsInputSchema>;

const SuggestImprovementsOutputSchema = z.object({
  improvedContent: z
    .string()
    .describe('The improved resume content based on the job description and industry standards.'),
  suggestions: z.array(z.string()).describe('Specific suggestions for improving the resume.'),
});
export type SuggestImprovementsOutput = z.infer<typeof SuggestImprovementsOutputSchema>;

export async function suggestImprovements(input: SuggestImprovementsInput): Promise<SuggestImprovementsOutput> {
  return suggestImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImprovementsPrompt',
  input: {schema: SuggestImprovementsInputSchema},
  output: {schema: SuggestImprovementsOutputSchema},
  prompt: `You are an expert resume writer. Review the provided resume content and job description.

  Provide an improved version of the resume content that is tailored to the job description and adheres to industry best practices.

  In addition, provide a list of specific suggestions for improving the resume.

  Resume Content:
  {{resumeContent}}

  Job Description:
  {{jobDescription}}`,
});

const suggestImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestImprovementsFlow',
    inputSchema: SuggestImprovementsInputSchema,
    outputSchema: SuggestImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
