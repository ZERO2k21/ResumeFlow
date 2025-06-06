'use client';

import { useState } from 'react';
import type { ResumeData } from '@/types/resume';
import { suggestImprovements, type SuggestImprovementsOutput } from '@/ai/flows/suggest-improvements';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import SectionCard from './SectionCard';
import { Wand2, Check, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AISuggestionsPanelProps {
  resumeData: ResumeData;
}

function formatResumeDataForAI(data: ResumeData): string {
  let content = `Name: ${data.personalInfo.name}\nEmail: ${data.personalInfo.email}\nPhone: ${data.personalInfo.phone}\nAddress: ${data.personalInfo.address}\n`;
  if (data.personalInfo.linkedin) content += `LinkedIn: ${data.personalInfo.linkedin}\n`;
  if (data.personalInfo.portfolio) content += `Portfolio: ${data.personalInfo.portfolio}\n`;

  content += `\nSummary:\n${data.summary}\n`;

  content += "\nExperience:\n";
  data.experience.forEach(exp => {
    if(exp.jobTitle) {
      content += `- ${exp.jobTitle} at ${exp.company}, ${exp.location} (${exp.startDate} - ${exp.endDate})\n  Responsibilities:\n${exp.responsibilities.split('\n').map(r => `    - ${r}`).join('\n')}\n`;
    }
  });

  content += "\nEducation:\n";
  data.education.forEach(edu => {
    if(edu.degree) {
      content += `- ${edu.degree} from ${edu.institution}, ${edu.location} (Graduated: ${edu.graduationDate})\n`;
      if (edu.details) content += `  Details: ${edu.details}\n`;
    }
  });

  content += "\nSkills:\n";
  content += data.skills.filter(s => s.trim() !== '').join(', ') + "\n";

  return content;
}


export default function AISuggestionsPanel({ resumeData }: AISuggestionsPanelProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestImprovementsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: 'Job Description Required',
        description: 'Please enter a job description to get AI suggestions.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSuggestions(null);
    try {
      const resumeContent = formatResumeDataForAI(resumeData);
      const result = await suggestImprovements({ resumeContent, jobDescription });
      setSuggestions(result);
      toast({
        title: 'AI Suggestions Generated!',
        description: 'Review the suggestions below.',
        variant: 'default',
        action: <Check className="h-5 w-5 text-green-500" />,
      });
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      toast({
        title: 'Error Generating Suggestions',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
        action: <AlertTriangle className="h-5 w-5 text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionCard title="AI Enhancement" icon={<Wand2 className="h-5 w-5" />}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea
            id="job-description"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="bg-background"
          />
        </div>
        <Button onClick={handleGetSuggestions} disabled={isLoading} className="w-full">
          {isLoading ? 'Getting Suggestions...' : 'Get AI Suggestions'}
        </Button>

        {suggestions && (
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold font-headline text-lg mb-2">Improved Resume Content:</h4>
              <ScrollArea className="h-48 rounded-md border p-3 bg-muted/50">
                <pre className="whitespace-pre-wrap text-sm">{suggestions.improvedContent}</pre>
              </ScrollArea>
            </div>
            <div>
              <h4 className="font-semibold font-headline text-lg mb-2">Specific Suggestions:</h4>
              <ScrollArea className="h-48 rounded-md border p-3 bg-muted/50">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {suggestions.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
