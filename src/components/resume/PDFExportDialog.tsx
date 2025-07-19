'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PdfExportOptions } from '@/lib/pdf-export';
import { ResumeData } from '@/types/resume';

interface PDFExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (options: PdfExportOptions) => void;
  resumeData: ResumeData;
}

export function PDFExportDialog({ open, onOpenChange, onExport, resumeData }: PDFExportDialogProps) {
  // Default filename based on user's name
  const defaultFilename = resumeData.basics?.name
    ? `${resumeData.basics.name.replace(/\s+/g, '_')}_Resume.pdf`
    : 'Resume.pdf';

  // State for PDF export options
  const [filename, setFilename] = useState(defaultFilename);
  const [scale, setScale] = useState(2); // Default scale
  const [quality, setQuality] = useState(0.98); // Default quality
  const [margin, setMargin] = useState(10); // Default margin in mm

  // Handle export button click
  const handleExport = () => {
    onExport({
      filename,
      scale,
      quality,
      margin,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>PDF Export Options</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filename" className="text-right">
              Filename
            </Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="scale" className="text-right">
              Quality
            </Label>
            <div className="col-span-3 space-y-2">
              <Slider
                id="scale"
                min={1}
                max={4}
                step={0.5}
                value={[scale]}
                onValueChange={(value) => setScale(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Standard</span>
                <span>High</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quality" className="text-right">
              Image Quality
            </Label>
            <div className="col-span-3 space-y-2">
              <Slider
                id="quality"
                min={0.7}
                max={1}
                step={0.05}
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="margin" className="text-right">
              Margin (mm)
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Slider
                id="margin"
                min={0}
                max={20}
                step={1}
                value={[margin]}
                onValueChange={(value) => setMargin(value[0])}
                className="flex-1"
              />
              <span className="w-8 text-center text-sm">{margin}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleExport}>Export PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}