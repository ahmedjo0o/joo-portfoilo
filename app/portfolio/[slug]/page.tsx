import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import MediaBlockRenderer from "@/components/MediaBlockRenderer";
import ProjectHero from "@/components/ProjectHero";

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return {};
    return {
        title: `${project.title} — Ahmed Youssef`,
        description: project.summary,
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const index = projects.findIndex((p) => p.slug === slug);
    const next = projects[(index + 1) % projects.length];

    return (
        <main className="min-h-screen bg-black">
            <ProjectHero project={project} />

            <div className="container mx-auto max-w-4xl px-6 py-20 flex flex-col gap-16">
                {project.blocks.map((block, i) => (
                    <MediaBlockRenderer key={i} block={block} gradient={project.gradient} />
                ))}
            </div>

            <section className="border-t border-white/10 py-20 px-6">
                <div className="container mx-auto max-w-4xl flex flex-col items-center text-center gap-8">
                    <Link
                        href="/portfolio"
                        className="text-white/50 hover:text-white text-sm tracking-widest uppercase transition-colors"
                    >
                        ← Back to Portfolio
                    </Link>

                    <Link href={`/portfolio/${next.slug}`} className="group w-full max-w-2xl">
                        <div className="text-white/40 text-sm uppercase tracking-widest mb-4">Next Project</div>
                        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 mb-4">
                            {next.cover ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={next.cover}
                                    alt={next.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                />
                            ) : (
                                <PlaceholderMedia label="Image" gradient={next.gradient} text={next.category} />
                            )}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-violet-400 transition-colors">
                            {next.title}
                        </h3>
                    </Link>
                </div>
            </section>
        </main>
    );
}
