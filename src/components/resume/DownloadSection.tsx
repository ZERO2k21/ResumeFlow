
'use client';

import type { ResumeData } from '@/types/resume';
import { formatResumeDataForAI } from '@/lib/resume-utils';
import { prepareElementForPDF, cleanupElementAfterPDF, getPDFExportOptions, PdfExportOptions } from '@/lib/pdf-export';
import { Button } from '@/components/ui/button';
import SectionCard from './SectionCard';
import { Download, FileDown, Printer, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
// We'll dynamically import html2pdf to avoid SSR issues
import dynamic from 'next/dynamic';
import { PDFExportDialog } from './PDFExportDialog';

interface DownloadSectionProps {
  resumeData: ResumeData;
}

// Dynamically import html2pdf with no SSR
const html2pdfPromise = () => import('html2pdf.js').then(module => module.default || module);

export default function DownloadSection({ resumeData }: DownloadSectionProps) {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

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
  
  const handleExportPDF = async (options?: PdfExportOptions) => {
    if (!isClient || isExporting) return;
    
    let element: HTMLElement | null = null;
    
    try {
      setIsExporting(true);
      
      toast({
        title: 'Preparing PDF Export',
        description: 'Please wait while we generate your PDF...',
      });
      
      // Get the resume content printable area element
      element = document.getElementById('resume-content-printable-area');
      if (!element) {
        throw new Error('Resume content printable area element not found');
      }
      
      // Prepare the element for PDF export
      prepareElementForPDF(element);
      
      // Load html2pdf dynamically
      const html2pdf = await html2pdfPromise();
      
      // Get optimized PDF export options
      const opt = getPDFExportOptions(resumeData, options);
      
      // Generate PDF
      await html2pdf().from(element).set(opt).save();
      
      toast({
        title: 'PDF Export Successful',
        description: 'Your resume has been exported as a PDF file.',
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: 'PDF Export Failed',
        description: 'Could not export the resume as PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      // Always clean up the element after PDF export, even if there was an error
      if (element) {
        cleanupElementAfterPDF(element);
      }
      setIsExporting(false);
    }
  };
  
  // Open the PDF export options dialog
  const handleOpenPDFOptions = () => {
    setDialogOpen(true);
  };

  const handleDownloadDOCX = () => {
    toast({
      title: 'DOCX Export Not Directly Available',
      description: 'Generating formatted DOCX files in the browser is complex. Please download as TXT and convert using a word processor for now.',
      duration: 6000, 
    });
  };

  return (
    <>
      <PDFExportDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onExport={handleExportPDF} 
        resumeData={resumeData} 
      />
      
      <SectionCard title="Download Resume" icon={<Download className="h-5 w-5" />}>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button 
              onClick={() => handleExportPDF()} 
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileDown className="mr-2 h-4 w-4" /> Export as PDF
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleOpenPDFOptions}
              disabled={isExporting}
              className="px-3"
              title="PDF Export Options"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            onClick={handlePrintPDF} 
            className="w-full"
            disabled={isExporting}
          >
            <Printer className="mr-2 h-4 w-4" /> Print (Browser PDF)
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownloadDOCX} 
            className="w-full"
            disabled={isExporting}
          >
            Download as DOCX
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownloadTXT} 
            className="w-full"
            disabled={isExporting}
          >
            Download as TXT
          </Button>
        </div>
      </SectionCard>
    </>
  );
}
