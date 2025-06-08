
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
import { Loader2, PanelLeft, PanelRight, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ResumeFlowPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-close sidebars on mobile if they're open
      if (mobile && (leftSidebarOpen || rightSidebarOpen)) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [leftSidebarOpen, rightSidebarOpen]);
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

    // Load sidebar states
    const savedLeftSidebar = localStorage.getItem('resumeFlowLeftSidebar');
    const savedRightSidebar = localStorage.getItem('resumeFlowRightSidebar');
    if (savedLeftSidebar !== null) {
      setLeftSidebarOpen(JSON.parse(savedLeftSidebar));
    }
    if (savedRightSidebar !== null) {
      setRightSidebarOpen(JSON.parse(savedRightSidebar));
    }

    // On mobile, close both sidebars by default
    if (window.innerWidth < 768) {
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
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

  // Save sidebar states
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('resumeFlowLeftSidebar', JSON.stringify(leftSidebarOpen));
    }
  }, [leftSidebarOpen, isClient]);
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('resumeFlowRightSidebar', JSON.stringify(rightSidebarOpen));
    }
  }, [rightSidebarOpen, isClient]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + B for left sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setLeftSidebarOpen(prev => !prev);
      }
      // Ctrl/Cmd + T for right sidebar (templates)
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        setRightSidebarOpen(prev => !prev);
      }
      // Escape to close sidebars on mobile
      if (e.key === 'Escape' && isMobile) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile]);

  // Close sidebars when clicking overlay on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    }
  };


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
  }  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background relative">
      {/* Mobile Overlay */}
      {isMobile && (leftSidebarOpen || rightSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Left Sidebar - Resume Content & Details */}
      <div className={`${
        isMobile ? 'fixed left-0 top-0 h-full z-50' : 'relative'
      } transition-all duration-300 border-r bg-sidebar text-sidebar-foreground ${
        leftSidebarOpen 
          ? isMobile 
            ? 'w-80 translate-x-0' 
            : 'w-80 lg:w-[22rem] xl:w-[24rem]'
          : isMobile 
            ? 'w-80 -translate-x-full' 
            : 'w-12'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            {leftSidebarOpen && (
              <h2 className="text-lg font-semibold font-headline text-sidebar-primary">Resume Details</h2>
            )}            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                  className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <PanelLeft className={`h-4 w-4 transition-transform ${leftSidebarOpen ? '' : 'rotate-180'}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div className="text-center">
                  <div>{leftSidebarOpen ? 'Close' : 'Open'} sidebar</div>
                  <div className="text-xs opacity-70 flex items-center gap-1 mt-1">
                    <Keyboard className="h-3 w-3" />
                    Ctrl+B
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          {leftSidebarOpen && (
            <div className="flex-1 p-4 overflow-auto">
              <Accordion type="multiple" defaultValue={['resume-content']} className="w-full">
                <AccordionItem value="resume-content">
                  <AccordionTrigger className="text-base font-medium hover:no-underline">Resume Content</AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <ResumeForm resumeData={resumeData} onUpdate={handleUpdateResumeData} />
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
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />        {/* Mobile Sidebar Toggles */}
        {isMobile && (
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b px-4 py-2 flex items-center justify-between lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLeftSidebarOpen(true)}
              className="flex items-center gap-2 text-xs"
            >
              <PanelLeft className="h-4 w-4" />
              Resume & AI
            </Button>
            <div className="text-xs text-muted-foreground font-medium">
              ResumeFlow Mobile
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRightSidebarOpen(true)}
              className="flex items-center gap-2 text-xs"
            >
              Templates
              <PanelRight className="h-4 w-4" />
            </Button>
          </div>
        )}
        <main className="flex-1 p-6 overflow-auto" id="resume-main-content">
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
      </div>

      {/* Right Sidebar - Templates & Appearance */}
      <div className={`${
        isMobile ? 'fixed right-0 top-0 h-full z-50' : 'relative'
      } transition-all duration-300 border-l bg-sidebar text-sidebar-foreground ${
        rightSidebarOpen 
          ? isMobile 
            ? 'w-80 translate-x-0' 
            : 'w-80 lg:w-[22rem] xl:w-[24rem]'
          : isMobile 
            ? 'w-80 translate-x-full' 
            : 'w-12'
      }`}>
        <div className="h-full flex flex-col">          <div className="p-4 border-b flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                  className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <PanelRight className={`h-4 w-4 transition-transform ${rightSidebarOpen ? 'rotate-180' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <div className="text-center">
                  <div>{rightSidebarOpen ? 'Close' : 'Open'} sidebar</div>
                  <div className="text-xs opacity-70 flex items-center gap-1 mt-1">
                    <Keyboard className="h-3 w-3" />
                    Ctrl+T
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
            {rightSidebarOpen && (
              <h2 className="text-lg font-semibold font-headline text-sidebar-primary">Templates & Style</h2>
            )}
          </div>
          {rightSidebarOpen && (
            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                <TemplateSelector
                  templates={sampleTemplates}
                  selectedTemplateId={selectedTemplateId}
                  onSelectTemplate={handleSelectTemplate}
                />
              </div>
            </div>          )}
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
