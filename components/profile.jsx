"use client";

import { useEffect, useRef, useState } from "react";

export default function Profile({ profile }) {
  const [isImpactVisible, setIsImpactVisible] = useState(false);
  const impactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          setIsImpactVisible(true);
        }
      },
      { 
        threshold: [0, 0.1],
        rootMargin: '0px'
      }
    );

    if (impactRef.current) {
      observer.observe(impactRef.current);
    }

    return () => {
      if (impactRef.current) {
        observer.unobserve(impactRef.current);
      }
    };
  }, []);

  return (
    <div className="px-4 py-12 md:py-16">
      <style>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-300px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(300px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-left {
          animation: slideInFromLeft 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slide-left-1 {
          animation: slideInFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0s;
          opacity: 0;
        }

        .animate-slide-left-2 {
          animation: slideInFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.08s;
          opacity: 0;
        }

        .animate-slide-left-3 {
          animation: slideInFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.16s;
          opacity: 0;
        }

        .animate-slide-left-4 {
          animation: slideInFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.24s;
          opacity: 0;
        }

        .animate-slide-right {
          animation: slideInFromRight 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(40px);
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }

        .impact-card {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .impact-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .impact-card:nth-child(1).visible {
          transition-delay: 0.1s;
        }
        
        .impact-card:nth-child(2).visible {
          transition-delay: 0.2s;
        }
        
        .impact-card:nth-child(3).visible {
          transition-delay: 0.3s;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Main Profile Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="flex-1 w-full">
            {/* Name and Role */}
            <div className="animate-slide-left-1">
              <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-2">
                {profile.name}
              </h1>
              <p className="text-base md:text-xl text-accent-600 font-semibold mb-6 md:mb-8">
                {profile.role}
              </p>
            </div>

            {/* Institute Section */}
            <div className="flex flex-row items-center gap-2 mb-6 md:mb-8 animate-slide-left-2">
              <img
                src="/logo.png"
                alt="IIIT Logo"
                className="h-12 w-12 md:h-20 md:w-20 object-contain flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-slate-900 uppercase leading-tight">
                  Indian Institute of Information Technology Sonepat
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-0.5">
                  An Institute of National Importance
                </p>
              </div>
            </div>

            {/* Profile Image - Mobile Only */}
            <div className="md:hidden mb-6 animate-slide-left-3">
              <div className="relative w-64 h-64 mx-auto rounded-full shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300 overflow-hidden">
                <img
                  src={profile.profileImage.asset.url || "/placeholder.svg"}
                  alt={profile.name}
                  className="w-full h-full transition-transform duration-300 hover:scale-105 object-cover"
                />
              </div>
            </div>

            {/* Research Interests */}
            <div className="animate-slide-left-4">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3 md:mb-4">
                Research Interests
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {profile.contact.researchInterests.map((interest, idx) => {
                  const colors = [
                    'bg-primary-100 text-primary-700 hover:bg-primary-200',
                    'bg-accent-100 text-accent-700 hover:bg-accent-200',
                    'bg-green-100 text-green-700 hover:bg-green-200',
                    'bg-purple-100 text-purple-700 hover:bg-purple-200',
                  ];
                  const colorClass = colors[idx % colors.length];
                  
                  return (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-300 ${colorClass}`}
                    >
                      {interest}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Image - Desktop Only */}
          <div className="hidden md:flex flex-1 animate-slide-right">
            <div className="relative w-full max-w-sm mx-auto rounded-full shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300 overflow-hidden">
              <img
                src={profile.profileImage.asset.url || "/placeholder.svg"}
                alt={profile.name}
                className="w-full transition-transform duration-300 hover:scale-105 object-cover aspect-square"
              />
            </div>
          </div>
        </div>

        {/* Research Impact Section */}
        <div 
          ref={impactRef}
          className="mt-12 md:mt-16"
        >
          <h2 className={`text-3xl font-semibold text-slate-900 mb-8 text-center impact-card ${isImpactVisible ? 'visible' : ''}`}>
            Research Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-md sm:max-w-2xl md:max-w-none mx-auto">
            {/* Citations Card */}
            <div className={`impact-card bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 ${isImpactVisible ? 'visible' : ''}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Citations
                </h3>
              </div>
              <p className="text-4xl font-bold text-primary-600 mb-2">
                {profile.citations}
              </p>
              <p className="text-slate-600 text-sm">
                Total citations across publications
              </p>
            </div>

            {/* H-Index Card */}
            <div className={`impact-card bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 ${isImpactVisible ? 'visible' : ''}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  H-Index
                </h3>
              </div>
              <p className="text-4xl font-bold text-green-600 mb-2">
                {profile.hIndex}
              </p>
              <p className="text-slate-600 text-sm">
                Research productivity and citation impact
              </p>
            </div>

            {/* i10-Index Card */}
            <div className={`impact-card bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 ${isImpactVisible ? 'visible' : ''}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-accent-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8L5.586 19.414M19 7v8"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  i10-Index
                </h3>
              </div>
              <p className="text-4xl font-bold text-accent-600 mb-2">
                {profile.i10Index}
              </p>
              <p className="text-slate-600 text-sm">
                Publications with at least 10 citations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}