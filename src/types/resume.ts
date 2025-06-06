
import React from 'react';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  portfolio?: string;
  jobTitle?: string; // Added to personalInfo for some templates
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
  imageUrl: string; // Kept for potential future use or different display modes
  dataAiHint: string;
  component: React.FC<ResumeTemplateProps> | React.LazyExoticComponent<React.FC<ResumeTemplateProps>>;
}

export const initialResumeData: ResumeData = {
  personalInfo: { name: 'Alex Johnson', jobTitle: 'Senior Software Engineer', email: 'alex.johnson@example.com', phone: '(555) 123-4567', address: '123 Innovation Drive, Tech City, TX 75001', linkedin: 'linkedin.com/in/alexjohnson', portfolio: 'alexj.dev' },
  summary: 'Dynamic and results-oriented software engineer with 5+ years of experience in developing and scaling web applications. Proficient in JavaScript, React, and Node.js, with a passion for creating intuitive user experiences and solving complex problems. Seeking to leverage strong technical skills and collaborative mindset to contribute to innovative projects.',
  experience: [
    { id: 'exp1', jobTitle: 'Senior Software Engineer', company: 'Innovatech Solutions', location: 'Tech City, TX', startDate: '06/2021', endDate: 'Present', responsibilities: 'Led a team of 5 engineers in developing a new SaaS platform, resulting in a 30% increase in user engagement.\nArchitected and implemented a microservices-based backend using Node.js and Express.\nMentored junior developers and conducted code reviews to ensure high-quality standards.' },
    { id: 'exp2', jobTitle: 'Software Engineer', company: 'WebWorks Inc.', location: 'Austin, TX', startDate: '07/2018', endDate: '05/2021', responsibilities: 'Developed and maintained front-end features for a high-traffic e-commerce website using React and Redux.\nCollaborated with UX/UI designers to translate mockups into responsive and interactive web pages.\nImproved application performance by 20% through code optimization and refactoring.' }
  ],
  education: [
    { id: 'edu1', degree: 'M.S. in Computer Science', institution: 'University of Technology', location: 'Techville, CA', graduationDate: '05/2018', details: 'Thesis: "Advanced Algorithms for AI-driven Analytics"' },
    { id: 'edu2', degree: 'B.S. in Software Engineering', institution: 'State College', location: 'Hometown, ST', graduationDate: '05/2016', details: 'Graduated Magna Cum Laude' }
  ],
  skills: ['JavaScript (ES6+)', 'React', 'Node.js', 'Express.js', 'Python', 'Django', 'SQL', 'NoSQL (MongoDB)', 'AWS', 'Docker', 'Git', 'Agile Methodologies', 'Problem Solving', 'Team Leadership'],
};

const MinimalistArchitectTemplateLazy: React.LazyExoticComponent<React.FC<ResumeTemplateProps>> = React.lazy(() => import('@/components/resume/templates/MinimalistArchitectTemplate'));
const AvantGardeImpactTemplateLazy: React.LazyExoticComponent<React.FC<ResumeTemplateProps>> = React.lazy(() => import('@/components/resume/templates/AvantGardeImpactTemplate'));
const TechInnovatorDarkTemplateLazy: React.LazyExoticComponent<React.FC<ResumeTemplateProps>> = React.lazy(() => import('@/components/resume/templates/TechInnovatorDarkTemplate'));
const ElegantStorytellerSerifTemplateLazy: React.LazyExoticComponent<React.FC<ResumeTemplateProps>> = React.lazy(() => import('@/components/resume/templates/ElegantStorytellerSerifTemplate'));
const VibrantGradientUIUXTemplateLazy: React.LazyExoticComponent<React.FC<ResumeTemplateProps>> = React.lazy(() => import('@/components/resume/templates/VibrantGradientUIUXTemplate'));
const MonochromeFocusTemplateLazy: React.LazyExoticComponent<React.FC<ResumeTemplateProps>> = React.lazy(() => import('@/components/resume/templates/MonochromeFocusTemplate'));


export const sampleTemplates: Template[] = [
  {
    id: 'minimalist-architect',
    name: 'Minimalist Architect',
    description: 'Geometric precision, ample white space. For architects, engineers, or technical roles valuing clarity.',
    imageUrl: 'https://placehold.co/300x400.png', // imageUrl remains, could be used for other contexts
    dataAiHint: 'resume minimalist modern',
    component: MinimalistArchitectTemplateLazy,
  },
  {
    id: 'avant-garde-impact',
    name: 'Avant-Garde Impact',
    description: 'Bold typography, unconventional layout. For visionary creatives and artists who dare to be different.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume artistic bold',
    component: AvantGardeImpactTemplateLazy,
  },
  {
    id: 'tech-innovator-dark',
    name: 'Tech Innovator (Dark)',
    description: 'Sleek dark theme with vibrant accents. Ideal for cutting-edge tech roles, cybersecurity, or game developers.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume tech darkmode',
    component: TechInnovatorDarkTemplateLazy,
  },
  {
    id: 'elegant-storyteller-serif',
    name: 'Elegant Storyteller (Serif)',
    description: 'Classic serif fonts, sophisticated layout. For writers, editors, academics, or legal professionals.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume elegant serif',
    component: ElegantStorytellerSerifTemplateLazy,
  },
  {
    id: 'vibrant-gradient-ui-ux',
    name: 'Vibrant Gradient UI/UX',
    description: 'Modern gradients, focus on UI elements. Perfect for UI/UX designers and front-end developers.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume design gradient',
    component: VibrantGradientUIUXTemplateLazy,
  },
  {
    id: 'monochrome-focus',
    name: 'Monochrome Focus',
    description: 'Striking black and white design, emphasizing typography and structure. For minimalists who want impact.',
    imageUrl: 'https://placehold.co/300x400.png',
    dataAiHint: 'resume monochrome minimalist',
    component: MonochromeFocusTemplateLazy,
  }
  // Templates without a 'component' property are effectively removed by not being listed here.
];

// Ensure all template components are 'use client' if they use hooks or interactivity.
// This is handled within each template file itself.
