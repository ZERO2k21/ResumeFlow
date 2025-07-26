'use client';

import type { ResumeData } from '@/types/resume';
import { prepareElementForPDF, cleanupElementAfterPDF, getPDFExportOptions, PdfExportOptions } from '@/lib/pdf-export';
import { Button } from '@/components/ui/button';
import SectionCard from './SectionCard';
import { Download, FileDown, Settings, Maximize } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { PDFExportDialog } from './PDFExportDialog';

interface DownloadSectionProps {
  resumeData: ResumeData;
}

export default function DownloadSection({ resumeData }: DownloadSectionProps) {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleExportPDF = async (options?: PdfExportOptions) => {
    if (!isClient || isExporting) return;
    let element: HTMLElement | null = null;
    
    try {
      setIsExporting(true);
      toast({
        title: 'Preparing PDF Export',
        description: 'Generating perfectly fitted A4 PDF...',
      });

      element = document.getElementById('resume-content-printable-area');
      if (!element) {
        throw new Error('Resume content printable area element not found');
      }

      // Prepare element for PDF export
      prepareElementForPDF(element);

      // Use the new single-page export function for perfect A4 fit
      const { exportResumeAsSinglePagePDF } = await import('@/lib/pdf-export');
      
      // Generate filename from resume data
      const name = 'resume'; // Fallback to 'resume' since we don't know the exact ResumeData structure
      const defaultFilename = `${name}_${Date.now()}.pdf`;
      
      await exportResumeAsSinglePagePDF(
        element, 
        options?.filename || defaultFilename, 
        options?.quality ?? 0.95
      );

      toast({
        title: 'PDF Export Successful',
        description: 'Your resume has been exported as a perfectly fitted A4 PDF.',
      });

    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: 'PDF Export Failed',
        description: error instanceof Error ? error.message : 'Could not export the resume as PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      if (element) {
        cleanupElementAfterPDF(element);
      }
      setIsExporting(false);
    }
  };

  // Export with margins (alternative option)
  const handleExportPDFWithMargins = async (options?: PdfExportOptions & { marginMm?: number }) => {
    if (!isClient || isExporting) return;
    let element: HTMLElement | null = null;
    
    try {
      setIsExporting(true);
      toast({
        title: 'Preparing PDF Export',
        description: 'Generating stretched PDF with margins...',
      });

      element = document.getElementById('resume-content-printable-area');
      if (!element) {
        throw new Error('Resume content printable area element not found');
      }

      prepareElementForPDF(element);

      const { exportResumeAsStretchedPDFWithMargins } = await import('@/lib/pdf-export');
      
      const name = 'resume'; // Fallback to 'resume' since we don't know the exact ResumeData structure
      const defaultFilename = `${name}_margins_${Date.now()}.pdf`;
      
      await exportResumeAsStretchedPDFWithMargins(
        element, 
        options?.filename || defaultFilename, 
        options?.quality ?? 0.95,
        options?.marginMm ?? 10
      );

      toast({
        title: 'PDF Export Successful',
        description: 'Your resume has been exported as a stretched PDF with margins.',
      });

    } catch (error) {
      console.error('Error exporting PDF with margins:', error);
      toast({
        title: 'PDF Export Failed',
        description: error instanceof Error ? error.message : 'Could not export the resume as PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
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
              title="Export as perfectly fitted A4 PDF (stretched to fill entire page)"
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
                  <Maximize className="mr-2 h-4 w-4" /> Perfect A4 Fit
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

          {/* Quick export with margins option */}
          <Button 
            onClick={() => handleExportPDFWithMargins({ marginMm: 10 })} 
            variant="outline"
            className="w-full"
            disabled={isExporting}
            title="Export with small margins (10mm) but stretched to fit"
          >
            <FileDown className="mr-2 h-4 w-4" /> 
            Export with Margins
          </Button>
        </div>
      </SectionCard>
    </>
  );
}