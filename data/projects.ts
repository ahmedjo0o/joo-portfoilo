// Placeholder portfolio content — swap `src` fields for real files once assets are ready.
// Drop real files in /public/portfolio/<slug>/... and set the matching `src`.
// Any block/cover left without a `src` renders as a labeled placeholder automatically.

export type MediaBlock =
    | { type: "image"; src?: string; alt: string; caption?: string }
    | { type: "video"; src?: string; poster?: string; caption?: string }
    | { type: "embed"; src?: string; caption?: string }
    | { type: "gif"; src?: string; alt: string; caption?: string }
    | { type: "text"; heading?: string; body: string };

export interface Project {
    slug: string;
    title: string;
    category: string;
    client: string;
    role: string;
    year: string;
    tools: string[];
    gradient: string;
    cover?: string;
    summary: string;
    blocks: MediaBlock[];
}

export const projects: Project[] = [
    {
        slug: "orbit-brand-launch",
        title: "Orbit Brand Launch",
        category: "3D Animation",
        client: "Orbit Tech",
        role: "Lead Motion Designer",
        year: "2025",
        tools: ["Cinema 4D", "Redshift", "After Effects"],
        gradient: "from-emerald-900 via-black to-black",
        summary:
            "A 3D product reveal built for Orbit's global launch keynote, blending procedural motion with cinematic lighting.",
        blocks: [
            {
                type: "text",
                heading: "The Brief",
                body: "Orbit needed a 90-second hero film to introduce their new hardware line — sleek, tactile, and confident enough to open a keynote.",
            },
            { type: "embed", caption: "Full launch film" },
            { type: "image", alt: "Product render, hero angle", caption: "Hero render — studio lighting pass" },
            { type: "image", alt: "Wireframe breakdown", caption: "Wireframe to final shading breakdown" },
            {
                type: "text",
                heading: "Approach",
                body: "Every motion beat was timed to the product's real dimensions, so the reveal reads as physically grounded rather than purely CG.",
            },
            { type: "gif", alt: "Turntable loop" },
        ],
    },
    {
        slug: "pulse-app-explainer",
        title: "Pulse App Explainer",
        category: "2D Motion Graphics",
        client: "Pulse Health",
        role: "Motion Designer & Editor",
        year: "2024",
        tools: ["After Effects", "Illustrator"],
        gradient: "from-teal-900 via-black to-black",
        summary:
            "A clean, character-led explainer that turns a health-tracking app's core flow into a 45-second story.",
        blocks: [
            {
                type: "text",
                heading: "The Brief",
                body: "Translate a dense feature list into something a first-time user actually wants to watch.",
            },
            { type: "embed", caption: "Final explainer, 45s cut" },
            { type: "image", alt: "Character design sheet" },
            { type: "image", alt: "Storyboard frames" },
            { type: "gif", alt: "UI transition loop" },
        ],
    },
    {
        slug: "meridian-title-sequence",
        title: "Meridian Title Sequence",
        category: "Title Sequence",
        client: "Meridian Films",
        role: "Motion Designer",
        year: "2024",
        tools: ["After Effects", "Cinema 4D", "Trapcode Suite"],
        gradient: "from-emerald-950 via-zinc-900 to-black",
        summary: "An opening title sequence for an independent thriller, built around typographic reveals in fog and light.",
        blocks: [
            { type: "embed", caption: "Opening titles" },
            {
                type: "text",
                heading: "Direction",
                body: "The director wanted dread without gore — so the type itself became the antagonist, pushing through smoke and negative space.",
            },
            { type: "image", alt: "Typography exploration frame" },
        ],
    },
    {
        slug: "nova-broadcast-package",
        title: "Nova News Broadcast Package",
        category: "Broadcast Design",
        client: "Nova Network",
        role: "Senior Motion Designer",
        year: "2023",
        tools: ["After Effects", "Cinema 4D"],
        gradient: "from-slate-800 via-black to-black",
        summary: "A full on-air identity — stings, lower thirds, and a virtual set extension — for a regional news relaunch.",
        blocks: [
            { type: "image", alt: "Lower thirds system" },
            { type: "embed", caption: "On-air sting reel" },
            {
                type: "text",
                heading: "Scope",
                body: "Delivered a full graphics package: opens, transitions, lower thirds, and a scalable template system for the in-house team.",
            },
            { type: "image", alt: "Virtual set frame" },
        ],
    },
    {
        slug: "kinetic-social-campaign",
        title: "Kinetic Social Campaign",
        category: "Social Content",
        client: "Kinetic Sportswear",
        role: "Motion Designer",
        year: "2023",
        tools: ["After Effects", "Photoshop"],
        gradient: "from-emerald-900 via-emerald-950 to-black",
        summary: "A bold, high-contrast set of vertical social cuts built to stop the scroll for a sportswear drop.",
        blocks: [
            { type: "gif", alt: "Vertical cut loop 1" },
            { type: "gif", alt: "Vertical cut loop 2" },
            {
                type: "text",
                heading: "Constraints",
                body: "Every asset had to work muted, in the first two seconds, at 9:16 — that ruled out anything relying on sound or slow builds.",
            },
        ],
    },
    {
        slug: "aurora-vfx-composite",
        title: "Aurora VFX Composite",
        category: "VFX & Compositing",
        client: "Aurora Studios",
        role: "Compositor",
        year: "2022",
        tools: ["After Effects", "Nuke", "Mocha"],
        gradient: "from-zinc-900 via-black to-black",
        summary: "Environment extension and sky replacement work for a short film's climactic sequence.",
        blocks: [
            { type: "image", alt: "Before / raw plate" },
            { type: "image", alt: "After / final composite" },
            {
                type: "text",
                heading: "Technique",
                body: "Tracked and rotoscoped by hand across 400+ frames, then graded to match the plate's native light.",
            },
        ],
    },
];

export function getProjectBySlug(slug: string) {
    return projects.find((p) => p.slug === slug);
}
