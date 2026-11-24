"use client";

import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { SEQUENCE_FRAMES } from "./sequenceManifest";

const FRAME_COUNT = SEQUENCE_FRAMES.length;
const IMAGE_COUNT = Math.max(...SEQUENCE_FRAMES) + 1;

// The image sequence plays over the first ~70% of the scroll and then holds on its
// last frame while the third text block is shown (same timing as the original
// 433-frame layout, of which 305 frames existed).
const SEQUENCE_END = 304 / 432;

// Phones get the 960px frames, everything else the 1280px frames.
function sequenceDir() {
    return window.innerWidth < 768 ? "/sequence/960/" : "/sequence/1280/";
}

// Load order: a coarse pass first (every 16th image, then 8th, 4th, 2nd, 1st), so the
// whole scroll range is covered quickly and the gaps fill in afterwards.
function loadOrder(count: number) {
    const order: number[] = [];
    const seen = new Set<number>();
    for (const stride of [16, 8, 4, 2, 1]) {
        for (let i = 0; i < count; i += stride) {
            if (!seen.has(i)) {
                seen.add(i);
                order.push(i);
            }
        }
    }
    return order;
}

export default function VisualScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
    const drawnRef = useRef<HTMLImageElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, SEQUENCE_END], [0, FRAME_COUNT - 1]);

    // Nearest image that has finished loading for a given scroll frame.
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

    const renderFrame = (frame: number, force = false) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = nearestLoaded(frame);
        if (!canvas || !ctx || !img) return;
        if (img === drawnRef.current && !force) return;
        drawnRef.current = img;

        // Object-contain inside the canvas
        const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    useEffect(() => {
        let cancelled = false;
        const dir = sequenceDir();
        const order = loadOrder(IMAGE_COUNT);
        const MAX_PARALLEL = 6;
        let next = 0;

        const loadNext = () => {
            if (cancelled || next >= order.length) return;
            const id = order[next++];
            const img = new Image();
            img.decoding = "async";
            img.src = `${dir}${id.toString().padStart(3, "0")}.webp`;
            img.decode()
                .then(() => {
                    if (cancelled) return;
                    imagesRef.current[id] = img;
                    // Redraw if this image is closer to where the user is now.
                    renderFrame(frameIndex.get());
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
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(frameIndex.get(), true);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Narrative animations (scroll positions match the original 433-frame layout)
    // Frame 0-90: First Text (0 - 0.20)
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.20], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.20], [0, -50]);

    // Frame 100-185: Second Text (0.23 - 0.43)
    const opacity2 = useTransform(scrollYProgress, [0.21, 0.23, 0.40, 0.43], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.23, 0.43], [50, 0]);

    // Frame 255+: Third Text (0.59 - ...)
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.59, 1], [0, 1, 1]);
    const y3 = useTransform(scrollYProgress, [0.59, 0.9], [50, 0]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-black text-white/90 font-display">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full object-contain" />

                {/* Narrative Layers */}
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center max-w-7xl mx-auto px-6">
                    {/* Section 1: Intro */}
                    <motion.div
                        style={{ opacity: opacity1, y: y1 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-[45%] left-6 md:left-20 max-w-xl z-20"
                    >
                        <h1 className="text-5xl md:text-7xl mb-6 font-bold leading-tight">Hello, <br /> My Name is <br /> <span className="text-violet-400">Ahmed Youssef</span></h1>
                        <p className="text-xl md:text-2xl font-sans text-white/70">Motion Designer and Video Editor driven by the art of cinematic storytelling.</p>
                    </motion.div>

                    {/* Section 2: Frames 100-185 */}
                    <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute top-1/3 right-6 md:right-20 max-w-xl text-right">
                        <p className="text-xl md:text-3xl leading-relaxed">
                            I specialize in creating high-end 2D and 3D dynamic motion graphics. By mastering graphic tools, I transform complex concepts into smooth, cinematic visual experiences.
                        </p>
                    </motion.div>

                    {/* Section 3: Frame 255+ */}
                    <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center max-w-2xl w-full">
                        <p className="text-xl md:text-2xl leading-relaxed">
                            With an expansive workspace designed for efficiency, I manage every stage of the creative process. From the initial storyboard to the final production, I ensure every frame meets the highest professional standards.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
