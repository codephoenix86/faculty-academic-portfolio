"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Facebook,
} from "lucide-react";
import { useVisitorStore } from "./VisitorTracker";

export default function Footer({ profile }) {
  const counterRef = useRef(null);
  
  // Get visitor count from global store
  const visitorCount = useVisitorStore((state) => state.visitorCount);
  
  // Use the store count if available, otherwise fall back to profile count
  const targetCount = visitorCount || profile?.visitorCount || 0;
  
  // Track previous count to detect increments
  const prevCountRef = useRef(targetCount);
  const [displayCount, setDisplayCount] = useState(targetCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const digitPositionsRef = useRef({});
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    // Only animate if count increased by 1
    if (targetCount === prevCountRef.current + 1) {
      // Store current positions before animating
      const prevStr = prevCountRef.current.toString();
      const currStr = targetCount.toString();
      const maxLen = Math.max(prevStr.length, currStr.length);
      const prevPadded = prevStr.padStart(maxLen, '0');
      
      // Store all digit positions (existing digits keep their value, new digits start at 0)
      const newPositions = {};
      for (let i = 0; i < maxLen; i++) {
        if (i < maxLen - prevStr.length) {
          // New digit position - start at 0
          newPositions[i] = 0;
        } else {
          // Existing digit - use previous value
          newPositions[i] = parseInt(prevPadded[i]);
        }
      }
      digitPositionsRef.current = newPositions;
      
      setDisplayCount(targetCount);
      setIsAnimating(true);
      setTriggerAnimation(false);
      
      // Trigger animation after a small delay
      setTimeout(() => {
        setTriggerAnimation(true);
      }, 50);
      
      // Reset animation state after transition completes
      setTimeout(() => {
        setIsAnimating(false);
        setTriggerAnimation(false);
      }, 1100);
    } else {
      // For initial load or other changes, update immediately
      setDisplayCount(targetCount);
    }
    
    prevCountRef.current = targetCount;
  }, [targetCount]);

  const currentYear = new Date().getFullYear();

  // Academic profile links from the new links object
  const academicLinks = [
    { name: "Google Scholar", url: profile?.links?.googleScholar },
    { name: "ResearchGate", url: profile?.links?.researchGate },
  ].filter((link) => link.url);

  // Social links from the new links object
  const socialLinks = [
    { name: "GitHub", url: profile?.links?.github, icon: Github },
    { name: "LinkedIn", url: profile?.links?.linkedin, icon: "linkedin" },
    { name: "Facebook", url: profile?.links?.facebook, icon: Facebook },
  ]
    .filter((link) => link.url)
    .map((link) => ({
      ...link,
      icon:
        link.icon === "linkedin"
          ? () => (
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            )
          : link.icon,
    }));

  const allEmails = profile?.contact?.emails || [];
  const phoneNumbers = profile?.contact?.phones || [];
  const addressInfo = profile?.contact?.address;

  // Use the larger of current and previous count to determine digit count
  const prevCount = prevCountRef.current;
  const maxCount = Math.max(displayCount, isAnimating ? prevCount : displayCount);
  const formattedCount = maxCount.toLocaleString();
  const digits = formattedCount.split('');
  
  // Get clean digit strings for comparison
  const prevStr = prevCount.toString();
  const currStr = displayCount.toString();
  const maxLen = Math.max(prevStr.length, currStr.length);
  const prevPadded = prevStr.padStart(maxLen, '0');
  const currPadded = currStr.padStart(maxLen, '0');

  return (
    <footer className="bg-slate-900 text-slate-100">
      <style>{`
        .digit-container {
          display: inline-block;
          width: 1.5rem;
          height: 3rem;
          overflow: hidden;
          position: relative;
        }
        
        .digit-strip {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }
        
        .digit-item {
          height: 3rem;
          line-height: 3rem;
          text-align: center;
          font-size: 2.25rem;
          font-weight: bold;
          color: #fb923c;
          flex-shrink: 0;
        }
        
        .comma-char {
          display: inline-block;
          width: 0.75rem;
          text-align: center;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Address Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1 text-sm">
                  Location
                </h3>
                {addressInfo?.department && (
                  <p className="text-slate-400 text-sm mb-1">
                    {addressInfo.department}
                  </p>
                )}
                {addressInfo?.institution && (
                  <p className="text-slate-400 text-sm mb-1">
                    {addressInfo.institution}
                  </p>
                )}
                {addressInfo?.location && (
                  <p className="text-slate-400 text-sm">
                    {addressInfo.location}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Visitor Count Section */}
          <motion.div
            ref={counterRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-orange-500 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2 text-sm">
                  Visitors
                </h3>
                <div className="flex items-center">
                  {digits.map((char, idx) => {
                    if (isNaN(parseInt(char))) {
                      return null;
                    }
                    
                    // Map formatted index to unformatted position
                    let digitIndex = 0;
                    for (let i = 0; i < idx; i++) {
                      if (!isNaN(parseInt(digits[i]))) {
                        digitIndex++;
                      }
                    }
                    
                    // Get previous and current digit values
                    const prevDigit = digitPositionsRef.current[digitIndex];
                    const currDigit = parseInt(currPadded[digitIndex]) || 0;
                    
                    // Check if this is a new digit (didn't exist before or was 0)
                    const isNewDigit = prevDigit === 0 && currDigit > 0 && digitIndex === 0;
                    
                    // Determine if rolling over (9→0)
                    const isRollover = prevDigit === 9 && currDigit === 0;
                    
                    // Calculate position (negative translateY moves UP)
                    let position;
                    if (triggerAnimation) {
                      if (isRollover) {
                        // Roll through all digits: go to position 10 (which shows 0 again)
                        position = -(10 * 3); // -30rem
                      } else {
                        // Normal or new digit: scroll to current digit
                        position = -(currDigit * 3);
                      }
                    } else if (isAnimating) {
                      // Before trigger: show previous/initial position
                      position = -(prevDigit * 3);
                    } else {
                      // Not animating: show current digit
                      position = -(currDigit * 3);
                    }
                    
                    return (
                      <div key={`${idx}-${digitIndex}`} className="digit-container">
                        <div 
                          className="digit-strip"
                          style={{
                            transform: `translateY(${position}rem)`,
                            transition: triggerAnimation ? 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
                          }}
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, numIdx) => (
                            <div key={numIdx} className="digit-item">
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phone Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {phoneNumbers.length > 0 && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    Phone
                  </h3>
                  <div className="space-y-1">
                    {phoneNumbers.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone}`}
                        className="text-slate-300 hover:text-orange-400 transition-colors text-sm font-medium block"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Email Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2 text-sm">Email</h3>
                <div className="space-y-1">
                  {allEmails.map((email, index) => (
                    <a
                      key={index}
                      href={`mailto:${email}`}
                      className="text-slate-300 hover:text-orange-400 transition-colors text-sm break-all block"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mb-8"></div>

        {/* Quick Links Section */}
        {(academicLinks.length > 0 || socialLinks.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              {/* Academic Profiles */}
              {academicLinks.length > 0 && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-4">
                    Academic Profiles
                  </p>
                  <div className="flex flex-row gap-4">
                    {academicLinks.map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors text-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {link.name}
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links - CONNECT SECTION ON RIGHT */}
              {socialLinks.length > 0 && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-4">
                    Connect
                  </p>
                  <div className="flex flex-row gap-4">
                    {socialLinks.map((link) => {
                      const Icon =
                        typeof link.icon === "function" ? link.icon : link.icon;
                      return (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 4 }}
                          className="inline-flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors text-sm"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {link.name}
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </footer>
  );
}