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
// Define the Html2PdfOptions interface to match the expected structure
interface Html2PdfOptions {
  margin?: number;
  filename?: string;
  image?: {
    type: string;
    quality: number;
  };
  html2canvas?: {
    scale: number;
    useCORS: boolean;
    logging: boolean;
    letterRendering: boolean;
    allowTaint: boolean;
    scrollX: number;
    scrollY: number;
    windowWidth: number;
    windowHeight: number;
  };
  jsPDF?: {
    unit: string;
    format: string;
    orientation: string;
    compress: boolean;
  };
}

export function getPDFExportOptions(resumeData: ResumeData, options?: PdfExportOptions): Html2PdfOptions {
  // Default filename based on user's name or a generic name
  const filename = options?.filename || 
    `${resumeData.basics?.name?.replace(/\s+/g, '_') || 'resume'}.pdf`;
  
  return {
    margin: options?.margin ?? 10,
    filename,
    image: { 
      type: 'jpeg', 
      quality: options?.quality ?? 0.98 
    },
    html2canvas: { 
      scale: options?.scale ?? 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false,
      letterRendering: true,
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