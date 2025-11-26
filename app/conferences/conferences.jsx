"use client";
import { useState, useMemo } from "react";

export default function Conferences({ data }) {
  const [conferences, setConferences] = useState(data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Filter and sort conferences
  const filteredAndSortedConferences = useMemo(() => {
    let filtered = conferences.filter((conf) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = conf.title.toLowerCase().includes(searchLower);
      const nameMatch = conf.name?.toLowerCase().includes(searchLower);
      const tagsMatch =
        conf.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        false;
      const venueMatch = conf.vanue?.toLowerCase().includes(searchLower);
      return titleMatch || nameMatch || tagsMatch || venueMatch;
    });

    // Sort conferences
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
  }, [conferences, searchQuery, sortBy]);

  return (
    <div className="min-h-screen relative">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              Conferences
            </h1>
            <p className="text-gray-600 text-lg font-light">
              Conference presentations and proceedings
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
            placeholder="Search by title, name, venue, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 shadow-sm hover:shadow-md"
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
              className="w-5 h-5 text-purple-700"
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
            className="appearance-none w-full sm:w-auto pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            <option value="default">Default Order</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-purple-700"
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
          Found {filteredAndSortedConferences.length} conference
          {filteredAndSortedConferences.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Conferences Grid */}
      {filteredAndSortedConferences.length === 0 ? (
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              )}
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {searchQuery
              ? "No matching conferences found"
              : "No conferences yet"}
          </h3>
          <p className="text-gray-500 text-base">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Conferences will appear here"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredAndSortedConferences.map((conf, index) => (
            <ConferenceCard key={conf._id} conference={conf} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function ConferenceCard({ conference, index }) {
  const { _id, year, title, name, vanue, tags = [], link } = conference;

  return (
    <div>
      <div className="group bg-white border border-gray-200 rounded-xl p-7 transition-all duration-300 hover:shadow-xl hover:border-purple-300 hover:-translate-y-1">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-5">
            <div className="px-5 py-2.5 bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-300 rounded-xl shadow-sm">
              <span className="text-purple-800 font-bold text-lg tracking-tight">
                {year}
              </span>
            </div>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-sm font-semibold tracking-wide">
                  View Details
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
          <h4 className="text-2xl font-semibold mb-4 text-gray-900 group-hover:text-purple-700 transition-colors duration-300 leading-tight tracking-tight">
            {title}
          </h4>

          {/* Conference Details */}
          <div className="space-y-2 mb-5">
            {name && (
              <div className="flex items-center gap-3 text-gray-700">
                <svg
                  className="w-5 h-5 text-purple-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-base font-medium">{name}</span>
              </div>
            )}
            {vanue && (
              <div className="flex items-center gap-3 text-gray-700">
                <svg
                  className="w-5 h-5 text-purple-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-base font-medium">{vanue}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <span
                  key={`${tag}-${tagIndex}`}
                  className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-200 shadow-sm"
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
