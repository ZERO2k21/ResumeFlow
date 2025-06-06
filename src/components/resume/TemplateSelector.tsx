
'use client';

import React, { Suspense } from 'react'; // Added React and Suspense
import type { Template } from '@/types/resume';
import { initialResumeData } from '@/types/resume'; // Added initialResumeData
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SectionCard from './SectionCard';
import { LayoutGrid, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplateId: string | null;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({ templates, selectedTemplateId, onSelectTemplate }: TemplateSelectorProps) {
  // Assuming card width is roughly 200-250px. Resume templates are often designed for ~800px width.
  // Scale factor to fit an 800px wide template into a ~200px preview area. 200/800 = 0.25
  const previewScale = 0.25;

  return (
    <SectionCard title="Select a Template" icon={<LayoutGrid className="h-5 w-5" />}>
      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={cn(
              "cursor-pointer hover:shadow-accent transition-shadow duration-200",
              selectedTemplateId === template.id && "ring-2 ring-accent shadow-accent"
            )}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-base font-headline">{template.name}</CardTitle>
              <CardDescription className="text-xs">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 aspect-[3/4] overflow-hidden bg-background relative border-t border-b border-border/50">
              {/* This inner div provides a slight border for the preview area */}
              <div className="absolute inset-0"> 
                {template.component ? (
                  <Suspense 
                    fallback={
                      <div className="w-full h-full flex items-center justify-center bg-muted/20">
                        <p className="text-xs text-muted-foreground p-2 text-center">Loading Preview...</p>
                      </div>
                    }
                  >
                    <div 
                      className="pointer-events-none transform origin-top-left bg-card" // Use bg-card or bg-white as base
                      style={{ 
                        width: `${100 / previewScale}%`, 
                        height: `${100 / previewScale}%`, 
                        transform: `scale(${previewScale})`,
                      }}
                    >
                       {React.createElement(template.component, { resumeData: initialResumeData })}
                    </div>
                  </Suspense>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted/10 p-2">
                    <p className="text-xs text-muted-foreground text-center">
                      Live preview for this template is not yet available.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-2">
              <Button 
                variant={selectedTemplateId === template.id ? "default" : "outline"} 
                size="sm" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 data-[variant=outline]:bg-transparent data-[variant=outline]:hover:bg-accent/10"
                onClick={(e) => { e.stopPropagation(); onSelectTemplate(template.id); }}
              >
                {selectedTemplateId === template.id ? <CheckCircle2 className="mr-2 h-4 w-4" /> : null}
                {selectedTemplateId === template.id ? 'Selected' : 'Select'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionCard>
  );
}
