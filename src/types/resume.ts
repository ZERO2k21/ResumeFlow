
import React from 'react';
// Removed direct import of MinimalistArchitectTemplate type as React.lazy will handle it.

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  portfolio?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  details?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: EducationEntry[];
  skills: string[];
}

// Define a shared props type for resume template components
export interface ResumeTemplateProps {
  resumeData: ResumeData;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  component?: React.FC<ResumeTemplateProps> | React.LazyExoticComponent<React.FC<ResumeTemplateProps>>;
}

export const initialResumeData: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', address: '', linkedin: '', portfolio: '' },
  summary: '',
  experience: [{ id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'exp1', jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }],
  education: [{ id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'edu1', degree: '', institution: '', location: '', graduationDate: '', details: '' }],
  skills: [''],
};

// Dynamically import the MinimalistArchitectTemplate.
// The component being imported must be a default export.
const MinimalistArchitectTemplateLazy: React.LazyExoticComponent<React.FC<ResumeTemplateProps>> = React.lazy(() => import('@/components/resume/templates/MinimalistArchitectTemplate'));


export const sampleTemplates: Template[] = [
  {
    id: 'minimalist-architect',
    name: 'Minimalist Architect',
    description: 'Geometric precision, ample white space. For architects, engineers, or technical roles valuing clarity.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume minimalist modern',
    component: MinimalistArchitectTemplateLazy,
  },
  {
    id: 'avant-garde-impact',
    name: 'Avant-Garde Impact',
    description: 'Bold typography, unconventional layout. For visionary creatives and artists who dare to be different.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume artistic bold'
  },
  {
    id: 'tech-innovator-dark',
    name: 'Tech Innovator (Dark Mode)',
    description: 'Sleek dark theme with vibrant accents. Ideal for cutting-edge tech roles, cybersecurity, or game developers.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume tech darkmode'
  },
  {
    id: 'elegant-storyteller-serif',
    name: 'Elegant Storyteller (Serif)',
    description: 'Classic serif fonts, sophisticated layout. For writers, editors, academics, or legal professionals.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume elegant serif'
  },
  {
    id: 'dynamic-grid-portfolio',
    name: 'Dynamic Grid Portfolio',
    description: 'Visually engaging grid, perfect for showcasing project thumbnails. Suits designers, photographers, and visual artists.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume portfolio grid'
  },
  {
    id: 'vibrant-gradient-ui-ux',
    name: 'Vibrant Gradient UI/UX',
    description: 'Modern gradients, focus on UI elements. Perfect for UI/UX designers and front-end developers.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume design gradient'
  },
  {
    id: 'infographic-data-viz',
    name: 'Infographic Data-Viz',
    description: 'Uses charts and icons to represent skills and achievements. Great for data analysts, consultants, and project managers.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume infographic data'
  },
  {
    id: 'monochrome-focus',
    name: 'Monochrome Focus',
    description: 'Striking black and white design, emphasizing typography and structure. For minimalists who want impact.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume monochrome minimalist'
  },
  {
    id: 'eco-friendly-natural',
    name: 'Eco-Friendly Natural',
    description: 'Earthy tones, organic feel. For roles in sustainability, environmental science, or wellness.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume natural eco'
  },
  {
    id: 'corporate-suite-modern',
    name: 'Corporate Suite Modern',
    description: 'Professionalism with a contemporary edge, clear hierarchy. Suitable for executives, finance, and corporate roles.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume corporate professional'
  },
  {
    id: 'retro-futuristic-coder',
    name: 'Retro-Futuristic Coder',
    description: '8-bit inspired elements, nostalgic yet forward-looking. For game developers, creative coders, or unique tech roles.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume retro gaming'
  },
  {
    id: 'global-connector-map',
    name: 'Global Connector (Map)',
    description: 'Subtle world map background, highlighting international experience. For international relations, logistics, or travel-related roles.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume map global'
  },
  {
    id: 'blueprint-architectural',
    name: 'Blueprint Architectural',
    description: 'Styled like a technical blueprint. Ideal for architects, engineers, and technical designers.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume blueprint technical'
  },
  {
    id: 'editorial-magazine-layout',
    name: 'Editorial Magazine Layout',
    description: 'Clean, high-end magazine style. Great for marketing, communications, and journalism professionals.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume magazine editorial'
  },
  {
    id: 'quantum-byte',
    name: 'Quantum Byte',
    description: 'Futuristic, circuit-board aesthetics, glowing neon accents. For AI researchers, quantum computing, or advanced tech.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume futuristic tech'
  },
  {
    id: 'zenith-minimal',
    name: 'Zenith Minimal',
    description: 'Extreme minimalism, single accent color, focus on pure typography. For high-level consultants or thought leaders.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume minimalist typography'
  },
  {
    id: 'aurora-splash',
    name: 'Aurora Splash',
    description: 'Holographic gradients, fluid shapes, ethereal feel. For digital artists, AR/VR developers, or innovative brand strategists.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume holographic gradient'
  },
  {
    id: 'nomad-cartographer',
    name: 'Nomad Cartographer',
    description: 'Vintage map elements, passport stamp motifs, adventure-inspired. For travel writers, remote work specialists, or global project managers.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume travel map'
  },
  {
    id: 'origami-fold',
    name: 'Origami Fold',
    description: 'Geometric folds, paper texture effects, clean and structured. For product designers, UI architects, or meticulous organizers.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume geometric paper'
  }
];
