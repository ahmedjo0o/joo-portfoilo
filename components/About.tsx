"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section className="bg-black py-20 px-6 border-y border-white/5">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">About Me</h2>
                    <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Senior Motion Graphic Designer with over eight years of experience specializing in
                        digital agencies and events management. Proficient in industry-standard software,
                        with a strong ability to collaborate and deliver high-quality, brand-consistent visuals.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
