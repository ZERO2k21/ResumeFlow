
'use client';

import type { ResumeData } from '@/types/resume';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

interface MinimalistArchitectTemplateProps {
  resumeData: ResumeData;
}

export default function MinimalistArchitectTemplate({ resumeData }: MinimalistArchitectTemplateProps) {
  const { personalInfo, summary, experience, education, skills } = resumeData;

  const hasPersonalInfo = personalInfo.name || personalInfo.email || personalInfo.phone || personalInfo.address || personalInfo.linkedin || personalInfo.portfolio;
  const hasExperience = experience.length > 0 && experience.some(exp => exp.jobTitle && exp.company);
  const hasEducation = education.length > 0 && education.some(edu => edu.degree && edu.institution);
  const hasSkills = skills.length > 0 && skills.some(skill => skill.trim() !== '');

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-sm shadow-lg rounded-md border border-gray-200">
      {/* Header Section */}
      {hasPersonalInfo && (
        <header className="mb-8 text-center border-b border-gray-300 pb-6">
          {personalInfo.name && <h1 className="text-4xl font-bold text-primary mb-1">{personalInfo.name}</h1>}
          <div className="flex justify-center items-center space-x-4 text-xs text-gray-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-primary">
                <Mail size={14} className="mr-1.5" /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <Phone size={14} className="mr-1.5" /> {personalInfo.phone}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center space-x-4 text-xs text-gray-600 mt-1.5">
            {personalInfo.address && (
              <span className="flex items-center">
                <MapPin size={14} className="mr-1.5" /> {personalInfo.address}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center space-x-4 text-xs text-gray-600 mt-1.5">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary">
                <Linkedin size={14} className="mr-1.5" /> LinkedIn
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary">
                <Globe size={14} className="mr-1.5" /> Portfolio
              </a>
            )}
          </div>
        </header>
      )}

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-3 gap-x-10">
        {/* Left Column (Wider) */}
        <div className="col-span-2">
          {summary && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-primary border-b-2 border-primary pb-1.5 mb-3">Summary</h2>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </section>
          )}

          {hasExperience && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-primary border-b-2 border-primary pb-1.5 mb-4">Work Experience</h2>
              {experience.filter(exp => exp.jobTitle && exp.company).map((exp) => (
                <div key={exp.id} className="mb-5">
                  <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                  <div className="flex justify-between items-baseline">
                    <p className="font-medium text-gray-700">{exp.company}</p>
                    <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-1.5">{exp.location}</p>
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside pl-5 text-gray-700 space-y-1 mt-1 leading-relaxed">
                      {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim()}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column (Narrower) */}
        <div className="col-span-1">
          {hasEducation && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-primary border-b-2 border-primary pb-1.5 mb-4">Education</h2>
              {education.filter(edu => edu.degree && edu.institution).map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="text-md font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="font-medium text-gray-700">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.location}</p>
                  <p className="text-xs text-gray-500 mb-1">{edu.graduationDate}</p>
                  {edu.details && <p className="text-xs text-gray-600 italic leading-snug">{edu.details}</p>}
                </div>
              ))}
            </section>
          )}

          {hasSkills && (
            <section>
              <h2 className="text-xl font-semibold text-primary border-b-2 border-primary pb-1.5 mb-3">Skills</h2>
              <ul className="flex flex-wrap gap-2">
                {skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                  <li key={index} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full shadow-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
       {!hasPersonalInfo && !summary && !hasExperience && !hasEducation && !hasSkills && (
        <p className="text-center text-gray-500 col-span-3">Start filling out the form to see your resume take shape here with the Minimalist Architect template!</p>
      )}
    </div>
  );
}

// Export type for use in src/types/resume.ts to avoid circular dependencies
// This is a common pattern for components that are also referenced in type definitions.
export type MinimalistArchitectTemplate = typeof MinimalistArchitectTemplate;

