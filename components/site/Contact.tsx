"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PROFILE } from "@/data/content";
import { useClock } from "./Nav";
import { useSite } from "./SiteProvider";
import { InViewReveal, Magnetic, SectionTag } from "./primitives";

export default function Contact() {
    const ref = useRef<HTMLElement>(null);
    const { scrollTo } = useSite();
    const time = useClock(PROFILE.timeZone);
    const [copied, setCopied] = useState(false);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
    const photoScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
    const photoY = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(PROFILE.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${PROFILE.email}`;
        }
    };

    return (
        <section id="contact" ref={ref} className="relative flex min-h-svh flex-col overflow-hidden bg-ink pb-11">
            <motion.div className="absolute inset-0" style={{ scale: photoScale, y: photoY }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/contact-photo.webp" alt="" loading="lazy" className="h-full w-full object-cover object-[65%_center] md:object-[80%_center]" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />

            <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 md:px-10">
                <SectionTag index={7} label="Contact" />
                <h2 className="mt-6 font-display text-[19vw] font-black uppercase leading-[0.8] tracking-tight text-paper md:text-[10.5vw]">
                    <InViewReveal text="Let's create" stagger={0.03} />
                    <br />
                    <span className="text-outline">
                        <InViewReveal text="together" stagger={0.04} delay={0.2} />
                    </span>
                </h2>

                <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-center md:gap-16">
                    <Magnetic strength={0.4}>
                        <a
                            href={`mailto:${PROFILE.email}`}
                            className="group relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-accent text-center font-mono text-xs uppercase tracking-[0.2em] text-white md:h-44 md:w-44"
                            data-cursor=""
                        >
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                                Get in
                                <br />
                                touch
                            </span>
                            <span className="absolute inset-0 scale-0 rounded-full bg-paper transition-transform duration-500 ease-out-expo group-hover:scale-100" />
                        </a>
                    </Magnetic>

                    <dl className="grid gap-6 font-mono text-[11px] uppercase tracking-[0.2em] sm:grid-cols-3 md:gap-10">
                        <div>
                            <dt className="mb-2 text-paper/40">Email</dt>
                            <dd>
                                <button onClick={copy} className="text-left normal-case tracking-normal font-sans text-base text-paper hover:text-accent" data-cursor={copied ? "Copied" : "Copy"}>
                                    {PROFILE.email}
                                </button>
                                <div className="mt-1 h-4 text-accent">{copied ? "Copied to clipboard" : ""}</div>
                            </dd>
                        </div>
                        <div>
                            <dt className="mb-2 text-paper/40">Phone</dt>
                            <dd>
                                <a href={PROFILE.phoneHref} className="normal-case tracking-normal font-sans text-base text-paper hover:text-accent">
                                    {PROFILE.phone}
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="mb-2 text-paper/40">Behance</dt>
                            <dd>
                                <a href={PROFILE.behance} target="_blank" rel="noopener noreferrer" className="normal-case tracking-normal font-sans text-base text-paper hover:text-accent">
                                    {PROFILE.behanceLabel} ↗
                                </a>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <footer className="relative mx-auto mt-16 flex w-full max-w-7xl flex-col gap-6 border-t border-paper/10 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40 md:flex-row md:items-center md:justify-between md:px-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo-horizontal-tagline.svg" alt="Ahmed Youssef, Motion Graphics & VFX Artist" className="h-7 w-auto self-start invert md:h-8" />
                <span>
                    {PROFILE.city} · {time}
                </span>
                <span>© {new Date().getFullYear()} Ahmed Youssef</span>
                <button onClick={() => scrollTo("intro")} className="self-start text-paper hover:text-accent md:self-auto" data-cursor="Rewind">
                    ↺ Rewind to start
                </button>
            </footer>
        </section>
    );
}
