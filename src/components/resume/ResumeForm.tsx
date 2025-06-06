'use client';

import type { ChangeEvent, FormEvent } from 'react';
import type { ResumeData, WorkExperience, EducationEntry } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import SectionCard from './SectionCard';
import { User, AlignLeft, Briefcase, GraduationCap, Lightbulb, PlusCircle, Trash2 } from 'lucide-react';

interface ResumeFormProps {
  resumeData: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export default function ResumeForm({ resumeData, onUpdate }: ResumeFormProps) {
  const handleInputChange = (section: keyof ResumeData, field: string, value: string) => {
    if (section === 'personalInfo') {
      onUpdate({
        ...resumeData,
        personalInfo: { ...resumeData.personalInfo, [field]: value },
      });
    } else {
      onUpdate({ ...resumeData, [section]: value });
    }
  };

  const handleArrayChange = <T extends WorkExperience | EducationEntry>(
    section: 'experience' | 'education',
    index: number,
    field: keyof T,
    value: string
  ) => {
    const updatedArray = [...resumeData[section]];
    updatedArray[index] = { ...updatedArray[index], [field]: value } as T;
    onUpdate({ ...resumeData, [section]: updatedArray });
  };
  
  const handleSkillsChange = (index: number, value: string) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    onUpdate({ ...resumeData, skills: updatedSkills });
  };

  const addToArray = (section: 'experience' | 'education') => {
    const newItem = section === 'experience'
      ? { id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }
      : { id: crypto.randomUUID(), degree: '', institution: '', location: '', graduationDate: '', details: '' };
    onUpdate({ ...resumeData, [section]: [...resumeData[section], newItem] });
  };

  const removeFromArray = (section: 'experience' | 'education', index: number) => {
    const updatedArray = resumeData[section].filter((_, i) => i !== index);
    onUpdate({ ...resumeData, [section]: updatedArray });
  };

  const addSkill = () => {
    onUpdate({ ...resumeData, skills: [...resumeData.skills, ''] });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    onUpdate({ ...resumeData, skills: updatedSkills });
  };


  return (
    <div className="space-y-6">
      <SectionCard title="Personal Information" icon={<User className="h-5 w-5" />}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={resumeData.personalInfo.name} onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={resumeData.personalInfo.email} onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" value={resumeData.personalInfo.phone} onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={resumeData.personalInfo.address} onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
            <Input id="linkedin" value={resumeData.personalInfo.linkedin || ''} onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)} />
          </div>
           <div>
            <Label htmlFor="portfolio">Portfolio URL</Label>
            <Input id="portfolio" value={resumeData.personalInfo.portfolio || ''} onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Summary / Objective" icon={<AlignLeft className="h-5 w-5" />}>
        <Textarea 
          placeholder="Write a brief summary or career objective..." 
          value={resumeData.summary}
          onChange={(e) => onUpdate({...resumeData, summary: e.target.value})}
          rows={5}
        />
      </SectionCard>

      <SectionCard title="Work Experience" icon={<Briefcase className="h-5 w-5" />}>
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="space-y-3 p-4 border rounded-md mb-4 relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => removeFromArray('experience', index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <div><Label>Job Title</Label><Input value={exp.jobTitle} onChange={(e) => handleArrayChange('experience', index, 'jobTitle', e.target.value)} /></div>
            <div><Label>Company</Label><Input value={exp.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} /></div>
            <div><Label>Location</Label><Input value={exp.location} onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Start Date</Label><Input type="text" placeholder="MM/YYYY" value={exp.startDate} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} /></div>
              <div><Label>End Date</Label><Input type="text" placeholder="MM/YYYY or Present" value={exp.endDate} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} /></div>
            </div>
            <div><Label>Responsibilities / Achievements</Label><Textarea rows={4} value={exp.responsibilities} onChange={(e) => handleArrayChange('experience', index, 'responsibilities', e.target.value)} /></div>
          </div>
        ))}
        <Button variant="outline" onClick={() => addToArray('experience')} className="mt-2 w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </SectionCard>

      <SectionCard title="Education" icon={<GraduationCap className="h-5 w-5" />}>
        {resumeData.education.map((edu, index) => (
          <div key={edu.id} className="space-y-3 p-4 border rounded-md mb-4 relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => removeFromArray('education', index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <div><Label>Degree / Certificate</Label><Input value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} /></div>
            <div><Label>Institution</Label><Input value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} /></div>
            <div><Label>Location</Label><Input value={edu.location} onChange={(e) => handleArrayChange('education', index, 'location', e.target.value)} /></div>
            <div><Label>Graduation Date</Label><Input type="text" placeholder="MM/YYYY or Expected" value={edu.graduationDate} onChange={(e) => handleArrayChange('education', index, 'graduationDate', e.target.value)} /></div>
            <div><Label>Details (Optional)</Label><Textarea rows={2} value={edu.details || ''} onChange={(e) => handleArrayChange('education', index, 'details', e.target.value)} /></div>
          </div>
        ))}
        <Button variant="outline" onClick={() => addToArray('education')} className="mt-2 w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </SectionCard>

      <SectionCard title="Skills" icon={<Lightbulb className="h-5 w-5" />}>
        <div className="space-y-2">
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input 
              placeholder="e.g., JavaScript, Project Management"
              value={skill}
              onChange={(e) => handleSkillsChange(index, e.target.value)}
            />
            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeSkill(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        </div>
         <Button variant="outline" onClick={addSkill} className="mt-2 w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </SectionCard>
    </div>
  );
}
