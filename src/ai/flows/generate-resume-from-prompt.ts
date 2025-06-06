// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Generates a resume from a text prompt describing the desired job.
 *
 * - generateResumeFromPrompt - A function that generates a resume from a prompt.
 * - GenerateResumeFromPromptInput - The input type for the generateResumeFromPrompt function.
 * - GenerateResumeFromPromptOutput - The return type for the generateResumeFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeFromPromptInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('A description of the job for which the resume is being created.'),
});
export type GenerateResumeFromPromptInput = z.infer<typeof GenerateResumeFromPromptInputSchema>;

const GenerateResumeFromPromptOutputSchema = z.object({
  resumeDraft: z.string().describe('A draft of the resume generated from the job description.'),
});
export type GenerateResumeFromPromptOutput = z.infer<typeof GenerateResumeFromPromptOutputSchema>;

export async function generateResumeFromPrompt(input: GenerateResumeFromPromptInput): Promise<GenerateResumeFromPromptOutput> {
  return generateResumeFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeFromPromptPrompt',
  input: {schema: GenerateResumeFromPromptInputSchema},
  output: {schema: GenerateResumeFromPromptOutputSchema},
  prompt: `You are an expert resume writer. Please create a resume based on the following job description: {{{jobDescription}}}. The resume should be well-formatted and easy to read.`,
});

const generateResumeFromPromptFlow = ai.defineFlow(
  {
    name: 'generateResumeFromPromptFlow',
    inputSchema: GenerateResumeFromPromptInputSchema,
    outputSchema: GenerateResumeFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
