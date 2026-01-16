import React, { useEffect } from 'react';
import { useCMS } from '../hooks/useCMS';
import { Mail, Phone, Linkedin, MapPin, Globe } from 'lucide-react';

const ResumePage: React.FC = () => {
  const { data } = useCMS();
  const websiteUrl = typeof window !== 'undefined' ? window.location.host : 'shamrat.me';

  useEffect(() => {
    document.title = 'Resume | Md. Shamrat Hossain';
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 print:p-0 print:bg-white">
      <div className="max-w-[210mm] mx-auto bg-white shadow-xl print:shadow-none p-[15mm] md:p-[20mm]">
        {/* Header */}
        <header className="border-b-2 border-gray-800 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">{data.hero.name}</h1>
          <p className="text-xl text-gray-600 mb-4 font-medium">{data.hero.title}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span>{data.contact.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>{data.contact.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin size={14} />
              <span>linkedin.com/in/shamrat5</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{data.contact.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe size={14} />
              <span>{websiteUrl}</span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-300 mb-3 pb-1">Professional Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.hero.description}</p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-300 mb-4 pb-1">Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{exp.date}</span>
                </div>
                <div className="text-gray-700 font-medium text-sm mb-2">{exp.company}</div>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">{exp.description}</p>
                <div className="flex flex-wrap gap-1">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-300 mb-4 pb-1">Key Projects</h2>
          <div className="space-y-4">
            {data.projects.slice(0, 3).map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900 text-sm">{project.title}</h3>
                  {project.externalLink && (
                    <a href={project.externalLink} className="text-xs text-blue-600 hover:underline print:hidden">View Project</a>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-300 mb-3 pb-1">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">Technical</h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.technical.map((skill) => (
                  <span key={skill.name} className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">Professional</h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.professional.map((skill) => (
                  <span key={skill.name} className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-300 mb-3 pb-1">Education</h2>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">MBA in Marketing</h3>
                <div className="text-xs text-gray-600">Islamic University</div>
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-gray-900 text-sm">BBA in Marketing</h3>
                <div className="text-xs text-gray-600">Islamic University</div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-300 mb-3 pb-1">Certifications</h2>
              <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                {data.certifications.map((cert) => (
                  <li key={cert.title}>{cert.title} <span className="text-gray-500">- {cert.issuer}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
      
      {/* Print Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 print:hidden">
        <button 
          onClick={() => window.print()}
          className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-black transition-colors font-medium flex items-center gap-2"
        >
          Print / Save PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePage;
