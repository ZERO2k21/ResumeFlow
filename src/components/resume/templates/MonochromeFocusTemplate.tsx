
'use client';

import type { ResumeTemplateProps } from '@/types/resume';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, CheckSquare, Minus } from 'lucide-react';

export default function MonochromeFocusTemplate({ resumeData }: ResumeTemplateProps): JSX.Element {
  const { personalInfo, summary, experience, education, skills } = resumeData;

  const hasPersonalInfo = personalInfo.name || personalInfo.email || personalInfo.phone;
  const hasExperience = experience.length > 0 && experience.some(exp => exp.jobTitle && exp.company);
  const hasEducation = education.length > 0 && education.some(edu => edu.degree && edu.institution);
  const hasSkills = skills.length > 0 && skills.some(skill => skill.trim() !== '');

  return (
    <div className="p-10 bg-white text-black font-['Helvetica_Neue',_Arial,_sans-serif] min-h-[800px] shadow-2xl rounded-md border-2 border-black">
      {/* Header Section */}
      {hasPersonalInfo && (
        <header className="mb-12 text-left relative">
          {personalInfo.name && <h1 className="text-6xl font-extrabold tracking-tighter mb-1">{personalInfo.name.toUpperCase()}</h1>}
          {personalInfo.jobTitle && <p className="text-xl font-light tracking-wider text-gray-600 mb-5">{personalInfo.jobTitle}</p>}
          <div className="h-px bg-black w-1/4 mb-5"></div>
          <div className="space-y-1 text-xs text-gray-700">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:underline">
                <Mail size={14} className="mr-2.5" /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <Phone size={14} className="mr-2.5" /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.address && (
              <span className="flex items-center">
                <MapPin size={14} className="mr-2.5" /> {personalInfo.address}
              </span>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                <Linkedin size={14} className="mr-2.5" /> {personalInfo.linkedin.replace('https://','').replace('www.','')}
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                <Globe size={14} className="mr-2.5" /> {personalInfo.portfolio.replace('https://','').replace('www.','')}
              </a>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-x-8">
        {/* Left Column for Summary and Skills (if they exist) */}
        {(summary || hasSkills) && (
          <div className="col-span-4 space-y-10">
            {summary && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Profile</h2>
                <p className="text-sm leading-relaxed text-justify whitespace-pre-line">{summary}</p>
              </section>
            )}
            {hasSkills && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Expertise</h2>
                <ul className="space-y-1">
                  {skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <Minus size={12} className="mr-2 text-gray-400 shrink-0" />{skill}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
        
        {/* Right Column for Experience and Education (if they exist) */}
        {/* Adjust col-span based on whether the left column is rendered */}
        <div className={`${(summary || hasSkills) ? 'col-span-8' : 'col-span-12'} space-y-10`}>
          {hasExperience && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Experience</h2>
              {experience.filter(exp => exp.jobTitle && exp.company).map((exp) => (
                <div key={exp.id} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-bold">{exp.jobTitle.toUpperCase()}</h3>
                  <div className="flex justify-between items-baseline text-sm">
                    <p className="font-medium text-gray-800">{exp.company} / {exp.location}</p>
                    <p className="text-xs text-gray-500">{exp.startDate} — {exp.endDate}</p>
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-none mt-1.5 space-y-1 text-sm text-gray-700 whitespace-pre-line">
                      {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i} className="pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-500">{line.trim()}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {hasEducation && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Education</h2>
              {education.filter(edu => edu.degree && edu.institution).map((edu) => (
                <div key={edu.id} className="mb-4 last:mb-0">
                  <h3 className="text-lg font-bold">{edu.degree.toUpperCase()}</h3>
                  <p className="text-sm font-medium text-gray-800">{edu.institution} / {edu.location}</p>
                  <p className="text-xs text-gray-500 mb-1">{edu.graduationDate}</p>
                  {edu.details && <p className="text-xs text-gray-600 italic whitespace-pre-line">{edu.details}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
      {!hasPersonalInfo && !summary && !hasExperience && !hasEducation && !hasSkills && (
        <p className="text-center text-gray-400 col-span-full py-10 text-lg">Define your focus. Add your information to see the Monochrome resume take shape.</p>
      )}
    </div>
  );
}
