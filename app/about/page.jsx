import { getProfile } from "@/utils/sanity";

export default async function AboutPage() {
  let profileData = null;
  try {
    profileData = await getProfile();
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
  const data = profileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Bio Section */}
        {data.bio && (
          <div className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 md:p-14 border border-slate-200/50 relative overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-indigo-300/40 rounded-full blur-3xl -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -ml-36 -mb-36"></div>

              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-blue-500/30">
                    <i className="ri-user-line text-3xl text-white"></i>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                      About Me
                    </h2>
                    <p className="text-base text-slate-600 font-medium">
                      Get to know my journey and expertise
                    </p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-700 leading-relaxed text-justify whitespace-pre-line text-lg font-normal">
                    {data.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <i className="ri-graduation-cap-line text-2xl text-white"></i>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Education
              </h2>
            </div>

            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 hover:shadow-2xl hover:border-blue-300/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg shadow-blue-400/50"></span>
                        {edu.degree}
                      </h3>
                      <p className="text-slate-700 font-semibold text-lg mb-3 ml-5">
                        {edu.institution}
                      </p>
                      {edu.description && (
                        <p className="text-slate-600 ml-5 text-base leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                    {edu.year && (
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-2 border-blue-200 whitespace-nowrap shrink-0 shadow-sm">
                        <i className="ri-calendar-line text-base"></i>
                        {edu.year}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <i className="ri-briefcase-line text-2xl text-white"></i>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-emerald-900 bg-clip-text text-transparent">
                Experience
              </h2>
            </div>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 hover:shadow-2xl hover:border-emerald-300/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full shadow-lg shadow-emerald-400/50"></span>
                        {exp.position}
                      </h3>
                      <p className="text-slate-700 font-semibold text-lg mb-3 ml-5">
                        {exp.institution}
                      </p>
                      {exp.description && (
                        <p className="text-slate-600 ml-5 text-base leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                    {exp.duration && (
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-2 border-emerald-200 whitespace-nowrap shrink-0 shadow-sm">
                        <i className="ri-time-line text-base"></i>
                        {exp.duration}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards & Honors Section */}
        {data.awards && data.awards.length > 0 && (
          <section className="pb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <i className="ri-trophy-line text-2xl text-white"></i>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-amber-900 bg-clip-text text-transparent">
                Awards & Honors
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {data.awards.map((award, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-7 rounded-2xl border border-slate-200/50 hover:shadow-2xl hover:border-amber-300/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center shrink-0 border border-amber-200/50">
                      <i className="ri-medal-line text-2xl text-amber-600"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {award.title}
                      </h3>
                      <p className="text-base text-slate-700 font-medium mb-3">
                        {award.organization}
                      </p>
                      {award.year && (
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 bg-amber-50 px-4 py-2 rounded-xl border-2 border-amber-200 shadow-sm">
                          <i className="ri-calendar-line"></i>
                          {award.year}
                        </span>
                      )}
                      {award.description && (
                        <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Enable ISR (Incremental Static Regeneration) - revalidate every 60 seconds
export const revalidate = 60;
