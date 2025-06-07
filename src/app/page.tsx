
'use client';

import { useState, useEffect, Suspense } from 'react';
import type { ResumeData, Template } from '@/types/resume';
import { initialResumeData, sampleTemplates } from '@/types/resume';
import Header from '@/components/layout/Header';
import ResumeForm from '@/components/resume/ResumeForm';
import TemplateSelector from '@/components/resume/TemplateSelector';
import ResumePreview from '@/components/resume/ResumePreview';
import AISuggestionsPanel from '@/components/resume/AISuggestionsPanel';
import DownloadSection from '@/components/resume/DownloadSection';
import { Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';

export default function ResumeFlowPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem('resumeFlowData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved resume data", e);
        localStorage.removeItem('resumeFlowData');
      }
    }
    const savedTemplate = localStorage.getItem('resumeFlowTemplate');
    if (savedTemplate && sampleTemplates.find(t => t.id === savedTemplate)) {
      setSelectedTemplateId(savedTemplate);
    } else if (sampleTemplates.length > 0) {
      setSelectedTemplateId(sampleTemplates[0].id);
    }
  }, []);

  useEffect(() => {
    if(isClient) {
      localStorage.setItem('resumeFlowData', JSON.stringify(resumeData));
    }
  }, [resumeData, isClient]);

  useEffect(() => {
    if(isClient && selectedTemplateId) {
      localStorage.setItem('resumeFlowTemplate', selectedTemplateId);
    }
  }, [selectedTemplateId, isClient]);


  const handleUpdateResumeData = (newData: ResumeData) => {
    setResumeData(newData);
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const selectedTemplate = sampleTemplates.find(t => t.id === selectedTemplateId) || sampleTemplates[0] || null;

  if (!isClient) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <div className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg text-muted-foreground">Loading ResumeFlow Editor...</p>
            </div>
        </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-background">
        <Sidebar className="border-r w-96 lg:w-[26rem] xl:w-[28rem]" collapsible="icon">
          <SidebarHeader className="p-4 border-b">
            <h2 className="text-xl font-semibold font-headline text-primary">Controls</h2>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <Accordion type="multiple" defaultValue={['resume-content']} className="w-full">
              <AccordionItem value="resume-content">
                <AccordionTrigger className="text-base font-medium hover:no-underline">Resume Content</AccordionTrigger>
                <AccordionContent className="pt-2">
                  <ResumeForm resumeData={resumeData} onUpdate={handleUpdateResumeData} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="templates">
                <AccordionTrigger className="text-base font-medium hover:no-underline">Templates & Appearance</AccordionTrigger>
                <AccordionContent className="pt-2">
                  <TemplateSelector
                    templates={sampleTemplates}
                    selectedTemplateId={selectedTemplateId}
                    onSelectTemplate={handleSelectTemplate}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ai-assistant">
                <AccordionTrigger className="text-base font-medium hover:no-underline">AI Assistant</AccordionTrigger>
                <AccordionContent className="pt-2">
                  <AISuggestionsPanel resumeData={resumeData} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="export">
                <AccordionTrigger className="text-base font-medium hover:no-underline">Download & Export</AccordionTrigger>
                <AccordionContent className="pt-2">
                  <DownloadSection resumeData={resumeData} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <Header />
          <main className="flex-grow p-6 overflow-auto" id="resume-main-content">
            <div id="resume-preview-printable-area" className="w-full h-full">
              <Suspense fallback={
                <div className="bg-muted/30 p-6 rounded-lg min-h-[600px] grid place-items-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" /> 
                  <p className="mt-2 text-muted-foreground">Loading Preview...</p>
                </div>
              }>
                <ResumePreview resumeData={resumeData} selectedTemplate={selectedTemplate} />
              </Suspense>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
