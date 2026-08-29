// Portfolio grid content — swap `cover` for a real thumbnail and `behanceUrl`
// for the real Behance project link once they're ready. Cards without a
// `cover` render a placeholder image automatically.

export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    cover?: string;
    behanceUrl: string;
}

export const projects: Project[] = [
    {
        slug: "orbit-brand-launch",
        title: "Orbit Brand Launch",
        subtitle: "3D Animation",
        behanceUrl: "",
    },
    {
        slug: "pulse-app-explainer",
        title: "Pulse App Explainer",
        subtitle: "2D Motion Graphics",
        behanceUrl: "",
    },
    {
        slug: "meridian-title-sequence",
        title: "Meridian Title Sequence",
        subtitle: "Title Sequence",
        behanceUrl: "",
    },
    {
        slug: "nova-broadcast-package",
        title: "Nova News Broadcast Package",
        subtitle: "Broadcast Design",
        behanceUrl: "",
    },
    {
        slug: "kinetic-social-campaign",
        title: "Kinetic Social Campaign",
        subtitle: "Social Content",
        behanceUrl: "",
    },
    {
        slug: "aurora-vfx-composite",
        title: "Aurora VFX Composite",
        subtitle: "VFX & Compositing",
        behanceUrl: "",
    },
];
