"use client";

import { motion } from "framer-motion";

const CLIENTS = [
    "Google", "Netflix", "Adobe", "Spotify",
    "Nike", "Apple", "Samsung", "Microsoft"
];

export default function Clients() {
    return (
        <section className="py-20 bg-black border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center w-full">
                    <h2 className="text-xl md:text-2xl font-serif !text-green-500 uppercase tracking-widest">
                        Trusted By
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 items-center justify-items-center">
                    {CLIENTS.map((client, i) => (
                        <div
                            key={i}
                            className="text-2xl md:text-3xl font-bold text-white hover:text-green-500 transition-colors duration-300 cursor-default select-none group"
                        >
                            {client}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
