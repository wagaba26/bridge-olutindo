import { ContextualHeroScene } from "@/components/site/contextual-hero-scene";

const heroScenes = [
  { src: "/images/hero/contextual/language-study.jpg", label: "Language Track", caption: "Guided study blocks and conversation routines" },
  { src: "/images/hero/contextual/pathway-counseling.jpg", label: "Pathway Planning", caption: "Structured advising for cross-border decisions" },
  { src: "/images/hero/contextual/digital-guidance.jpg", label: "Digital Progress", caption: "Track readiness and next steps in one flow" },
];

export function EdtechHeroArt() {
  return <ContextualHeroScene scenes={heroScenes} />;
}
