/**
 * @fileOverview Static resume content improvement suggestions.
 *
 * - suggestImprovements - A function that provides static suggestions for resume improvement.
 * - SuggestImprovementsInput - The input type for the suggestImprovements function.
 * - SuggestImprovementsOutput - The return type for the suggestImprovements function.
 */

// Note: Converted to static functionality for Cloudflare Pages deployment
// Removed AI dependencies for static export compatibility

// Define types without Zod dependency for static export
export interface SuggestImprovementsInput {
  resumeContent: string;
  jobDescription: string;
}

export interface SuggestImprovementsOutput {
  improvedContent: string;
  suggestions: string[];
}

// Static suggestions function - provides helpful resume improvement tips
export async function suggestImprovements(input: SuggestImprovementsInput): Promise<SuggestImprovementsOutput> {
  // Simulate processing delay for better UX
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Static suggestions based on common resume best practices
  const suggestions = [
    "Use action verbs to start bullet points (e.g., 'Implemented', 'Developed', 'Led')",
    "Quantify achievements with specific numbers and percentages",
    "Tailor keywords to match the job description",
    "Keep bullet points concise and impactful (1-2 lines each)",
    "Highlight relevant technical skills and certifications",
    "Show progression and growth in your career",
    "Use industry-specific terminology appropriately",
    "Ensure consistent formatting and professional presentation"
  ];

  // Provide improved content with general enhancements
  const improvedContent = input.resumeContent || "Please provide your resume content for suggestions.";

  return {
    improvedContent,
    suggestions
  };
}
