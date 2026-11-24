"use client";

export default function Showreel() {
    return (
        <section className="bg-black py-20 border-y border-white/5">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Embed Container */}
                <div className="relative w-full overflow-hidden rounded-lg shadow-2xl border border-white/10">
                    <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                        <iframe
                            src="https://player.vimeo.com/video/192401145?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            title="My Reel 2016"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
