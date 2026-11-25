import SiteProvider from "@/components/site/SiteProvider";
import Preloader from "@/components/site/Preloader";
import Cursor from "@/components/site/Cursor";
import Nav from "@/components/site/Nav";
import TimelineHUD from "@/components/site/TimelineHUD";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Showreel from "@/components/site/Showreel";
import Work from "@/components/site/Work";
import Toolkit from "@/components/site/Toolkit";
import Experience from "@/components/site/Experience";
import Contact from "@/components/site/Contact";

export default function FullSite() {
    return (
        <SiteProvider>
            <Preloader />
            <Nav />
            <main className="relative bg-ink">
                <Hero />
                <About />
                <Showreel />
                <Work />
                <Toolkit />
                <Experience />
                <Contact />
            </main>
            <TimelineHUD />
            <Cursor />
            <div className="grain" aria-hidden />
        </SiteProvider>
    );
}
