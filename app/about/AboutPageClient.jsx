"use client";

import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  Calendar, 
  Building2, 
  Clock,
  Award
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AboutPageClient({ profileData }) {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    // Trigger hero animation on mount
    setHeroVisible(true);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observerRef.current.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  if (!profileData) {
    return null;
  }

  const data = profileData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <div className={`mb-16 transition-all duration-800 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}>
          <h1 className="text-3xl md:text-4xl font-normal text-gray-900">
            Academic Journey & Professional Experience
          </h1>
        </div>

        {/* Bio Section */}
        {data.bio && (
          <div 
            id="bio-section"
            data-animate
            className={`mb-16 transition-all duration-700 ${
              visibleSections.has('bio-section') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">About Me</h2>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
              {data.bio}
            </p>
          </div>
        )}

        {/* Education Timeline */}
        {data.education && data.education.length > 0 && (
          <div 
            id="education-section"
            data-animate
            className={`mb-16 transition-all duration-700 delay-100 ${
              visibleSections.has('education-section') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Education</h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[0.5rem] md:left-[0.875rem] top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="space-y-8">
                {data.education.map((edu, index) => (
                  <div 
                    key={index} 
                    className={`relative pl-8 md:pl-16 transition-all duration-500 ${
                      visibleSections.has('education-section')
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[0.1875rem] md:left-[0.4rem] top-2 w-3 h-3 md:w-4 md:h-4 bg-blue-600 rounded-full border-2 md:border-4 border-gray-50 transform transition-transform duration-300 hover:scale-125"></div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="hidden md:flex w-10 h-10 bg-blue-100 rounded-lg items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-2">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                            {edu.degree}
                          </h3>
                          {edu.year && (
                            <span className="inline-flex items-center gap-1.5 text-blue-600 text-sm md:text-base font-medium whitespace-nowrap">
                              <Clock className="w-4 h-4 flex-shrink-0" style={{ marginTop: '0.05rem' }} />
                              <span>{edu.year}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 font-medium text-sm md:text-base">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience Timeline */}
        {data.experience && data.experience.length > 0 && (
          <div 
            id="experience-section"
            data-animate
            className={`mb-16 transition-all duration-700 delay-100 ${
              visibleSections.has('experience-section') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Experience</h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[0.5rem] md:left-[0.875rem] top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="space-y-8">
                {data.experience.map((exp, index) => (
                  <div 
                    key={index} 
                    className={`relative pl-8 md:pl-16 transition-all duration-500 ${
                      visibleSections.has('experience-section')
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[0.1875rem] md:left-[0.4rem] top-2 w-3 h-3 md:w-4 md:h-4 bg-green-600 rounded-full border-2 md:border-4 border-gray-50 transform transition-transform duration-300 hover:scale-125"></div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="hidden md:flex w-10 h-10 bg-green-100 rounded-lg items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
                        <Briefcase className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-2">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                            {exp.position}
                          </h3>
                          {exp.duration && (
                            <span className="inline-flex items-center gap-1.5 text-green-600 text-sm md:text-base font-medium whitespace-nowrap">
                              <Clock className="w-4 h-4 flex-shrink-0" style={{ marginTop: '0.05rem' }} />
                              <span>{exp.duration}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 font-medium text-sm md:text-base">
                          {exp.institution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Awards Timeline */}
        {data.awards && data.awards.length > 0 && (
          <div 
            id="awards-section"
            data-animate
            className={`mb-8 transition-all duration-700 delay-100 ${
              visibleSections.has('awards-section') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Awards & Honors</h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[0.5rem] md:left-[0.875rem] top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="space-y-8">
                {data.awards.map((award, index) => (
                  <div 
                    key={index} 
                    className={`relative pl-8 md:pl-16 transition-all duration-500 ${
                      visibleSections.has('awards-section')
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[0.1875rem] md:left-[0.4rem] top-2 w-3 h-3 md:w-4 md:h-4 bg-amber-600 rounded-full border-2 md:border-4 border-gray-50 transform transition-transform duration-300 hover:scale-125"></div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="hidden md:flex w-10 h-10 bg-amber-100 rounded-lg items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-2">
                          <h3 className="text-base md:text-lg font-semibold text-gray-900">
                            {award.title}
                          </h3>
                          {award.year && (
                            <span className="inline-flex items-center gap-1.5 text-amber-600 text-sm md:text-base font-medium whitespace-nowrap">
                              <Calendar className="w-4 h-4 flex-shrink-0" style={{ marginTop: '0.05rem' }} />
                              <span>{award.year}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 font-medium text-sm">
                          {award.organization}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}