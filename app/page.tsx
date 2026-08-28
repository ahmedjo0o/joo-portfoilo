import VisualScroll from "@/components/VisualScroll";
import CreativeExperience from "@/components/CreativeExperience";
import ProfessionalExperience from "@/components/ProfessionalExperience";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";

import Showreel from "@/components/Showreel";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div id="home"><VisualScroll /></div>
      <div id="showreel"><Showreel /></div>
      <div id="creative-experience"><CreativeExperience /></div>
      <div id="work"><ProfessionalExperience /></div>
      <div id="clients"><Clients /></div>
      <div id="contact"><Contact /></div>
    </main>
  );
}
