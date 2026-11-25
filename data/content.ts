// All the words on the site live here, so copy changes never need a component edit.

export const PROFILE = {
    firstName: "Ahmed",
    lastName: "Youssef",
    title: "Motion Graphics & VFX Artist",
    email: "contact@ahmedyoussef.net",
    phone: "(+20) 106 086 0503",
    phoneHref: "tel:+201060860503",
    behance: "https://www.behance.net/ahmedjoo",
    behanceLabel: "be.net/ahmedjoo",
    city: "Cairo",
    timeZone: "Africa/Cairo",
};

// Sections in page order. `id` is the anchor, `label` shows on the timeline and in the menu.
export const SECTIONS = [
    { id: "intro", label: "Intro" },
    { id: "about", label: "About" },
    { id: "reel", label: "Showreel" },
    { id: "work", label: "Work" },
    { id: "toolkit", label: "Toolkit" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

// The three chapters that play over the scroll image sequence in the hero.
export const HERO_CHAPTERS = [
    {
        tag: "01 / Craft",
        text: "I create high-end 2D and 3D motion graphics, turning complex ideas into smooth, cinematic visual experiences.",
    },
    {
        tag: "02 / Process",
        text: "From the first storyboard to the final render, I run every stage of the process myself.",
    },
    {
        tag: "03 / Standard",
        text: "Every frame matters.",
    },
];

export const ABOUT = {
    text: "Senior motion graphic designer with over eight years of experience across digital agencies and events management. I collaborate closely with creative teams and deliver high-quality, brand-consistent visuals that move.",
    stats: [
        { value: 8, suffix: "+", label: "Years in motion" },
        { value: 4, suffix: "", label: "Studios & agencies" },
        { value: 3, suffix: "", label: "Disciplines: 2D · 3D · VFX" },
    ],
};

export const DISCIPLINES = [
    "Motion Graphics",
    "3D Animation",
    "VFX",
    "Compositing",
    "Video Editing",
    "Title Design",
    "Broadcast",
    "Social Content",
];

export const SHOWREEL = {
    vimeoId: "192401145",
    title: "Showreel",
};

// Portfolio cards. Add `cover` (an image in /public) and `behanceUrl` once they're ready;
// cards without a cover render a generated motion placeholder.
export interface Project {
    slug: string;
    title: string;
    category: string;
    year?: string;
    cover?: string;
    behanceUrl?: string;
}

export const PROJECTS: Project[] = [
    { slug: "orbit-brand-launch", title: "Orbit Brand Launch", category: "3D Animation" },
    { slug: "pulse-app-explainer", title: "Pulse App Explainer", category: "2D Motion Graphics" },
    { slug: "meridian-title-sequence", title: "Meridian Title Sequence", category: "Title Sequence" },
    { slug: "nova-broadcast-package", title: "Nova Broadcast Package", category: "Broadcast Design" },
    { slug: "kinetic-social-campaign", title: "Kinetic Social Campaign", category: "Social Content" },
    { slug: "aurora-vfx-composite", title: "Aurora VFX Composite", category: "VFX & Compositing" },
];

// Toolkit, shown as layers on a timeline. `level` is 0-100.
export const TOOLS = [
    { name: "After Effects", short: "Ae", level: 90 },
    { name: "Premiere Pro", short: "Pr", level: 88 },
    { name: "Photoshop", short: "Ps", level: 85 },
    { name: "Cinema 4D", short: "C4D", level: 78 },
    { name: "Illustrator", short: "Ai", level: 75 },
    { name: "Blender", short: "Bl", level: 55 },
];

export const OTHER_TOOLS = ["AI tools", "Audition", "Character Animator"];

export const EXPERIENCE = [
    {
        company: "Middle East News FZ LLC",
        logo: "/brand/organizations/politicsless.svg",
        role: "Senior Motion Designer",
        from: "2024",
        to: "Now",
        details:
            "Create 2D & 3D motion graphics and edit videos for Politicsless across all digital platforms, raise the team's creative quality and build templates for editors.",
    },
    {
        company: "Influence Group",
        logo: "/brand/organizations/influence.svg",
        role: "Senior Motion Designer",
        from: "2019",
        to: "2024",
        details:
            "Dynamic animations and graphics for events, promotional videos and digital content for an events management and digital agency. Concept, storyboard, design and edit alongside the art team.",
    },
    {
        company: "Enjoy Learning VR",
        logo: "/brand/organizations/elvr.svg",
        role: "Motion Graphic Lead",
        from: "2018",
        to: "2019",
        details:
            "Led creative for a startup: 3D motion graphics and VR videos for educational content, across concept, animation, graphic design and post-production.",
    },
    {
        company: "Sarmady",
        logo: "/brand/organizations/sarmady.svg",
        role: "Motion Designer",
        from: "2016",
        to: "2018",
        details:
            "2D & 3D motion graphics, animations and live video content for social media, websites and television, including live coverage of sports matches and events.",
    },
];
