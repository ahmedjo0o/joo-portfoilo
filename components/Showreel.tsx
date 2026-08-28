"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Showreel() {
    return (
        <section className="bg-black py-20 border-y border-white/5">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Embed Container */}
                <div className="relative w-full overflow-hidden rounded-lg shadow-2xl border border-white/10 mb-10">
                    <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                        <iframe
                            src="https://player.vimeo.com/video/192401145?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            title="My Reel 2016"
                        />
                    </div>
                </div>

                {/* Portfolio Banner */}
                <Link href="/portfolio" className="group block">
                    <motion.div
                        className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden border border-white/10"
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                    >
                        <motion.div
                            variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="absolute inset-0 bg-gradient-to-br from-violet-950 via-black to-black"
                        />

                        <motion.div
                            variants={{ rest: { opacity: 0.3 }, hover: { opacity: 0.6 } }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-black"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl md:text-7xl font-display font-bold text-white tracking-wide">
                                Portfolio
                            </span>
                        </div>

                        <motion.div
                            variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 -rotate-45">
                                <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </Link>
            </div>
            <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
        </section>
    );
}
