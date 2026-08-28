"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import PlaceholderMedia from "./PlaceholderMedia";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
    const categories = useMemo(
        () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
        [projects]
    );
    const [active, setActive] = useState("All");

    const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors duration-300 ${
                            active === cat
                                ? "bg-emerald-500 text-black border-emerald-500"
                                : "border-white/15 text-white/60 hover:text-white hover:border-white/40"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                    {filtered.map((project, i) => (
                        <motion.div
                            key={project.slug}
                            layout
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                        >
                            <Link href={`/portfolio/${project.slug}`} className="group block">
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
                                            <PlaceholderMedia label="Image" gradient={project.gradient} text={project.category} />
                                        )}
                                    </motion.div>

                                    <motion.div
                                        variants={{ rest: { opacity: 0.35 }, hover: { opacity: 0.75 } }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"
                                    />

                                    <motion.div
                                        variants={{ rest: { y: 12, opacity: 0.85 }, hover: { y: 0, opacity: 1 } }}
                                        transition={{ duration: 0.6, ease: EASE }}
                                        className="absolute left-0 right-0 bottom-0 p-5 md:p-6"
                                    >
                                        <div className="text-emerald-400 text-xs font-mono uppercase tracking-widest mb-1">
                                            {project.category}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
                                            {project.title}
                                        </h3>
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
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
