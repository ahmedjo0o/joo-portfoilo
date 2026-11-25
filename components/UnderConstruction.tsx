/* eslint-disable @next/next/no-img-element */

const links = [
  { label: "Email", value: "contact@ahmedyoussef.net", href: "mailto:contact@ahmedyoussef.net" },
  { label: "Behance", value: "be.net/ahmedjoo", href: "https://www.behance.net/ahmedjoo" },
];

export default function UnderConstruction() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-black text-white">
      {/* Same backlit portrait as the Instagram grid */}
      <img
        src="/brand/contact-photo.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-[75%_center] animate-[uc-fade_1.6s_ease-out_both]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent md:from-black/90 md:via-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-between px-6 py-10 md:px-12 md:py-14">
        <div className="animate-[uc-rise_1s_ease-out_0.2s_both]">
          <img
            src="/brand/logo-vertical-tagline.svg"
            alt="Ahmed Youssef"
            className="w-36 md:w-48 invert"
          />
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80 md:text-xs">
            Motion Graphics &amp; VFX Artist
          </p>
        </div>

        <div className="max-w-2xl animate-[uc-rise_1s_ease-out_0.5s_both]">
          <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
            <span className="h-px w-10 bg-white/40" />
            Under construction
          </p>
          <h1 className="text-6xl font-bold uppercase leading-[0.9] tracking-wide text-white md:text-8xl"
            style={{ fontFamily: "var(--font-barlow-condensed)" }}>
            Something new
            <br />
            is rendering.
          </h1>
          <p className="mt-6 max-w-md text-base text-white/70 md:text-lg">
            The new portfolio is on its way. Until then, get in touch for motion graphics and VFX work.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
            {links.map((link) => (
              <div key={link.label}>
                <div className="mb-1 text-xs uppercase tracking-widest text-white/40">{link.label}</div>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-medium text-white underline-offset-4 transition-colors hover:text-white/70 hover:underline"
                >
                  {link.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.4em] text-white/40">ahmedyoussef.net</p>
      </div>
    </main>
  );
}
