"use client";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Facebook,
} from "lucide-react";

export default function Footer({ profile }) {
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
  const phoneNumber = profile?.contact?.phone;
  const addressInfo = profile?.contact?.address;

  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Professor Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {profile?.name || "Professor"}
            </h2>
            {profile?.role && (
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                {profile.role}
              </p>
            )}
          </motion.div>

          {/* Address Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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

          {/* Phone Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {phoneNumber && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    Phone
                  </h3>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-slate-300 hover:text-orange-400 transition-colors text-sm font-medium"
                  >
                    {phoneNumber}
                  </a>
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
