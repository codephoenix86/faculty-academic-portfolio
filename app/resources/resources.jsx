"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Add global styles for scrollbar
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    .custom-scrollbar::-webkit-scrollbar-button {
      display: none;
    }
  `;
  if (!document.head.querySelector("#custom-scrollbar-styles")) {
    style.id = "custom-scrollbar-styles";
    document.head.appendChild(style);
  }
}

// Get human-readable file type description
function getFileTypeDescription(extension, isUrl) {
  if (isUrl) return "External link";

  const ext = extension?.toLowerCase();

  const typeMap = {
    pdf: "PDF Document",
    doc: "Word Document",
    docx: "Word Document",
    xls: "Excel Spreadsheet",
    xlsx: "Excel Spreadsheet",
    csv: "CSV Spreadsheet",
    ppt: "PowerPoint Presentation",
    pptx: "PowerPoint Presentation",
    zip: "ZIP Archive",
    rar: "RAR Archive",
    "7z": "7-Zip Archive",
    tar: "TAR Archive",
    gz: "GZIP Archive",
    jpg: "JPEG Image",
    jpeg: "JPEG Image",
    png: "PNG Image",
    gif: "GIF Image",
    bmp: "Bitmap Image",
    svg: "SVG Vector",
    webp: "WebP Image",
    ico: "Icon File",
    mp4: "MP4 Video",
    avi: "AVI Video",
    mov: "QuickTime Video",
    wmv: "Windows Media Video",
    flv: "Flash Video",
    mkv: "Matroska Video",
    webm: "WebM Video",
    m4v: "M4V Video",
    js: "JavaScript File",
    jsx: "React JavaScript",
    ts: "TypeScript File",
    tsx: "React TypeScript",
    py: "Python Script",
    java: "Java Source",
    cpp: "C++ Source",
    c: "C Source",
    h: "C/C++ Header",
    hpp: "C++ Header",
    cs: "C# Source",
    php: "PHP Script",
    rb: "Ruby Script",
    go: "Go Source",
    rs: "Rust Source",
    swift: "Swift Source",
    kt: "Kotlin Source",
    scala: "Scala Source",
    r: "R Script",
    m: "MATLAB Script",
    sh: "Shell Script",
    bat: "Batch Script",
    sql: "SQL Script",
    html: "HTML Document",
    css: "CSS Stylesheet",
    scss: "SASS Stylesheet",
    sass: "SASS Stylesheet",
    less: "LESS Stylesheet",
    json: "JSON Data",
    xml: "XML Document",
    yaml: "YAML Config",
    yml: "YAML Config",
    toml: "TOML Config",
    ini: "INI Config",
    cfg: "Config File",
    conf: "Config File",
    txt: "Text File",
    md: "Markdown Document",
    markdown: "Markdown Document",
    log: "Log File",
  };

  return typeMap[ext] || `${ext?.toUpperCase() || "Unknown"} File`;
}

// File icon component with major categories
function FileIcon({ extension, isUrl }) {
  const getIconStyle = () => {
    if (isUrl) {
      return {
        bg: "bg-gradient-to-br from-blue-100 to-blue-200",
        color: "text-blue-600",
        icon: (
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
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        ),
      };
    }

    const ext = extension?.toLowerCase();

    // PDF
    if (ext === "pdf") {
      return {
        bg: "bg-gradient-to-br from-red-100 to-red-200",
        color: "text-red-600",
        icon: (
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
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        ),
      };
    }

    // Word Documents
    if (["doc", "docx"].includes(ext)) {
      return {
        bg: "bg-gradient-to-br from-blue-100 to-blue-200",
        color: "text-blue-600",
        icon: (
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
      };
    }

    // Excel/Spreadsheets
    if (["xls", "xlsx", "csv"].includes(ext)) {
      return {
        bg: "bg-gradient-to-br from-green-100 to-green-200",
        color: "text-green-600",
        icon: (
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
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        ),
      };
    }

    // PowerPoint
    if (["ppt", "pptx"].includes(ext)) {
      return {
        bg: "bg-gradient-to-br from-orange-100 to-orange-200",
        color: "text-orange-600",
        icon: (
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
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        ),
      };
    }

    // Archives
    if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) {
      return {
        bg: "bg-gradient-to-br from-purple-100 to-purple-200",
        color: "text-purple-600",
        icon: (
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
              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
            />
          </svg>
        ),
      };
    }

    // Images
    if (
      ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "ico"].includes(ext)
    ) {
      return {
        bg: "bg-gradient-to-br from-pink-100 to-rose-200",
        color: "text-pink-600",
        icon: (
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        ),
      };
    }

    // Videos
    if (
      ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "m4v"].includes(ext)
    ) {
      return {
        bg: "bg-gradient-to-br from-indigo-100 to-purple-200",
        color: "text-indigo-600",
        icon: (
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
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
    }

    // Code files
    if (
      [
        "js",
        "jsx",
        "ts",
        "tsx",
        "py",
        "java",
        "cpp",
        "c",
        "h",
        "hpp",
        "cs",
        "php",
        "rb",
        "go",
        "rs",
        "swift",
        "kt",
        "scala",
        "r",
        "m",
        "sh",
        "bat",
        "sql",
      ].includes(ext)
    ) {
      return {
        bg: "bg-gradient-to-br from-yellow-100 to-amber-200",
        color: "text-amber-700",
        icon: (
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
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        ),
      };
    }

    // Web files
    if (["html", "css", "scss", "sass", "less"].includes(ext)) {
      return {
        bg: "bg-gradient-to-br from-cyan-100 to-blue-200",
        color: "text-cyan-700",
        icon: (
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
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        ),
      };
    }

    // Data/Config files
    if (
      ["json", "xml", "yaml", "yml", "toml", "ini", "cfg", "conf"].includes(ext)
    ) {
      return {
        bg: "bg-gradient-to-br from-emerald-100 to-teal-200",
        color: "text-emerald-700",
        icon: (
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
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
            />
          </svg>
        ),
      };
    }

    // Text files
    if (["txt", "md", "markdown", "log"].includes(ext)) {
      return {
        bg: "bg-gradient-to-br from-gray-100 to-gray-200",
        color: "text-gray-600",
        icon: (
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
      };
    }

    // Default for unknown types
    return {
      bg: "bg-gradient-to-br from-slate-100 to-slate-200",
      color: "text-slate-600",
      icon: (
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
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    };
  };

  const style = getIconStyle();

  return (
    <div
      className={`w-8 h-8 sm:w-10 sm:h-10 ${style.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
    >
      <div className={style.color}>{style.icon}</div>
    </div>
  );
}

function ResourceCard({ resource, formatDate, formatFileSize }) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(null);

  useEffect(() => {
    if (resource.attachments?.length > 2 && measureRef.current) {
      const items = measureRef.current.children;
      if (items.length >= 2) {
        const firstItemRect = items[0].getBoundingClientRect();
        const secondItemRect = items[1].getBoundingClientRect();
        const calculatedHeight = secondItemRect.bottom - firstItemRect.top;
        setMaxHeight(calculatedHeight);
      }
    }
  }, [resource.attachments]);

  const handleAttachmentClick = async (attachment) => {
    const isUrl = !!attachment.fileUrl;
    const url = attachment.fileUrl || attachment.file?.asset?.url;

    if (!url || url === "#") {
      console.warn("No valid URL for attachment");
      return;
    }

    if (isUrl) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const fileName = attachment.file?.asset?.originalFilename || "download";

      if (url.includes("cdn.sanity.io") || url.includes("sanity.io")) {
        const downloadUrl = `${url}?dl=${encodeURIComponent(fileName)}`;
        window.location.href = downloadUrl;
      } else {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Fetch failed");

          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
        } catch (error) {
          console.error("Download failed:", error);
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden">
      {/* Subject Header Strip */}
      {resource.subject && (
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-5 py-2.5 sm:px-7 sm:py-3 flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-200 flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-bold text-slate-800 text-xs sm:text-sm flex-1 truncate">{resource.subject}</span>
        </div>
      )}

      {/* Content */}
      <div className="p-3 sm:p-4">
        <div className="mb-5">
          <p className="text-base sm:text-lg text-slate-900 leading-relaxed whitespace-pre-wrap break-words">
            {resource.label}
          </p>
        </div>

        {/* Date Info */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
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
          <span>{formatDate(resource.createdAt)}</span>
          {resource.attachments?.length > 0 && (
            <>
              <span>•</span>
              <span>
                {resource.attachments.length} file
                {resource.attachments.length !== 1 ? "s" : ""}
              </span>
            </>
          )}
        </div>

        {/* Attachments */}
        {resource.attachments?.length > 0 && (
          <div className="pt-5 border-t border-slate-200">
            <div
              ref={containerRef}
              className={`space-y-2 ${
                resource.attachments.length > 2
                  ? "custom-scrollbar overflow-y-auto pr-2"
                  : ""
              }`}
              style={
                resource.attachments.length > 2 && maxHeight
                  ? { maxHeight: `${maxHeight}px` }
                  : {}
              }
            >
              {resource.attachments.map((attachment, idx) => {
                const isUrl = !!attachment.fileUrl;
                const file = attachment.file?.asset;
                const fileName = isUrl
                  ? attachment.name || attachment.fileUrl || "External Link"
                  : file?.originalFilename || "Download";
                const fileType = getFileTypeDescription(file?.extension, isUrl);

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all group cursor-pointer"
                    onClick={() => handleAttachmentClick(attachment)}
                  >
                    <FileIcon extension={file?.extension} isUrl={isUrl} />
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-700"
                        title={fileName}
                      >
                        {fileName}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span>{fileType}</span>
                        {!isUrl && file?.size && (
                          <>
                            <span>•</span>
                            <span>{formatFileSize(file.size)}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {isUrl ? (
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-blue-700 flex-shrink-0"
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
                    ) : (
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-blue-700 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hidden measurement container */}
            <div className="invisible absolute pointer-events-none" aria-hidden="true">
              <div ref={measureRef} className="space-y-2">
                {resource.attachments.slice(0, 2).map((attachment, idx) => {
                  const isUrl = !!attachment.fileUrl;
                  const file = attachment.file?.asset;
                  const fileName = isUrl
                    ? attachment.name || attachment.fileUrl || "External Link"
                    : file?.originalFilename || "Download";
                  const fileType = getFileTypeDescription(file?.extension, isUrl);

                  return (
                    <div
                      key={`measure-${idx}`}
                      className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <FileIcon extension={file?.extension} isUrl={isUrl} />
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-medium text-slate-900 truncate"
                          title={fileName}
                        >
                          {fileName}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>{fileType}</span>
                          {!isUrl && file?.size && (
                            <>
                              <span>•</span>
                              <span>{formatFileSize(file.size)}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-slate-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Resources({ data }) {
  const [selectedSemester, setSelectedSemester] = useState("3");
  const allSemesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const semesterResources = useMemo(() => {
    return data.filter((resource) => resource.semester === selectedSemester);
  }, [data, selectedSemester]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="min-h-screen">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
          Study Resources
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Course materials and resources
        </p>
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {allSemesters.map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-xs sm:text-sm ${
                selectedSemester === sem
                  ? "bg-blue-700 text-white shadow-lg shadow-blue-200"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200"
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {semesterResources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 sm:py-24 bg-white rounded-2xl border-2 border-slate-200 shadow-sm"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
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
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No resources yet
            </h3>
            <p className="text-slate-500">
              Resources for Semester {selectedSemester} will appear here
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={selectedSemester}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 sm:space-y-6"
          >
            {semesterResources.map((resource) => (
              <ResourceCard
                key={resource._id}
                resource={resource}
                formatDate={formatDate}
                formatFileSize={formatFileSize}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}