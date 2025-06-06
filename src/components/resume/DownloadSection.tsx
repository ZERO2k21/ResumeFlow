
'use client';

import type { ResumeData } from '@/types/resume';
import { formatResumeDataForAI } from '@/lib/resume-utils';
import { Button } from '@/components/ui/button';
import SectionCard from './SectionCard';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadSectionProps {
  resumeData: ResumeData;
}

export default function DownloadSection({ resumeData }: DownloadSectionProps) {
  const { toast } = useToast();

  const handleDownload = (format: string) => {
    if (format === 'TXT') {
      try {
        const resumeText = formatResumeDataForAI(resumeData);
        const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_') || 'resume'}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast({
          title: 'Download Successful',
          description: 'Your resume has been downloaded as a TXT file.',
        });
      } catch (error) {
        console.error('Error downloading TXT:', error);
        toast({
          title: 'Download Failed',
          description: 'Could not download the resume as TXT.',
          variant: 'destructive',
        });
      }
    } else if (format === 'PDF') {
      toast({
        title: 'PDF Download Not Yet Implemented',
        description: 'Generating PDF versions of your resume is a planned feature. Please use TXT for now.',
        variant: 'default',
      });
    } else if (format === 'DOCX') {
      toast({
        title: 'DOCX Download Not Yet Implemented',
        description: 'Generating DOCX versions of your resume is a planned feature. Please use TXT for now.',
        variant: 'default',
      });
    }
  };

  return (
    <SectionCard title="Download Resume" icon={<Download className="h-5 w-5" />}>
      <div className="space-y-3">
        <Button onClick={() => handleDownload('PDF')} className="w-full">Download as PDF</Button>
        <Button variant="outline" onClick={() => handleDownload('DOCX')} className="w-full">Download as DOCX</Button>
        <Button variant="outline" onClick={() => handleDownload('TXT')} className="w-full">Download as TXT</Button>
      </div>
    </SectionCard>
  );
}
