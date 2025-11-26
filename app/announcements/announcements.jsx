"use client";
import { useState, useMemo } from "react";

export default function Announcements({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Filter announcements - show only non-expired ones
  const announcements = useMemo(() => {
    return data.filter(
      (ann) => !ann.expiryDate || new Date(ann.expiryDate) >= new Date()
    );
  }, [data]);

  // Filter and sort announcements
  const filteredAndSortedAnnouncements = useMemo(() => {
    let filtered = announcements.filter((announcement) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = announcement.title.toLowerCase().includes(searchLower);
      const descriptionMatch = announcement.description
        ?.toLowerCase()
        .includes(searchLower);
      return titleMatch || descriptionMatch;
    });

    // Sort announcements
    if (sortBy === "recent") {
      filtered = [...filtered].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (sortBy === "oldest") {
      filtered = [...filtered].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }

    return filtered;
  }, [announcements, searchQuery, sortBy]);

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
          Announcements
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Stay updated with the latest notifications and updates
        </p>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4">
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
              placeholder="Search announcements..."
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

          {/* Sort Dropdown */}
          <div className="relative md:w-56">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all cursor-pointer shadow-sm"
            >
              <option value="default">Default Order</option>
              <option value="recent">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
          <div className="mt-5 text-slate-600 text-sm font-medium">
            Found {filteredAndSortedAnnouncements.length}{" "}
            {filteredAndSortedAnnouncements.length === 1
              ? "announcement"
              : "announcements"}
          </div>
        )}
      </div>

      {/* Announcements List */}
      {filteredAndSortedAnnouncements.length === 0 ? (
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
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              )}
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {searchQuery
              ? "No matching announcements"
              : "No announcements available"}
          </h3>
          <p className="text-slate-500">
            {searchQuery
              ? "Try different search terms"
              : "Check back later for updates"}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredAndSortedAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement._id}
              announcement={announcement}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AnnouncementCard({ announcement }) {
  const { title, description, createdAt, expiryDate, attachments } =
    announcement;

  // Format dates
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-0.5">
      {/* Header with Date */}
      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-indigo-200">
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDate(createdAt)}</span>
        </div>

        {expiryDate && (
          <>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 font-semibold rounded-lg border border-amber-200">
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
              <span>Expires {formatDate(expiryDate)}</span>
            </div>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-slate-900 leading-tight hover:text-indigo-600 transition-colors">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-slate-600 text-base mb-5 whitespace-pre-wrap leading-relaxed">
          {description}
        </p>
      )}

      {/* Attachments */}
      {attachments && attachments.length > 0 && (
        <AttachmentsSection attachments={attachments} />
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
