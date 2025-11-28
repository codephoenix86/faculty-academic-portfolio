import { getPhdStudents } from "@/utils/sanity";
import { Inter } from "next/font/google";
import StudentCard from "./StudentCard";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function PhDStudentsPage() {
  const students = await getPhdStudents();

  // Separate current and graduated students
  const currentStudents = students.filter((s) => s.status === "current");
  const graduatedStudents = students.filter((s) => s.status === "graduated");

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 ${inter.className}`}>
      {/* Hero Section */}
      <div className="bg-white/80 backdrop-blur-sm">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
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