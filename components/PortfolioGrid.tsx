"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import PlaceholderMedia from "./PlaceholderMedia";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, i) => (
                <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                >
                    <a
                        href={project.behanceUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                    >
                        <motion.div
                            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                        >
                            <motion.div
                                variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                                transition={{ duration: 0.8, ease: EASE }}
                                className="absolute inset-0"
                            >
                                {project.cover ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={project.cover}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <PlaceholderMedia
                                        label="Image"
                                        gradient="from-zinc-800 via-zinc-900 to-black"
                                        text={project.title}
                                    />
                                )}
                            </motion.div>

                            <motion.div
                                variants={{ rest: { opacity: 0 }, hover: { opacity: 0.6 } }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="absolute inset-0 bg-black"
                            />

                            <motion.div
                                variants={{ rest: { opacity: 0, y: -8 }, hover: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.5, ease: EASE }}
                                className="absolute left-0 right-0 top-0 p-6"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-1">
                                    {project.title}
                                </h3>
                                <p className="text-white/70 text-sm">{project.subtitle}</p>
                            </motion.div>

                            <motion.div
                                variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                            >
                                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 -rotate-45">
                                    <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </a>
                </motion.div>
            ))}
        </div>
    );
}
