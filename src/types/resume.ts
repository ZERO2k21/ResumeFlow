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
  { id: 'classic', name: 'Classic Professional', description: 'A timeless, clean format.', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'resume professional' },
  { id: 'modern', name: 'Modern Minimalist', description: 'Sleek and contemporary design.', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'resume modern' },
  { id: 'creative', name: 'Creative Bold', description: 'For roles needing a visual statement.', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'resume creative' },
  { id: 'academic', name: 'Academic CV', description: 'Detailed for research and academia.', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'resume academic' },
];
