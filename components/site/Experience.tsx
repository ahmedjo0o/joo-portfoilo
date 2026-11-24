"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/data/content";
import { VelocityRow } from "./Marquee";
import { EASE_EXPO, InViewReveal, SectionTag } from "./primitives";

function Logo({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return (
        <div
            role="img"
            aria-label={alt}
            className={className}
            style={{
                background: "currentColor",
                WebkitMaskImage: `url(${src})`,
                maskImage: `url(${src})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
            }}
        />
    );
}

export default function Experience() {
    return (
        <section id="experience" className="relative bg-ink pb-24 pt-28 md:pb-36 md:pt-44">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <SectionTag index={6} label="Experience" />
                <h2 className="mt-6 font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tight text-paper md:text-[9vw]">
                    <InViewReveal text="Credits" stagger={0.04} />
                </h2>
            </div>

            <ul className="mt-14 border-t border-paper/10 md:mt-20">
                {EXPERIENCE.map((job, i) => (
                    <motion.li
                        key={job.company}
                        className="group relative overflow-hidden border-b border-paper/10"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                        transition={{ duration: 0.9, ease: EASE_EXPO, delay: i * 0.06 }}
                    >
                        {/* Hover wipe */}
                        <span className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-700 ease-out-expo group-hover:scale-y-100" aria-hidden />

                        <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center gap-x-4 gap-y-3 px-5 py-8 transition-colors duration-500 group-hover:text-ink md:px-10 md:py-10">
                            <div className="col-span-12 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/45 transition-colors group-hover:text-ink/60 md:col-span-2 md:text-xs">
                                {job.from} — {job.to}
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <h3 className="font-display text-4xl font-black uppercase leading-[0.9] text-paper transition-colors group-hover:text-ink md:text-6xl">
                                    {job.company}
                                </h3>
                                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{job.role}</div>
                            </div>
                            <p className="col-span-12 text-sm leading-relaxed text-paper/55 transition-colors group-hover:text-ink/75 md:col-span-3 md:text-[15px]">
                                {job.details}
                            </p>
                            <div className="col-span-12 flex justify-start md:col-span-1 md:justify-end">
                                <Logo
                                    src={job.logo}
                                    alt={job.company}
                                    className="h-10 w-20 text-paper/70 transition-all duration-500 group-hover:scale-110 group-hover:text-ink md:h-12 md:w-24"
                                />
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>

            {/* Worked with */}
            <div className="mt-24 md:mt-32">
                <div className="mx-auto mb-8 max-w-7xl px-5 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40 md:px-10 md:text-xs">
                    Worked with
                </div>
                <VelocityRow baseVelocity={-1.5} className="border-y border-paper/10 py-8 md:py-10">
                    {EXPERIENCE.concat(EXPERIENCE).map((job, i) => (
                        <span key={i} className="flex items-center px-10 md:px-16">
                            <Logo src={job.logo} alt={job.company} className="h-12 w-32 text-paper/80 md:h-16 md:w-44" />
                        </span>
                    ))}
                </VelocityRow>
            </div>
        </section>
    );
}
