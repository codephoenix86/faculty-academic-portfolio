"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = profile?.contact || {};
  const phones = contactInfo.phones || [];
  const emails = contactInfo.emails || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipientEmail: emails[0] || '',
        }),
      });

      if (!response.ok) {
        setIsSubmitting(false);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
        return;
      }

      const data = await response.json();

      if (data.error) {
        setIsSubmitting(false);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
        return;
      }

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className={`min-h-screen px-4 sm:px-[8%] lg:px-[16%] py-12 sm:py-20 ${inter.className}`}>
      {/* Header Section */}
      <div className="text-center mb-12 sm:mb-20">
        <div className="inline-block mb-3 sm:mb-4 overflow-hidden">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 ${isMounted ? 'animate-slideUp' : 'opacity-0'}`}>
            Get In Touch
          </h1>
        </div>
        <p className={`text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 ${isMounted ? 'animate-fadeIn' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          Have questions or want to collaborate? Feel free to reach out through
          the form below or contact me directly.
        </p>
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="mb-6 sm:mb-8 max-w-2xl mx-auto p-4 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl sm:rounded-2xl text-green-700 flex items-center gap-2 sm:gap-3 animate-slideIn shadow-sm">
          <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 bg-green-500 rounded-full flex items-center justify-center animate-scaleIn">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="font-medium text-sm sm:text-base">Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="mb-6 sm:mb-8 max-w-2xl mx-auto p-4 sm:p-5 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl sm:rounded-2xl text-red-700 flex items-center gap-2 sm:gap-3 animate-slideIn shadow-sm">
          <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 bg-red-500 rounded-full flex items-center justify-center animate-scaleIn">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <span className="font-medium text-sm sm:text-base">Failed to send message. Please check your connection and try again.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className={isMounted ? 'animate-fadeIn' : 'opacity-0'} style={{ animationDelay: '0.3s' }}>
          <div 
            className="group relative bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            {/* Gradient overlay on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.03), transparent 40%)`
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110 duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Send a Message
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="relative group/input">
                    <div className="relative">
                      <svg
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                          focusedField === "firstName"
                            ? "text-blue-600 scale-110"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("firstName")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base bg-gray-50/50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="relative group/input">
                    <div className="relative">
                      <svg
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                          focusedField === "lastName"
                            ? "text-blue-600 scale-110"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("lastName")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base bg-gray-50/50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="relative group/input">
                    <div className="relative">
                      <svg
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                          focusedField === "email"
                            ? "text-blue-600 scale-110"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base bg-gray-50/50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="relative group/input">
                    <div className="relative">
                      <svg
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                          focusedField === "phone"
                            ? "text-blue-600 scale-110"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base bg-gray-50/50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative group/input">
                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Your Message *"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base bg-gray-50/50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300 resize-none"
                    ></textarea>
                    <div className={`absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs font-medium transition-all duration-300 ${
                      focusedField === "message" ? "text-blue-600 opacity-100" : "text-gray-400 opacity-0"
                    }`}>
                      {formData.message.length}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className={isMounted ? 'animate-fadeIn' : 'opacity-0'} style={{ animationDelay: '0.4s' }}>
            <div className="group bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110 duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Reach me directly through
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Phones */}
                {phones.length > 0 && (
                  <div className="group/item">
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-300">
                      <div className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
                          Phone{phones.length > 1 ? "s" : ""}
                        </p>
                        <div className="space-y-1.5">
                          {phones.map((phone, index) => (
                            <a
                              key={index}
                              href={`tel:${phone}`}
                              className="block text-sm sm:text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300 break-all"
                            >
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Emails */}
                {emails.length > 0 && (
                  <div className="group/item">
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-300">
                      <div className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
                          Email{emails.length > 1 ? "s" : ""}
                        </p>
                        <div className="space-y-1.5">
                          {emails.map((email, index) => (
                            <a
                              key={index}
                              href={`mailto:${email}`}
                              className="block text-sm sm:text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300 break-all"
                            >
                              {email}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: both;
        }

        .animate-slideIn {
          animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}