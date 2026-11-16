import { About } from "./About";
import { Contact } from "./Contact";
import { DetailsDemo } from "./DetailsDemo";
import { HeroB } from "./HeroB";
import { Dock } from "./Dock";
import { Projects } from "./Projects";
import { ScatteredLogos } from "./ScatteredLogos";
import { Skills } from "./Skills";

export function Experience() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Dock />
      <main data-hs="ab" className="relative isolate overflow-x-clip">
        <ScatteredLogos />
        <HeroB />
        <About />
        <section id="details" className="mx-auto w-[calc(100%-3rem)] max-w-276 border-t border-ink/10 py-16 md:py-24">
          <DetailsDemo />
        </section>
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
