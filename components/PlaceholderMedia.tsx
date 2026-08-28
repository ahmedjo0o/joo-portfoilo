import { clsx } from "clsx";

const ICONS: Record<string, React.ReactNode> = {
    Image: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M21 15l-5-5-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Video: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8">
            <rect x="2.5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M21.5 8.5v7L16.5 12l5-3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    ),
    GIF: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 9v6M11 9v6M11 12h2M16 9h1.5a1.5 1.5 0 010 3H16v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

export default function PlaceholderMedia({
    label = "Image",
    gradient = "from-zinc-800 via-black to-black",
    className,
    text,
}: {
    label?: "Image" | "Video" | "GIF";
    gradient?: string;
    className?: string;
    text?: string;
}) {
    return (
        <div
            className={clsx(
                "relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br",
                gradient,
                className
            )}
        >
            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
            <div className="relative flex flex-col items-center gap-2 text-white/40">
                {ICONS[label]}
                <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase">{text ?? `${label} placeholder`}</span>
            </div>
        </div>
    );
}
