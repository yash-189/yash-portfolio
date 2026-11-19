import { About } from "./About";
import { Contact } from "./Contact";
import { DetailsDemo } from "./DetailsDemo";
import { HeroB } from "./HeroB";
import { Dock } from "./Dock";
import { Projects } from "./Projects";
import { ScatteredLogos } from "./ScatteredLogos";
import { Skills } from "./Skills";

export function HomePage() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Dock />
      <main data-hs="ab" className="relative isolate overflow-x-clip">
        <ScatteredLogos />
        <HeroB />
        <About />
        <section id="details" className="process-band relative py-16 md:mx-4 md:my-12 md:rounded-[2.5rem] md:py-24">
          <div className="mx-auto w-[calc(100%-3rem)] max-w-276">
            <DetailsDemo />
          </div>
        </section>
        <Projects />
        <div className="ink-band relative mt-8 rounded-t-[2rem] md:mx-4 md:mt-12 md:rounded-t-[2.5rem]">
          <Skills />
          <Contact />
        </div>
      </main>
    </>
  );
}
