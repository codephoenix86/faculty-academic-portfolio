import { getPhdStudents } from "@/utils/sanity";
import Image from "next/image";

export default async function PhDStudentsPage() {
  const students = await getPhdStudents();

  // Separate current and graduated students
  const currentStudents = students.filter((s) => s.status === "current");
  const graduatedStudents = students.filter((s) => s.status === "graduated");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            PhD Students Supervised
          </h1>
          <p className="text-lg text-gray-600">
            Research mentorship and doctoral supervision
          </p>
        </div>
      </div>

      {/* Current Students Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Current Students
            </h2>
          </div>
          {currentStudents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentStudents.map((student, index) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                No current PhD students at this time.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Graduated Students Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Graduated Students
            </h2>
          </div>
          {graduatedStudents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {graduatedStudents.map((student, index) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  isGraduated
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl shadow-md p-12 text-center border border-gray-200">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                No graduated students yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Student Card Component
function StudentCard({ student, isGraduated = false, index = 0 }) {
  const photoUrl = student.photo?.asset?.url;

  return (
    <div
      className="group bg-gradient-to-br from-white to-blue-50/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100 hover:border-blue-400 hover:-translate-y-1"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="p-6">
        <div className="flex gap-5 mb-5">
          {/* Photo */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 ring-2 ring-blue-200 group-hover:ring-blue-400 group-hover:scale-110 transition-all duration-300 shadow-md">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={student.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                <svg
                  className="w-11 h-11 text-white/90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Header */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                {student.name}
              </h3>
              {isGraduated && (
                <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  Graduated
                </span>
              )}
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {student.startYear} – {student.graduationYear || "Present"}
              </span>
            </div>

            {/* Current Position (for graduated students) */}
            {isGraduated && student.currentPosition && (
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">{student.currentPosition}</span>
              </div>
            )}
          </div>
        </div>

        {/* Research Topic */}
        <div className="mb-5 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Research Focus
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            {student.researchTopic}
          </p>

          {/* Thesis Title (for graduated students) - Inside same box */}
          {isGraduated && student.thesisTitle && (
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                Thesis
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed italic">
                {student.thesisTitle}
              </p>
            </div>
          )}
        </div>

        {/* Achievements */}
        {student.achievements && student.achievements.length > 0 && (
          <div className="mb-5 pb-5 border-b border-blue-100">
            <h4 className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Key Achievements
            </h4>
            <ul className="space-y-1.5">
              {student.achievements.slice(0, 3).map((achievement, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {student.email && (
            <a
              href={`mailto:${student.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {student.email}
            </a>
          )}
          {student.linkedin && (
            <a
              href={student.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          )}
          {student.googleScholar && (
            <a
              href={student.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 9a8 8 0 017.162 4.44L24 9.5z" />
              </svg>
              Scholar
            </a>
          )}
          {student.website && (
            <a
              href={student.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
