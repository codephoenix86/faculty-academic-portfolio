"use client";
import { useState, useMemo } from "react";

export default function Publications({ data }) {
  const [publications, setPublications] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Filter and sort publications
  const filteredAndSortedPublications = useMemo(() => {
    let filtered = publications.filter((pub) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = pub.title.toLowerCase().includes(searchLower);
      const tagsMatch =
        pub.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        false;
      const journalMatch = pub.journal?.toLowerCase().includes(searchLower);
      return titleMatch || tagsMatch || journalMatch;
    });

    // Sort publications
    if (sortBy === "newest") {
      filtered = [...filtered].sort((a, b) => {
        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;
        return yearB - yearA;
      });
    } else if (sortBy === "oldest") {
      filtered = [...filtered].sort((a, b) => {
        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;
        return yearA - yearB;
      });
    }

    return filtered;
  }, [publications, searchQuery, sortBy]);

  return (
    <div className="min-h-screen relative">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              Publications
            </h1>
            <p className="text-gray-600 text-lg font-light">
              Research papers and academic contributions
            </p>
          </div>
        </div>
      </div>

      {/* Search and Sort Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
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
            placeholder="Search by title, journal, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm hover:shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-blue-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none w-full sm:w-auto pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            <option value="default">Default Order</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-blue-700"
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
        <div className="mb-6 text-gray-600 text-sm font-medium">
          Found {filteredAndSortedPublications.length} publication
          {filteredAndSortedPublications.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Publications Grid */}
      {filteredAndSortedPublications.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white flex items-center justify-center border-2 border-gray-200 shadow-sm">
            <svg
              className="w-12 h-12 text-gray-400"
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
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {searchQuery
              ? "No matching publications found"
              : "No publications yet"}
          </h3>
          <p className="text-gray-500 text-base">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Publications will appear here"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredAndSortedPublications.map((pub, index) => (
            <PublicationCard key={pub._id} publication={pub} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function PublicationCard({ publication, index }) {
  const { _id, year, title, journal, citations, tags = [], link } = publication;

  return (
    <div>
      <div className="group bg-white border border-gray-200 rounded-xl p-7 transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-5">
            <div className="px-5 py-2.5 bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300 rounded-xl shadow-sm">
              <span className="text-blue-800 font-bold text-lg tracking-tight">
                {year}
              </span>
            </div>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-sm font-semibold tracking-wide">
                  View Paper
                </span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
            )}
          </div>

          {/* Title */}
          <h4 className="text-2xl font-semibold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors duration-300 leading-tight tracking-tight">
            {title}
          </h4>

          {/* Publication Details */}
          <div className="space-y-2 mb-5">
            {journal && (
              <div className="flex items-center gap-3 text-gray-700">
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <span className="text-base font-medium">{journal}</span>
              </div>
            )}
            {citations !== undefined && citations !== null && (
              <div className="flex items-center gap-3 text-gray-700">
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0"
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
                <span className="text-base font-medium">
                  {citations} citation{citations !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <span
                  key={`${tag}-${tagIndex}`}
                  className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
