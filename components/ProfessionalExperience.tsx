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
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Professional Experience</h2>
                    <p className="text-white/70 max-w-2xl text-lg">
                        Over eight years of experience across digital agencies and events management, delivering
                        high-quality, brand-consistent motion design for a range of clients.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-6">
                    {[
                        {
                            company: "Middle East News FZ LLC",
                            role: "Senior Motion Designer",
                            dates: "2024 - Now",
                            details: "Create 2D & 3D Motion Graphics and edit videos for (Politicsless) on all digital platforms, enhancing creative quality of team and create templates for editors."
                        },
                        {
                            company: "Influence Group",
                            role: "Senior Motion Designer",
                            dates: "2019 - 2024",
                            details: "Work for events management and digital agency, create dynamic animations and graphics for events, promotional videos, and digital content. Develop concepts, storyboard, design, edit, and collaborate with art team to ensure high-quality, brand-consistent visuals."
                        },
                        {
                            company: "Enjoy Learning VR (Startup)",
                            role: "Motion Graphic Lead",
                            dates: "2018 - 2019",
                            details: "Responsible for developing spectacular creative for a startup company. Create 3D motion graphics and VR videos for educational content. Participate in all phases of the design process, including concept development, animation, graphic design, and post-production."
                        },
                        {
                            company: "Sarmady",
                            role: "Motion Designer",
                            dates: "2016 - 2018",
                            details: "Create 2D & 3D motion graphic videos, animations and live video content for a diverse array of media, including social media, websites and television, as well as live coverage of sports matches, events and more."
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
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-2xl font-bold text-violet-500">
                                {row.company[0]}
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-white">{row.role}</h3>
                                <div className="text-violet-400 text-sm font-mono mt-1">{row.dates}</div>
                            </div>

                            <div className="flex-1 text-center md:text-right text-white/50 text-sm md:text-base">
                                {row.details}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center md:justify-start">
                    <a href="/resume.pdf" download className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300">
                        Download Resume (PDF)
                    </a>
                </div>
            </div>
        </section>
    );
}
