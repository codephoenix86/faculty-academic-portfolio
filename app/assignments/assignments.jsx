"use client";
import { useState, useMemo } from "react";

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

  // Calculate stats for current semester
  const stats = useMemo(() => {
    const semesterAssignments = assignments.filter(
      (a) => a.semester === filterSemester
    );
    const total = semesterAssignments.length;
    const upcoming = semesterAssignments.filter(
      (a) => new Date(a.dueDate) > new Date()
    ).length;
    const past = total - upcoming;
    return { total, upcoming, past };
  }, [assignments, filterSemester]);

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
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
          Assignments
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Track and manage course assignments
        </p>

        {/* Stats Bar */}
        <div className="flex flex-wrap gap-6 p-6 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-sm text-slate-600 font-medium">
                Total Assignments
              </p>
            </div>
          </div>
          <div className="w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-blue-600"
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
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">
                {stats.upcoming}
              </p>
              <p className="text-sm text-slate-600 font-medium">Upcoming</p>
            </div>
          </div>
          <div className="w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-slate-600"
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
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{stats.past}</p>
              <p className="text-sm text-slate-600 font-medium">Past Due</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Semester, and Sort Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-slate-400"
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
            placeholder="Search by title, course, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
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

        {/* Semester Dropdown */}
        <div className="relative md:w-56">
          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all cursor-pointer shadow-sm"
          >
            {allSemesters.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-slate-400"
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
        <div className="relative md:w-56">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all cursor-pointer shadow-sm"
          >
            <option value="default">Default Order</option>
            <option value="dueDate">Due Date (Soonest)</option>
            <option value="recent">Recently Added</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-slate-400"
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

      {/* Results Count */}
      {searchQuery && (
        <div className="mb-5 text-slate-600 text-sm font-medium">
          Found {filteredAndSortedAssignments.length} assignment
          {filteredAndSortedAssignments.length !== 1 ? "s" : ""} in Semester{" "}
          {filterSemester}
        </div>
      )}

      {/* Assignments Grid */}
      {filteredAndSortedAssignments.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-slate-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-slate-400"
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
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {searchQuery
              ? "No matching assignments found"
              : "No assignments yet"}
          </h3>
          <p className="text-slate-500">
            {searchQuery
              ? "Try adjusting your search terms or selecting a different semester"
              : `Assignments for Semester ${filterSemester} will appear here`}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredAndSortedAssignments.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
        </div>
      )}
    </div>
  );
}

function AssignmentCard({ assignment }) {
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
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-0.5">
      {/* Header: Course Badge + Dates */}
      <div className="flex items-start justify-between gap-4 mb-4">
        {/* Course Badge */}
        {course && (
          <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg border border-indigo-200">
            {course}
          </span>
        )}

        {/* Dates - stacked on the right */}
        <div className="flex flex-col items-end gap-2 text-sm">
          <div className="flex items-center gap-2">
            <svg
              className={`w-4 h-4 ${
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
              className={`font-semibold ${
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
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <svg
              className="w-4 h-4"
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
            <span>Posted {formatDate(createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-xl font-bold mb-3 text-slate-900 leading-tight hover:text-indigo-600 transition-colors">
        {title}
      </h4>

      {/* Description */}
      {description && (
        <p className="text-slate-600 text-base mb-4 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      )}

      {/* Attachments Section */}
      {allFiles.length > 0 && <AttachmentsSection attachments={allFiles} />}

      {/* Submit Button */}
      {submissionLink && (
        <div className="mt-5 pt-5 border-t-2 border-slate-100">
          <a
            href={submissionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5"
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
    <div className="space-y-3 pt-5 border-t-2 border-slate-100">
      {hasMore && (
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
          >
            {showAll ? (
              <>
                Show less
                <svg
                  className="w-4 h-4"
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
                  className="w-4 h-4"
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
        className={`grid gap-3 ${
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
              className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 rounded-xl transition-all duration-200 group/attachment"
            >
              <div className="flex-shrink-0 w-11 h-11 bg-indigo-100 group-hover/attachment:bg-indigo-200 rounded-lg flex items-center justify-center transition-colors">
                <svg
                  className="w-6 h-6 text-indigo-600"
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
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 truncate group-hover/attachment:text-indigo-700 transition-colors">
                  {fileName}
                </div>
              </div>
              <svg
                className="w-5 h-5 text-slate-400 group-hover/attachment:text-indigo-600 flex-shrink-0 transition-colors"
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
