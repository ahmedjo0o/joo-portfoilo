"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS, Project } from "@/data/content";
import { InViewReveal, Magnetic, SectionTag } from "./primitives";

/** Vertical scroll drives a horizontal strip of projects, like scrubbing through clips. */
export default function Work() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const measure = () => {
            const track = trackRef.current;
            if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
        };
        const ro = new ResizeObserver(measure);
        if (trackRef.current) ro.observe(trackRef.current);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);

    const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const smooth = useSpring(p, { stiffness: 120, damping: 30, mass: 0.3 });
    const x = useTransform(smooth, (v) => -v * distance);
    const bar = useTransform(p, [0, 1], [0, 1]);

    return (
        <section id="work" ref={sectionRef} className="relative bg-ink" style={{ height: `calc(100svh + ${distance}px)` }}>
            <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
                <motion.div ref={trackRef} className="flex w-max items-center gap-5 px-5 md:gap-8 md:px-10" style={{ x }}>
                    {/* Title panel */}
                    <div className="flex w-[86vw] shrink-0 flex-col justify-center md:w-[42vw]">
                        <SectionTag index={4} label="Selected work" />
                        <h2 className="mt-6 font-display text-[22vw] font-black uppercase leading-[0.8] tracking-tight text-paper md:text-[11vw]">
                            <InViewReveal text="Selected" stagger={0.03} />
                            <br />
                            <span className="text-outline">
                                <InViewReveal text="Work" stagger={0.05} delay={0.15} />
                            </span>
                        </h2>
                        <p className="mt-6 max-w-sm text-sm text-paper/55 md:text-base">
                            Brand launches, title sequences, broadcast packages and VFX. Keep scrolling to scrub through.
                        </p>
                    </div>

                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.slug} project={project} index={i} />
                    ))}

                    {/* End panel */}
                    <div className="flex h-[62svh] w-[70vw] shrink-0 flex-col items-center justify-center gap-8 md:w-[30vw]">
                        <p className="text-center font-display text-4xl font-black uppercase leading-none text-paper md:text-6xl">
                            More on
                            <br />
                            Behance
                        </p>
                        <Magnetic>
                            <a
                                href={PROFILE.behance}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-32 w-32 items-center justify-center rounded-full bg-accent font-mono text-xs uppercase tracking-[0.2em] text-white transition-transform duration-500 hover:scale-110 md:h-40 md:w-40"
                                data-cursor=""
                            >
                                Open ↗
                            </a>
                        </Magnetic>
                    </div>
                </motion.div>

                {/* Scrub bar */}
                <div className="absolute bottom-16 left-5 right-5 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/45 md:bottom-20 md:left-10 md:right-10">
                    <span>Scrub</span>
                    <div className="relative h-px flex-1 bg-paper/15">
                        <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-paper" style={{ scaleX: bar }} />
                    </div>
                    <span>{String(PROJECTS.length).padStart(2, "0")} projects</span>
                </div>
            </div>
        </section>
    );
}

const SHAPES = ["circle", "triangle", "bars", "rings", "square", "wave"] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const shape = SHAPES[index % SHAPES.length];
    const href = project.behanceUrl || PROFILE.behance;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-[62svh] w-[78vw] shrink-0 md:w-[34vw]"
            data-cursor="View"
        >
            <div className="relative h-[85%] overflow-hidden rounded-2xl border border-paper/10 bg-[#0d0d0f]">
                {project.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.cover} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
                ) : (
                    <Placeholder shape={shape} index={index} />
                )}
                <div className="absolute inset-x-0 top-0 flex justify-between p-4 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">
                    <span>Clip {String(index + 1).padStart(2, "0")}</span>
                    <span>{project.year ?? "—"}</span>
                </div>
                <div className="absolute bottom-4 right-4 flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100">
                    ↗
                </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-paper transition-colors group-hover:text-accent md:text-4xl">{project.title}</h3>
                <span className="mt-1 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45 md:text-xs">{project.category}</span>
            </div>
        </a>
    );
}

/** Generated "motion frame" used until real thumbnails are added. */
function Placeholder({ shape, index }: { shape: (typeof SHAPES)[number]; index: number }) {
    const hue = [255, 0, 210, 30, 180, 285][index % 6];
    return (
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105">
            <div
                className="absolute inset-0 opacity-80"
                style={{
                    background: `radial-gradient(120% 80% at ${30 + index * 9}% 20%, hsl(${hue} 70% 55% / 0.35), transparent 60%), linear-gradient(160deg, #141416, #050505)`,
                }}
            />
            {/* grid */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="transition-transform duration-[1.4s] ease-out-expo group-hover:rotate-[30deg] group-hover:scale-110">
                    <Shape shape={shape} />
                </div>
            </div>
            <span className="absolute -bottom-6 -left-2 font-display text-[11rem] font-black leading-none text-paper/[0.06] md:text-[14rem]">
                {String(index + 1).padStart(2, "0")}
            </span>
        </div>
    );
}

function Shape({ shape }: { shape: (typeof SHAPES)[number] }) {
    const c = "border-paper/70";
    switch (shape) {
        case "circle":
            return <div className={`h-40 w-40 rounded-full border ${c} md:h-56 md:w-56`} />;
        case "triangle":
            return (
                <svg viewBox="0 0 100 100" className="h-44 w-44 md:h-60 md:w-60" aria-hidden>
                    <path d="M50 8 94 88H6z" fill="none" stroke="rgba(242,240,235,.7)" strokeWidth="0.6" />
                    <path d="M50 30 75 76H25z" fill="rgba(143,107,255,.5)" />
                </svg>
            );
        case "bars":
            return (
                <div className="flex h-40 items-end gap-2 md:h-56">
                    {[40, 75, 55, 95, 65, 30, 80].map((h, i) => (
                        <div key={i} className="w-3 bg-paper/70 md:w-4" style={{ height: `${h}%`, opacity: 0.3 + i * 0.1 }} />
                    ))}
                </div>
            );
        case "rings":
            return (
                <div className="relative h-48 w-48 md:h-64 md:w-64">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="absolute rounded-full border border-paper/40" style={{ inset: `${i * 12}%` }} />
                    ))}
                    <div className="absolute inset-[46%] rounded-full bg-accent" />
                </div>
            );
        case "square":
            return (
                <div className="relative h-40 w-40 md:h-52 md:w-52">
                    <div className={`absolute inset-0 rotate-12 border ${c}`} />
                    <div className="absolute inset-6 -rotate-6 bg-paper/10 backdrop-blur" />
                    <div className="absolute inset-14 bg-accent/60" />
                </div>
            );
        default:
            return (
                <svg viewBox="0 0 200 100" className="w-56 md:w-80" aria-hidden>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <path
                            key={i}
                            d={`M0 ${50 + i * 4} C 50 ${10 + i * 8}, 100 ${90 - i * 8}, 200 ${50 - i * 4}`}
                            fill="none"
                            stroke={i === 2 ? "rgba(143,107,255,.9)" : "rgba(242,240,235,.45)"}
                            strokeWidth="0.8"
                        />
                    ))}
                </svg>
            );
    }
}
