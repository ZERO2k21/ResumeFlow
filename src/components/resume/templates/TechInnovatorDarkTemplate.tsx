
'use client';

import type { ResumeTemplateProps } from '@/types/resume';
import { Mail, Phone, Linkedin, Globe, MapPin, Cpu, Code, Terminal, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';

export default function TechInnovatorDarkTemplate({ resumeData }: ResumeTemplateProps): JSX.Element {
  const { personalInfo, summary, experience, education, skills } = resumeData;

  const hasPersonalInfo = personalInfo.name || personalInfo.email || personalInfo.phone;
  const hasExperience = experience.length > 0 && experience.some(exp => exp.jobTitle && exp.company);
  const hasEducation = education.length > 0 && education.some(edu => edu.degree && edu.institution);
  const hasSkills = skills.length > 0 && skills.some(skill => skill.trim() !== '');

  return (
    <div className="p-8 bg-gray-900 text-gray-200 font-mono min-h-[800px] shadow-2xl rounded-lg border border-cyan-500/30">
      {/* Header Section */}
      {hasPersonalInfo && (
        <header className="mb-8 text-center border-b-2 border-cyan-500/50 pb-6 relative">
          <div className="absolute top-2 right-2 flex space-x-2">
            <Cpu size={18} className="text-cyan-400 opacity-70 animate-pulse" />
            <Code size={18} className="text-green-400 opacity-70 animate-pulse animation-delay-500" />
          </div>
          {personalInfo.name && <h1 className="text-5xl font-bold text-cyan-400 mb-1 tracking-wider">{personalInfo.name}</h1>}
          <p className="text-lg text-green-400 font-medium">// {personalInfo.jobTitle || 'Aspiring Tech Innovator'}</p>
          <div className="mt-3 flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-cyan-300 transition-colors">
                <Mail size={14} className="mr-1.5 text-cyan-500" /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <Phone size={14} className="mr-1.5 text-cyan-500" /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-cyan-300 transition-colors">
                <Linkedin size={14} className="mr-1.5 text-cyan-500" /> LinkedIn
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-cyan-300 transition-colors">
                <Globe size={14} className="mr-1.5 text-cyan-500" /> Portfolio
              </a>
            )}
             {personalInfo.address && (
              <span className="flex items-center">
                <MapPin size={14} className="mr-1.5 text-cyan-500" /> {personalInfo.address}
              </span>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div className="space-y-8">
        {summary && (
          <section>
            <h2 className="text-2xl font-semibold text-green-400 border-l-4 border-green-500 pl-3 mb-3 flex items-center">
              <Terminal size={20} className="mr-2"/>INIT_SUMMARY
            </h2>
            <p className="text-gray-300 leading-relaxed pl-4">{summary}</p>
          </section>
        )}

        {hasExperience && (
          <section>
            <h2 className="text-2xl font-semibold text-green-400 border-l-4 border-green-500 pl-3 mb-4 flex items-center">
              <Briefcase size={20} className="mr-2"/>WORK_LOGS
            </h2>
            {experience.filter(exp => exp.jobTitle && exp.company).map((exp) => (
              <div key={exp.id} className="mb-6 pl-4 border-l border-gray-700 ml-2">
                <div className="p-4 bg-gray-800/70 rounded-md shadow-md border border-gray-700/50 hover:border-cyan-500/50 transition-colors">
                  <h3 className="text-xl font-medium text-cyan-300">{exp.jobTitle}</h3>
                  <div className="flex justify-between items-baseline">
                    <p className="font-normal text-gray-400">{exp.company} <span className="text-gray-600">| {exp.location}</span></p>
                    <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  {exp.responsibilities && (
                    <ul className="mt-2 list-none space-y-1 text-sm text-gray-400">
                      {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i} className="before:content-['>_'] before:mr-2 before:text-green-500">{line.trim()}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {hasEducation && (
            <section>
              <h2 className="text-2xl font-semibold text-green-400 border-l-4 border-green-500 pl-3 mb-4 flex items-center">
                <GraduationCap size={20} className="mr-2"/>EDUCATION_CORE
              </h2>
              {education.filter(edu => edu.degree && edu.institution).map((edu) => (
                <div key={edu.id} className="mb-4 pl-4 border-l border-gray-700 ml-2">
                   <div className="p-3 bg-gray-800/70 rounded-md shadow-sm border border-gray-700/50">
                    <h3 className="text-lg font-medium text-cyan-300">{edu.degree}</h3>
                    <p className="font-normal text-gray-400">{edu.institution} <span className="text-gray-600">| {edu.location}</span></p>
                    <p className="text-xs text-gray-500 mb-1">{edu.graduationDate}</p>
                    {edu.details && <p className="text-xs text-gray-500 italic">{edu.details}</p>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {hasSkills && (
            <section>
              <h2 className="text-2xl font-semibold text-green-400 border-l-4 border-green-500 pl-3 mb-3 flex items-center">
                <Lightbulb size={20} className="mr-2"/>SKILL_MATRIX
              </h2>
              <ul className="flex flex-wrap gap-2 pl-4">
                {skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                  <li key={index} className="bg-gray-700 text-cyan-300 text-xs px-3 py-1 rounded-full shadow-sm border border-gray-600 hover:bg-cyan-500 hover:text-gray-900 transition-all transform hover:scale-105">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        {!hasPersonalInfo && !summary && !hasExperience && !hasEducation && !hasSkills && (
          <p className="text-center text-gray-500 col-span-full py-10 text-lg">// System Booting... Please provide data to initialize the Tech Innovator resume.</p>
        )}
      </div>
    </div>
  );
}
