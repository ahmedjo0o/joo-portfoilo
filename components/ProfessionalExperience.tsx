"use client";

import { motion } from "framer-motion";

export default function ProfessionalExperience() {
    return (
        <section className="min-h-screen py-20 px-6 text-white flex flex-col justify-center relative bg-[url('/experience.jpg')] bg-cover bg-center bg-no-repeat bg-black/80 bg-blend-overlay">
            <div className="max-w-4xl w-full mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional Experience</h2>
                    <p className="text-white/70 max-w-2xl text-lg">
                        During 10 years of work and experience, I’ve had the chance to work with valuable clients across top regional markets.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-6">
                    {[
                        {
                            company: "Freelance",
                            role: "Senior Motion Designer",
                            dates: "2020 - Present",
                            details: "Leading motion projects for international clients."
                        },
                        {
                            company: "Creative Agency",
                            role: "Motion Graphics Artist",
                            dates: "2018 - 2020",
                            details: "Designed broadcast packages and commercial content."
                        },
                        {
                            company: "Media House",
                            role: "Video Editor",
                            dates: "2015 - 2018",
                            details: "Edited documentaries and short films."
                        },
                        {
                            company: "StartUp Studio",
                            role: "Junior Animator",
                            dates: "2013 - 2015",
                            details: "Created explainer videos and social media content."
                        },
                    ].map((row, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex flex-col md:flex-row items-center gap-6 p-6 border border-white/5 rounded-2xl hover:bg-white/5 transition-all duration-300"
                        >
                            {/* Placeholder Logo */}
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-2xl font-bold text-emerald-500">
                                {row.company[0]}
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-white">{row.role}</h3>
                                <div className="text-emerald-400 text-sm font-mono mt-1">{row.dates}</div>
                            </div>

                            <div className="flex-1 text-center md:text-right text-white/50 text-sm md:text-base">
                                {row.details}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center md:justify-start">
                    <a href="/resume.pdf" download className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-emerald-400 hover:text-white transition-all duration-300">
                        Download Resume (PDF)
                    </a>
                </div>
            </div>
        </section>
    );
}
