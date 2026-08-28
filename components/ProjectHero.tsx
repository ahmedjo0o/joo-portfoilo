"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import PlaceholderMedia from "./PlaceholderMedia";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProjectHero({ project }: { project: Project }) {
    const meta = [
        { label: "Client", value: project.client },
        { label: "Role", value: project.role },
        { label: "Year", value: project.year },
        { label: "Tools", value: project.tools.join(", ") },
    ];

    return (
        <section className="relative w-full h-[70vh] min-h-[520px] flex items-end overflow-hidden">
            <div className="absolute inset-0">
                {project.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.cover} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                    <PlaceholderMedia label="Image" gradient={project.gradient} text={project.category} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
            </div>

            <div className="relative container mx-auto max-w-6xl px-6 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                >
                    <div className="text-emerald-400 text-sm font-mono uppercase tracking-widest mb-4">
                        {project.category}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 max-w-3xl leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mb-10">{project.summary}</p>

                    <div className="flex flex-wrap gap-x-10 gap-y-4">
                        {meta.map((m) => (
                            <div key={m.label}>
                                <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{m.label}</div>
                                <div className="text-white font-medium">{m.value}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
