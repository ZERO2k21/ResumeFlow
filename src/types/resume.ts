
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
  responsibilities: string; // Changed to single string for easier textarea input
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

export interface Template {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
}

export const initialResumeData: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', address: '', linkedin: '', portfolio: '' },
  summary: '',
  experience: [{ id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }],
  education: [{ id: crypto.randomUUID(), degree: '', institution: '', location: '', graduationDate: '', details: '' }],
  skills: [''],
};

export const sampleTemplates: Template[] = [
  { id: 'avant-garde', name: 'Avant-Garde Impact', description: 'Bold typography, unconventional layout. For creatives.', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'resume artistic' },
  { id: 'tech-savvy', name: 'Tech Innovator', description: 'Clean lines, modern icons. Ideal for tech roles.', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'resume tech' },
  { id: 'elegant-script', name: 'Elegant Storyteller', description: 'Sophisticated fonts, spacious design. For writers or marketers.', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'resume elegant' },
  { id: 'dynamic-grid', name: 'Dynamic Grid', description: 'Structured yet visually engaging. Suits project managers.', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'resume structured' },
  { id: 'vibrant-ui', name: 'Vibrant UI/UX', description: 'Color accents, portfolio focus. Perfect for designers.', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'resume design' },
];
