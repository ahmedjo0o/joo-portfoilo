"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

interface SiteState {
    /** True once the preloader has finished and the intro can play. */
    ready: boolean;
    markReady: () => void;
    /** Smooth-scroll to a section id (or a pixel offset). */
    scrollTo: (target: string | number, immediate?: boolean) => void;
}

const SiteContext = createContext<SiteState>({
    ready: true,
    markReady: () => {},
    scrollTo: () => {},
});

export const useSite = () => useContext(SiteContext);

export default function SiteProvider({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
        lenisRef.current = lenis;
        let raf = 0;
        const loop = (time: number) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Hold the page still while the preloader is up.
    useEffect(() => {
        const lenis = lenisRef.current;
        if (!ready) {
            lenis?.stop();
            document.documentElement.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.documentElement.style.overflow = "";
        }
    }, [ready]);

    const scrollTo = useCallback((target: string | number, immediate = false) => {
        const el = typeof target === "string" ? document.getElementById(target) : null;
        const y = typeof target === "number" ? target : el ? el.getBoundingClientRect().top + window.scrollY : 0;
        if (lenisRef.current) {
            lenisRef.current.scrollTo(y, { immediate, duration: 1.6 });
        } else {
            window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
        }
    }, []);

    const markReady = useCallback(() => setReady(true), []);

    const value = useMemo(() => ({ ready, markReady, scrollTo }), [ready, markReady, scrollTo]);

    return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
