"use client";

import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";
import { useRef } from "react";
import { clsx } from "clsx";

/** Endless row that drifts on its own and speeds up / reverses with scroll velocity. */
export function VelocityRow({
    children,
    baseVelocity = 3,
    className,
}: {
    children: React.ReactNode;
    baseVelocity?: number;
    className?: string;
}) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const velocity = useVelocity(scrollY);
    const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
    const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
    const skew = useTransform(smooth, [-2000, 2000], [8, -8], { clamp: true });
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
    const direction = useRef(1);

    useAnimationFrame((_, delta) => {
        let move = direction.current * baseVelocity * (delta / 1000);
        const f = factor.get();
        if (f < 0) direction.current = -1;
        else if (f > 0) direction.current = 1;
        move += direction.current * move * Math.abs(f);
        baseX.set(baseX.get() + move);
    });

    return (
        <div className={clsx("flex overflow-hidden whitespace-nowrap", className)}>
            <motion.div className="flex shrink-0 whitespace-nowrap will-change-transform" style={{ x, skewX: skew }}>
                {children}
                {children}
            </motion.div>
        </div>
    );
}
