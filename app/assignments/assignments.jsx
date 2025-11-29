"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 200 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Assignments({ data }) {
  const [assignments] = useState(data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterSemester, setFilterSemester] = useState("1");

  // All semesters (1-8)
  const allSemesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // Filter and sort assignments
  const filteredAndSortedAssignments = useMemo(() => {
    let filtered = assignments.filter((assignment) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = assignment.title.toLowerCase().includes(searchLower);
      const courseMatch = assignment.course
        ?.toLowerCase()
        .includes(searchLower);
      const descriptionMatch = assignment.description
        ?.toLowerCase()
        .includes(searchLower);
      const semesterFilter = assignment.semester === filterSemester;

      return (titleMatch || courseMatch || descriptionMatch) && semesterFilter;
    });

    // Sort assignments
    if (sortBy === "dueDate") {
      filtered = [...filtered].sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === "recent") {
      filtered = [...filtered].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    return filtered;
  }, [assignments, searchQuery, sortBy, filterSemester]);

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 3px;
          transition: background 0.2s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>

      {/* Header Section */}
      <div className="mb-6 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 sm:mb-3 tracking-tight">
          Assignments
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
          Track and manage course assignments
        </p>
      </div>

      {/* Search, Semester, and Sort Filter */}
      <div className="mb-6 sm:mb-8 flex flex-col md:flex-row gap-3 sm:gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-4 py-3 sm:py-3.5 bg-white border-2 border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Semester and Sort Dropdowns - side by side on mobile, same row as search on desktop */}
        <div className="flex gap-3 sm:gap-4 md:contents">
          {/* Semester Dropdown */}
          <div className="relative flex-1 md:w-56 md:flex-none">
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full appearance-none pl-3 sm:pl-4 pr-8 sm:pr-10 py-3 sm:py-3.5 bg-white border-2 border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all cursor-pointer shadow-sm"
            >
              {allSemesters.map((sem) => (
                <option key={sem} value={sem}>
                  Sem {sem}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-1 md:w-56 md:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none pl-3 sm:pl-4 pr-8 sm:pr-10 py-3 sm:py-3.5 bg-white border-2 border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all cursor-pointer shadow-sm"
            >
              <option value="default">Default</option>
              <option value="dueDate">Due Date</option>
              <option value="recent">Recent</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="mb-4 sm:mb-5 text-slate-600 text-xs sm:text-sm font-medium">
          Found {filteredAndSortedAssignments.length} assignment
          {filteredAndSortedAssignments.length !== 1 ? "s" : ""} in Semester{" "}
          {filterSemester}
        </div>
      )}

      {/* Assignments Grid */}
      {filteredAndSortedAssignments.length === 0 ? (
        <div className="text-center py-12 sm:py-20 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 rounded-full bg-slate-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {searchQuery ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              )}
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 px-4">
            {searchQuery
              ? "No matching assignments found"
              : "No assignments yet"}
          </h3>
          <p className="text-sm sm:text-base text-slate-500 px-4">
            {searchQuery
              ? "Try adjusting your search terms or selecting a different semester"
              : `Assignments for Semester ${filterSemester} will appear here`}
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {filteredAndSortedAssignments.map((assignment, index) => (
            <AssignmentCard key={assignment._id} assignment={assignment} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function AssignmentCard({ assignment, index }) {
  const {
    _id,
    title,
    description,
    dueDate,
    createdAt,
    attachments,
    submissionLink,
    course,
    semester,
  } = assignment;

  // Format dates
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days until due
  const getDaysUntilDue = () => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue();
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

  // Collect all files
  const allFiles = [];
  if (attachments && attachments.length > 0) {
    attachments.forEach((attachment) => {
      const fileUrl = attachment.fileUrl || attachment.file?.url;
      const fileName =
        attachment.name ||
        attachment.file?.originalFilename ||
        attachment.fileUrl ||
        "Document";

      if (fileUrl) {
        allFiles.push({
          url: fileUrl,
          name: fileName,
        });
      }
    });
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "100px", amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-0.5">
        {/* Header: Course Badge + Dates */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4">
          {/* Course Badge */}
          {course && (
            <span className="inline-block px-1.5 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 bg-indigo-100 text-indigo-700 text-[9px] sm:text-xs md:text-sm font-semibold rounded-md sm:rounded-lg border border-indigo-200 w-fit">
              {course}
            </span>
          )}

          {/* Dates - top right on all screens */}
          <div className="flex flex-col items-end gap-1 text-[9px] sm:text-[10px] md:text-sm flex-shrink-0">
            <div className="flex items-center gap-1">
              <svg
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0 ${
                  isOverdue
                    ? "text-red-600"
                    : isDueSoon
                    ? "text-amber-600"
                    : "text-slate-500"
                }`}
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
              <span
                className={`font-semibold text-right leading-tight ${
                  isOverdue
                    ? "text-red-600"
                    : isDueSoon
                    ? "text-amber-600"
                    : "text-slate-700"
                }`}
              >
                Due {formatDate(dueDate)}
                {isOverdue && " • Overdue"}
                {isDueSoon && !isOverdue && ` • ${daysUntilDue}d left`}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 font-medium">
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-right leading-tight">Posted {formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 leading-tight hover:text-indigo-600 transition-colors">
          {title}
        </h4>

        {/* Description */}
        {description && (
          <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        )}

        {/* Attachments Section */}
        {allFiles.length > 0 && <AttachmentsSection attachments={allFiles} />}

        {/* Submit Button */}
        {submissionLink && (
          <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t-2 border-slate-100">
            <a
              href={submissionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Submit Assignment
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function AttachmentsSection({ attachments }) {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 2;
  const hasMore = attachments.length > INITIAL_DISPLAY_COUNT;
  const displayedAttachments = showAll
    ? attachments
    : attachments.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <div className="space-y-3 pt-4 sm:pt-5 border-t-2 border-slate-100">
      {hasMore && (
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
          >
            {showAll ? (
              <>
                Show less
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                Show all
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
      <div
        className={`grid gap-2 sm:gap-3 ${
          showAll ? "max-h-64 overflow-y-auto pr-2 custom-scrollbar" : ""
        }`}
        style={
          showAll
            ? {
                scrollbarWidth: "thin",
                scrollbarColor: "#94a3b8 #f1f5f9",
              }
            : {}
        }
      >
        {displayedAttachments.map((attachment, index) => {
          const fileUrl = attachment.url;
          const fileName = attachment.name;

          return (
            <a
              key={index}
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 rounded-xl transition-all duration-200 group/attachment min-w-0"
            >
              <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-indigo-100 group-hover/attachment:bg-indigo-200 rounded-lg flex items-center justify-center transition-colors">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <div 
                  className="text-xs sm:text-sm font-semibold text-slate-900 truncate group-hover/attachment:text-indigo-700 transition-colors"
                  title={fileName}
                >
                  {fileName}
                </div>
              </div>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover/attachment:text-indigo-600 flex-shrink-0 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          );
        })}
      </div>
    </div>
  );
}