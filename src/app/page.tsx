
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
      setSelectedTemplateId(sampleTemplates[0].id); // Default to first template if saved one is invalid or not found
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
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4 grid place-items-center">
                <p>Loading ResumeFlow...</p>
            </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <ResumeForm resumeData={resumeData} onUpdate={handleUpdateResumeData} />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="lg:sticky lg:top-6">
              <Suspense fallback={<div className="bg-muted/30 p-6 rounded-lg min-h-[600px] grid place-items-center"><p>Loading Preview...</p></div>}>
                <ResumePreview resumeData={resumeData} selectedTemplate={selectedTemplate} />
              </Suspense>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="lg:sticky lg:top-6 space-y-6">
              <TemplateSelector 
                templates={sampleTemplates} 
                selectedTemplateId={selectedTemplateId} 
                onSelectTemplate={handleSelectTemplate} 
              />
              <AISuggestionsPanel resumeData={resumeData} />
              <DownloadSection resumeData={resumeData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
