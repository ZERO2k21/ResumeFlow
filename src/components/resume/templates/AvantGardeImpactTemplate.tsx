
'use client';

import type { ResumeTemplateProps } from '@/types/resume';
import { Mail, Phone, Linkedin, Globe, MapPin, Star,Zap, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';

export default function AvantGardeImpactTemplate({ resumeData }: ResumeTemplateProps): JSX.Element {
  const { personalInfo, summary, experience, education, skills } = resumeData;

  const hasPersonalInfo = personalInfo.name || personalInfo.email || personalInfo.phone;
  const hasExperience = experience.length > 0 && experience.some(exp => exp.jobTitle && exp.company);
  const hasEducation = education.length > 0 && education.some(edu => edu.degree && edu.institution);
  const hasSkills = skills.length > 0 && skills.some(skill => skill.trim() !== '');

  return (
    <div className="p-8 bg-neutral-900 text-neutral-100 font-['Space_Grotesk',_sans-serif] min-h-[800px] shadow-2xl rounded-lg border-2 border-purple-500 relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-pink-500/30 rounded-full filter blur-2xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/30 rounded-full filter blur-2xl opacity-70 animate-pulse animation-delay-2000"></div>

      <div className="relative z-10">
        {hasPersonalInfo && (
          <header className="mb-10 text-center relative">
            {personalInfo.name && <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 mb-2 uppercase">{personalInfo.name}</h1>}
            {personalInfo.jobTitle && <p className="text-2xl font-medium text-indigo-300 mb-4 tracking-wide">{personalInfo.jobTitle}</p>}
            <div className="flex justify-center items-center space-x-6 text-sm text-neutral-400">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-pink-400 transition-colors">
                  <Mail size={16} className="mr-2" /> {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center">
                  <Phone size={16} className="mr-2" /> {personalInfo.phone}
                </span>
              )}
            </div>
            <div className="flex justify-center items-center space-x-6 text-sm text-neutral-400 mt-2">
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-400 transition-colors">
                  <Linkedin size={16} className="mr-2" /> LinkedIn
                </a>
              )}
              {personalInfo.portfolio && (
                <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-400 transition-colors">
                  <Globe size={16} className="mr-2" /> Portfolio
                </a>
              )}
               {personalInfo.address && (
                <span className="flex items-center">
                  <MapPin size={16} className="mr-1.5" /> {personalInfo.address}
                </span>
              )}
            </div>
          </header>
        )}

        {summary && (
          <section className="mb-10 p-6 bg-neutral-800/50 border border-neutral-700 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-purple-400 mb-3 flex items-center"><Star size={20} className="mr-2"/> Objective</h2>
            <p className="text-neutral-300 leading-relaxed text-justify whitespace-pre-line">{summary}</p>
          </section>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {hasExperience && (
            <section className={`md:col-span-2 p-6 bg-neutral-800/50 border border-neutral-700 rounded-lg shadow-lg ${!hasEducation && !hasSkills ? 'md:col-span-3' : ''}`}>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 flex items-center"><Briefcase size={20} className="mr-2" /> Experience</h2>
              {experience.filter(exp => exp.jobTitle && exp.company).map((exp) => (
                <div key={exp.id} className="mb-6 last:mb-0 relative pl-6 border-l-2 border-purple-500/50">
                   <Zap size={16} className="absolute -left-[9px] top-1 text-pink-400 bg-neutral-900 p-0.5 rounded-full"/>
                  <h3 className="text-xl font-medium text-neutral-100">{exp.jobTitle}</h3>
                  <p className="text-md text-neutral-300 italic">{exp.company} - {exp.location}</p>
                  <p className="text-xs text-neutral-500 mb-2">{exp.startDate} - {exp.endDate}</p>
                  {exp.responsibilities && (
                    <ul className="list-none space-y-1 text-sm text-neutral-400 leading-snug whitespace-pre-line">
                      {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i} className="before:content-['»_'] before:mr-1 before:text-pink-400">{line.trim()}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {(hasEducation || hasSkills) && (
            <div className={`space-y-8 ${!hasExperience ? 'md:col-span-3' : 'md:col-span-1'}`}>
              {hasEducation && (
                <section className="p-6 bg-neutral-800/50 border border-neutral-700 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center"><GraduationCap size={20} className="mr-2"/> Education</h2>
                  {education.filter(edu => edu.degree && edu.institution).map((edu) => (
                    <div key={edu.id} className="mb-4 last:mb-0">
                      <h3 className="text-lg font-medium text-neutral-100">{edu.degree}</h3>
                      <p className="text-md text-neutral-300 italic">{edu.institution} - {edu.location}</p>
                      <p className="text-xs text-neutral-500 mb-1">{edu.graduationDate}</p>
                      {edu.details && <p className="text-xs text-neutral-400 whitespace-pre-line">{edu.details}</p>}
                    </div>
                  ))}
                </section>
              )}

              {hasSkills && (
                <section className="p-6 bg-neutral-800/50 border border-neutral-700 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center"><Lightbulb size={20} className="mr-2"/> Skills</h2>
                  <ul className="flex flex-wrap gap-2">
                    {skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                      <li key={index} className="bg-gradient-to-br from-neutral-700 to-neutral-600 text-neutral-200 text-xs px-3 py-1.5 rounded-full shadow-md hover:scale-105 transform transition-transform">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>
         {!hasPersonalInfo && !summary && !hasExperience && !hasEducation && !hasSkills && (
          <p className="text-center text-neutral-500 col-span-3 py-10 text-lg">Unleash your potential. Fill the form to craft your Avant-Garde Impact resume!</p>
        )}
      </div>
    </div>
  );
}
