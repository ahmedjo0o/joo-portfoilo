import type { Metadata } from "next";
import { projects } from "@/data/projects";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
    title: "Portfolio — Ahmed Youssef",
    description: "Selected motion design and video editing projects by Ahmed Youssef.",
};

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-black pt-36 pb-24 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-16 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Portfolio</h1>
                    <p className="text-white/60 text-lg">
                        A selection of motion design, 3D, and video editing work — from brand launches to broadcast packages.
                    </p>
                </div>

                <PortfolioGrid projects={projects} />
            </div>
        </main>
    );
}
