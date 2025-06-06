'use client';

import Image from 'next/image';
import type { Template } from '@/types/resume';
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
            <CardContent className="p-0 aspect-[3/4] relative">
              <Image 
                src={template.imageUrl} 
                alt={template.name} 
                layout="fill"
                objectFit="cover" 
                className="rounded-b-md"
                data-ai-hint={template.dataAiHint}
              />
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
