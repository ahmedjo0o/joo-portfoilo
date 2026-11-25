"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import { ABOUT, DISCIPLINES } from "@/data/content";
import { VelocityRow } from "./Marquee";
import { CountUp, ScrollWords, SectionTag } from "./primitives";

export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

    return (
        <section id="about" className="relative z-10 bg-ink pb-24 pt-10 md:pb-40">
            {/* Disciplines band */}
            <div className="border-y border-paper/10 py-5 md:py-7">
                <VelocityRow baseVelocity={-2.5}>
                    {DISCIPLINES.map((d) => (
                        <span key={d} className="flex items-center font-display text-5xl font-black uppercase tracking-tight text-paper md:text-8xl">
                            <span className="px-6 md:px-10">{d}</span>
                            <span className="h-3 w-3 rotate-45 bg-accent md:h-4 md:w-4" aria-hidden />
                        </span>
                    ))}
                </VelocityRow>
                <VelocityRow baseVelocity={2} className="mt-2">
                    {DISCIPLINES.map((d) => (
                        <span key={d} className="flex items-center font-display text-5xl font-black uppercase tracking-tight text-outline md:text-8xl">
                            <span className="px-6 md:px-10">{d}</span>
                            <span className="h-3 w-3 rotate-45 border border-paper/40 md:h-4 md:w-4" aria-hidden />
                        </span>
                    ))}
                </VelocityRow>
            </div>

            <div className="mx-auto mt-24 grid max-w-7xl gap-16 px-5 md:mt-40 md:grid-cols-12 md:px-10">
                <div className="md:col-span-3">
                    <SectionTag index={2} label="About" />
                </div>
                <div ref={ref} className="md:col-span-9">
                    <ScrollWords
                        text={ABOUT.text}
                        progress={scrollYProgress}
                        className="font-display text-[2.4rem] font-semibold uppercase leading-[1] text-paper md:text-7xl"
                    />

                    <div className="mt-16 grid grid-cols-3 gap-4 border-t border-paper/10 pt-8 md:mt-24 md:gap-10">
                        {ABOUT.stats.map((s) => (
                            <div key={s.label}>
                                <div className="font-display text-6xl font-black leading-none text-paper md:text-9xl">
                                    <CountUp value={s.value} />
                                    <span className="text-accent">{s.suffix}</span>
                                </div>
                                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50 md:text-xs">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
