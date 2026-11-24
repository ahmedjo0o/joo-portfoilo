"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { OTHER_TOOLS, TOOLS } from "@/data/content";
import { EASE_EXPO, InViewReveal, SectionTag } from "./primitives";

const COLORS = ["#8f6bff", "#5ad1ff", "#ff6bd6", "#ffb35a", "#6bffb0", "#ff6b6b"];

/** Skills shown as layers in a composition timeline instead of progress bars. */
export default function Toolkit() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

    return (
        <section id="toolkit" className="relative overflow-hidden bg-ink py-28 md:py-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/creative.webp" alt="" loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />

            <div className="relative mx-auto max-w-7xl px-5 md:px-10">
                <SectionTag index={5} label="Toolkit" />
                <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <h2 className="font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tight text-paper md:text-[9vw]">
                        <InViewReveal text="+8 years" stagger={0.04} />
                        <br />
                        <span className="text-outline">
                            <InViewReveal text="in the timeline" stagger={0.025} delay={0.2} />
                        </span>
                    </h2>
                    <p className="max-w-xs text-sm text-paper/55 md:text-base">
                        Eight years of keyframes, layers and renders. These are the tools on every project.
                    </p>
                </div>

                {/* Composition panel */}
                <div ref={ref} className="mt-14 overflow-hidden rounded-xl border border-paper/10 bg-[#0b0b0d]/90 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/60 shadow-2xl backdrop-blur md:mt-20 md:text-[11px]">
                    <div className="flex items-center justify-between border-b border-paper/10 px-4 py-2.5">
                        <div className="flex items-center gap-4">
                            <span className="rounded-sm bg-paper/10 px-2 py-0.5 text-paper">Toolkit_Comp_v08</span>
                            <span className="hidden text-paper/35 sm:inline">Render queue</span>
                        </div>
                        <span className="text-paper/40">1920×1080 · 24 fps</span>
                    </div>

                    {/* Ruler */}
                    <div className="grid grid-cols-[minmax(0,8.5rem)_1fr] border-b border-paper/10 md:grid-cols-[16rem_1fr]">
                        <div className="border-r border-paper/10 px-4 py-2 text-paper/35"># &nbsp; Layer</div>
                        <div className="relative h-8">
                            {Array.from({ length: 11 }).map((_, i) => (
                                <span key={i} className="absolute top-0 flex h-full flex-col items-start" style={{ left: `${i * 10}%` }}>
                                    <span className="h-2 w-px bg-paper/30" />
                                    {i % 2 === 0 && i < 10 && <span className="ml-1 mt-0.5 text-[9px] text-paper/35">{i}s</span>}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Layers */}
                    <div className="relative">
                        {TOOLS.map((tool, i) => (
                            <div key={tool.name} className="group grid grid-cols-[minmax(0,8.5rem)_1fr] border-b border-paper/5 last:border-b-0 hover:bg-paper/[0.03] md:grid-cols-[16rem_1fr]">
                                <div className="flex items-center gap-2 border-r border-paper/10 px-3 py-4 md:gap-3 md:px-4 md:py-5">
                                    <span className="hidden text-paper/30 md:inline">{i + 1}</span>
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: COLORS[i] }} />
                                    <span className="truncate text-paper normal-case tracking-normal font-sans text-[13px] md:text-base">{tool.name}</span>
                                </div>
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-y-3 left-0 flex origin-left items-center justify-end rounded-[4px] pr-3 md:inset-y-3.5"
                                        style={{ width: `${tool.level}%`, background: `${COLORS[i]}33`, borderLeft: `2px solid ${COLORS[i]}` }}
                                        initial={{ scaleX: 0 }}
                                        animate={inView ? { scaleX: 1 } : undefined}
                                        transition={{ duration: 1.4, ease: EASE_EXPO, delay: 0.2 + i * 0.08 }}
                                    >
                                        <span className="text-paper/80">{tool.level}%</span>
                                    </motion.div>
                                    {/* keyframes */}
                                    {[0, tool.level].map((k, j) => (
                                        <motion.span
                                            key={j}
                                            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border"
                                            style={{ left: `${k}%`, borderColor: COLORS[i], background: j ? COLORS[i] : "transparent" }}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={inView ? { opacity: 1, scale: 1 } : undefined}
                                            transition={{ delay: j ? 1.2 + i * 0.08 : 0.2 + i * 0.08, duration: 0.4 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Playhead sweeping across the layer tracks */}
                        <div className="pointer-events-none absolute inset-y-0 left-[8.5rem] right-0 md:left-[16rem]">
                            <motion.div
                                className="absolute -top-8 bottom-0 w-px bg-accent"
                                initial={{ left: "0%" }}
                                animate={inView ? { left: ["0%", "100%", "62%"] } : undefined}
                                transition={{ duration: 2.6, ease: "easeInOut", times: [0, 0.75, 1] }}
                            >
                                <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rotate-45 bg-accent" />
                            </motion.div>
                        </div>
                    </div>

                    <div className="border-t border-paper/10 px-4 py-3 text-paper/40">
                        Also on the shelf: <span className="text-paper/70">{OTHER_TOOLS.join(" · ")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
