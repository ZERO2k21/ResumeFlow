'use client';

import { useState, useEffect } from 'react';
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
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(sampleTemplates[0]?.id || null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure crypto.randomUUID() is called only on client-side
    setIsClient(true);
    // Load from local storage if available
    const savedData = localStorage.getItem('resumeFlowData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved resume data", e);
        localStorage.removeItem('resumeFlowData'); // Clear corrupted data
      }
    }
    const savedTemplate = localStorage.getItem('resumeFlowTemplate');
    if (savedTemplate) {
      setSelectedTemplateId(savedTemplate);
    }
  }, []);

  useEffect(() => {
    if(isClient) { // Save to local storage on data change
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

  const selectedTemplate = sampleTemplates.find(t => t.id === selectedTemplateId) || null;

  if (!isClient) {
    // Render a loading state or null during SSR to avoid hydration mismatch due to crypto.randomUUID or localStorage
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
          {/* Left Column - Form */}
          <div className="lg:col-span-4 space-y-6">
            <ResumeForm resumeData={resumeData} onUpdate={handleUpdateResumeData} />
          </div>

          {/* Middle Column - Preview */}
          <div className="lg:col-span-5 space-y-6">
            {/* Sticky positioning for preview on larger screens */}
            <div className="lg:sticky lg:top-6">
              <ResumePreview resumeData={resumeData} selectedTemplate={selectedTemplate} />
            </div>
          </div>

          {/* Right Column - Tools */}
          <div className="lg:col-span-3 space-y-6">
             {/* Sticky positioning for tools on larger screens */}
            <div className="lg:sticky lg:top-6 space-y-6">
              <TemplateSelector 
                templates={sampleTemplates} 
                selectedTemplateId={selectedTemplateId} 
                onSelectTemplate={handleSelectTemplate} 
              />
              <AISuggestionsPanel resumeData={resumeData} />
              <DownloadSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
