/**
 * PDF Export Utilities
 * 
 * This file contains utility functions for exporting resumes to PDF format
 * using html2pdf.js. It handles various edge cases and ensures consistent
 * styling across different browsers and devices.
 */

import type { ResumeData } from '@/types/resume';

/**
 * Options for PDF export
 */
export interface PdfExportOptions {
  margin?: number;
  filename?: string;
  quality?: number;
  scale?: number;
}  

/**
 * Prepares the resume element for PDF export
 * - Adds necessary classes
 * - Ensures all content is visible
 * - Handles potential styling issues
 * 
 * @param element The element to prepare
 * @returns The prepared element
 */
export function prepareElementForPDF(element: HTMLElement): HTMLElement {
  // Add PDF export class to improve rendering
  element.classList.add('pdf-export');
  
  // Ensure all images are loaded
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) return;
    img.style.opacity = '1';
    img.style.visibility = 'visible';
  });
  
  // Ensure all fonts are rendered
  document.fonts.ready.then(() => {
    // Fonts are loaded and ready
    console.log('Fonts loaded for PDF export');
  });
  
  return element;
}

/**
 * Cleans up the element after PDF export
 * 
 * @param element The element to clean up
 */
export function cleanupElementAfterPDF(element: HTMLElement): void {
  // Remove PDF export class
  element.classList.remove('pdf-export');
}

/**
 * Gets the optimal PDF export options based on resume data and user preferences
 * 
 * @param resumeData The resume data
 * @param options Custom options to override defaults
 * @returns The configured options object for html2pdf
 */

// Utility to export resume as a single-page PDF (content stretched to fill entire A4)
export async function exportResumeAsSinglePagePDF(element: HTMLElement, filename = 'resume.pdf', quality = 1) {
  try {
    console.log('[PDF] Starting single-page export with perfect A4 fit:', { filename, quality });
    // Dynamically import html2canvas and jsPDF
    const [html2canvas, { jsPDF }] = await Promise.all([
      import('html2canvas').then(m => m.default || m),
      import('jspdf')
    ]);
    console.log('[PDF] Libraries loaded');

    // Render the element to canvas
    // Use a very high scale for maximum clarity (may increase memory usage)
    const canvas = await html2canvas(element, {
      scale: 4, // Maximum clarity, but may be slower
      useCORS: true,
      backgroundColor: '#fff',
      logging: false,
      allowTaint: false
    });
    console.log('[PDF] Canvas rendered', { width: canvas.width, height: canvas.height });

    // Get image data from canvas
    // Use PNG for lossless quality if icons or graphics look blurry
    const imgData = canvas.toDataURL('image/png'); // PNG is lossless, best for icons
    // For best icon clarity, use SVG icons in your React components and avoid raster images for icons.
    // If using icon fonts, ensure font is loaded before export. If using SVG, clarity will be perfect at any scale.
    console.log('[PDF] Image data created');

    // A4 size in mm
    const a4Width = 210;
    const a4Height = 297;

    // Create PDF and stretch image to fill entire A4 page (no margins, perfect fit)
    const pdf = new jsPDF({ 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait', 
      compress: true 
    });
    
    // Add image stretched to fill the entire A4 page
    // x=0, y=0 (no margins), width=full A4 width, height=full A4 height
    pdf.addImage(imgData, 'JPEG', 0, 0, a4Width, a4Height);
    
    pdf.save(filename);
    console.log('[PDF] PDF saved with content stretched to perfect A4 fit');
  } catch (err) {
    console.error('[PDF] Error during export:', err);
    throw err;
  }
}

// Alternative function for stretching with minimal margins if preferred
export async function exportResumeAsStretchedPDFWithMargins(element: HTMLElement, filename = 'resume.pdf', quality = 1, marginMm = 5) {
  try {
    console.log('[PDF] Starting stretched export with margins:', { filename, quality, marginMm });
    const [html2canvas, { jsPDF }] = await Promise.all([
      import('html2canvas').then(m => m.default || m),
      import('jspdf')
    ]);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fff',
      logging: false,
      allowTaint: false
    });

    const imgData = canvas.toDataURL('image/jpeg', quality);

    // A4 size in mm with margins
    const a4Width = 210;
    const a4Height = 297;
    const contentWidth = a4Width - (marginMm * 2);
    const contentHeight = a4Height - (marginMm * 2);

    const pdf = new jsPDF({ 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait', 
      compress: true 
    });
    
    // Add image stretched to fill the content area (with margins)
    pdf.addImage(imgData, 'JPEG', marginMm, marginMm, contentWidth, contentHeight);
    
    pdf.save(filename);
    console.log('[PDF] PDF saved with content stretched to fit A4 with margins');
  } catch (err) {
    console.error('[PDF] Error during export:', err);
    throw err;
  }
}

// Dummy fallback for legacy html2pdf.js usage (not recommended for single-page export)
export function getPDFExportOptions(resumeData: any, options?: PdfExportOptions): any {
  // Try to get name from resumeData, fallback to 'resume'
  const name = resumeData?.name || resumeData?.basics?.name || 'resume';
  const filename = options?.filename || `${name.replace(/\s+/g, '_')}.pdf`;
  return {
    margin: options?.margin ?? 0, // Set to 0 for perfect fit
    filename,
    image: { 
      type: 'jpeg', 
      quality: options?.quality ?? 0.98 
    },
    html2canvas: { 
      scale: options?.scale ?? 2,
      useCORS: true,
      logging: false,
      allowTaint: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    }
  };
}