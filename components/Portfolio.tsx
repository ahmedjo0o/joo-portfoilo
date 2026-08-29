import { projects } from "@/data/projects";
import PortfolioGrid from "./PortfolioGrid";

export default function Portfolio() {
    return (
        <section className="bg-black py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">Portfolio</h2>
                    <p className="text-white/60 text-lg">
                        A selection of motion design, 3D, and video editing work — from brand launches to broadcast packages.
                    </p>
                </div>

                <PortfolioGrid projects={projects} />
            </div>
        </section>
    );
}
