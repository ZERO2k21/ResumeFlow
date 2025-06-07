
'use client';

import type { ResumeTemplateProps } from '@/types/resume';
import { Mail, Phone, Linkedin, Globe, MapPin, BookOpen, Edit3, Brain, Briefcase, GraduationCap, Star } from 'lucide-react';

export default function ElegantStorytellerSerifTemplate({ resumeData }: ResumeTemplateProps): JSX.Element {
  const { personalInfo, summary, experience, education, skills } = resumeData;

  const hasPersonalInfo = personalInfo.name || personalInfo.email || personalInfo.phone;
  const hasExperience = experience.length > 0 && experience.some(exp => exp.jobTitle && exp.company);
  const hasEducation = education.length > 0 && education.some(edu => edu.degree && edu.institution);
  const hasSkills = skills.length > 0 && skills.some(skill => skill.trim() !== '');

  return (
    <div className="p-10 bg-amber-50 text-stone-800 font-['Georgia',_serif] min-h-[800px] shadow-xl rounded-md border border-stone-300">
      {/* Header Section */}
      {hasPersonalInfo && (
        <header className="mb-10 text-center relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
          {personalInfo.name && <h1 className="text-5xl font-bold text-stone-700 mt-6 mb-2 tracking-wide">{personalInfo.name}</h1>}
          {personalInfo.jobTitle && <p className="text-lg text-stone-600 italic mb-4">{personalInfo.jobTitle}</p>}
          <div className="flex justify-center items-center flex-wrap gap-x-5 gap-y-2 text-sm text-stone-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-stone-900 transition-colors">
                <Mail size={15} className="mr-1.5 text-stone-500" /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <Phone size={15} className="mr-1.5 text-stone-500" /> {personalInfo.phone}
              </span>
            )}
             {personalInfo.address && (
              <span className="flex items-center">
                <MapPin size={15} className="mr-1.5 text-stone-500" /> {personalInfo.address}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center space-x-5 text-sm text-stone-600 mt-2">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-stone-900 transition-colors">
                <Linkedin size={15} className="mr-1.5 text-stone-500" /> LinkedIn
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-stone-900 transition-colors">
                <Globe size={15} className="mr-1.5 text-stone-500" /> Portfolio
              </a>
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-stone-400 to-transparent mt-6"></div>
        </header>
      )}

      {/* Main Content - Two Columns */}
      <div className="grid md:grid-cols-12 gap-x-10">
        {/* Left Column (Wider) */}
        <div className="md:col-span-8 space-y-8">
          {summary && (
            <section>
              <h2 className="text-2xl font-semibold text-stone-700 border-b-2 border-stone-300 pb-2 mb-4 flex items-center">
                <BookOpen size={22} className="mr-3 text-stone-600" /> Professional Profile
              </h2>
              <p className="text-stone-700 leading-relaxed text-justify whitespace-pre-line">{summary}</p>
            </section>
          )}

          {hasExperience && (
            <section>
              <h2 className="text-2xl font-semibold text-stone-700 border-b-2 border-stone-300 pb-2 mb-5 flex items-center">
                <Briefcase size={22} className="mr-3 text-stone-600" /> Career Chronicle
              </h2>
              {experience.filter(exp => exp.jobTitle && exp.company).map((exp) => (
                <div key={exp.id} className="mb-6 last:mb-0">
                  <h3 className="text-xl font-medium text-stone-800">{exp.jobTitle}</h3>
                  <div className="flex justify-between items-baseline">
                    <p className="font-normal text-stone-600">{exp.company}, {exp.location}</p>
                    <p className="text-xs text-stone-500">{exp.startDate} – {exp.endDate}</p>
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside pl-6 mt-1.5 text-stone-700 space-y-1 leading-normal">
                      {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim()}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column (Narrower) */}
        <div className="md:col-span-4 space-y-8 mt-8 md:mt-0">
          {hasEducation && (
            <section>
              <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-300 pb-1.5 mb-4 flex items-center">
                <GraduationCap size={20} className="mr-2 text-stone-600" /> Education
              </h2>
              {education.filter(edu => edu.degree && edu.institution).map((edu) => (
                <div key={edu.id} className="mb-4 last:mb-0">
                  <h3 className="text-lg font-medium text-stone-800">{edu.degree}</h3>
                  <p className="text-stone-600">{edu.institution}, {edu.location}</p>
                  <p className="text-xs text-stone-500 mb-1">{edu.graduationDate}</p>
                  {edu.details && <p className="text-xs text-stone-600 italic">{edu.details}</p>}
                </div>
              ))}
            </section>
          )}

          {hasSkills && (
            <section>
              <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-300 pb-1.5 mb-3 flex items-center">
                 <Star size={20} className="mr-2 text-stone-600" /> Core Competencies
              </h2>
              <ul className="space-y-1">
                {skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                  <li key={index} className="text-stone-700 text-sm flex items-center">
                     <Edit3 size={12} className="mr-2 text-stone-500 shrink-0" /> {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      {!hasPersonalInfo && !summary && !hasExperience && !hasEducation && !hasSkills && (
        <p className="text-center text-stone-500 col-span-full py-10 text-lg">Begin your narrative. Fill the form to see your Elegant Storyteller resume unfold.</p>
      )}
    </div>
  );
}
