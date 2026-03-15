export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import Strategy from "@/components/Strategy";
import About from "@/components/About";
import JoinUs from "@/components/JoinUs";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Collection />
      <Strategy />
      <About />
      <JoinUs />
      <Contact />
    </main>
  );
}
