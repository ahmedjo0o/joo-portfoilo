"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "After Effects", level: 95 },
    { name: "Premiere Pro", level: 90 },
    { name: "Cinema 4D", level: 85 },
    { name: "Photoshop", level: 85 },
    { name: "Ai Tools", level: 80 },
    { name: "Illustrator", level: 70 },
];

export default function CreativeExperience() {
    return (
        <section className="min-h-screen py-20 px-6 flex items-center justify-center text-white relative bg-[url('/creative.jpg')] bg-cover bg-center bg-no-repeat bg-black/70 bg-blend-overlay">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">+10 Years <br /> Creative Experience</h2>
                    <p className="text-white/60 text-lg max-w-xl">
                        Mastering the art of motion and visual storytelling through a decade of dedication.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {skills.map((skill, index) => (
                        <div key={skill.name} className="flex flex-col gap-2">
                            <div className="flex justify-between items-end">
                                <span className="text-xl font-bold">{skill.name}</span>
                                <span className="text-white/50">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="h-full bg-emerald-500 rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
