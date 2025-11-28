"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  Calendar, 
  Building2, 
  Clock,
  Award
} from "lucide-react";

// Animation variants - only for scroll animations
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
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

export default function AboutPageClient({ profileData }) {
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  const data = profileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div 
          animate={{ 
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        {/* Hero Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Professional Profile
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Explore my academic journey, professional experience, and achievements
          </p>
        </motion.div>

        {/* Bio Section */}
        {data.bio && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12 md:mb-16"
          >
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                    <User className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      About Me
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base">
                      My journey and expertise
                    </p>
                  </div>
                </div>
                <Separator className="mb-6" />
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-700 leading-relaxed text-justify whitespace-pre-line text-base md:text-lg">
                    {data.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Education
              </h2>
            </div>

            <motion.div variants={staggerContainer} className="space-y-6">
              {data.education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mt-2 shrink-0" />
                            <div className="flex-1">
                              <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-2">
                                {edu.degree}
                              </h3>
                              <p className="text-slate-700 font-semibold text-base md:text-lg mb-2 flex items-center gap-2">
                                <Building2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                                {edu.institution}
                              </p>
                              {edu.description && (
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                  {edu.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {edu.year && (
                          <Badge
                            variant="secondary"
                            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-2 border-blue-200 self-start flex items-center gap-2"
                          >
                            <Calendar className="w-4 h-4" />
                            {edu.year}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Experience
              </h2>
            </div>

            <motion.div variants={staggerContainer} className="space-y-6">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full mt-2 shrink-0" />
                            <div className="flex-1">
                              <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-2">
                                {exp.position}
                              </h3>
                              <p className="text-slate-700 font-semibold text-base md:text-lg mb-2 flex items-center gap-2">
                                <Building2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                                {exp.institution}
                              </p>
                              {exp.description && (
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {exp.duration && (
                          <Badge
                            variant="secondary"
                            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-2 border-emerald-200 self-start flex items-center gap-2"
                          >
                            <Clock className="w-4 h-4" />
                            {exp.duration}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Awards & Honors Section */}
        {data.awards && data.awards.length > 0 && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Awards & Honors
              </h2>
            </div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {data.awards.map((award, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm h-full">
                    <CardContent className="p-6 md:p-7">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center shrink-0 border border-amber-200">
                          <Award className="w-6 h-6 md:w-7 md:h-7 text-amber-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="text-base md:text-xl font-bold text-slate-900">
                            {award.title}
                          </h3>
                          <p className="text-xs md:text-base text-slate-700 font-medium flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-amber-600" />
                            {award.organization}
                          </p>
                          {award.year && (
                            <Badge
                              variant="secondary"
                              className="px-3 py-1.5 text-xs font-semibold bg-amber-50 text-amber-700 border-2 border-amber-200 inline-flex items-center gap-1.5"
                            >
                              <Calendar className="w-3 h-3" />
                              {award.year}
                            </Badge>
                          )}
                          {award.description && (
                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed pt-2">
                              {award.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}