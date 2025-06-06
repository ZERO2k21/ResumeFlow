
'use client';

import type { ResumeTemplateProps } from '@/types/resume';
import { Mail, Phone, Linkedin, Globe, MapPin, Palette, Code, Briefcase, GraduationCap, Lightbulb, Users } from 'lucide-react';

export default function VibrantGradientUIUXTemplate({ resumeData }: ResumeTemplateProps): JSX.Element {
  const { personalInfo, summary, experience, education, skills } = resumeData;

  const hasPersonalInfo = personalInfo.name || personalInfo.email || personalInfo.phone;
  const hasExperience = experience.length > 0 && experience.some(exp => exp.jobTitle && exp.company);
  const hasEducation = education.length > 0 && education.some(edu => edu.degree && edu.institution);
  const hasSkills = skills.length > 0 && skills.some(skill => skill.trim() !== '');

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-['Inter',_sans-serif] min-h-[800px] shadow-2xl rounded-lg border border-purple-700/50">
      {/* Header Section */}
      {hasPersonalInfo && (
        <header className="mb-10 text-center relative">
          {personalInfo.name && <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">{personalInfo.name}</h1>}
          <p className="text-xl text-purple-300 font-medium mb-4">{personalInfo.jobTitle || 'Creative UI/UX Professional'}</p>
          <div className="flex justify-center items-center flex-wrap gap-x-5 gap-y-2 text-sm text-purple-200">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-pink-300 transition-colors">
                <Mail size={15} className="mr-1.5" /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <Phone size={15} className="mr-1.5" /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.address && (
              <span className="flex items-center">
                <MapPin size={15} className="mr-1.5" /> {personalInfo.address}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center space-x-5 text-sm text-purple-200 mt-2">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-300 transition-colors">
                <Linkedin size={15} className="mr-1.5" /> LinkedIn
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-300 transition-colors">
                <Globe size={15} className="mr-1.5" /> Portfolio
              </a>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div className="space-y-10">
        {summary && (
          <section className="p-6 bg-slate-800/60 rounded-xl shadow-lg border border-purple-600/30">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-3 flex items-center">
              <Users size={22} className="mr-3 text-pink-400" /> Design Philosophy
            </h2>
            <p className="text-slate-300 leading-relaxed">{summary}</p>
          </section>
        )}

        {hasExperience && (
          <section>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-5 flex items-center">
              <Briefcase size={28} className="mr-3 text-pink-400" /> Project Showcase
            </h2>
            <div className="space-y-6">
            {experience.filter(exp => exp.jobTitle && exp.company).map((exp) => (
              <div key={exp.id} className="p-5 bg-slate-800/60 rounded-xl shadow-lg border border-purple-600/30 hover:border-pink-500/50 transition-all duration-300 transform hover:scale-[1.02]">
                <h3 className="text-xl font-semibold text-purple-300">{exp.jobTitle}</h3>
                <div className="flex justify-between items-baseline text-sm">
                  <p className="font-medium text-slate-400">{exp.company} - {exp.location}</p>
                  <p className="text-slate-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                {exp.responsibilities && (
                  <ul className="list-none mt-2 space-y-1 text-sm text-slate-300">
                    {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i} className="flex items-start"><Code size={14} className="mr-2 mt-1 text-pink-400 shrink-0" /><span>{line.trim()}</span></li>)}
                  </ul>
                )}
              </div>
            ))}
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          {hasEducation && (
            <section>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4 flex items-center">
                <GraduationCap size={24} className="mr-3 text-pink-400" /> Academic Foundation
              </h2>
              {education.filter(edu => edu.degree && edu.institution).map((edu) => (
                <div key={edu.id} className="mb-4 p-4 bg-slate-800/50 rounded-lg shadow-md border border-purple-600/20">
                  <h3 className="text-lg font-semibold text-purple-300">{edu.degree}</h3>
                  <p className="text-slate-400">{edu.institution} - {edu.location}</p>
                  <p className="text-xs text-slate-500 mb-1">{edu.graduationDate}</p>
                  {edu.details && <p className="text-xs text-slate-400 italic">{edu.details}</p>}
                </div>
              ))}
            </section>
          )}

          {hasSkills && (
            <section>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-3 flex items-center">
                 <Lightbulb size={24} className="mr-3 text-pink-400" /> Toolset & Skills
              </h2>
              <ul className="flex flex-wrap gap-3">
                {skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                  <li key={index} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
       {!hasPersonalInfo && !summary && !hasExperience && !hasEducation && !hasSkills && (
        <p className="text-center text-slate-500 col-span-full py-10 text-lg">Ignite your creativity. Provide your details to see the Vibrant Gradient resume design!</p>
      )}
    </div>
  );
}
