'use client';

import type { ResumeData, Template } from '@/types/resume';
import SectionCard from './SectionCard';
import { Eye } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: Template | null;
}

export default function ResumePreview({ resumeData, selectedTemplate }: ResumePreviewProps) {
  return (
    <SectionCard title="Live Preview" icon={<Eye className="h-5 w-5" />} className="sticky top-6">
      <div className="bg-muted/30 p-6 rounded-lg min-h-[600px] prose prose-sm max-w-none">
        {selectedTemplate && (
          <div className="mb-4 p-2 bg-accent/20 rounded text-center">
            <p className="font-semibold font-headline text-accent-foreground">Template: {selectedTemplate.name}</p>
          </div>
        )}
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-headline !my-0">{resumeData.personalInfo.name || "Your Name"}</h2>
          <p className="!my-1">
            {resumeData.personalInfo.email || "your.email@example.com"} | {resumeData.personalInfo.phone || "(123) 456-7890"}
          </p>
          <p className="!my-1">{resumeData.personalInfo.address || "Your Address, City, State"}</p>
          {resumeData.personalInfo.linkedin && <p className="!my-1">LinkedIn: {resumeData.personalInfo.linkedin}</p>}
          {resumeData.personalInfo.portfolio && <p className="!my-1">Portfolio: {resumeData.personalInfo.portfolio}</p>}
        </div>

        {resumeData.summary && (
          <section className="mb-4">
            <h3 className="text-xl font-semibold font-headline border-b-2 border-primary pb-1">Summary</h3>
            <p>{resumeData.summary}</p>
          </section>
        )}

        {resumeData.experience.length > 0 && resumeData.experience[0]?.jobTitle && (
          <section className="mb-4">
            <h3 className="text-xl font-semibold font-headline border-b-2 border-primary pb-1">Work Experience</h3>
            {resumeData.experience.map((exp) => exp.jobTitle && (
              <div key={exp.id} className="mb-3">
                <h4 className="text-lg font-semibold !my-0">{exp.jobTitle}</h4>
                <p className="!my-0 font-medium">{exp.company} - {exp.location}</p>
                <p className="!my-0 text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                {exp.responsibilities && <p className="whitespace-pre-wrap mt-1">{exp.responsibilities}</p>}
              </div>
            ))}
          </section>
        )}

        {resumeData.education.length > 0 && resumeData.education[0]?.degree && (
          <section className="mb-4">
            <h3 className="text-xl font-semibold font-headline border-b-2 border-primary pb-1">Education</h3>
            {resumeData.education.map((edu) => edu.degree && (
              <div key={edu.id} className="mb-3">
                <h4 className="text-lg font-semibold !my-0">{edu.degree}</h4>
                <p className="!my-0 font-medium">{edu.institution} - {edu.location}</p>
                <p className="!my-0 text-xs text-muted-foreground">{edu.graduationDate}</p>
                {edu.details && <p className="mt-1">{edu.details}</p>}
              </div>
            ))}
          </section>
        )}

        {resumeData.skills.length > 0 && resumeData.skills[0] && (
          <section>
            <h3 className="text-xl font-semibold font-headline border-b-2 border-primary pb-1">Skills</h3>
            <ul className="list-disc pl-5">
              {resumeData.skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {!resumeData.personalInfo.name && !resumeData.summary && resumeData.experience.length === 0 && resumeData.education.length === 0 && resumeData.skills.length === 0 && (
          <p className="text-center text-muted-foreground">Start filling out the form to see your resume here!</p>
        )}
      </div>
    </SectionCard>
  );
}
