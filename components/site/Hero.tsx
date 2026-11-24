"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { HERO_CHAPTERS, PROFILE } from "@/data/content";
import { useSite } from "./SiteProvider";
import { FRAME_COUNT, IMAGE_COUNT, SEQUENCE_FRAMES, frameSrc, loadOrder } from "./sequence";
import { ScrambleText, ScrollWords, SplitReveal, timecode, EASE_EXPO } from "./primitives";

// Scroll range (0-1 of the hero) over which the image sequence plays.
const PLAY_FROM = 0.04;
const PLAY_TO = 0.9;

export default function Hero() {
    const { ready } = useSite();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
    const drawnRef = useRef("");
    const tcRef = useRef<HTMLSpanElement>(null);

    const { scrollYProgress: p } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const frameIndex = useTransform(p, [PLAY_FROM, PLAY_TO], [0, FRAME_COUNT - 1], { clamp: true });

    // Viewer opens from a framed monitor to full bleed.
    const open = useTransform(p, [0, 0.13], [0, 1], { clamp: true });
    const clipPath = useTransform(open, (t) => {
        const k = 1 - t;
        return `inset(${13 * k}% ${4.5 * k}% ${13 * k}% ${4.5 * k}% round ${22 * k}px)`;
    });
    const canvasScale = useTransform(open, [0, 1], [1.12, 1]);
    const frameUi = useTransform(open, [0, 0.6], [1, 0]);

    // Name splits apart and leaves.
    const nameLeftX = useTransform(p, [0, 0.12], ["0%", "-35%"]);
    const nameRightX = useTransform(p, [0, 0.12], ["0%", "35%"]);
    const nameOpacity = useTransform(p, [0.04, 0.12], [1, 0]);
    const cueOpacity = useTransform(p, [0, 0.04], [1, 0]);
    const vignette = useTransform(p, [0.1, 0.2, 0.9, 1], [0, 0.55, 0.55, 0.75]);

    // ---- image sequence -------------------------------------------------------
    // Nearest loaded image to a scroll frame (used while the sequence is still loading).
    const nearestLoaded = (frame: number) => {
        const images = imagesRef.current;
        const target = SEQUENCE_FRAMES[Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(frame)))];
        for (let d = 0; d < IMAGE_COUNT; d++) {
            const before = images[target - d];
            if (before) return before;
            const after = images[target + d];
            if (after) return after;
        }
        return undefined;
    };

    const drawImage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
        // Cover on wide screens; on tall phones, zoom in but don't crop to a sliver.
        const cover = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const contain = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const scale = Math.min(cover, contain * 1.9);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    // Draws the frame at a fractional position, crossfading the two neighbouring
    // images so the sequence moves smoothly between source frames.
    const renderFrame = (frame: number, force = false) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const f = Math.min(FRAME_COUNT - 1, Math.max(0, frame));
        const i0 = Math.floor(f);
        const i1 = Math.min(FRAME_COUNT - 1, i0 + 1);
        const images = imagesRef.current;
        let a = images[SEQUENCE_FRAMES[i0]];
        let b = images[SEQUENCE_FRAMES[i1]];
        let t = f - i0;
        if (!a || !b) {
            a = nearestLoaded(f);
            b = undefined;
            t = 0;
        }
        if (!a) return;
        if (a === b) b = undefined;

        // Quantise the blend so tiny scroll moves don't redraw needlessly.
        const key = `${a.src}|${b && t > 0.02 ? b.src : ""}|${b ? Math.round(t * 24) : 0}`;
        if (key === drawnRef.current && !force) return;
        drawnRef.current = key;

        ctx.globalAlpha = 1;
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawImage(ctx, canvas, a);
        if (b && t > 0.02) {
            ctx.globalAlpha = t;
            drawImage(ctx, canvas, b);
            ctx.globalAlpha = 1;
        }
    };

    // Draw at most once per animation frame.
    const rafRef = useRef(0);
    const scheduleRender = () => {
        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0;
            renderFrame(frameIndex.get());
        });
    };

    useEffect(() => {
        let cancelled = false;
        const order = loadOrder(IMAGE_COUNT);
        const MAX_PARALLEL = 6;
        let next = 0;

        const loadNext = () => {
            if (cancelled || next >= order.length) return;
            const id = order[next++];
            const img = new Image();
            img.decoding = "async";
            img.src = frameSrc(id);
            img.decode()
                .then(() => {
                    if (cancelled) return;
                    imagesRef.current[id] = img;
                    scheduleRender();
                })
                .catch(() => {})
                .finally(loadNext);
        };

        for (let i = 0; i < MAX_PARALLEL; i++) loadNext();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        scheduleRender();
        if (tcRef.current) tcRef.current.textContent = timecode(latest);
    });

    useEffect(() => {
        const resize = () => {
            const c = canvasRef.current;
            if (!c) return;
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            renderFrame(frameIndex.get(), true);
        };
        window.addEventListener("resize", resize);
        resize();
        return () => window.removeEventListener("resize", resize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section ref={containerRef} id="intro" className="relative h-[520vh] bg-ink">
            <div className="sticky top-0 h-svh w-full overflow-hidden">
                {/* The viewer */}
                <motion.div className="absolute inset-0" style={{ clipPath }}>
                    <motion.canvas
                        ref={canvasRef}
                        className="block h-full w-full"
                        style={{ scale: canvasScale }}
                        initial={{ opacity: 0 }}
                        animate={ready ? { opacity: 1 } : undefined}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                    />
                    <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: vignette }} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
                </motion.div>

                {/* Viewfinder UI on the framed monitor */}
                <motion.div
                    className="pointer-events-none absolute inset-[13%_4.5%] hidden md:block"
                    style={{ opacity: frameUi }}
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: 1 } : undefined}
                >
                    {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "left-4 bottom-4 border-l border-b", "right-4 bottom-4 border-r border-b"].map((c) => (
                        <span key={c} className={`absolute h-6 w-6 border-paper/60 ${c}`} />
                    ))}
                </motion.div>

                {/* Always-on HUD */}
                <motion.div
                    className="pointer-events-none absolute inset-x-0 top-20 flex justify-between px-5 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60 md:top-24 md:px-10 md:text-[11px]"
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: 1 } : undefined}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-[rec_1.2s_ease-in-out_infinite]" />
                        Rec
                        <span className="hidden text-paper/35 sm:inline">· 24 fps · 1920×1080</span>
                    </span>
                    <span ref={tcRef}>00:00:00:00</span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    className="pointer-events-none absolute inset-0 flex flex-col justify-center px-4 font-display font-black uppercase leading-[0.8] tracking-[-0.02em] text-paper mix-blend-difference md:px-8"
                    style={{ opacity: nameOpacity }}
                >
                    <motion.span className="block text-[27vw] md:text-[22vw]" style={{ x: nameLeftX }}>
                        <SplitReveal text={PROFILE.firstName} play={ready} delay={0.15} stagger={0.05} />
                    </motion.span>
                    <motion.span className="block self-end text-[27vw] md:text-[22vw]" style={{ x: nameRightX }}>
                        <SplitReveal text={PROFILE.lastName} play={ready} delay={0.3} stagger={0.05} />
                    </motion.span>
                </motion.h1>

                {/* Role line + scroll cue */}
                <motion.div
                    className="pointer-events-none absolute inset-x-0 bottom-20 flex items-end justify-between gap-6 px-5 md:bottom-24 md:px-10"
                    style={{ opacity: cueOpacity }}
                >
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/80 md:text-xs">
                        <ScrambleText text={PROFILE.title} play={ready} delay={0.9} />
                        <div className="mt-1 text-paper/40">
                            <ScrambleText text={`Based in ${PROFILE.city}`} play={ready} delay={1.1} />
                        </div>
                    </div>
                    <motion.div
                        className="flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60"
                        initial={{ opacity: 0, y: 10 }}
                        animate={ready ? { opacity: 1, y: 0 } : undefined}
                        transition={{ delay: 1.3, duration: 0.8, ease: EASE_EXPO }}
                    >
                        <span>Scroll to play</span>
                        <span className="relative block h-10 w-px overflow-hidden bg-paper/15">
                            <motion.span
                                className="absolute inset-x-0 top-0 h-1/2 bg-paper"
                                animate={{ y: ["-100%", "200%"] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </span>
                    </motion.div>
                </motion.div>

                {/* Chapters */}
                <Chapter progress={p} window={[0.16, 0.42]} className="bottom-24 left-5 max-w-xl md:bottom-32 md:left-10" index={0} />
                <Chapter progress={p} window={[0.46, 0.7]} className="right-5 top-1/3 max-w-xl text-right md:right-10" index={1} />
                <Chapter progress={p} window={[0.74, 1.01]} className="inset-x-5 top-1/2 -translate-y-1/2 text-center md:inset-x-10" index={2} big />
            </div>
        </section>
    );
}

function Chapter({
    progress,
    window: [a, b],
    index,
    className,
    big = false,
}: {
    progress: MotionValue<number>;
    window: [number, number];
    index: number;
    className: string;
    big?: boolean;
}) {
    const chapter = HERO_CHAPTERS[index];
    const fadeIn = a + 0.02;
    const fadeOut = b - 0.03;
    const opacity = useTransform(progress, [a, fadeIn, fadeOut, b], [0, 1, 1, big ? 1 : 0]);
    const y = useTransform(progress, [a, b], [40, -40]);
    const lineScale = useTransform(progress, [a, a + 0.08], [0, 1]);

    return (
        <motion.div className={`pointer-events-none absolute ${className}`} style={{ opacity, y }}>
            <div className={`mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent md:text-xs ${big ? "justify-center" : index === 1 ? "justify-end" : ""}`}>
                <motion.span className="block h-px w-10 origin-left bg-accent" style={{ scaleX: lineScale }} />
                {chapter.tag}
            </div>
            <ScrollWords
                text={chapter.text}
                progress={progress}
                from={a}
                to={a + (b - a) * 0.55}
                className={
                    big
                        ? "font-display text-[17vw] font-black uppercase leading-[0.82] text-paper md:text-[12vw]"
                        : "font-display text-3xl font-semibold uppercase leading-[1.02] text-paper md:text-5xl"
                }
            />
        </motion.div>
    );
}
