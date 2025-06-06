'use client';

import { Button } from '@/components/ui/button';
import SectionCard from './SectionCard';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DownloadSection() {
  const { toast } = useToast();

  const handleDownload = (format: string) => {
    toast({
      title: 'Download Started (Placeholder)',
      description: `Your resume would be downloaded as ${format}. This is a demo.`,
    });
  };

  return (
    <SectionCard title="Download Resume" icon={<Download className="h-5 w-5" />}>
      <div className="space-y-3">
        <Button onClick={() => handleDownload('PDF')} className="w-full">Download as PDF</Button>
        <Button variant="outline" onClick={() => handleDownload('DOCX')} className="w-full">Download as DOCX</Button>
        <Button variant="outline" onClick={() => handleDownload('TXT')} className="w-full">Download as TXT</Button>
      </div>
       <p className="mt-4 text-xs text-muted-foreground text-center">
        Actual download functionality is not implemented in this demo.
      </p>
    </SectionCard>
  );
}
