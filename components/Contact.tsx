"use client";

import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section className="min-h-screen relative flex flex-col justify-center bg-[url('/brand/contact-photo.webp')] bg-cover bg-center bg-no-repeat text-white">
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <div className="w-full max-w-7xl mx-auto px-6 flex flex-col justify-center h-full pointer-events-none relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-xl md:ml-20 pointer-events-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">Let's Create <br /> Together</h2>
                    <a href="mailto:ayoussef.me@gmail.com" className="inline-block px-8 py-4 bg-accent text-white text-xl font-bold rounded-full hover:bg-accent-hover transition-all shadow-lg hover:shadow-accent/30">
                        Get in Touch
                    </a>

                    <div className="flex flex-wrap gap-x-10 gap-y-4 mt-10">
                        <div>
                            <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Email</div>
                            <a href="mailto:ayoussef.me@gmail.com" className="text-white font-medium hover:text-violet-400 transition-colors">
                                ayoussef.me@gmail.com
                            </a>
                        </div>
                        <div>
                            <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Phone</div>
                            <a href="tel:+201060860503" className="text-white font-medium hover:text-violet-400 transition-colors">
                                (+20) 106 086 0503
                            </a>
                        </div>
                        <div>
                            <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Behance</div>
                            <a href="https://www.behance.net/ahmedjoo" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-violet-400 transition-colors">
                                be.net/ahmedjoo
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            <footer className="absolute bottom-6 left-0 w-full flex flex-col items-center gap-3 text-white/30 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo-horizontal-tagline.svg" alt="Ahmed Youssef — Motion Graphics & VFX Artist" className="h-6 md:h-8 w-auto invert opacity-90" />
                <span>&copy; 2026 Ahmed Youssef. All rights reserved.</span>
            </footer>
        </section>
    );
}
