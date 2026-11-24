"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSite } from "./SiteProvider";
import { firstFrameSrc } from "./sequence";

const MIN_MS = 1400;
const MAX_MS = 4000;

/**
 * "Rendering" counter shown on first load. It waits for the first hero frame
 * (so the intro never opens on a black canvas), but never longer than MAX_MS.
 */
export default function Preloader() {
    const { markReady } = useSite();
    const [visible, setVisible] = useState(true);
    const countRef = useRef<HTMLSpanElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const start = performance.now();
        const minMs = reduced ? 300 : MIN_MS;
        let loaded = false;
        let shown = 0;
        let raf = 0;
        let done = false;

        const img = new Image();
        img.src = firstFrameSrc();
        img.decode().catch(() => {}).finally(() => (loaded = true));
        document.fonts?.ready.catch(() => {});

        const tick = (now: number) => {
            const elapsed = now - start;
            const timeP = Math.min(1, elapsed / minMs);
            const cap = loaded || elapsed > MAX_MS ? 1 : 0.9;
            const target = Math.min(timeP, cap);
            shown += (target - shown) * 0.12;
            if (target === 1 && 1 - shown < 0.004) shown = 1;

            const pct = Math.round(shown * 100);
            if (countRef.current) countRef.current.textContent = String(pct).padStart(3, "0");
            if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;
            if (frameRef.current) frameRef.current.textContent = String(Math.round(shown * 108)).padStart(4, "0");

            if (shown >= 1 && !done) {
                done = true;
                setTimeout(() => {
                    setVisible(false);
                    markReady();
                }, 180);
                return;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [markReady]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-6 md:px-10 md:py-8 text-paper"
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    initial={{ clipPath: "inset(0 0 0% 0)" }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-paper/50 md:text-xs">
                        <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[rec_1s_ease-in-out_infinite]" />
                            Rendering
                        </span>
                        <span>
                            Frame <span ref={frameRef}>0000</span> / 0108
                        </span>
                    </div>

                    <div className="flex items-end justify-between gap-6">
                        <div className="font-display text-sm uppercase tracking-[0.3em] text-paper/60 md:text-base">
                            Ahmed Youssef
                            <br />
                            <span className="text-paper/30">Motion Graphics &amp; VFX</span>
                        </div>
                        <div className="font-display text-[28vw] font-black leading-[0.75] tracking-tighter md:text-[18vw]">
                            <span ref={countRef}>000</span>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-paper/10">
                        <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
