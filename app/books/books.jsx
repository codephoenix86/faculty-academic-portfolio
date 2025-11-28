"use client";
import { useState, useMemo } from "react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Books({ data = [] }) {
  const [books, setBooks] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = book.title.toLowerCase().includes(searchLower);
      const publisherMatch = book.publisher
        ?.toLowerCase()
        .includes(searchLower);
      const isbnMatch = book.isbn?.toLowerCase().includes(searchLower);
      return titleMatch || publisherMatch || isbnMatch;
    });

    // Sort books
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
    } else if (sortBy === "title") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [books, searchQuery, sortBy]);

  return (
    <div className={`min-h-screen relative ${inter.className}`}>
      {/* Header Section */}
      <div className="mb-8 sm:mb-12 px-4 sm:px-0">
        <div className="flex items-end justify-between mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">
              Books
            </h1>
            <p className="text-gray-600 text-xs sm:text-base md:text-lg font-light">
              Published works and authored books
            </p>
          </div>
        </div>
      </div>

      {/* Search and Sort Bar */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-0">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
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
            placeholder="Search by title, publisher, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-sm sm:text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all duration-300 shadow-sm hover:shadow-md"
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
        <div className="relative sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700"
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
            className="appearance-none w-full sm:w-auto pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-sm sm:text-base text-gray-900 font-medium focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            <option value="default">Default Order</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title (A-Z)</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700"
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
        <div className="mb-4 sm:mb-6 text-gray-600 text-xs sm:text-sm font-medium px-4 sm:px-0">
          Found {filteredAndSortedBooks.length} book
          {filteredAndSortedBooks.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Books Grid */}
      {filteredAndSortedBooks.length === 0 ? (
        <div className="text-center py-16 sm:py-24 px-4 sm:px-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-white flex items-center justify-center border-2 border-gray-200 shadow-sm">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              )}
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            {searchQuery ? "No matching books found" : "No books yet"}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Books will appear here"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 px-4 sm:px-0">
          {filteredAndSortedBooks.map((book, index) => (
            <BookCard key={book._id} book={book} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookCard({ book, index }) {
  const { _id, year, title, publisher, isbn, link } = book;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "100px", amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="group bg-white border border-gray-200 rounded-xl p-5 sm:p-7 transition-all duration-300 hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-4 sm:mb-5 gap-2 sm:gap-3">
            <div className="px-2.5 py-1.5 sm:px-5 sm:py-2.5 bg-gradient-to-br from-emerald-100 to-emerald-200 border border-emerald-300 rounded-xl shadow-sm">
              <span className="text-emerald-800 font-bold text-sm sm:text-base md:text-lg tracking-tight">
                {year}
              </span>
            </div>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
                  View Book
                </span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform flex-shrink-0"
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
          <h4 className="text-base sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900 group-hover:text-emerald-700 transition-colors duration-300 leading-tight tracking-tight">
            {title}
          </h4>

          {/* Book Details */}
          <div className="space-y-2">
            {publisher && (
              <div className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="text-sm sm:text-base font-medium">{publisher}</span>
              </div>
            )}

            {isbn && (
              <div className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                <span className="text-sm sm:text-base font-mono">{isbn}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}