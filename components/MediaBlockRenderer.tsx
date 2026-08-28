"use client";

import { motion } from "framer-motion";
import { MediaBlock } from "@/data/projects";
import PlaceholderMedia from "./PlaceholderMedia";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

export default function MediaBlockRenderer({ block, gradient }: { block: MediaBlock; gradient: string }) {
    switch (block.type) {
        case "text":
            return (
                <Reveal>
                    <div className="max-w-2xl mx-auto py-4">
                        {block.heading && (
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{block.heading}</h2>
                        )}
                        <p className="text-white/60 text-lg leading-relaxed">{block.body}</p>
                    </div>
                </Reveal>
            );

        case "image":
            return (
                <Reveal>
                    <figure className="rounded-2xl overflow-hidden border border-white/10">
                        <div className="relative w-full aspect-video">
                            {block.src ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={block.src} alt={block.alt} className="w-full h-full object-cover" />
                            ) : (
                                <PlaceholderMedia label="Image" gradient={gradient} text={block.alt} />
                            )}
                        </div>
                        {block.caption && (
                            <figcaption className="px-1 pt-3 text-sm text-white/40">{block.caption}</figcaption>
                        )}
                    </figure>
                </Reveal>
            );

        case "gif":
            return (
                <Reveal>
                    <figure className="rounded-2xl overflow-hidden border border-white/10">
                        <div className="relative w-full aspect-video">
                            {block.src ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={block.src} alt={block.alt} className="w-full h-full object-cover" />
                            ) : (
                                <PlaceholderMedia label="GIF" gradient={gradient} text={block.alt} />
                            )}
                        </div>
                        {block.caption && (
                            <figcaption className="px-1 pt-3 text-sm text-white/40">{block.caption}</figcaption>
                        )}
                    </figure>
                </Reveal>
            );

        case "video":
            return (
                <Reveal>
                    <figure className="rounded-2xl overflow-hidden border border-white/10">
                        <div className="relative w-full aspect-video bg-black">
                            {block.src ? (
                                <video
                                    src={block.src}
                                    poster={block.poster}
                                    controls
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <PlaceholderMedia label="Video" gradient={gradient} />
                            )}
                        </div>
                        {block.caption && (
                            <figcaption className="px-1 pt-3 text-sm text-white/40">{block.caption}</figcaption>
                        )}
                    </figure>
                </Reveal>
            );

        case "embed":
            return (
                <Reveal>
                    <figure className="rounded-2xl overflow-hidden border border-white/10">
                        <div className="relative w-full aspect-video bg-black">
                            {block.src ? (
                                <iframe
                                    src={block.src}
                                    loading="lazy"
                                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                    className="w-full h-full"
                                />
                            ) : (
                                <PlaceholderMedia label="Video" gradient={gradient} />
                            )}
                        </div>
                        {block.caption && (
                            <figcaption className="px-1 pt-3 text-sm text-white/40">{block.caption}</figcaption>
                        )}
                    </figure>
                </Reveal>
            );

        default:
            return null;
    }
}
