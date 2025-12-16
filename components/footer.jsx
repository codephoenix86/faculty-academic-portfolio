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
  ArrowUp,
} from "lucide-react";
import { useVisitorStore } from "./VisitorTracker";

export default function Footer({ profile }) {
  const counterRef = useRef(null);
  
  const visitorCount = useVisitorStore((state) => state.visitorCount);
  const targetCount = visitorCount || profile?.visitorCount || 0;
  
  const prevCountRef = useRef(targetCount);
  const [displayCount, setDisplayCount] = useState(targetCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const digitPositionsRef = useRef({});
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    if (targetCount === prevCountRef.current + 1) {
      const prevStr = prevCountRef.current.toString();
      const currStr = targetCount.toString();
      const maxLen = Math.max(prevStr.length, currStr.length);
      const prevPadded = prevStr.padStart(maxLen, '0');
      
      const newPositions = {};
      for (let i = 0; i < maxLen; i++) {
        if (i < maxLen - prevStr.length) {
          newPositions[i] = 0;
        } else {
          newPositions[i] = parseInt(prevPadded[i]);
        }
      }
      digitPositionsRef.current = newPositions;
      
      setDisplayCount(targetCount);
      setIsAnimating(true);
      setTriggerAnimation(false);
      
      setTimeout(() => {
        setTriggerAnimation(true);
      }, 50);
      
      setTimeout(() => {
        setIsAnimating(false);
        setTriggerAnimation(false);
      }, 1100);
    } else {
      setDisplayCount(targetCount);
    }
    
    prevCountRef.current = targetCount;
  }, [targetCount]);

  const currentYear = new Date().getFullYear();

  const academicLinks = [
    { name: "Google Scholar", url: profile?.links?.googleScholar },
    { name: "ResearchGate", url: profile?.links?.researchGate },
  ].filter((link) => link.url);

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
                className="w-4 h-4"
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
  const address = profile?.contact?.address;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevCount = prevCountRef.current;
  const maxCount = Math.max(displayCount, isAnimating ? prevCount : displayCount);
  const formattedCount = maxCount.toLocaleString();
  const digits = formattedCount.split('');
  
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
          width: 0.9rem;
          height: 1.5rem;
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
          height: 1.5rem;
          line-height: 1.5rem;
          text-align: center;
          font-size: 1.125rem;
          font-weight: 600;
          color: #f97316;
          flex-shrink: 0;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Row 1: Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Contact
            </h3>
            <div className="space-y-3">
              {allEmails.length > 0 && (
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    {allEmails.map((email, index) => (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        className="text-slate-300 hover:text-primary-400 transition-colors text-sm break-all block"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {phoneNumbers.length > 0 && (
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    {phoneNumbers.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone}`}
                        className="text-slate-300 hover:text-primary-400 transition-colors text-sm font-medium block"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Academic Profiles */}
          {academicLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Academic Profiles
              </h3>
              <div className="space-y-2">
                {academicLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-slate-300 hover:text-primary-400 transition-colors text-sm group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Social Media */}
          {socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Social Media
              </h3>
              <div className="space-y-2">
                {socialLinks.map((link) => {
                  const Icon = typeof link.icon === "function" ? link.icon : link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-slate-300 hover:text-primary-400 transition-colors text-sm group"
                    >
                      <Icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                      {link.name}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Location */}
          {address && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Location
              </h3>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-300 text-sm whitespace-pre-line">
                    {address}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mb-6"></div>

        {/* Row 2: Utility Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* Visitor Count Badge */}
          <div 
            ref={counterRef}
            className="inline-flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 w-fit"
          >
            <svg
              className="w-4 h-4 text-slate-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ marginTop: '1px' }}
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
            <span className="text-slate-400 text-sm uppercase tracking-wide">Visitors</span>
            <div className="flex items-center">
              {digits.map((char, idx) => {
                if (isNaN(parseInt(char))) {
                  return (
                    <span key={`comma-${idx}`} className="text-primary-400 text-lg font-semibold mx-0.5">
                      {char}
                    </span>
                  );
                }
                
                let digitIndex = 0;
                for (let i = 0; i < idx; i++) {
                  if (!isNaN(parseInt(digits[i]))) {
                    digitIndex++;
                  }
                }
                
                const prevDigit = digitPositionsRef.current[digitIndex];
                const currDigit = parseInt(currPadded[digitIndex]) || 0;
                const isRollover = prevDigit === 9 && currDigit === 0;
                
                let position;
                if (triggerAnimation) {
                  if (isRollover) {
                    position = -(10 * 1.5);
                  } else {
                    position = -(currDigit * 1.5);
                  }
                } else if (isAnimating) {
                  position = -(prevDigit * 1.5);
                } else {
                  position = -(currDigit * 1.5);
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

          {/* Copyright */}
          <div className="text-slate-400 text-sm">
            {profile?.name || 'All Rights Reserved'}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary-400 transition-colors text-sm group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}