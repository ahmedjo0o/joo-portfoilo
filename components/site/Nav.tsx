"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PROFILE, SECTIONS } from "@/data/content";
import { useSite } from "./SiteProvider";
import { EASE_EXPO, EASE_IN_OUT } from "./primitives";

function useClock(timeZone: string) {
    const [time, setTime] = useState("");
    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
        const update = () => setTime(fmt.format(new Date()));
        const first = window.setTimeout(update, 0);
        const id = window.setInterval(update, 15000);
        return () => {
            clearTimeout(first);
            clearInterval(id);
        };
    }, [timeZone]);
    return time;
}

export { useClock };

export default function Nav() {
    const { ready, scrollTo } = useSite();
    const [open, setOpen] = useState(false);
    const time = useClock(PROFILE.timeZone);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const go = (id: string) => {
        setOpen(false);
        // Let the menu start closing before the page moves.
        window.setTimeout(() => scrollTo(id), 250);
    };

    return (
        <>
            <motion.header
                className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10 md:py-7"
                initial={{ y: -40, opacity: 0 }}
                animate={ready ? { y: 0, opacity: 1 } : undefined}
                transition={{ duration: 1, ease: EASE_EXPO, delay: 0.5 }}
            >
                <button onClick={() => go("intro")} className="block" aria-label="Back to top" data-cursor="Top">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/brand/logo-horizontal.svg" alt="Ahmed Youssef" className="h-6 w-auto invert md:h-8" />
                </button>

                <div className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-paper md:block">
                    {PROFILE.city} <span className="text-paper/50">{time}</span>
                </div>

                <button
                    onClick={() => setOpen((v) => !v)}
                    className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-paper"
                    aria-expanded={open}
                    aria-controls="site-menu"
                    data-cursor={open ? "Close" : "Menu"}
                >
                    <span className="relative block h-4 overflow-hidden">
                        <motion.span className="block" animate={{ y: open ? "-100%" : "0%" }} transition={{ duration: 0.5, ease: EASE_EXPO }}>
                            <span className="block h-4">Menu</span>
                            <span className="block h-4">Close</span>
                        </motion.span>
                    </span>
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-paper/60 transition-colors group-hover:bg-paper">
                        <motion.span className="absolute h-px w-3.5 bg-paper group-hover:bg-ink" animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3 }} />
                        <motion.span className="absolute h-px w-3.5 bg-paper group-hover:bg-ink" animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3 }} />
                    </span>
                </button>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        id="site-menu"
                        className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-5 pb-8 pt-24 text-ink md:px-10 md:pb-10 md:pt-28"
                        initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
                        animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
                        exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
                        transition={{ duration: 0.9, ease: EASE_IN_OUT }}
                    >
                        <ul className="flex flex-col">
                            {SECTIONS.map((s, i) => (
                                <li key={s.id} className="overflow-hidden border-b border-ink/10">
                                    <motion.button
                                        onClick={() => go(s.id)}
                                        className="group flex w-full items-baseline gap-4 py-1 text-left md:gap-8"
                                        initial={{ y: "100%" }}
                                        animate={{ y: "0%" }}
                                        exit={{ y: "100%" }}
                                        transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.25 + i * 0.05 }}
                                        data-cursor="Go"
                                    >
                                        <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                                        <span className="font-display text-[11vw] font-black uppercase leading-[0.95] tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:text-accent md:text-[6.5vw]">
                                            {s.label}
                                        </span>
                                    </motion.button>
                                </li>
                            ))}
                        </ul>
                        <motion.div
                            className="flex flex-wrap justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.6 } }}
                            exit={{ opacity: 0 }}
                        >
                            <a href={`mailto:${PROFILE.email}`} className="hover:text-accent">{PROFILE.email}</a>
                            <a href={PROFILE.behance} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Behance ↗</a>
                            <span>{PROFILE.city} {time}</span>
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
