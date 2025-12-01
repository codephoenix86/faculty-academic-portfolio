"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero({ profile }) {
  const [isImpactVisible, setIsImpactVisible] = useState(false);
  const impactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImpactVisible(true);
        }
      },
      {
        threshold: 0.2,
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-slate-50 px-4 py-6">
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

        @keyframes slideInFromRightSmooth {
          from {
            opacity: 0;
            transform: translateX(300px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-left {
          animation: slideInFromLeft 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
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

        .animate-slide-right-smooth {
          animation: slideInFromRightSmooth 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }

        .impact-card {
          opacity: 0;
          transform: translateY(60px);
        }

        .impact-card.visible {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Institute Header */}
        <div className="flex flex-col items-center mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
            <img
              src="/logo.png"
              alt="IIIT Logo"
              className="h-24 w-24 md:h-28 md:w-28 object-contain"
            />
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 uppercase animate-slide-right-smooth">
                Indian Institute of Information Technology Sonepat
              </h2>
              <p className="text-base md:text-lg text-slate-600 mt-1 animate-slide-right-smooth delay-100">
                An Institute of National Importance
              </p>
            </div>
          </div>
        </div>

        {/* Main Profile Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="flex-1 animate-slide-left w-full">
            {/* Name and Role */}
            <h1 className="text-2xl md:text-5xl font-bold text-slate-900 mb-2 text-balance">
              {profile.name}
            </h1>
            <p className="text-base md:text-xl text-orange-600 font-semibold mb-4 md:mb-6">
              {profile.role}
            </p>

            {/* Profile Image - Mobile Only */}
            <div className="md:hidden mb-6">
              <div className="relative w-48 h-48 mx-auto rounded-full shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300 overflow-hidden">
                <img
                  src={profile.profileImage.asset.url || "/placeholder.svg"}
                  alt={profile.name}
                  className="w-full h-full transition-transform duration-300 hover:scale-105 object-cover"
                />
              </div>
            </div>

            {/* Research Interests */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3 md:mb-4">
                Research Interests
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {profile.contact.researchInterests.map((interest, idx) => {
                  const colors = [
                    'bg-orange-100 text-orange-700 hover:bg-orange-200',
                    'bg-blue-100 text-blue-700 hover:bg-blue-200',
                    'bg-green-100 text-green-700 hover:bg-green-200',
                    'bg-purple-100 text-purple-700 hover:bg-purple-200',
                    'bg-pink-100 text-pink-700 hover:bg-pink-200',
                    'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
                    'bg-teal-100 text-teal-700 hover:bg-teal-200',
                    'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
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
            <div className="relative w-full max-w-xs mx-auto rounded-full shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300 overflow-hidden">
              <img
                src={profile.profileImage.asset.url || "/placeholder.svg"}
                alt={profile.name}
                className="w-full transition-transform duration-300 hover:scale-105 object-cover aspect-square"
              />
            </div>
          </div>
        </div>

        {/* Research Impact Section */}
        <div className="mt-20 md:mt-28" ref={impactRef}>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Research Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Citations Card */}
            <div
              className={`impact-card bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 ${
                isImpactVisible ? "visible" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {profile.citations}
              </p>
              <p className="text-slate-600 text-sm">
                Total citations across publications
              </p>
            </div>

            {/* H-Index Card */}
            <div
              className={`impact-card bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 ${
                isImpactVisible ? "visible" : ""
              }`}
              style={{ animationDelay: "0.4s" }}
            >
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
            <div
              className={`impact-card bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 ${
                isImpactVisible ? "visible" : ""
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-orange-600"
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
              <p className="text-4xl font-bold text-orange-600 mb-2">
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