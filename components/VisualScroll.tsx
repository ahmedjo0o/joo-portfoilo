"use client";

import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 433;
const IMAGES_DIR = "/sequence/person_";

export default function VisualScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCount, setLoadedCount] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
                const img = new Image();
                const paddedIndex = i.toString().padStart(5, "0");
                img.src = `${IMAGES_DIR}${paddedIndex}.jpg`;
                return new Promise<void>((resolve) => {
                    img.onload = () => {
                        setLoadedCount((prev) => prev + 1);
                        resolve();
                    };
                    img.onerror = () => resolve(); // Avoid breaking if one fails
                    loadedImages[i] = img;
                });
            });

            await Promise.all(imagePromises);
            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[Math.floor(index)];

        if (!canvas || !ctx || !img) return;

        // Verify image is loaded and valid
        if (!img.complete || img.naturalWidth === 0) return;

        // Responsive Object-Contain Logic using canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const w = imgWidth * scale;
        const h = imgHeight * scale;
        const x = (canvasWidth - w) / 2;
        const y = (canvasHeight - h) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, w, h);
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!isLoading) {
            requestAnimationFrame(() => renderFrame(latest));
        }
    });

    // Initial draw when loaded
    useEffect(() => {
        if (!isLoading && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoading, images]);


    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-draw current frame
                if (images.length > 0) {
                    renderFrame(frameIndex.get());
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Init size

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoading, images]); // Re-bind if loading state changes

    // Narrative Animations calculated based on 433 frames
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
        <div ref={containerRef} className="h-[400vh] relative bg-black text-white/90 font-serif">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
                    <div className="flex flex-col items-center gap-4">
                        {/* Loading Bar Only - Minimal */}
                        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-100 ease-out"
                                style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full object-contain" />

                {/* Narrative Layers */}
                {!isLoading && (
                    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center max-w-7xl mx-auto px-6">
                        {/* Section 1: Intro */}
                        <motion.div
                            style={{ opacity: opacity1, y: y1 }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-[45%] left-6 md:left-20 max-w-xl z-20"
                        >
                            <h1 className="text-5xl md:text-7xl mb-6 font-bold leading-tight">Hello, <br /> My Name is <br /> <span className="text-emerald-500">Ahmed Youssef</span></h1>
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
                )}
            </div>
        </div>
    );
}
