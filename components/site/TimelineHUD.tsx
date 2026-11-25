"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "@/data/content";
import { useSite } from "./SiteProvider";
import { EASE_EXPO, timecode } from "./primitives";

// The page plays like a 2:30 edit; the timecode maps scroll onto that.
const TOTAL_FRAMES = 150 * 24;

interface Clip {
    id: string;
    label: string;
    start: number;
    end: number;
}

/**
 * The signature element: an editing timeline pinned to the bottom of the screen.
 * Each section is a clip, the playhead follows the scroll, and clips are clickable.
 */
export default function TimelineHUD() {
    const { ready, scrollTo } = useSite();
    const { scrollYProgress } = useScroll();
    const [clips, setClips] = useState<Clip[]>([]);
    const [active, setActive] = useState(0);
    const tcRef = useRef<HTMLSpanElement>(null);
    const left = useTransform(scrollYProgress, (v) => `${v * 100}%`);

    useEffect(() => {
        const measure = () => {
            const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const starts = SECTIONS.map((s) => {
                const el = document.getElementById(s.id);
                return el ? Math.min(1, (el.getBoundingClientRect().top + window.scrollY) / max) : 0;
            });
            setClips(
                SECTIONS.map((s, i) => ({ id: s.id, label: s.label, start: starts[i], end: i < SECTIONS.length - 1 ? starts[i + 1] : 1 })),
            );
        };
        const ro = new ResizeObserver(measure);
        ro.observe(document.body);
        return () => ro.disconnect();
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (tcRef.current) tcRef.current.textContent = timecode(v * TOTAL_FRAMES);
        let idx = 0;
        clips.forEach((c, i) => {
            if (v >= c.start - 0.001) idx = i;
        });
        if (idx !== active) setActive(idx);
    });

    const current = SECTIONS[active];

    return (
        <motion.div
            className="fixed inset-x-0 bottom-0 z-50 select-none border-t border-paper/10 bg-ink/70 backdrop-blur-md"
            initial={{ y: "100%" }}
            animate={ready ? { y: "0%" } : undefined}
            transition={{ duration: 1, ease: EASE_EXPO, delay: 0.7 }}
        >
            <div className="flex h-10 items-center gap-4 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60 md:h-11 md:gap-6 md:px-10 md:text-[11px]">
                <span ref={tcRef} className="w-[92px] shrink-0 tabular-nums text-paper md:w-[104px]">
                    00:00:00:00
                </span>

                {/* Track */}
                <div className="relative h-5 flex-1 md:h-6">
                    <div className="absolute inset-0 hidden md:block">
                        {clips.map((c, i) => (
                            <button
                                key={c.id}
                                onClick={() => scrollTo(c.id)}
                                className={`group absolute inset-y-0 overflow-hidden rounded-[3px] border px-2 text-left transition-colors duration-300 ${
                                    i === active ? "border-accent/70 bg-accent/25 text-paper" : "border-paper/10 bg-paper/[0.04] text-paper/40 hover:bg-paper/10 hover:text-paper/80"
                                }`}
                                style={{ left: `calc(${c.start * 100}% + 1px)`, width: `calc(${(c.end - c.start) * 100}% - 2px)` }}
                                data-cursor={c.label}
                                aria-label={`Go to ${c.label}`}
                            >
                                <span className="block truncate leading-[22px] text-[9px] md:leading-6">{c.label}</span>
                            </button>
                        ))}
                    </div>
                    {/* Mobile: a simple progress line */}
                    <div className="absolute inset-x-0 top-1/2 h-px bg-paper/15 md:hidden" />
                    <motion.div className="pointer-events-none absolute -bottom-1 -top-1 w-px bg-accent" style={{ left }}>
                        <span className="absolute -left-[4px] -top-[3px] h-[9px] w-[9px] rotate-45 bg-accent" />
                    </motion.div>
                </div>

                <span className="w-[86px] shrink-0 truncate text-right text-paper md:w-[150px]">
                    <span className="hidden text-paper/40 md:inline">Scene {String(active + 1).padStart(2, "0")} · </span>
                    {current.label}
                </span>
            </div>
        </motion.div>
    );
}
