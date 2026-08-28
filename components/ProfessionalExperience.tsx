"use client";

import { motion } from "framer-motion";
import OrgLogo from "./OrgLogo";

export default function ProfessionalExperience() {
    return (
        <section className="min-h-screen py-20 px-6 text-white flex flex-col justify-center relative bg-[url('/experience.jpg')] bg-cover bg-center bg-no-repeat bg-black/80 bg-blend-overlay">
            <div className="max-w-5xl w-full mx-auto">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {[
                        {
                            company: "Middle East News FZ LLC",
                            logo: "/brand/organizations/politicsless.svg",
                            role: "Senior Motion Designer",
                            dates: "2024 - Now",
                            details: "Create 2D & 3D Motion Graphics and edit videos for (Politicsless) on all digital platforms, enhancing creative quality of team and create templates for editors."
                        },
                        {
                            company: "Influence Group",
                            logo: "/brand/organizations/influence.svg",
                            role: "Senior Motion Designer",
                            dates: "2019 - 2024",
                            details: "Work for events management and digital agency, create dynamic animations and graphics for events, promotional videos, and digital content. Develop concepts, storyboard, design, edit, and collaborate with art team to ensure high-quality, brand-consistent visuals."
                        },
                        {
                            company: "Enjoy Learning VR (Startup)",
                            logo: "/brand/organizations/elvr.svg",
                            role: "Motion Graphic Lead",
                            dates: "2018 - 2019",
                            details: "Responsible for developing spectacular creative for a startup company. Create 3D motion graphics and VR videos for educational content. Participate in all phases of the design process, including concept development, animation, graphic design, and post-production."
                        },
                        {
                            company: "Sarmady",
                            logo: "/brand/organizations/sarmady.svg",
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
                            className="flex items-start gap-6"
                        >
                            <OrgLogo src={row.logo} alt={row.company} className="w-28 h-16 shrink-0" />

                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{row.company}</h3>
                                <div className="text-sm md:text-base mb-3">
                                    <span className="text-white font-semibold">{row.role}</span>
                                    <span className="text-white/30 mx-2">|</span>
                                    <span className="text-violet-400 font-mono">{row.dates}</span>
                                </div>
                                <p className="text-white/50 text-sm md:text-base">
                                    {row.details}
                                </p>
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
