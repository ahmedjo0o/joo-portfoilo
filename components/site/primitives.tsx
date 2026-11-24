"use client";

import {
    motion,
    MotionValue,
    useInView,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

/** Letters (or words) that rise out of a mask, staggered. */
export function SplitReveal({
    text,
    className,
    play,
    delay = 0,
    stagger = 0.035,
    by = "char",
}: {
    text: string;
    className?: string;
    play: boolean;
    delay?: number;
    stagger?: number;
    by?: "char" | "word";
}) {
    const words = text.split(" ");
    let n = 0;
    const piece = (content: string, key: string | number) => {
        const i = n++;
        return (
            <span key={key} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]">
                <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: "110%", rotate: 6 }}
                    animate={play ? { y: "0%", rotate: 0 } : undefined}
                    transition={{ duration: 1.1, ease: EASE_EXPO, delay: delay + i * stagger }}
                >
                    {content}
                </motion.span>
            </span>
        );
    };
    return (
        <span className={clsx("inline", className)} aria-label={text}>
            {words.map((word, w) => (
                <span key={w}>
                    <span className="inline-block whitespace-nowrap">
                        {by === "char" ? Array.from(word).map((c, i) => piece(c, i)) : piece(word, 0)}
                    </span>
                    {w < words.length - 1 ? " " : null}
                </span>
            ))}
        </span>
    );
}

/** Same as SplitReveal but triggers when scrolled into view. */
export function InViewReveal(props: Omit<Parameters<typeof SplitReveal>[0], "play">) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
    return (
        <span ref={ref} className="inline-block">
            <SplitReveal {...props} play={inView} />
        </span>
    );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_<>*";

/** Decodes from random glyphs into the final text, like a title card resolving. */
export function ScrambleText({
    text,
    play,
    delay = 0,
    duration = 900,
    className,
}: {
    text: string;
    play: boolean;
    delay?: number;
    duration?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !play) return;
        let raf = 0;
        const timer = window.setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
                const p = Math.min(1, (now - start) / duration);
                const resolved = Math.floor(p * text.length);
                let out = "";
                for (let i = 0; i < text.length; i++) {
                    const c = text[i];
                    if (i < resolved || c === " ") out += c;
                    else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                }
                el.textContent = out;
                if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        }, delay * 1000);
        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(raf);
        };
    }, [play, text, delay, duration]);

    return (
        <span ref={ref} className={className} aria-label={text}>
            {play ? "" : " "}
        </span>
    );
}

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

    return (
        <motion.div
            ref={ref}
            className={clsx("inline-block", className)}
            style={{ x: sx, y: sy }}
            onPointerMove={(e) => {
                if (e.pointerType !== "mouse" || !ref.current) return;
                const r = ref.current.getBoundingClientRect();
                x.set((e.clientX - (r.left + r.width / 2)) * strength);
                y.set((e.clientY - (r.top + r.height / 2)) * strength);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            {children}
        </motion.div>
    );
}

/** One word whose opacity follows scroll progress through [start, end]. */
function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.12, 1]);
    return (
        <motion.span style={{ opacity }} className="inline-block">
            {word}&nbsp;
        </motion.span>
    );
}

/** A paragraph that "renders" word by word as you scroll through it. */
export function ScrollWords({
    text,
    progress,
    from = 0,
    to = 1,
    className,
}: {
    text: string;
    progress: MotionValue<number>;
    from?: number;
    to?: number;
    className?: string;
}) {
    const words = text.split(" ");
    const span = (to - from) / words.length;
    return (
        <p className={className} aria-label={text}>
            <span aria-hidden>
                {words.map((w, i) => (
                    <ScrollWord key={i} word={w} progress={progress} range={[from + i * span, from + (i + 1) * span]} />
                ))}
            </span>
        </p>
    );
}

/** Scroll progress of an element through the viewport (0 entering bottom, 1 leaving top). */
export function useElementProgress(offset: ["start end", "end start"] | ["start start", "end end"] | ["start end", "end end"] | ["start 0.8", "end 0.4"]) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset });
    return { ref, progress: scrollYProgress };
}

/** Small "[ 02 ] About" style label used at the top of each section. */
export function SectionTag({ index, label, className }: { index: number; label: string; className?: string }) {
    return (
        <div className={clsx("flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50 md:text-xs", className)}>
            <span className="text-accent">[{String(index).padStart(2, "0")}]</span>
            <span className="h-px w-8 bg-paper/25" />
            <span>{label}</span>
        </div>
    );
}

/** Counts up to `value` once in view. */
export function CountUp({ value, className }: { value: number; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let raf = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const p = Math.min(1, (now - start) / 1400);
            const eased = 1 - Math.pow(1 - p, 4);
            setN(Math.round(eased * value));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, value]);

    return (
        <span ref={ref} className={className}>
            {n}
        </span>
    );
}

/** Frames → SMPTE-style timecode at 24fps. */
export function timecode(totalFrames: number, fps = 24) {
    const f = Math.max(0, Math.floor(totalFrames));
    const ff = f % fps;
    const s = Math.floor(f / fps);
    const ss = s % 60;
    const mm = Math.floor(s / 60) % 60;
    const hh = Math.floor(s / 3600);
    const p = (v: number) => String(v).padStart(2, "0");
    return `${p(hh)}:${p(mm)}:${p(ss)}:${p(ff)}`;
}
