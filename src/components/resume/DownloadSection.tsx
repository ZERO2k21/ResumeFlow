
'use client';

import type { ResumeData } from '@/types/resume';
import { formatResumeDataForAI } from '@/lib/resume-utils';
import { Button } from '@/components/ui/button';
import SectionCard from './SectionCard';
import { Download, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadSectionProps {
  resumeData: ResumeData;
}

export default function DownloadSection({ resumeData }: DownloadSectionProps) {
  const { toast } = useToast();

  const handleDownloadTXT = () => {
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
  };

  const handlePrintPDF = () => {
    toast({
      title: 'Preparing Print Preview',
      description: "Please use your browser's 'Save as PDF' option in the print dialog.",
    });
    // Timeout to allow toast to appear before print dialog blocks UI
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleDownloadDOCX = () => {
    toast({
      title: 'DOCX Export Not Directly Available',
      description: 'Generating formatted DOCX files in the browser is complex. Please download as TXT and convert using a word processor for now.',
      duration: 6000, 
    });
  };

  return (
    <SectionCard title="Download Resume" icon={<Download className="h-5 w-5" />}>
      <div className="space-y-3">
        <Button onClick={handlePrintPDF} className="w-full">
          <Printer className="mr-2 h-4 w-4" /> Save as PDF (Print)
        </Button>
        <Button variant="outline" onClick={handleDownloadDOCX} className="w-full">Download as DOCX</Button>
        <Button variant="outline" onClick={handleDownloadTXT} className="w-full">Download as TXT</Button>
      </div>
    </SectionCard>
  );
}
