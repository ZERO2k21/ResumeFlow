import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestImprovementsInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The current content of the resume.'),
  jobDescription: z
    .string()
    .describe('The job description for the position being applied for.'),
});

const SuggestImprovementsOutputSchema = z.object({
  suggestions: z
    .array(
      z.object({
        section: z.string().describe('The section of the resume that needs improvement.'),
        current: z.string().describe('The current content of the section.'),
        improved: z.string().describe('The improved version of the content.'),
        reasoning: z.string().describe('The reasoning behind the improvement.'),
      })
    )
    .describe('The list of improvement suggestions.'),
});

export type SuggestImprovementsInput = z.infer<typeof SuggestImprovementsInputSchema>;
export type SuggestImprovementsOutput = z.infer<typeof SuggestImprovementsOutputSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = SuggestImprovementsInputSchema.parse(body);

    const suggestImprovementsFlow = ai.defineFlow(
      {
        name: 'suggestImprovements',
        inputSchema: SuggestImprovementsInputSchema,
        outputSchema: SuggestImprovementsOutputSchema,
      },
      async (input) => {
        const llmResponse = await ai.generate({
          prompt: `You are an expert resume writer and career counselor. Analyze the provided resume content and job description to suggest specific improvements.

Resume Content:
${input.resumeContent}

Job Description:
${input.jobDescription}

Please provide specific, actionable suggestions for improving the resume content to better match the job requirements. Focus on:
1. Skills alignment
2. Experience relevance
3. Achievement quantification
4. Keyword optimization
5. Content clarity and impact

Provide your response as structured suggestions with the section name, current content, improved version, and reasoning.`,
          model: 'googleai/gemini-1.5-flash',
          config: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        });

        // Parse the response and structure it according to the schema
        const suggestions = [
          {
            section: "Skills",
            current: "Basic analysis of current skills section",
            improved: llmResponse.text(),
            reasoning: "AI-generated improvement suggestions"
          }
        ];

        return { suggestions };
      }
    );

    const result = await suggestImprovementsFlow(input);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in suggest-improvements API:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
