"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Dot + ring cursor for mouse users. Any element with `data-cursor="Label"`
 * grows the ring and shows the label (e.g. "Play", "View").
 */
export default function Cursor() {
    const [enabled, setEnabled] = useState(false);
    const [label, setLabel] = useState<string | null>(null);
    const [pressed, setPressed] = useState(false);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
    const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

    useEffect(() => {
        const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
        if (!mq.matches) return;

        let on = false;
        const move = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            if (!on) {
                on = true;
                setEnabled(true);
                document.documentElement.classList.add("has-cursor");
            }
            x.set(e.clientX);
            y.set(e.clientY);
            const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
            setLabel(target ? target.dataset.cursor || "" : null);
        };
        const down = () => setPressed(true);
        const up = () => setPressed(false);
        const leave = () => setLabel(null);

        window.addEventListener("pointermove", move, { passive: true });
        window.addEventListener("pointerdown", down);
        window.addEventListener("pointerup", up);
        document.addEventListener("mouseleave", leave);
        return () => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerdown", down);
            window.removeEventListener("pointerup", up);
            document.removeEventListener("mouseleave", leave);
            document.documentElement.classList.remove("has-cursor");
        };
    }, [x, y]);

    if (!enabled) return null;

    const hovering = label !== null;
    const hasText = !!label;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper mix-blend-difference"
                style={{ x, y }}
                animate={{ opacity: hasText ? 0 : 1 }}
            />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[199] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ x: rx, y: ry }}
                animate={{
                    width: hasText ? 84 : hovering ? 56 : 34,
                    height: hasText ? 84 : hovering ? 56 : 34,
                    backgroundColor: hasText ? "rgba(143,107,255,0.95)" : "rgba(242,240,235,0)",
                    borderColor: hasText ? "rgba(143,107,255,0)" : "rgba(242,240,235,0.5)",
                    scale: pressed ? 0.85 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <div className="absolute inset-0 rounded-full border" style={{ borderColor: "inherit" }} />
                <AnimatePresence>
                    {hasText && (
                        <motion.span
                            key={label}
                            className="font-mono text-[10px] uppercase tracking-[0.15em] text-white"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.2 }}
                        >
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
