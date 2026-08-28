"use client";

import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section className="min-h-screen relative flex flex-col justify-center bg-[url('/contact.jpg')] bg-cover bg-center bg-no-repeat text-white">
            <div className="w-full max-w-7xl mx-auto px-6 flex flex-col justify-center h-full pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-xl md:ml-20 pointer-events-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">Let's Create <br /> Together</h2>
                    <a href="mailto:ahmed@example.com" className="inline-block px-8 py-4 bg-emerald-500 text-white text-xl font-bold rounded-full hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/20">
                        Get in Touch
                    </a>
                </motion.div>
            </div>

            <footer className="absolute bottom-6 left-0 w-full text-center text-white/30 text-sm">
                &copy; 2026 Ahmed Youssef. All rights reserved.
            </footer>
        </section>
    );
}
