"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SHOWREEL } from "@/data/content";
import { SectionTag } from "./primitives";

/**
 * The reel starts as a small frame and grows to fill the screen as you scroll,
 * while "SHOW" and "REEL" slide apart. Vimeo only loads after the play click.
 */
export default function Showreel() {
    const ref = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

    const scale = useTransform(p, [0, 0.6], [0.42, 1]);
    const radius = useTransform(p, [0, 0.6], [28, 0]);
    const leftX = useTransform(p, [0, 0.6], ["0vw", "-60vw"]);
    const rightX = useTransform(p, [0, 0.6], ["0vw", "60vw"]);
    const posterScale = useTransform(p, [0, 1], [1.3, 1]);

    return (
        <section id="reel" ref={ref} className="relative h-[260vh] bg-ink">
            <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
                <SectionTag index={3} label="Showreel" className="absolute left-5 top-24 z-20 md:left-10 md:top-28" />

                <motion.div className="relative h-full w-full overflow-hidden bg-black" style={{ scale, borderRadius: radius }}>
                    <AnimatePresence mode="wait">
                        {!playing ? (
                            <motion.button
                                key="poster"
                                type="button"
                                onClick={() => setPlaying(true)}
                                className="group absolute inset-0 block h-full w-full"
                                data-cursor="Play"
                                aria-label="Play showreel"
                                exit={{ opacity: 0 }}
                            >
                                <motion.span className="absolute inset-0 block" style={{ scale: posterScale }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/reel-poster.webp" alt="" loading="lazy" className="h-full w-full object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-90" />
                                </motion.span>
                                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
                                <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 md:h-28 md:w-28">
                                    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-paper md:h-8 md:w-8" aria-hidden>
                                        <path d="M7 4.5v15l12.5-7.5z" />
                                    </svg>
                                </span>
                                <span className="absolute bottom-16 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/70 md:bottom-20 md:left-10 md:text-xs">
                                    Play reel · Sound on
                                </span>
                            </motion.button>
                        ) : (
                            <motion.div key="player" className="absolute inset-0 flex items-center justify-center bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="relative aspect-video max-h-full w-full max-w-[calc(100svh*16/9)]">
                                    <iframe
                                        src={`https://player.vimeo.com/video/${SHOWREEL.vimeoId}?autoplay=1&badge=0&autopause=0&dnt=1`}
                                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        className="absolute inset-0 h-full w-full"
                                        title={SHOWREEL.title}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {!playing && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-[2vw] font-display text-[24vw] font-black uppercase leading-none tracking-tight text-paper mix-blend-difference md:text-[19vw]">
                        <motion.span style={{ x: leftX }}>Show</motion.span>
                        <motion.span style={{ x: rightX }}>Reel</motion.span>
                    </div>
                )}
            </div>
        </section>
    );
}
