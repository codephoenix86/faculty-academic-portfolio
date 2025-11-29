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

export default function Resources({ data }) {
  const [resources] = useState(data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("1");

  // All semesters 1-8
  const allSemesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = resource.title?.toLowerCase().includes(searchLower);
      const descriptionMatch = resource.description
        ?.toLowerCase()
        .includes(searchLower);
      const subjectMatch = resource.subject
        ?.toLowerCase()
        .includes(searchLower);

      const searchMatch = titleMatch || descriptionMatch || subjectMatch;
      const semesterMatch = resource.semester === selectedSemester;

      return searchMatch && semesterMatch;
    });
  }, [resources, searchQuery, selectedSemester]);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
          Study Resources
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Access study materials, notes, and important documents organized by semester
        </p>
      </div>

      {/* Search Bar and Semester Filter */}
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
            placeholder="Search by title, subject, or description..."
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

        {/* Semester Dropdown */}
        <div className="relative md:w-56">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
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
      </div>

      {/* Results Info */}
      {searchQuery && (
        <div className="mb-4 sm:mb-5 text-slate-600 text-xs sm:text-sm font-medium">
          Found {filteredResources.length} resource
          {filteredResources.length !== 1 ? "s" : ""} in Semester{" "}
          {selectedSemester}
        </div>
      )}

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              )}
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 px-4">
            {searchQuery ? "No matching resources found" : "No resources yet"}
          </h3>
          <p className="text-sm sm:text-base text-slate-500 px-4">
            {searchQuery
              ? "Try adjusting your search terms or selecting a different semester"
              : `Resources for Semester ${selectedSemester} will appear here`}
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {filteredResources.map((resource, index) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
              formatDate={formatDate}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceCard({ resource, formatDate, index }) {
  const { title, description, subject, createdAt, attachments } = resource;

  // Get file extension from filename
  const getFileExtension = (filename) => {
    if (!filename) return null;
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop().toUpperCase() : null;
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "100px", amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 hover:text-indigo-600 transition-colors leading-tight">
                {title}
              </h3>
            </div>

            {description && (
              <p className="text-slate-600 text-sm sm:text-base mb-4 whitespace-pre-wrap leading-relaxed">
                {description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-4 sm:mb-5">
              {/* Subject */}
              {subject && (
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-50 text-emerald-700 font-semibold rounded-lg border border-emerald-200">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                  <span className="whitespace-nowrap">{subject}</span>
                </div>
              )}

              {/* Date */}
              {createdAt && (
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 font-medium">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
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
                  <span className="whitespace-nowrap">{formatDate(createdAt)}</span>
                </div>
              )}
            </div>

            {/* Attachments */}
            {attachments && attachments.length > 0 && (
              <AttachmentsSection
                attachments={attachments}
                getFileExtension={getFileExtension}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AttachmentsSection({ attachments, getFileExtension }) {
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
          const fileUrl = attachment.fileUrl || attachment.file?.url;
          const fileName =
            attachment.name ||
            attachment.file?.originalFilename ||
            attachment.fileUrl ||
            "View Attachment";

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