"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

// Scroll animation with subtle slide
const fadeInScroll = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export default function Conferences({ data = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort conferences
  const filteredAndSortedConferences = useMemo(() => {
    let filtered = data.filter((conf) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = conf.title?.toLowerCase().includes(searchLower) || false;
      const nameMatch = conf.name?.toLowerCase().includes(searchLower) || false;
      const conferenceNameMatch = conf.conferenceName?.toLowerCase().includes(searchLower) || false;
      const venueMatch = conf.venue?.toLowerCase().includes(searchLower) || false;
      return titleMatch || nameMatch || conferenceNameMatch || venueMatch;
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
  }, [data, searchQuery, sortBy]);

  return (
    <div className="min-h-screen relative">
      {/* Header Section */}
      <div className="mb-8 sm:mb-10 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
          Conference Publications
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Peer-reviewed conference proceedings and presentations
        </p>
      </div>

      {/* Search and Sort Bar */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-0">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
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
            placeholder="Search by title, author, conference, or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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

        {/* Sort Dropdown */}
        <div className="relative sm:w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none w-full pl-4 pr-10 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 font-medium focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="mb-4 sm:mb-5 text-gray-600 text-sm font-medium px-4 sm:px-0">
          {filteredAndSortedConferences.length} {filteredAndSortedConferences.length === 1 ? 'result' : 'results'} found
        </div>
      )}

      {/* Conferences List */}
      {filteredAndSortedConferences.length === 0 ? (
        <div className="text-center py-16 sm:py-20 px-4 sm:px-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
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
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            {searchQuery ? "No results found" : "No conference publications"}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            {searchQuery
              ? "Try different search terms"
              : "Publications will appear here"}
          </p>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
          {filteredAndSortedConferences.map((conf, index) => (
            <ConferenceItem 
              key={`${conf._id}-${searchQuery}-${sortBy}`}
              conference={conf} 
              index={index}
              useScrollAnimation={index >= 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ConferenceItem({ conference, index, useScrollAnimation = false }) {
  const { year, title, name, conferenceName, venue, link } = conference;

  return (
    <motion.article
      initial="hidden"
      whileInView={useScrollAnimation ? "visible" : undefined}
      viewport={useScrollAnimation ? { once: true, margin: "-60px", amount: 0.15 } : undefined}
      variants={useScrollAnimation ? fadeInScroll : undefined}
      animate={useScrollAnimation ? undefined : "visible"}
      className="group relative"
    >
      {/* Mobile Layout */}
      <div className="block sm:hidden pb-5 border-b border-gray-200">
        {/* Year Badge - Top */}
        <div className="mb-3">
          {year ? (
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-bold text-sm shadow-sm group-hover:bg-purple-200 group-hover:shadow-md transition-all duration-300">
              {year}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-xs shadow-sm">
              Year N/A
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Authors */}
          {name && (
            <p className="text-sm text-gray-700 font-medium">
              {name}
            </p>
          )}

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 leading-snug">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-700 transition-colors active:text-purple-800"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>

          {/* Conference & Venue */}
          <div className="space-y-1 text-sm text-gray-600">
            {conferenceName && (
              <p className="font-medium italic">{conferenceName}</p>
            )}
            {venue && (
              <p className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-500 flex-shrink-0"
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
                {venue}
              </p>
            )}
          </div>

          {/* Link Button */}
          {link && (
            <div className="pt-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 active:text-purple-800 transition-colors"
              >
                <span>View Publication</span>
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Desktop/Tablet Layout - Hidden on mobile */}
      <div className="hidden sm:flex gap-4 sm:gap-6">
        {year ? (
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-100 text-purple-700 font-bold text-base sm:text-lg shadow-sm group-hover:bg-purple-200 group-hover:shadow-md transition-all duration-300">
              {year}
            </div>
          </div>
        ) : (
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 text-gray-600 font-bold text-xs sm:text-sm shadow-sm">
              N/A
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0 pb-6 border-b border-gray-200 group-hover:border-purple-300 transition-colors">
          {/* Citation-style layout */}
          <div className="space-y-2 sm:space-y-2.5">
            {/* Authors */}
            {name && (
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                {name}
              </p>
            )}

            {/* Title - Most prominent */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-tight group-hover:text-purple-700 transition-colors">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline decoration-2 underline-offset-2"
                >
                  {title}
                </a>
              ) : (
                title
              )}
            </h3>

            {/* Conference & Venue Info */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base text-gray-600">
              {conferenceName && (
                <span className="font-medium italic">{conferenceName}</span>
              )}
              {conferenceName && venue && (
                <span className="text-gray-400">•</span>
              )}
              {venue && (
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-gray-500"
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
                  {venue}
                </span>
              )}
            </div>

            {/* Link Button */}
            {link && (
              <div className="pt-2">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200 group/btn"
                >
                  <span>View Publication</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
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
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}