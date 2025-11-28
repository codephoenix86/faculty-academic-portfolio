"use client";

export default function Hero({ profile }) {

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 px-4 py-12">
      <style>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(80px);
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

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-left {
          animation: slideInFromLeft 1.2s ease-out forwards;
        }

        .animate-slide-right {
          animation: slideInFromRight 1.2s ease-out forwards;
        }

        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(40px);
        }

        .animate-count-up {
          animation: countUp 0.6s ease-out forwards;
        }

        .visitor-badge {
          transition: all 0.3s ease;
          will-change: transform, box-shadow;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Main Profile Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="flex-1 animate-slide-left">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 text-balance">
              {profile.name}
            </h1>
            <p className="text-xl text-orange-600 font-semibold mb-6">
              {profile.role}
            </p>

            {/* Research Interests */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Research Interests
              </h3>
              <div className="flex flex-wrap gap-3">
                {profile.contact.researchInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors duration-300 animate-fade-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Visitor Count Badge */}
            <div className="visitor-badge mt-8 inline-flex items-center gap-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6 py-4 rounded-2xl border-2 border-indigo-200 shadow-lg animate-fade-up delay-500">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                  Total Visitors
                </p>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-count-up">
                  {profile.visitorCount?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
            
            <style jsx>{`
              .visitor-badge:hover {
                transform: scale(1.05);
                box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
              }
            `}</style>
          </div>

          {/* Right Image */}
          <div className="flex-1 animate-slide-right">
            <div className="relative w-full max-w-sm mx-auto">
              <img
                src={profile.profileImage.asset.url || "/placeholder.svg"}
                alt={profile.name}
                className="w-full rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 object-cover aspect-square"
              />
            </div>
          </div>
        </div>

        {/* Research Impact Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Research Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Citations Card */}
            <div
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-up border border-slate-200"
              style={{ animationDelay: "0s" }}
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
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-up border border-slate-200"
              style={{ animationDelay: "0.1s" }}
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
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-up border border-slate-200"
              style={{ animationDelay: "0.2s" }}
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