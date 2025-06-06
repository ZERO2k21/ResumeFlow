
import type { ResumeData } from '@/types/resume';

export function formatResumeDataForAI(data: ResumeData): string {
  let content = `Name: ${data.personalInfo.name}\n`;
  if (data.personalInfo.jobTitle) content += `Current Role/Title: ${data.personalInfo.jobTitle}\n`;
  content += `Email: ${data.personalInfo.email}\nPhone: ${data.personalInfo.phone}\nAddress: ${data.personalInfo.address}\n`;
  if (data.personalInfo.linkedin) content += `LinkedIn: ${data.personalInfo.linkedin}\n`;
  if (data.personalInfo.portfolio) content += `Portfolio: ${data.personalInfo.portfolio}\n`;

  content += `\nSummary/Objective:\n${data.summary}\n`;

  if (data.experience.length > 0 && data.experience.some(exp => exp.jobTitle && exp.company)) {
    content += "\nWork Experience:\n";
    data.experience.forEach(exp => {
      if (exp.jobTitle && exp.company) {
        content += `- ${exp.jobTitle} at ${exp.company}, ${exp.location} (${exp.startDate} - ${exp.endDate})\n`;
        if (exp.responsibilities) {
          content += `  Key Responsibilities & Achievements:\n${exp.responsibilities.split('\n').map(r => `    • ${r.trim()}`).filter(r => r.trim() !== '•').join('\n')}\n`;
        }
      }
    });
  }

  if (data.education.length > 0 && data.education.some(edu => edu.degree && edu.institution)) {
    content += "\nEducation:\n";
    data.education.forEach(edu => {
      if (edu.degree && edu.institution) {
        content += `- ${edu.degree} from ${edu.institution}, ${edu.location} (Graduated: ${edu.graduationDate})\n`;
        if (edu.details) content += `  Relevant Coursework/Details: ${edu.details}\n`;
      }
    });
  }
  
  if (data.skills.length > 0 && data.skills.some(s => s.trim() !== '')) {
    content += "\nSkills:\n";
    content += data.skills.filter(s => s.trim() !== '').map(s => s.trim()).join(', ') + "\n";
  }

  return content.trim();
}
