import FullSite from "@/components/FullSite";
import UnderConstruction from "@/components/UnderConstruction";
import { UNDER_CONSTRUCTION } from "@/lib/site";

export default function Home() {
  return UNDER_CONSTRUCTION ? <UnderConstruction /> : <FullSite />;
}
