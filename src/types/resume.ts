
import React from 'react';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  portfolio?: string;
  jobTitle?: string;
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

export interface ResumeTemplateProps {
  resumeData: ResumeData;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  imageUrl: string; 
  dataAiHint: string;
  component: React.FC<ResumeTemplateProps> | React.LazyExoticComponent<React.FC<ResumeTemplateProps>>;
}

export const initialResumeData: ResumeData = {
  personalInfo: { 
    name: 'Alex Johnson', 
    jobTitle: 'Senior Software Engineer', 
    email: 'alex.johnson@example.com', 
    phone: '(555) 123-4567', 
    address: '123 Innovation Drive, Tech City, TX 75001', 
    linkedin: 'linkedin.com/in/alexjohnson', 
    portfolio: 'alexj.dev' 
  },
  summary: 'Dynamic and results-oriented senior software engineer with 8+ years of experience in developing, scaling, and leading development of cutting-edge web applications and cloud-native solutions. Proficient in full-stack development (JavaScript, React, Node.js, Python) with a strong emphasis on microservices architecture, CI/CD pipelines, and agile methodologies. Proven ability to deliver high-quality software, mentor engineering teams, and drive technical strategy. Passionate about creating intuitive user experiences and solving complex distributed systems problems. Seeking to leverage robust technical expertise and leadership skills to contribute to impactful and innovative projects.',
  experience: [
    { id: 'exp1', jobTitle: 'Senior Software Engineer', company: 'Innovatech Solutions', location: 'Tech City, TX', startDate: '06/2021', endDate: 'Present', responsibilities: 'Led a team of 5 engineers in designing and implementing a new multi-tenant SaaS platform, resulting in a 30% increase in user engagement and 20% reduction in operational costs.\nArchitected and deployed a scalable microservices-based backend using Node.js, Express, and Kubernetes on AWS.\nEstablished CI/CD pipelines using Jenkins and GitLab CI, reducing deployment times by 40%.\nMentored junior developers, conducted code reviews, and fostered a culture of high-quality engineering practices.' },
    { id: 'exp2', jobTitle: 'Software Engineer', company: 'WebWorks Inc.', location: 'Austin, TX', startDate: '07/2018', endDate: '05/2021', responsibilities: 'Developed and maintained front-end features for a high-traffic e-commerce website (2M+ monthly visitors) using React, Redux, and TypeScript.\nCollaborated with UX/UI designers and product managers to translate mockups and requirements into responsive and interactive web pages.\nImproved application performance by 20% through targeted code optimization, lazy loading strategies, and bundle size reduction.\nIntegrated third-party APIs for payment processing, shipping, and analytics.' },
    { id: 'exp3', jobTitle: 'Junior Developer', company: 'StartRight Co.', location: 'Remote', startDate: '05/2016', endDate: '06/2018', responsibilities: 'Assisted in the development of client websites using HTML, CSS, JavaScript, and jQuery.\nParticipated in daily stand-ups and agile sprint planning sessions.\nContributed to bug fixing and feature enhancements on existing projects.' }
  ],
  education: [
    { id: 'edu1', degree: 'M.S. in Computer Science', institution: 'University of Technology', location: 'Techville, CA', graduationDate: '05/2018', details: 'Thesis: "Advanced Algorithms for AI-driven Analytics & Distributed Systems Performance."' },
    { id: 'edu2', degree: 'B.S. in Software Engineering', institution: 'State College', location: 'Hometown, ST', graduationDate: '05/2016', details: 'Graduated Magna Cum Laude, Capstone Project on IoT-based Smart Home Automation.' }
  ],
  skills: ['JavaScript (ESNext)', 'TypeScript', 'React (Hooks, Context API)', 'Redux', 'Node.js', 'Express.js', 'Python', 'Django', 'Flask', 'SQL (PostgreSQL, MySQL)', 'NoSQL (MongoDB, Redis)', 'AWS (EC2, S3, Lambda, EKS)', 'Docker', 'Kubernetes', 'Terraform', 'Git', 'CI/CD (Jenkins, GitLab CI)', 'Agile Methodologies', 'Microservices Architecture', 'RESTful APIs', 'GraphQL', 'System Design', 'Problem Solving', 'Team Leadership', 'Technical Mentorship'],
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
    imageUrl: 'https://placehold.co/300x400.png', 
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
];
